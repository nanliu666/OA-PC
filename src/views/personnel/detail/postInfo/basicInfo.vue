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
        v-show="readonlyBasicInfo"
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
            :span="9"
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
            :span="9"
            :push="2"
          >
            <el-form-item label="岗位:">
              <span class="info-item-value">{{ getPosition }}</span>
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
              <el-form-item :label="`附属部门${index + 1}:`">
                <span class="info-item-value">{{ item.subOrgName }}</span>
              </el-form-item>
            </el-col>

            <el-col
              :span="10"
              :push="2"
            >
              <el-form-item :label="`附属职位${index + 1}:`">
                <span class="info-item-value">{{ item.subJobName }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <el-row>
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item label="上级领导:">
              <span class="info-item-value">{{ staffInfo.leaderName }}</span>
            </el-form-item>
          </el-col>

          <el-col
            :span="9"
            :push="2"
          >
            <el-form-item label="工作地址:">
              <span class="info-item-value">{{ getWorkAdress() }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item label="工作城市:">
              <span class="info-item-value">{{ getCityDetail() }}</span>
            </el-form-item>
          </el-col>

          <el-col
            :span="9"
            :push="2"
          >
            <el-form-item label="招聘渠道:">
              <span class="info-item-value">{{ getRecruitment }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item label="备注:">
              <span class="info-item-value">{{ staffInfo.userRemark }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        v-show="!readonlyBasicInfo"
        ref="jobBasicInfo"
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
            :span="9"
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
              <el-form-item :label="`附属部门${index + 1}:`">
                <div />
                <el-tree-select
                  ref="orgTree"
                  v-model="item.subOrgId"
                  :popover-class="subOrgOptions.config.fas"
                  :styles="subOrgOptions.styles"
                  :select-params="subOrgOptions.config.selectParams"
                  :tree-params="subOrgOptions.config.treeParams"
                  @change="subOrgNodeChange(item, index)"
                />
              </el-form-item>
            </el-col>

            <el-col
              :span="10"
              :push="2"
            >
              <el-form-item :label="`附属职位${index + 1}:`">
                <el-select
                  v-model="item.subJobId"
                  placeholder="请选择"
                  @change="subJobItemChange(item, index)"
                >
                  <el-option
                    v-for="subJobItem in subJobOptions[index]"
                    :key="subJobItem.jobId"
                    :label="subJobItem.jobName"
                    :value="subJobItem.jobId"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col
              v-show="!readonlyBasicInfo && index > -1"
              class="delete-org-job"
              :span="1"
            >
              <div @click="deleteOrgjob(item, index)">
                <span>
                  <i class="el-icon-delete" />
                </span>
              </div>
            </el-col>
          </el-row>
        </template>
        <div
          v-show="!readonlyBasicInfo"
          class="add-job-org"
        >
          <span @click="addJobOrg()"> <i class="el-icon-plus" /> 添加附属部门及职位 </span>
        </div>
        <el-row>
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item
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
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item
              label="上级领导:"
              prop="leaderName"
            >
              <el-select
                v-model="staffInfo.leaderId"
                placeholder="请选择"
                @change="leaderOptionChange"
              >
                <el-option
                  v-for="leaderItem in leaderOptions"
                  :key="leaderItem.userId"
                  :label="leaderItem.name"
                  :value="leaderItem.userId"
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
          <el-col
            :span="10"
            :push="2"
          >
            <el-form-item
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
          <el-col
            :span="10"
            :push="2"
          >
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
      delSubOrgJob: {
        subOrg: [],
        subJob: []
      },
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
      this.recruitOptions.forEach((item) => {
        if (item.dictKey === this.staffInfo.recruitment) {
          dictValue = item.dictValue
        }
      })
      return dictValue
    },
    getPosition() {
      let dictValue = ''
      for (let i = 0; i < this.positionOptions.length; i++) {
        let item = this.positionOptions[i]
        if (this.staffInfo.positionId == item.id) {
          dictValue = item.name
          return dictValue
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
    this.getStaffinfo()
    this.loadSelectData()
    this.getWorkAdressList()
    this.dispatchSelect()
  },
  methods: {
    initSubJobOptions() {
      if (func.notEmpty(this.staffInfo) && this.staffInfo.subOrg.length > 0) {
        this.staffInfo.subOrg.forEach((item, index) => {
          this.getJob(item, index)
        })
      }
    },
    getCityDetail() {
      return this.staffInfo.workProvinceName + this.staffInfo.workCityName
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
          this.staffInfo.addresssId = item.id
          this.staffInfo.address = item.address
          this.workCity = [item.provinceCode, item.cityCode]

          this.staffInfo.workProvinceName = item.provinceName
          this.staffInfo.workCityName = item.cityName
          this.staffInfo.workProvinceCode = item.provinceCode
          this.staffInfo.workCityCode = item.cityCode
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
        if (item.workNo === value) {
          this.staffInfo.leaderName = item.name
        }
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
        this.$refs['orgTree'].forEach((item) => {
          item.treeDataUpdateFun(res)
        })
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
      this.staffInfo.address = ''
    },
    editInfo() {
      this.$set(this.delSubOrgJob, 'subOrg', [])
      this.$set(this.delSubOrgJob, 'subJob', [])

      staffInfo = deepClone(this.staffInfo)
      this.readonlyBasicInfo = false
    },
    saveInfo() {
      let jobOrg = this.changeSubOrg()
      if (jobOrg.emptyJob) {
        this.$message({
          type: 'warn',
          message: '附属职位不能为空'
        })
        return
      }
      if (jobOrg.repeatJobFlag) {
        this.$message({
          type: 'warn',
          message: '附属职位不能重复'
        })
        return
      }
      let params = {
        subOrg: jobOrg.subOrg,
        subJob: jobOrg.subJob,
        userId: this.$route.params.userId,
        workNo: this.staffInfo.workNo,
        email: this.staffInfo.email,
        companyName: this.staffInfo.companyName,
        companyId: this.staffInfo.companyId,
        positionId: this.staffInfo.positionId,
        orgId: this.staffInfo.orgId,
        orgName: this.staffInfo.orgName,
        leaderName: this.staffInfo.leaderName,
        userRemark: this.staffInfo.userRemark,
        recruitment: this.staffInfo.recruitment,
        provinceCode: this.staffInfo.provinceCode,
        provinceName: this.staffInfo.provinceName,
        cityCode: this.staffInfo.cityCode,
        cityName: this.staffInfo.cityName,
        countyCode: this.staffInfo.countyCode,
        countyName: this.staffInfo.countyName,
        address: this.staffInfo.address,
        addresssId: this.staffInfo.addresssId,
        workProvinceCode: this.staffInfo.workProvinceCode,
        workProvinceName: this.staffInfo.workProvinceName,
        workCityCode: this.staffInfo.workCityCode,
        workCityName: this.staffInfo.workCityName,
        leaderId: this.staffInfo.leaderId
      }
      editStaffBasicInfo(params).then(() => {
        this.readonlyBasicInfo = true
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
        staffInfo = deepClone(this.staffInfo)
        this.initSubJobOptions()
        this.initRegion()
      })
    },
    cancelEdit() {
      this.readonlyBasicInfo = true
      this.staffInfo = deepClone(staffInfo)
      this.initSubJobOptions()
      this.initRegion()
    },
    getJob(item, index) {
      if (item.subOrgId) {
        let params = {
          orgId: item.subOrgId
        }
        getOrgJob(params).then((res) => {
          this.$set(this.subJobOptions, index, res)
        })
      } else {
        this.$set(this.subJobOptions, index, [])
      }
    },
    addJobOrg() {
      this.staffInfo.subOrg.push({
        subOrgId: '',
        subJobId: '',
        subOrgName: '',
        subJobName: '',
        operatorType: 'Add'
      })
    },
    deleteOrgjob(item, index) {
      if (item.operatorType == 'Add') {
        this.staffInfo.subOrg.splice(index, 1)
      } else {
        /* let params = {
          userId: this.$route.params.userId,
          subOrg: [
            {
              subOrgId: item.subOrgId,
              operatorType: 'Del'
            }
          ],
          subJob: [
            {
              subJobId: item.subJobId,
              operatorType: 'Del'
            }
          ]
        }
        editStaffBasicInfo(params).then(() => {
          staffInfo = deepClone(this.staffInfo)
          this.getStaffinfo()
        }) */
        this.staffInfo.subOrg.splice(index, 1)
        this.delSubOrgJob.subOrg.push({
          subOrgId: item.subOrgId,
          operatorType: 'Del'
        })
        this.delSubOrgJob.subJob.push({
          subJobId: item.subJobId,
          operatorType: 'Del'
        })
      }
    },
    subJobItemChange(item, index) {
      if (staffInfo.subOrg.length > 0 && index < staffInfo.subOrg.length) {
        let jobObj = {
          subJobId: staffInfo.subOrg[index].subJobId,
          operatorType: 'Del'
        }
        if (item.subJobId != staffInfo.subOrg[index].subJobId) {
          if (JSON.stringify(this.delSubOrgJob.subJob).indexOf(JSON.stringify(jobObj)) == -1) {
            item.operatorType = 'Add'
            this.delSubOrgJob.subJob.push(jobObj)
          }
        } else {
          if (JSON.stringify(this.delSubOrgJob.subJob).indexOf(JSON.stringify(jobObj)) != -1) {
            item.operatorType = ''
            this.delSubOrgJob.subJob.pop(jobObj)
          }
        }
      }
    },
    subOrgNodeChange(item, index) {
      if (!this.readonlyBasicInfo) {
        this.getJob(item, index)
        this.$set(item, 'subJobId', '')
        this.$set(item, 'subJobName', '')
        if (staffInfo.subOrg.length > 0 && index < staffInfo.subOrg.length) {
          let orgObj = {
            subJobId: staffInfo.subOrg[index].subOrgId,
            operatorType: 'Del'
          }

          if (item.subOrgId != staffInfo.subOrg[index].subOrgId) {
            item.operatorType = 'Add'
            if (JSON.stringify(this.delSubOrgJob.subOrg).indexOf(JSON.stringify(orgObj)) == -1) {
              this.delSubOrgJob.subOrg.push(orgObj)
            }
          } else {
            if (JSON.stringify(this.delSubOrgJob.subOrg).indexOf(JSON.stringify(orgObj)) != -1) {
              this.delSubOrgJob.subOrg.pop(orgObj)
            }
          }
        }
      }
    },
    changeSubOrg() {
      let subOrg = []
      let subJob = []
      let repeatJobFlag = false
      let emptyJob = false
      if (func.notEmpty(this.staffInfo.subOrg)) {
        this.staffInfo.subOrg.forEach((item, index) => {
          //重构数据结构
          if (item.subOrgId) {
            let orgObj = {
              subOrgId: item.subOrgId,
              operatorType: item.operatorType ? item.operatorType : ''
            }
            let jobObj = {
              subJobId: item.subJobId,
              operatorType: item.operatorType ? item.operatorType : ''
            }
            subOrg.push(orgObj)
            subJob.push(jobObj)
          }
          //删除已有且未编辑的数据
          if (index < staffInfo.subOrg.length) {
            let itemOrg = staffInfo.subOrg[index]
            if (itemOrg.subOrgId == item.subOrgId && itemOrg.subJobId == item.subJobId) {
              subOrg.pop()
              subJob.pop()
            } else if (itemOrg.subOrgId == item.subOrgId) {
              subOrg.pop()
            } else {
              if (itemOrg.subJobId == item.subJobId) {
                subJob.pop()
              }
            }
          }
          //去掉重复的subOrgId项
          let obj = {}
          subOrg = subOrg.reduce(function(item, next) {
            obj[next.subOrgId] ? '' : (obj[next.subOrgId] = true && item.push(next))
            return item
          }, [])
          //判断subJob是否有重复的subJobId
          let preItemId = ''
          for (let i = 0; i < subJob.length; i++) {
            if (!subJob[i].subJobId) {
              emptyJob = true
              break
            }
            if (subJob[i].subJobId && preItemId == subJob[i].subJobId) {
              repeatJobFlag = true
              break
            }
            preItemId = subJob[i].subJobId
          }
        })
      }
      subOrg.push(...this.delSubOrgJob.subOrg)
      subJob.push(...this.delSubOrgJob.subJob)

      return {
        subOrg: subOrg,
        subJob: subJob,
        repeatJobFlag: repeatJobFlag,
        emptyJob: emptyJob
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.optionRight {
  float: right;
  padding: 0 10px 0 0 !important;
  // display: none;
}
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
.add-job-org {
  padding-left: 150px;
  font-size: 14px;
  padding-bottom: 20px;
  span {
    padding: 5px;
    cursor: pointer;
    &:hover {
      color: #207efa;
    }
  }
}
.delete-org-job {
  float: right;
  margin-right: 2%;
  margin-top: 7px;
  cursor: pointer;
  &:hover {
    color: #207efa;
  }
}
</style>
