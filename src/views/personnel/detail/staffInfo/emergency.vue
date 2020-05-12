<template>
  <div
    id="emergency"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">紧急联系人</span>
    </div>
    <div class="info-content-wrapper">
      <div
        v-for="(item, index) in emergencyInfo"
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
          ref="emergency"
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
                label="紧急联系人姓名:"
              >
                <span class="info-item-value">{{ item.name }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="紧急联系人姓名:"
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
                label="紧急联系人关系:"
              >
                <span class="info-item-value">{{ item.relationship }}</span>
              </el-form-item>

              <el-form-item
                v-show="curItemIndex == index"
                label="紧急联系人关系:"
                prop="relationship"
              >
                <el-input v-model="item.relationship" />
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
                label="手机号码:"
              >
                <span class="info-item-value">{{ item.phone }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="手机号码:"
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
        <span>添加紧急联系人</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  delStaffEmerInfo,
  editStaffEmerInfo,
  addStaffEmerInfo,
  getStaffEmerInfo
} from '../../../../api/personalInfo'
import { deepClone, randomLenNum } from '@/util/util'
import { isMobile, validateName } from '@/util/validate'
let curItem = {}
export default {
  data() {
    return {
      emergencyInfo: [],
      curItemIndex: null,
      editClick: false,
      type: '',
      rules: {
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!value || (value && !validateName(value))) {
                callback(new Error('请输入2-10位汉字、英文、空格和点号'))
              } else {
                callback()
              }
            }
          }
        ],
        phone: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入手机号码'))
              } else if (value && !isMobile(value)) {
                callback(new Error('手机号码格式不正确'))
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
  },
  methods: {
    addInfo() {
      this.type = 'add'
      let item = {
        id: randomLenNum(),
        name: '',
        phone: '',
        relationship: ''
      }
      this.emergencyInfo.push(item)
      this.editClick = true
      this.curItemIndex = this.emergencyInfo.length - 1
    },
    delInfo(item, index) {
      this.$confirm('您确定要删除该紧急联系人吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delStaffEmerInfo(item.id).then((res) => {
            if (res.resCode == 200) {
              this.emergencyInfo.splice(index, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
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
      this.$refs['emergency'][index].validate((isPass) => {
        if (isPass) {
          if (this.type == 'add') {
            addStaffEmerInfo(item).then((res) => {
              if (res.resCode == 200) {
                this.editClick = false
                this.curItemIndex = null
                this.$message({
                  type: 'success',
                  message: res.resMsg
                })
              }
            })
          } else {
            editStaffEmerInfo(item).then((res) => {
              if (res.resCode == 200) {
                this.editClick = false
                this.curItemIndex = null
                this.$message({
                  type: 'success',
                  message: res.resMsg
                })
              }
            })
          }
        }
      })
    },
    getBasicInfo() {
      let params = {
        userId: '20200426'
      }
      getStaffEmerInfo(params).then((res) => {
        this.emergencyInfo = res.response
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
        this.emergencyInfo.pop()
      } else {
        this.emergencyInfo[index] = deepClone(curItem)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-content-wrapper > .info-content:last-child {
  border-bottom: none;
}
@import url('../staffInfo.scss');
</style>
