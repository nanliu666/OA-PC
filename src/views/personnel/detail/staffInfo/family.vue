<template>
  <div
    id="family"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">家庭信息</span>
    </div>
    <div class="info-content-wrapper">
      <div v-if="familyInfo.length == 0">
        <avue-empty />
      </div>
      <div
        v-for="(item, index) in familyInfo"
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
          ref="family"
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
                label="姓名:"
              >
                <span class="info-item-value">{{ item.name }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="姓名:"
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
                label="关系:"
              >
                <span class="info-item-value">{{
                  getDictValue(UserRelationship, item.relationship)
                }}</span>
              </el-form-item>

              <el-form-item
                v-show="curItemIndex == index"
                label="关系"
                prop="relationship"
              >
                <el-select v-model="item.relationship">
                  <el-option
                    v-for="it in UserRelationship"
                    :key="it.dictKey"
                    :label="it.dictValue"
                    :value="it.dictKey"
                  />
                </el-select>
                <!-- <el-input v-model="item.relationship" /> -->
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
                label="年龄:"
              >
                <span class="info-item-value">{{ item.age }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="年龄:"
                prop="age"
              >
                <el-input
                  v-model="item.age"
                  type="number"
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              :push="4"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="工作单位:"
              >
                <span class="info-item-value">{{ item.companyName }}</span>
              </el-form-item>

              <el-form-item
                v-show="curItemIndex == index"
                label="工作单位:"
                prop="companyName"
              >
                <el-input v-model="item.companyName" />
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
                label="职位:"
              >
                <span class="info-item-value">{{ item.jobName }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="职位:"
                prop="jobName"
              >
                <el-input v-model="item.jobName" />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              :push="4"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="联系电话:"
              >
                <span class="info-item-value">{{ item.phone }}</span>
              </el-form-item>

              <el-form-item
                v-show="curItemIndex == index"
                label="联系电话:"
                prop="phone"
              >
                <el-input v-model="item.phone" />
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
        <span>添加家庭信息</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStaffFamilyInfo,
  delStaffFamilyInfo,
  editStaffFamilyInfo,
  addStaffFamilyInfo
} from '../../../../api/personalInfo'
import { deepClone } from '@/util/util'
import { isMobile, validateName } from '@/util/validate'
let curItem = {}
export default {
  data() {
    let _this = this

    let repeatNmae = (value) => {
      let isHasCross = false
      for (let i = 0; i < _this.familyInfo.length; i++) {
        let item = _this.familyInfo[i]
        if (_this.curItemId != item.id && item.name == value) {
          isHasCross = true
          return isHasCross
        } else {
          isHasCross = false
        }
      }
      return isHasCross
    }
    return {
      curItemId: null,
      familyInfo: [],
      curItemIndex: null,
      editClick: false,
      UserRelationship: [],
      type: '',
      rules: {
        phone: [
          {
            required: true,
            trigger: 'blur',
            message: '电话号码不能为空'
          },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value && !isMobile(value)) {
                callback(new Error('电话格式有误'))
              } else {
                callback()
              }
            }
          }
        ],
        name: [
          {
            required: true,
            trigger: 'blur',
            message: '姓名不能为空'
          },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value && repeatNmae(value)) {
                callback(new Error('您输入的信息与其他家庭信息重复'))
              } else if (value && !validateName(value)) {
                callback(new Error('请输入2-10位汉字、英文、空格和点号'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  created() {
    this.getBasicInfo()
    this.$store.dispatch('CommonDict', 'UserRelationship').then((res) => {
      this.UserRelationship = res
    })
  },
  methods: {
    getDictValue(arr, val) {
      for (let item of arr) {
        if (item.dictKey === val) {
          return item.dictValue
        }
      }
    },
    addInfo() {
      this.type = 'add'
      let item = {
        name: '',
        phone: '',
        relationship: '',
        companyName: '',
        age: '',
        jobName: ''
      }
      this.familyInfo.push(item)
      this.editClick = true
      this.curItemIndex = this.familyInfo.length - 1
      this.curItemId = item.id
    },
    delInfo(item) {
      this.$confirm('您确定要删除该家庭信息吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = {
            ids: item.id
          }
          delStaffFamilyInfo(params).then(() => {
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
      this.$refs['family'][index].validate((isPass) => {
        if (isPass) {
          if (this.type == 'add') {
            item.userId = this.$route.params.userId
            addStaffFamilyInfo(item).then(() => {
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
            editStaffFamilyInfo(item).then(() => {
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
      getStaffFamilyInfo(params).then((res) => {
        this.familyInfo = res
      })
    },
    editInfo(item, index) {
      this.type = 'edit'
      this.editClick = true
      this.curItemIndex = index
      curItem = deepClone(item)
      this.curItemId = item.id
    },
    cancelEdit(index) {
      this.editClick = false
      this.curItemIndex = null
      if (this.type == 'add') {
        this.familyInfo.pop()
      } else {
        this.$set(this.familyInfo, index, deepClone(curItem))
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
