<template>
  <div class="emergency-component">
    <div
      class="emergency-contact-info no-back-style"
      :class="[editClick ? 'padding-top-style ' : '']"
    >
      <div class="emergency-contact-title">
        <span class="emergency-memb">紧急联系人</span>
      </div>
      <div class="emergency-info-content">
        <div v-if="emergency.length == 0">
          <avue-empty />
        </div>
        <div class="emergnecy-content-list">
          <div
            v-for="(item, index) in emergency"
            :key="index"
            :class="[index == currentEdit ? 'back-style' : 'no-back-style']"
          >
            <div
              v-show="index != currentEdit"
              class="button-group"
            >
              <span
                class="edit"
                @click="edit(item, index)"
              >编辑</span>
              <span
                class="delete"
                @click="del(item, index)"
              >删除</span>
            </div>

            <el-form
              ref="emergency"
              class="component-content info-form"
              :model="item"
              :rules="rules"
              label-width="150px"
              size="mini"
              :label-position="'right'"
            >
              <el-row>
                <el-col
                  :span="8"
                  :push="2"
                >
                  <el-form-item
                    v-show="index != currentEdit"
                    label="紧急联系人姓名:"
                  >
                    <span class="item-label-value">{{ item.name }}</span>
                  </el-form-item>
                  <el-form-item
                    v-show="index == currentEdit"
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
                    v-show="index != currentEdit"
                    label="紧急联系人电话:"
                  >
                    <span calss="item-label-value">{{ item.phone }}</span>
                  </el-form-item>
                  <el-form-item
                    v-show="index == currentEdit"
                    label="紧急联系人电话:"
                    prop="phone"
                  >
                    <el-input v-model="item.phone" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col
                  :span="8"
                  :push="2"
                >
                  <el-form-item
                    v-show="index != currentEdit"
                    label="紧急联系人关系:"
                  >
                    <span calss="item-label-value">{{ item.relationship }}</span>
                  </el-form-item>
                  <el-form-item
                    v-show="index == currentEdit"
                    label="紧急联系人关系:"
                  >
                    <el-input v-model="item.relationship" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item
                v-show="index == currentEdit"
                class="info-button-group"
                :justify="'center'"
              >
                <el-button
                  type="primary"
                  @click="saveEmergencyInfo(item, index)"
                >
                  保存
                </el-button>
                <el-button @click="cancelEmergencyEdit(item, index)">
                  取消
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="add-info-item">
        <div
          class="add-info-button"
          @click="addContact"
        >
          <i
            class="el-icon-plus"
            style="margin-right:6px;"
          />
          <span>添加紧急联系人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isMobile } from '@/util/validate'
import { deepClone } from '@/util/util'
import {
  delStaffEmerInfo,
  editStaffEmerInfo,
  addStaffEmerInfo,
  getStaffEmerInfo
} from '../../../api/personalInfo'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentEdit: null,
      editClick: false,
      emergency: [],
      curItem: null,
      type: null,
      rules: {
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
        ],
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入紧急联系人姓名'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.getEmergencyList()
  },
  methods: {
    getEmergencyList() {
      let params = {
        userId: this.userInfo.user_id //从vuex中获取
      }
      getStaffEmerInfo(params).then((res) => {
        this.emergency = res
      })
    },
    edit(item, index) {
      this.type = 'edit'
      this.editClick = true
      this.currentEdit = index
      this.curItem = deepClone(item)
    },
    del(item) {
      this.$confirm('您确定要删除该紧急联系人吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = {
            ids: item.id
          }
          delStaffEmerInfo(params).then(() => {
            this.getEmergencyList()
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
    saveEmergencyInfo(item, index) {
      this.$refs['emergency'][index].validate((isPass) => {
        if (isPass) {
          this.editClick = false
          this.currentEdit = null
          if (this.type == 'add') {
            let params = {
              userId: this.userInfo.user_id,
              name: item.name,
              phone: item.phone,
              relationship: item.relationship
            }
            addStaffEmerInfo(params).then(() => {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            })
          } else {
            editStaffEmerInfo(item).then(() => {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            })
          }

          this.getEmergencyList()
        }
      })
    },
    cancelEmergencyEdit(item, index) {
      this.currentEdit = null
      this.editClick = false
      if (this.type == 'add') {
        this.emergency.pop()
      } else {
        this.emergency[index] = deepClone(this.curItem)
      }
    },
    addContact() {
      this.type = 'add'
      this.editClick = true
      let memberInfo = {
        name: '',
        phone: '',
        relationship: ''
      }
      this.emergency.push(memberInfo)
      this.currentEdit = this.emergency.length - 1
    }
  }
}
</script>

<style scoped lang="scss">
.button-group {
  text-align: right;
  color: #207efa;
  font-size: 14px;
  padding: 10px 0;

  > span {
    padding: 8px;
    cursor: pointer;
  }
}
.back-style {
  background: #f7f8fa;
}
.no-back-style {
  background: #fff;
}
.no-border-style {
  border: none;
}
.border-style {
  border: 1px solid #ccc;
}

.el-col {
  .item-label-key,
  .item-label-value {
    font-size: 14px;
    display: inline-block;
  }
  .item-label-key {
    width: 150px;
    color: #718199 !important;
    margin-right: 22px;
    text-align: right;
  }
  .item-label-value {
    width: 100%;
    color: #202940;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.emergency-component {
  .component-content {
    padding: 20px 20px 0 20px;
    /deep/ input {
      height: 34px !important;
      color: #202940;
      font-size: 14px;
    }
  }
  /deep/ input {
    height: 34px !important;
  }
}
.emergency-contact-info {
  padding: 0 30px 30px 30px;
}
.emergency-contact-title {
  padding: 10px 0;
}
.add-emergency-member {
  margin-top: 10px;
  text-align: center;
}
.info-button-group {
  text-align: center;
  .el-button {
    width: 80px;
    height: 42px;
  }
  /deep/.el-form-item__content {
    margin-left: 0 !important;
  }
}
.add-info-item {
  padding: 10px 0 20px 0;
  color: #757c85;
  line-height: 34px;
  cursor: pointer;
}
.add-info-button {
  border: 1px dashed #cecece;
  border-radius: 4px;
  border-radius: 4px;
  text-align: center;
}

.add-info-button:hover {
  color: #207efa;
  border-color: #bcd8fe;
  background-color: #e9f2ff;
}
.emergnecy-content-list > div {
  border-bottom: 1px solid #cecece;
}
.emergnecy-content-list > div:last-child {
  border: none;
}
</style>
