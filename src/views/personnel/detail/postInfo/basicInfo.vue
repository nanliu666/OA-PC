<template>
  <div
    id="post-basic"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">基本信息</span>
      <span
        v-show="readonlyBasicInfo"
        class="edit-button"
        @click="editInfo"
      >
        <i
          class="el-icon-edit"
          style="font-size:18px;margin-right:5px"
        />
        <span>编辑</span>
      </span>
    </div>
    <div
      class="info-content"
      :class="{ 'back-style': !readonlyBasicInfo }"
    >
      <el-form
        :model="staffInfo"
        label-width="150px"
        class="info-form"
        size="small"
      >
        <el-row :justify="'center'">
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item label="工号:">
              <span class="info-item-value">{{ staffInfo.workNo }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item label="公司邮箱:">
              <span class="info-item-value">{{ staffInfo.email }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item label="入职公司:">
              <span class="info-item-value">{{ staffInfo.companyName }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="岗位:"
            >
              <span class="info-item-value">{{ getPosition }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="岗位:"
              prop="positionName"
            >
              <el-select
                v-model="staffInfo.positionId"
                placeholder="请选择"
              >
                <el-option
                  v-for="positionItem in positionOptions"
                  :key="positionItem.id"
                  :label="positionItem.name"
                  :value="positionItem.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item label="部门:">
              <span class="info-item-value">{{ staffInfo.orgName }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item label="职位:">
              <span class="info-item-value">{{ staffInfo.jobName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <template>
          <el-row
            v-for="(item, index) in staffInfo.subOrg"
            :key="index"
          >
            <el-col
              :span="10"
              :push="2"
            >
              <el-form-item
                v-show="readonlyBasicInfo"
                :label="`附属部门${index + 1}:`"
              >
                <span class="info-item-value">{{ item.subOrgName }}</span>
              </el-form-item>
              <el-form-item
                v-show="!readonlyBasicInfo"
                :label="`附属部门${index + 1}:`"
              >
                <el-tree-select
                  ref="orgTree"
                  v-model="staffInfo.subOrg[index].subOrgId"
                  :popover-class="subOrgOptions.config.fas"
                  :styles="subOrgOptions.styles"
                  :select-params="subOrgOptions.config.selectParams"
                  :tree-params="subOrgOptions.config.treeParams"
                />
              </el-form-item>
            </el-col>

            <el-col
              :span="10"
              :push="2"
            >
              <el-form-item
                v-show="readonlyBasicInfo"
                :label="`附属职位${index + 1}:`"
              >
                <span class="info-item-value">{{ staffInfo.subJob[index].subJobName }}</span>
              </el-form-item>
              <el-form-item
                v-show="!readonlyBasicInfo"
                :label="`附属职位${index + 1}:`"
                prop="subOrg"
              >
                <el-select
                  v-model="staffInfo.subJob[index].subJobName"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="subJobItem in subJobOptions"
                    :key="subJobItem.jobId"
                    :label="subJobItem.jobName"
                    :value="subJobItem.jobId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <div
          v-show="!readonlyBasicInfo"
          style="padding-left:150px;font-size:18px;"
        >
          <span
            style="padding: 5px; cursor: pointer;"
            @click="addJobOrg()"
          >
            <i class="el-icon-plus" />
          </span>
        </div>
        <el-row>
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="上级领导:"
            >
              <span class="info-item-value">{{ staffInfo.leaderName }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="上级领导:"
              prop="leaderName"
            >
              <el-select
                v-model="staffInfo.leaderName"
                placeholder="请选择"
                @change="leaderOptionChange"
              >
                <el-option
                  v-for="(leaderItem, index) in leaderOptions"
                  :key="index"
                  :label="leaderItem.name"
                  :value="leaderItem.orgId"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="工作地址:"
            >
              <span class="info-item-value">{{ getWorkAdress() }}</span>
            </el-form-item>

            <el-form-item
              v-show="!readonlyBasicInfo"
              label="工作地址:"
              prop="marriage"
            >
              <el-select
                ref="workAddressId"
                v-model="staffInfo.address"
                placeholder="请选择"
                @change="handleAddressClick"
              >
                <el-option
                  v-for="item in workAdressList"
                  :key="item.id"
                  :label="item.address"
                  :value="item.id"
                  class="workOption"
                >
                  <span style="float: left">{{ item.address }}</span>
                  <span
                    class="optionRight"
                    @click="deleteAddress(item)"
                  >
                    <i class="el-icon-error" />
                  </span>
                  <span
                    class="optionRight"
                    @click="editAddress(item)"
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
                  style="text-align:center"
                  value=" "
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
        </el-row>

        <el-row>
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="工作城市:"
            >
              <span class="info-item-value">{{ getCityDetail() }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="工作城市:"
              prop="health"
            >
              <el-cascader
                ref="regionCascader"
                v-model="workCity"
                :options="regionCascader.option"
                :separator="'/'"
                @change="regionChange"
              />
            </el-form-item>
          </el-col>

          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="招聘渠道:"
            >
              <span class="info-item-value">{{ getRecruitment }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="招聘渠道:"
              prop="recruitment"
            >
              <el-select
                v-model="staffInfo.recruitment"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in recruitOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="备注:"
            >
              <span class="info-item-value">{{ staffInfo.userRemark }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="备注:"
              prop="userRemark"
            >
              <el-input
                v-model="staffInfo.userRemark"
                type="text"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div
          v-show="!readonlyBasicInfo"
          class="info-button-group"
          :justify="'center'"
        >
          <el-button
            type="primary"
            @click="saveInfo"
          >
            保存
          </el-button>
          <el-button @click="cancelEdit">
            取消
          </el-button>
        </div>
      </el-form>
      <el-dialog
        title="新建工作地址"
        :visible.sync="dialogTableVisible"
        :modal-append-to-body="false"
        custom-class="dialogClass"
      >
        <el-form
          ref="addAdressForm"
          :model="addAdressForm"
          label-width="80px"
          label-position="top"
          class="dialogForm"
          :rules="workAddressRules"
        >
          <!-- -->
          <el-form-item
            label="工作地址"
            prop="addressArr"
          >
            <el-cascader
              ref="newWorkAddress"
              v-model="addAdressForm.addressArr"
              :options="regionData.option"
            />
          </el-form-item>
          <el-form-item
            label="工作地址"
            prop="address"
          >
            <el-input
              v-model="addAdressForm.address"
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
    </div>
  </div>
</template>

<script>
// import TreeSelect from '@/components/treeSelect/treeSelect'
import ElTreeSelect from '@/components/elTreeSelect/elTreeSelect'
import { getStaffBasicInfo, editStaffBasicInfo } from '../../../../api/personalInfo.js'
import { deepClone } from '@/util/util'
import { getOrgTreeSimple } from '@/api/org/org'
import func from '@/util/func'
import { provinceAndCityData, regionData } from 'element-china-area-data'
import {
  getWorkAddressList,
  deleteWorkAddress,
  editWorkAddress,
  createWorkAddress,
  getOrgPosition,
  getOrgJob
} from '@/api/personnel/roster'
import { getUserWorkList } from '@/api/org/org'
let staffInfo = {}
export default {
  components: {
    ElTreeSelect
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      workCity: [],
      formatSubJob: [],
      staffInfo: {},
      pageNo: 1,
      readonlyBasicInfo: true,
      recruitOptions: [],
      positionOptions: [],
      subJobOptions: [],
      subOrgOptions: {
        props: {
          label: 'orgName',
          value: 'orgId'
        },
        placeholder: '请选择部门',
        dicData: [],
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
      leaderOptions: [],
      regionData: {
        //带区/县的数据
        option: regionData,
        props: {
          value: 'value',
          label: 'label'
        }
      },
      regionCascader: {
        //不带区域的数据
        option: provinceAndCityData,
        props: {
          value: 'value',
          label: 'label'
        }
      },
      loadAddress: false,
      addressPageNo: 1,
      workAdressList: [],
      addAdressForm: {
        addressArr: [],
        address: ''
      },
      dialogTableVisible: false,
      workAddressRules: {
        addressArr: [{ required: true, message: '请选择地址', trigger: 'change' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
      }
    }
  },
  computed: {
    getRecruitment() {
      let dictValue = ''
      for (let i = 0; i < this.recruitOptions.length; i++) {
        let item = this.recruitOptions[i]
        if (this.staffInfo.recruitment == item.dictKey) {
          dictValue = item.dictValue
          return
        }
      }
      return dictValue
    },
    getPosition() {
      let dictValue = ''
      for (let i = 0; i < this.positionOptions.length; i++) {
        let item = this.positionOptions[i]
        if (this.staffInfo.positionId == item.id) {
          dictValue = item.name
          return
        }
      }
      return dictValue
    }
  },
  watch: {
    info: {
      handler(val) {
        this.staffInfo = val
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.initRegion()
    this.loadSelectData()
    this.getWorkAdressList()
  },
  methods: {
    getCityDetail() {
      if (this.staffInfo.workProvinceName) {
        return this.staffInfo.workProvinceName + this.staffInfo.workCityName
      }
    },
    getWorkAdress() {
      if (this.staffInfo.address) {
        return (
          this.staffInfo.provinceName +
          this.staffInfo.cityName +
          this.staffInfo.countyName +
          this.staffInfo.address
        )
      } else {
        return ''
      }
    },
    changeSubOrg() {
      if (func.notEmpty(this.staffInfo.subOrg)) {
        this.staffInfo.subOrg.forEach((item, index) => {
          item.operatorType = 'Add'
          delete item.subOrgName

          this.staffInfo.subJob[index].operatorType = 'Add'
          delete this.staffInfo.subJob[index].subJobName
        })
      }
    },
    getWorkAdressList() {
      if (this.loadAddress) return
      this.loadAddress = true
      this.workAdressList = []
      getWorkAddressList({ pageNo: this.addressPageNo, pageSize: 50 }).then((res) => {
        this.workAdressList.push(...res.data)
        this.addressPageNo += 1
        this.loadAddress = false
      })
    },
    deleteAddress(item) {
      deleteWorkAddress({ ids: item.id }).then(() => {
        this.$message.success('删除成功')
        this.staffInfo.address = ''
        this.workCity = []
        this.addressPageNo = 1
        this.getWorkAdressList()
      })
    },
    editAddress(item) {
      this.addAdressForm.id = item.id
      this.$set(this.addAdressForm, 'addressArr', [
        item.provinceCode,
        item.cityCode,
        item.countyCode
      ])
      this.$set(this.addAdressForm, 'address', item.address)
      this.dialogTableVisible = true
    },
    handleAddressClick(value) {
      this.workAdressList.forEach((item) => {
        if (item.id === value) {
          this.staffInfo.address = item.address
          this.workCity = [item.provinceCode, item.cityCode]

          this.staffInfo.workProvinceName = item.provinceName
          this.staffInfo.workCityName = item.cityName
        }
      })
    },
    createAddress() {
      this.dialogTableVisible = true
      this.addAdressForm = {
        addressArr: [],
        address: '',
        id: ''
      }
    },
    handleCreateAddress() {
      this.$refs.addAdressForm.validate((valid) => {
        if (valid) {
          let inputValue = this.$refs.newWorkAddress.inputValue.split('/ ')
          const params = {
            provinceCode: this.addAdressForm.addressArr[0],
            provinceName: inputValue[0],
            cityCode: this.addAdressForm.addressArr[1],
            cityName: inputValue[1],
            countyCode: this.addAdressForm.addressArr[2],
            countyName: inputValue[2],
            address: this.addAdressForm.address
          }

          if (this.addAdressForm.id) {
            params.id = this.addAdressForm.id
            editWorkAddress(params).then(() => {
              this.$message.success('修改成功')
              this.dialogTableVisible = false
              this.addressPageNo = 1
              this.getWorkAdressList()
            })
          } else {
            createWorkAddress(params).then(() => {
              this.$message.success('新建成功')
              this.dialogTableVisible = false
              this.addressPageNo = 1
              this.getWorkAdressList()
            })
          }
        } else {
          return false
        }
      })
    },
    leaderOptionChange(value) {
      this.leaderOptions.forEach((item) => {
        if (item.orgId === value) {
          this.staffInfo.leaderName = item.name
        }
      })
    },
    addJobOrg() {
      this.staffInfo.subOrg.push({
        subOrgId: '',
        operatorType: 'Add'
      })
      this.staffInfo.subJob.push({
        subJobId: '',
        operatorType: 'Add'
      })
    },
    dispatchSelect() {
      this.$store.dispatch('CommonDict', 'RecruitmentChannel').then((res) => {
        this.recruitOptions = res
      })
    },
    loadSelectData() {
      getOrgTreeSimple({ parentOrgId: '0' }).then((res) => {
        this.subOrgOptions.config.treeParams.data = res
        this.$refs['orgTree'].treeDataUpdateFun(res)
      })
      getOrgJob().then((res) => {
        this.subJobOptions = res
      })
      getOrgPosition().then((res) => {
        this.positionOptions = res
      })
      getUserWorkList({ pageNo: this.pageNo, pageSize: 100 }).then((res) => {
        if (res.data.length > 0) {
          this.leaderOptions.push(...res.data)
          this.pageNo += 1
        }
      })
    },
    initRegion() {
      this.workCity = [this.staffInfo.workProvinceCode, this.staffInfo.workCityCode]
    },
    getFormatSubJob() {
      this.formatSubJob = []
      this.staffInfo.subOrg &&
        this.staffInfo.subOrg.forEach((item, index) => {
          this.$set(item, 'data', [])
          let obj = {
            orjItem: item,
            jobItem: this.staffInfo.subJob[index]
          }
          this.formatSubJob.push(obj)
        })
    },
    notEmpty(item) {
      return func.notEmpty(item)
    },
    birthDateChange(value) {
      let fomatValue = new Date(value)
      let month = fomatValue.getMonth() + 1
      this.staffInfo.birthDate = fomatValue.getFullYear() + '-' + month
    },
    regionChange(value) {
      let thsAreaCode = this.$refs['regionCascader'].getCheckedNodes()[0].pathLabels
      this.staffInfo.workProvinceName = thsAreaCode[0]
      this.staffInfo.workCityName = thsAreaCode[1]
      this.staffInfo.workProvinceCode = value[0]
      this.staffInfo.workCityCode = value[1]
    },
    editInfo() {
      getOrgTreeSimple({ parentOrgId: '0' }).then((res) => {
        this.subOrgOptions.config.treeParams.data = res
        this.$refs['orgTree'].treeDataUpdateFun(res)
      })
      staffInfo = deepClone(this.staffInfo)
      this.readonlyBasicInfo = false
    },
    saveInfo() {
      this.changeSubOrg()
      editStaffBasicInfo(this.staffInfo).then(() => {
        this.readonlyBasicInfo = true
        staffInfo = deepClone(this.staffInfo)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.getStaffinfo()
      })
    },
    getStaffinfo() {
      let params = {
        userId: this.$route.params.userId
      }
      getStaffBasicInfo(params).then((res) => {
        this.staffInfo = res
      })
    },
    cancelEdit() {
      this.readonlyBasicInfo = true
      this.staffInfo = deepClone(staffInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.selectOption.no-border-style {
  /deep/.el-input__inner {
    border: none !important;
  }
  /deep/.el-input__suffix {
    display: none;
  }
}
.el-cascader {
  width: 100% !important;
}
.detail-info-region {
  margin-top: 5px;
  /deep/ .el-input__inner {
    height: 46px !important;
  }
}
span.optionRight {
  float: right;
}
</style>
