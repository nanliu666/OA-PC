<template>
  <div style="height">
    <el-page-header
      content="添加员工"
      class="pageHeader"
      @back="goBack"
    />
    <basic-container v-loading="loading">
      <el-row
        type="flex"
        justify="center"
      >
        <el-col :span="14">
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
            label-position="top"
            :rules="rules"
            inline
          >
            <el-col :span="24">
              <h4>基本信息</h4>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="姓名"
                prop="name"
              >
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                  <el-radio label="1">
                    男
                  </el-radio>
                  <el-radio label="0">
                    女
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="手机号"
                prop="phonenum"
              >
                <el-input
                  v-model="form.phonenum"
                  maxlength="11"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="邮箱"
                prop="userEmail"
              >
                <el-input v-model="form.userEmail" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <h4>入职信息</h4>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="入职日期"
                class="entryDate"
                prop="entryDate"
              >
                <el-date-picker
                  v-model="form.entryDate"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="试用期">
                <el-select
                  v-model="form.probation"
                  placeholder="请选择"
                >
                  <el-option
                    label="无试用期"
                    :value="0"
                  />
                  <el-option
                    v-for="item in [1, 2, 3, 4, 5, 6]"
                    :key="item"
                    :label="item + '个月'"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="入职公司"
                prop="companyId"
              >
                <el-select
                  v-model="form.companyId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in companyList"
                    :key="item.orgId"
                    :label="item.orgName"
                    :value="item.orgId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="工号"
                prop="workNo"
              >
                <el-input
                  ref="workNo"
                  v-model="form.workNo"
                >
                  <template slot="append">
                    <div @click="autoUserId">
                      自动生成
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="部门"
                prop="orgId"
              >
                <el-tree-select
                  ref="orgTree"
                  v-model="form.orgId"
                  :popover-class="orgOptions.config.fas"
                  :styles="orgOptions.styles"
                  :select-params="orgOptions.config.selectParams"
                  :tree-params="orgOptions.config.treeParams"
                  @change="handleOrgChange"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="职位"
                prop="jobId"
              >
                <el-select
                  v-model="form.jobId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.jobId"
                    :label="item.jobName"
                    :value="item.jobId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <template v-for="(items, index) in form.subOrg">
              <el-col
                :key="index"
                :span="12"
              >
                <el-form-item :label="'部门' + (index + 1)">
                  <!-- <tree-select
                    v-model="form.subOrg[index]"
                    :option="orgOptions"
                    :is-search="false"
                    :is-single="true"
                  />-->
                  <el-tree-select
                    ref="orgTree"
                    v-model="form.subOrg[index]"
                    :popover-class="orgOptions.config.fas"
                    :styles="orgOptions.styles"
                    :select-params="orgOptions.config.selectParams"
                    :tree-params="orgOptions.config.treeParams"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :key="index"
                :span="11"
              >
                <el-form-item :label="'职位' + (index + 1)">
                  <el-select
                    v-model="form.subJob[index]"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in jobList"
                      :key="item.jobId"
                      :label="item.jobName"
                      :value="item.jobId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :key="index"
                :span="1"
                style="line-height:112px"
              >
                <i
                  class="el-icon-delete"
                  @click="deleteSubOrgJob(index)"
                />
              </el-col>
            </template>
            <!-- <el-col :span="24">
              <div class="addSubOrg">
                <div
                  style="width: 200px"
                  @click="addSubOrgJob"
                >
                  <i class="el-icon-plus" />添加附属部门及职位
                </div>
              </div>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="岗位">
                <el-select
                  v-model="form.positionId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in positionList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="工作性质"
                prop="workProperty"
              >
                <el-select
                  v-model="form.workProperty"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in workPropertyList"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="员工状态"
                prop="status"
              >
                <el-select
                  v-model="form.status"
                  placeholder="请选择"
                >
                  <el-option
                    label="试用期"
                    value="Try"
                  />
                  <el-option
                    label="正式"
                    value="Formal"
                  />
                  <el-option
                    label="已离职"
                    value="Leaved"
                  />
                  <el-option
                    label="待离职"
                    value="WaitLeave"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工作地址">
                <el-select
                  ref="workAddressId"
                  v-model="form.workAddressId"
                  v-loadmore="loadWorkAddress"
                  placeholder="请选择"
                  @change="handleAddressClick"
                >
                  <el-option
                    v-for="item in workAddress"
                    :key="item.id"
                    :label="item.address"
                    :value="item.id"
                    class="workOption"
                  >
                    <span style="float: left">{{ item.address }}</span>
                    <span
                      class="optionRight"
                      @click.stop="deleteAddress(item)"
                    >
                      <i class="el-icon-error" />
                    </span>
                    <span
                      class="optionRight"
                      @click.stop="editAddress(item)"
                    >
                      <i class="el-icon-edit-outline" />
                    </span>
                  </el-option>
                  <div
                    v-show="loadAddress"
                    class="addressLoading"
                  >
                    <i class="el-icon-loading" />
                  </div>
                  <el-option
                    value
                    label
                    style="text-align:center"
                  >
                    <div
                      class="newAddress"
                      @click="createAddress"
                    >
                      <i class="el-icon-plus" /> 新建工作地址
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="工作城市">
                <el-cascader
                  ref="workProvinceArr"
                  v-model="form.workProvinceArr"
                  :options="provinceAndCityData"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button
                  size="medium"
                  @click="submitAndCreate"
                >
                  保存并继续添加
                </el-button>
                <el-button
                  type="primary"
                  size="medium"
                  @click="handleSubmit"
                >
                  保存
                </el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-dialog
        title="新建工作地址"
        :visible.sync="dialogTableVisible"
        :modal-append-to-body="false"
        custom-class="dialogClass"
      >
        <el-form
          ref="workAddressForm"
          :model="workAddressForm"
          label-width="80px"
          label-position="top"
          class="dialogForm"
          :rules="workAddressRules"
        >
          <el-form-item
            label="工作地址"
            prop="addressArr"
          >
            <el-cascader
              ref="newWorkAddress"
              v-model="workAddressForm.addressArr"
              :options="regionData"
            />
          </el-form-item>
          <el-form-item
            label="工作地址"
            prop="address"
          >
            <el-input
              v-model="workAddressForm.address"
              type="textarea"
              :rows="2"
              placeholder="请输入详细地址，例如街道名称、门牌号码、楼层和房间号等详细地址"
            />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="medium"
            @click="dialogTableVisible = false"
          >取 消</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="handleCreateAddress"
          >确 定</el-button>
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import {
  getWorkAddressList,
  deleteWorkAddress,
  editWorkAddress,
  createWorkAddress,
  getOrgPosition,
  getOrgJob,
  getOrganizationCompany,
  createNewWorkNo,
  checkUserInfo,
  createUser
} from '@/api/personnel/roster'
import { getOrgTreeSimple } from '@/api/org/org'
import { regionData } from 'element-china-area-data'
import ElTreeSelect from '@/components/elTreeSelect/elTreeSelect'

export default {
  name: 'AddRoster',
  components: { ElTreeSelect },
  data() {
    var checkUserId = (rule, value, callback) => {
      checkUserInfo({ workNo: value })
        .then(() => {
          callback()
        })
        .catch(() => {
          callback(new Error('该工号已存在'))
        })
    }
    var checkPhonenum = (rule, value, callback) => {
      checkUserInfo({ phonenum: value })
        .then(() => {
          callback()
        })
        .catch(() => {
          callback(new Error('该手机号已存在'))
        })
    }
    var checkEmail = (rule, value, callback) => {
      checkUserInfo({ email: value })
        .then(() => {
          callback()
        })
        .catch(() => {
          callback(new Error('该邮箱已存在'))
        })
    }
    return {
      form: {
        name: '',
        sex: '',
        phonenum: '',
        userEmail: '',
        entryDate: '',
        probation: '',
        companyId: '',
        workNo: '',
        jobId: '',
        positionId: '',
        workProperty: '',
        workAddressId: '',
        workProvinceArr: [],
        status: 'Try',
        orgId: '',
        subOrg: [],
        subJob: []
      },
      workAddressForm: {
        addressArr: [],
        address: ''
      },
      companyList: [],
      workPropertyList: [],
      jobList: [],
      orgOptions: {
        config: {
          selectParams: {
            placeholder: '请输入内容',
            multiple: false
          },
          treeParams: {
            data: [],
            'check-strictly': true,
            'default-expand-all': false,
            'expand-on-click-node': false,
            clickParent: true,
            filterable: false,
            props: {
              children: 'children',
              label: 'orgName',
              disabled: 'disabled',
              value: 'orgId'
            }
          }
        }
      },
      positionList: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        entryDate: [{ required: true, message: '请输入入职日期', trigger: 'blur' }],
        companyId: [{ required: true, message: '请选择入职公司', trigger: 'change' }],
        phonenum: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' },
          { validator: checkPhonenum, trigger: 'blur' },
          { pattern: /^[0-9]{11}$/, message: '长度必须为11位', trigger: 'blur' }
        ],
        userEmail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
          { validator: checkEmail, trigger: 'blur' }
        ],
        workNo: [
          { required: true, message: '请输入工号', trigger: 'blur' },
          { pattern: /^\d{4}/, message: '必须为四位数字', trigger: 'blur' },
          { validator: checkUserId, trigger: 'blur' }
        ],
        orgId: [{ required: true, message: '请选择部门', trigger: 'change' }],
        jobId: [{ required: true, message: '请选择职位', trigger: 'change' }],
        workProperty: [{ required: true, message: '请选择工作性质', trigger: 'change' }],
        status: [{ required: true, message: '请选择员工状态', trigger: 'change' }]
      },
      workAddressRules: {
        addressArr: [{ required: true, message: '请选择地址', trigger: 'change' }]
      },
      provinceAndCityData: regionData,
      regionData: regionData,
      workAddress: [],
      dialogTableVisible: false,
      loadAddress: false,
      addressPageNo: 1,
      loading: false
    }
  },
  created() {
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      this.workPropertyList = res
    })
    this.loadSelectData()
  },
  methods: {
    handleOrgChange() {
      this.form.jobId = ''
      getOrgJob({ orgId: this.form.orgId }).then((res) => {
        this.jobList = res
      })
    },
    deleteSubOrgJob(index) {
      this.form.subJob.splice(index, 1)
      this.form.subOrg.splice(index, 1)
    },
    addSubOrgJob() {
      this.form.subOrg.push('')
      this.form.subJob.push('')
    },
    handleCreateAddress() {
      this.$refs.workAddressForm.validate((valid) => {
        if (valid) {
          let inputValue = this.$refs.newWorkAddress.inputValue.split('/ ')
          const params = {
            provinceCode: this.workAddressForm.addressArr[0],
            provinceName: inputValue[0],
            cityCode: this.workAddressForm.addressArr[1],
            cityName: inputValue[1],
            countyCode: this.workAddressForm.addressArr[2],
            countyName: inputValue[2],
            address: this.workAddressForm.address
          }

          if (this.workAddressForm.id) {
            params.id = this.workAddressForm.id
            editWorkAddress(params).then(() => {
              this.$message.success('修改成功')
              this.workAddressForm = {}
              this.dialogTableVisible = false
              this.workAddress = []
              this.addressPageNo = 1
              this.loadWorkAddress()
            })
          } else {
            createWorkAddress(params).then(() => {
              this.$message.success('新建成功')
              this.workAddressForm = {}
              this.dialogTableVisible = false
              this.workAddress = []
              this.addressPageNo = 1
              this.loadWorkAddress()
            })
          }
        } else {
          return false
        }
      })
    },
    workProvinceChange() {
      let inputValue = this.$refs.workProvinceArr.inputValue.split('/ ')
      this.form.provinceName = inputValue[0]
      this.form.cityName = inputValue[1]
      this.form.countyName = inputValue[1]
    },
    editAddress(item) {
      this.workAddressForm.id = item.id
      this.$set(this.workAddressForm, 'addressArr', [
        item.provinceCode,
        item.cityCode,
        item.countyCode
      ])
      this.$set(this.workAddressForm, 'address', item.address)
      this.dialogTableVisible = true
    },
    deleteAddress(item) {
      deleteWorkAddress({ ids: item.id }).then(() => {
        this.$message.success('删除成功')
        this.form.workAddressId = ''
        this.form.workProvinceArr = []
        this.workAddress = []
        this.addressPageNo = 1
        this.loadWorkAddress()
      })
    },
    handleAddressClick() {
      this.workAddress.forEach((item) => {
        if (item.id === this.form.workAddressId) {
          this.form.workProvinceArr = [item.provinceCode, item.cityCode, item.countyCode]
        }
      })
    },
    autoUserId() {
      createNewWorkNo().then((res) => {
        this.form.workNo = res.workNo
        this.$refs.workNo.select()
      })
    },
    goBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$refs.form.clearValidate()
      this.$router.back(-1)
    },
    async submitAndCreate() {
      await this.onSubmit()
      Object.assign(this.$data.form, this.$options.data().form)
      this.$refs.form.clearValidate()
    },
    async handleSubmit() {
      await this.onSubmit()
      this.goBack()
    },
    onSubmit() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            const params = { ...this.form }
            if (!params.probation) params.probation = 0
            let inputValue = []
            if (this.$refs.workProvinceArr.inputValue) {
              inputValue = this.$refs.workProvinceArr.inputValue.split(' / ')
            }
            params.workProvinceName = inputValue[0]
            params.workCityName = inputValue[1]
            params.workCountyName = inputValue[1]
            params.workProvinceCode = params.workProvinceArr && params.workProvinceArr[0]
            params.workCityCode = params.workProvinceArr && params.workProvinceArr[1]
            params.workCountyCode = params.workProvinceArr && params.workProvinceArr[2]
            // params.orgId = params.orgId[0]
            // params.subOrg = params.subOrg.map((item) => {
            //   return item[0]
            // })
            params.subOrg = Array.from(new Set(params.subOrg))
            params.subJob = Array.from(new Set(params.subJob))
            this.loading = true
            createUser(params).then(() => {
              this.$message.success('创建成功')
              this.loading = false
              Object.assign(this.$data.form, this.$options.data().form)
              resolve()
            })
          } else {
            this.$message.error('请完善信息')
            reject()
          }
        })
      })
    },
    createAddress() {
      this.$refs.workAddressId.blur()
      this.dialogTableVisible = true
      this.workAddressForm = {}
    },
    loadWorkAddress() {
      if (this.loadAddress) return
      this.loadAddress = true
      getWorkAddressList({ pageNo: this.addressPageNo, pageSize: 50 }).then((res) => {
        this.workAddress.push(...res.data)
        this.addressPageNo += 1
        this.loadAddress = false
      })
    },
    loadSelectData() {
      getOrganizationCompany({ parentOrgId: '0' }).then((res) => {
        this.companyList = res
      })
      getOrgPosition().then((res) => {
        this.positionList = res
      })
      getOrgTreeSimple({ parentOrgId: '0' }).then((res) => {
        this.orgOptions.config.treeParams.data = res
        this.$refs['orgTree'].treeDataUpdateFun(res)
      })
      this.loadWorkAddress()
    }
  }
}
</script>

<style lang="scss" scoped>
.pageHeader {
  height: 48px;
  // padding: 0 24px;
  line-height: 48px;
  font-size: 18px;
}
.el-select-dropdown__list > .newAddress {
  text-align: center;
}
.el-col-12 {
  min-width: 250px;
}
.addressLoading {
  text-align: center;
}
.newAddress {
  font-size: 12px;
  // margin-top: 10px;
  height: 30px;
  line-height: 30px;
  border-top: 1px solid rgb(242, 242, 242);
  cursor: pointer;
}
.workOption {
  .optionRight {
    float: right;
    padding: 0 10px 0 0 !important;
    // display: none;
  }
  &:hover {
    .optionRight {
      display: inline-block;
    }
  }
}
.addSubOrg {
  font-size: 14px;
  cursor: pointer;
}
/deep/ .el-col {
  .el-form-item {
    .el-form-item__content {
      width: 250px;
      .el-select {
        width: 250px;
      }
      .el-cascader {
        width: 250px;
      }
      .el-input-group--append {
        .el-input__inner {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
        .el-input-group__append {
          background-color: #fff;
          border: 0;
          padding: 0 10px;
          color: cornflowerblue;
          cursor: pointer;
        }
      }
    }
  }
}
.dialogForm {
  .el-form-item {
    .el-form-item__content {
      .el-cascader {
        width: 100%;
      }
    }
  }
}
</style>
