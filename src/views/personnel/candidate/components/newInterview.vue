<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialog"
      width="550px"
      append-to-body
      :before-close="handleClose"
    >
      <div>
        <div>
          <div class="info">
            联系人信息
          </div>
          <el-form
            ref="form"
            :model="form"
            label-width="0px"
            :rules="rules"
          >
            <el-form-item prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入联系人姓名"
              />
            </el-form-item>
            <el-form-item prop="phonenum">
              <el-input
                v-model="form.phonenum"
                placeholder="请输入联系人手机号码"
                maxlength="11"
                @input="(value) => inputPhonenum(value, 'phonenum')"
              />
            </el-form-item>
          </el-form>
        </div>
        <div v-if="isShowAddress">
          <div class="address">
            面试地址
          </div>
          <el-form
            ref="addressForm"
            :model="form"
            :rules="rules"
            label-width="0"
          >
            <el-form-item prop="addresslist">
              <el-cascader
                ref="cascaderAddr"
                v-model="form.addresslist"
                clearable
                size="large"
                :options="options"
                class="casvader"
                @change="handleChange"
              />
            </el-form-item>
            <el-form-item prop="address">
              <el-input
                v-model="form.address"
                type="textarea"
                placeholder="请输入详细地址，例如街道名称、门牌号码、楼层和房间号等详细地址"
              />
            </el-form-item>
          </el-form>
        </div>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="medium"
            @click="handleClose"
          >
            取 消
          </el-button>
          <el-button
            type="primary"
            size="medium"
            :loading="submitting"
            @click="onsubmit"
          >
            确 定
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { postAddresss, putAddresss } from '@/api/personnel/selectedPerson'
import { isMobile } from '@/util/validate'

export default {
  name: 'NewInterview',
  props: {
    row: {},
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    let _this = this
    const validatePhone = (rule, value, callback) => {
      if (!_this.form.phonenum) {
        callback(new Error('请输入手机号码'))
      } else if (_this.form.phonenum && !isMobile(value)) {
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      title: '',
      isShowAddress: false,
      options: regionData,
      dialog: true,
      form: {
        addresslist: [],
        pathLabels: [],
        address: '',
        name: '',
        phonenum: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入联系人姓名',
            trigger: 'blur'
          }
        ],
        phonenum: [
          {
            required: true,
            message: '请输入联系人手机号码',
            trigger: 'blur'
          },
          {
            required: true,
            trigger: 'blur',
            validator: validatePhone
          }
        ]
        // addresslist: [
        //   {
        //     required: true,
        //     message: '请选择面试地址',
        //     trigger: 'blur'
        //   }
        // ],
        // address: [
        //   {
        //     required: true,
        //     message: '请输入详细地址',
        //     trigger: 'blur'
        //   }
        // ]
      }
    }
  },
  watch: {
    dialog: {
      handler: function() {
        this.$emit('update:row', {})
        this.$emit('update:dialogVisible', this.dialog)
      },
      deep: true
    },
    row: {
      handler(val) {
        this.title = val.id ? '编辑面试信息' : '新建面试信息'
        if (val.id) {
          this.form.phonenum = val.phonenum
          this.form.name = val.name
        }
        if (val.provinceCode) {
          let {
            provinceName,
            cityName,
            countyName,
            provinceCode,
            cityCode,
            countyCode,
            address
          } = { ...val }
          this.form.addresslist = [provinceCode, cityCode, countyCode]
          this.form.pathLabels = [provinceName, cityName, countyName]
          this.form.address = address
        }
        this.isShowAddress = val.provinceCode ? true : false
        if (this.type === 'Onsite' && !val.id) {
          this.isShowAddress = true
        } else if (this.type === 'Onsite' && val.provinceCode) {
          this.isShowAddress = true
        } else if (val.provinceCode) {
          this.isShowAddress = true
        } else {
          this.isShowAddress = false
        }
      },
      immediate: true
    }
  },
  methods: {
    inputPhonenum(value, index) {
      value = value.replace(/[^\d]/g, '')
      this.form[index] = value
    },
    onsubmit() {
      let form = this.isShowAddress ? ['form', 'addressForm'] : ['form']
      Promise.all(
        form.map((it) => {
          return new Promise((resolve, reject) => {
            this.$refs[it].validate((valid) => {
              if (valid) {
                resolve(it)
              } else {
                reject(it)
              }
            })
          })
        })
      )
        .then(() => {
          let { name, phonenum, address } = this.form

          let provinceCode = this.form.addresslist[0]
          let cityCode = this.form.addresslist[1]
          let countyCode = this.form.addresslist[2]
          let provinceName = this.form.pathLabels[0]
          let cityName = this.form.pathLabels[1]
          let countyName = this.form.pathLabels[2]

          let params = {
            id: this.row.id,
            name,
            phonenum,
            address,
            provinceCode,
            cityCode,
            countyCode,
            provinceName,
            cityName,
            countyName
          }
          let submitFunc = postAddresss
          if (this.row.id) {
            submitFunc = putAddresss
          }
          this.submitting = true
          submitFunc(params)
            .then(() => {
              this.$message.success('提交成功')
              this.$emit('updataAddree')
              this.dialog = false
            })
            .finally(() => {
              this.submitting = false
            })
        })
        .catch(() => {})
    },
    handleChange() {
      let pathLabels = this.$refs['cascaderAddr'].getCheckedNodes()
      this.form.pathLabels = pathLabels[0].pathLabels
    },
    handleClose() {
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
/*/deep/ .el-dialog__header {*/
/*  padding: 16px 0;*/
/*  margin: 0 24px;*/
/*  border-bottom: 1px solid rgba(208, 211, 214, 0.44);*/
/*  font-size: 18px;*/
/*  color: #202940;*/
/*  line-height: 24px;*/
/*}*/

/*/deep/ .el-dialog__body {*/
/*  padding: 24px;*/
/*}*/

/*/deep/ .el-dialog__footer {*/
/*  padding: 0px 24px 24px;*/
/*}*/

/*/deep/ .el-form-item__label {*/
/*  line-height: 20px;*/
/*  font-size: 14px;*/
/*  color: #0f0000;*/
/*}*/

/*/deep/ .el-form-item {*/
/*  margin-bottom: 24px;*/
/*}*/

.dialog-footer {
  text-align: right;
}

/*/deep/ .el-form-item {*/
/*  margin-bottom: 12px;*/
/*}*/

.info,
.address {
  margin-bottom: 12px;
  font-size: 14px;
  color: #202940;
}

.casvader {
  width: 100%;
}
</style>
