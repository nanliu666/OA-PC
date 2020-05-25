<template>
  <div
    id="certificate"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">资格证书</span>
    </div>
    <div class="info-content-wrapper">
      <div v-if="certificateInfo.length == 0">
        <avue-empty />
      </div>
      <div
        v-for="(item, index) in certificateInfo"
        :key="index"
        class="info-content"
        :class="{ 'back-style': curItemIndex == index }"
      >
        <div style="position: relative;z-index: 10;">
          <span
            v-show="curItemIndex != index"
            class="delete-button"
            @click="delInfo(item, index)"
          >
            <i
              class="el-icon-delete"
              style="font-size:18px;margin-right:5px"
            />
            <span>删除</span>
          </span>
          <span
            v-show="curItemIndex != index"
            class="edit-button"
            style="margin-right:8px;"
            @click="editInfo(item, index)"
          >
            <i
              class="el-icon-edit"
              style="font-size:18px;margin-right:5px"
            />
            <span>编辑</span>
          </span>
        </div>
        <el-form
          ref="certificate"
          :model="item"
          :rules="rules"
          label-width="150px"
          class="info-form"
          size="small"
        >
          <el-row :justify="'center'">
            <el-col
              :span="8"
              :push="2"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="证书名称:"
              >
                <span class="info-item-value">{{ item.name }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="证书名称:"
                prop="name"
              >
                <el-input v-model="item.name" />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              :push="4"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="证书编号:"
              >
                <span class="info-item-value">{{ item.code }}</span>
              </el-form-item>

              <el-form-item
                v-show="curItemIndex == index"
                label="证书编号"
                prop="code"
              >
                <el-input v-model="item.code" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col
              :span="8"
              :push="2"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="培训机构:"
              >
                <span class="info-item-value">{{ item.companyName }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="培训机构:"
                prop="companyName"
              >
                <el-input v-model="item.companyName" />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              :push="4"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="发证日期:"
              >
                <span class="info-item-value">{{ item.issueDate }}</span>
              </el-form-item>

              <el-form-item
                v-show="curItemIndex == index"
                label="发证日期"
                prop="issueDate"
              >
                <el-date-picker
                  v-model="item.issueDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  @change="issueDateChange"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div
            v-show="curItemIndex == index"
            class="info-button-group"
            :justify="'center'"
          >
            <el-button
              type="primary"
              @click="saveInfo(item, index)"
            >
              保存
            </el-button>
            <el-button @click="cancelEdit(index)">
              取消
            </el-button>
          </div>
        </el-form>
      </div>
    </div>

    <div class="add-info-item">
      <div
        class="add-info-button"
        @click="addInfo"
      >
        <i
          class="el-icon-plus"
          style="margin-right:6px;"
        />
        <span>添加资格证书</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStaffCertificate,
  delStaffCertificate,
  editStaffCertificate,
  addStaffCertificate
} from '../../../../api/personalInfo'
import { deepClone } from '@/util/util'
let curItem = {}
export default {
  data() {
    return {
      certificateInfo: [],
      curItemIndex: null,
      editClick: false,
      type: '',
      rules: {
        name: {
          required: true,
          trigger: 'blur',
          message: '证书名称不能为空'
        }
      }
    }
  },
  created() {
    this.getBasicInfo()
  },
  methods: {
    addInfo() {
      this.type = 'add'
      let item = {
        name: '',
        code: '',
        companyName: '',
        issueDate: ''
      }
      this.certificateInfo.push(item)
      this.editClick = true
      this.curItemIndex = this.certificateInfo.length - 1
    },
    delInfo(item) {
      this.$confirm('您确定要删除该资格证书的信息吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = {
            ids: item.id
          }
          delStaffCertificate(params).then(() => {
            this.getBasicInfo()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    saveInfo(item, index) {
      this.$refs['certificate'][index].validate((isPass) => {
        if (isPass) {
          if (this.type == 'add') {
            item.userId = this.$route.params.userId
            addStaffCertificate(item).then(() => {
              this.getBasicInfo()
              this.editClick = false
              this.curItemIndex = null
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            })
          } else {
            if (item.hasOwnProperty('userId')) {
              delete item.userId
            }
            editStaffCertificate(item).then(() => {
              this.getBasicInfo()
              this.editClick = false
              this.curItemIndex = null
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            })
          }
        }
      })
    },
    getBasicInfo() {
      let params = {
        userId: this.$route.params.userId
      }
      getStaffCertificate(params).then((res) => {
        this.certificateInfo = res
      })
    },
    editInfo(item, index) {
      this.type = 'edit'
      this.editClick = true
      this.curItemIndex = index
      curItem = deepClone(item)
    },
    cancelEdit(index) {
      this.editClick = false
      this.curItemIndex = null
      if (this.type == 'add') {
        this.certificateInfo.pop()
      } else {
        this.certificateInfo[index] = deepClone(curItem)
      }
    },
    issueDateChange(value) {
      this.issueDate = value
    }
  }
}
</script>

<style lang="scss" scoped></style>
