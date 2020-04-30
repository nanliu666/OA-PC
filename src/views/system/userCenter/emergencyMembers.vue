<template>
  <div class="emergency-component">
    <div
      class="emergency-contact-info"
      :class="[editClick ? 'padding-top-style back-style ' : 'no-back-style ']"
    >
      <div class="emergency-contact-title">
        <span class="emergency-memb">紧急联系人</span>
        <span class="emergency-info-title-line" />
      </div>
      <div class="emergency-info-content">
        <div
          v-for="(item, index) in emergency"
          :key="index"
          :class="[index == currentEdit ? 'border-style no-back-style' : 'no-border-style']"
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
            ref="contactItem"
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
                  <span calss="item-label-value">{{ item.relation }}</span>
                </el-form-item>
                <el-form-item
                  v-show="index == currentEdit"
                  label="紧急联系人关系:"
                >
                  <el-input v-model="item.relation" />
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
      <div class="add-emergency-member">
        <el-button
          type="primary"
          @click="addContact"
        >
          添加
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { isMobile } from '@/util/validate'
export default {
  props: {
    emergencyList: {
      type: Array,
      default: () => []
    }
  },
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

  mounted() {
    this.emergency = this.emergencyList ? this.emergencyList : []
  },
  methods: {
    edit(item, index) {
      this.type = 'edit'
      this.editClick = true
      this.currentEdit = index
      this.curItem = this.deepCopy(item)
    },
    del(item, index) {
      this.$confirm('您确定要删除该紧急联系人吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.emergency.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
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
      this.$refs['contactItem'][index].validate((isPass) => {
        if (isPass) {
          this.currentEdit = null
          this.editClick = false
        }
      })
    },
    cancelEmergencyEdit(item, index) {
      this.currentEdit = null
      this.editClick = false
      if (this.type == 'add') {
        this.emergency.pop()
      } else {
        this.emergency[index] = this.deepCopy(this.curItem)
      }
    },
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    addContact() {
      this.type = 'add'
      this.editClick = true
      let memberInfo = {
        phone: '',
        relation: '',
        name: ''
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
  background: #cecece;
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
    border-bottom: 1px dashed #cecece;
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
  .emergency-info-title-line {
    width: calc(100% - 95px);
    display: inline-block;
    border-top: 2px dashed #999;
    margin: 5px;
  }
}
.add-emergency-member {
  margin-top: 10px;
  text-align: center;
}
.info-button-group {
  text-align: center;
  .el-form-item__content {
    margin-left: 0;
  }
  .el-button {
    width: 80px;
    height: 42px;
  }
}
</style>
