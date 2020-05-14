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
            :span="8"
            :push="2"
          >
            <el-form-item label="工号">
              <span class="info-item-value">{{ staffInfo.workNo }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="公司邮箱:">
              <span class="info-item-value">{{ staffInfo.email }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="入职公司:">
              <span class="info-item-value">{{ staffInfo.companyName }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="岗位:"
            >
              <span class="info-item-value">{{ staffInfo.positionName }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="岗位:"
              prop="positionName"
            >
              <el-select
                v-model="staffInfo.positionName"
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
            :span="8"
            :push="2"
          >
            <el-form-item label="部门:">
              <span class="info-item-value">{{ staffInfo.orgName }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="职位:">
              <span class="info-item-value">{{ staffInfo.jobName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <template v-if="staffInfo.subOrg.length > 0 || staffInfo.subJob.length > 0">
          <el-row
            v-for="(item, index) in staffInfo.subOrg"
            :key="index"
          >
            <el-col
              :span="8"
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
                <tree-select
                  v-model="staffInfo.subOrg[index].subJobId"
                  :option="subOrgOptions"
                  :is-search="false"
                  :is-single="true"
                />
              </el-form-item>
            </el-col>

            <el-col
              :span="8"
              :push="4"
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
        <el-row>
          <el-col
            :span="8"
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
              >
                <el-option
                  v-for="leaderItem in leaderOptions"
                  :key="leaderItem.value"
                  :label="leaderItem.label"
                  :value="leaderItem.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col
            :span="8"
            :push="4"
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
              <el-cascader
                ref="regionData"
                v-model="workDetailCity"
                :options="regionData.option"
                :separator="'/'"
                @change="regionDataChange"
              />
              <el-input
                v-model="staffInfo.address"
                type="text"
                class="detail-info-region"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col
            :span="8"
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
            :span="8"
            :push="4"
          >
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="招聘渠道:"
              prop="recruitment"
            >
              <el-select
                v-model="staffInfo.recruitment"
                :class="{ 'selectOption no-border-style': readonlyBasicInfo }"
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
            :span="8"
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
    </div>
  </div>
</template>

<script>
import TreeSelect from '@/components/treeSelect/treeSelect'
import { editStaffBasicInfo } from '../../../../api/personalInfo.js'
import { deepClone } from '@/util/util'
import { getOrgTreeSimple } from '@/api/org/org'
import func from '@/util/func'
import { provinceAndCityData, regionData } from 'element-china-area-data'
import { getOrgPosition, getOrgJob } from '@/api/personnel/roster'
let staffInfo = {}
export default {
  components: {
    TreeSelect
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
      workDetailCity: [],
      formatSubJob: [],
      staffInfo: {},
      region: [],
      readonlyBasicInfo: true,
      recruitOptions: [],
      positionOptions: [],
      subJobOptions: [],
      subOrgOptions: {
        //部门
        props: {
          label: 'orgName',
          value: 'orgId'
        },
        placeholder: '请选择部门',
        dicData: []
      },
      leaderOptions: [
        {
          value: 'A',
          label: 'a'
        }
      ],
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
      }
    }
  },
  computed: {
    getAge() {
      let curYear = new Date().getFullYear()
      let birthYear = new Date(this.staffInfo.birthDate).getFullYear()
      return curYear - birthYear
    },
    formatNativePlace() {
      return this.staffInfo.nativeProvinceName + this.staffInfo.nativeCityName
    },
    calcWorkAge() {
      let fomatToMS = new Date().getTime() - new Date(this.staffInfo.firstWorkDate).getTime()
      let dayToMS = 1000 * 60 * 60 * 24
      let totalDay = fomatToMS / dayToMS
      let year = Math.floor(totalDay / 365)
      let month = Math.floor((totalDay % 365) / 30)
      // let day = Math.floor(totalDay % 365 % 30)
      let workAge = '' + year + '年' + month + '月'
      workAge = workAge.replace(/-/g, '')
      return workAge
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
  },
  methods: {
    addJobOrg() {
      this.staffInfo.subOrg.push({
        subOrgId: '',
        subOrgName: ''
      })
      this.staffInfo.subJob.push({
        subJobId: '',
        subJobName: ''
      })
    },
    dispatchSelect() {
      this.$store.dispatch('CommonDict', 'RecruitmentChannel').then((res) => {
        this.recruitOptions = res
      })
    },
    loadSelectData() {
      getOrgTreeSimple({ parentOrgId: '0' }).then((res) => {
        this.subOrgOptions.dicData = res
      })
      getOrgJob().then((res) => {
        this.subJobOptions = res
      })
      getOrgPosition().then((res) => {
        this.positionOptions = res
      })
    },
    initRegion() {
      this.workCity = [this.staffInfo.workProvinceCode, this.staffInfo.workCityCode]
      this.workDetailCity = [
        this.staffInfo.provinceCode,
        this.staffInfo.cityCode,
        this.staffInfo.countyCode
      ]
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
    regionDataChange(value) {
      let thsAreaCode = this.$refs['regionData'].getCheckedNodes()[0].pathLabels
      this.staffInfo.provinceName = thsAreaCode[0]
      this.staffInfo.cityName = thsAreaCode[1]
      this.staffInfo.countyName = thsAreaCode[2]
      this.staffInfo.provinceCode = value[0]
      this.staffInfo.cityCode = value[1]
      this.staffInfo.countyCode = value[2]

      this.staffInfo.workProvinceName = this.staffInfo.provinceName
      this.staffInfo.workCityName = this.staffInfo.cityName
      this.staffInfo.workProvinceCode = this.staffInfo.provinceCode
      this.staffInfo.workCityCode = this.staffInfo.cityCode
      this.workCity[0] = this.staffInfo.workProvinceCode
      this.workCity[1] = this.staffInfo.workCityCode
    },
    editInfo() {
      staffInfo = deepClone(this.staffInfo)
      this.readonlyBasicInfo = false
    },
    saveInfo() {
      editStaffBasicInfo(this.staffInfo).then(() => {
        this.readonlyBasicInfo = true
        staffInfo = deepClone(this.staffInfo)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      })
    },
    cancelEdit() {
      this.readonlyBasicInfo = true
      this.staffInfo = deepClone(staffInfo)
    },
    getCityDetail() {
      if (this.staffInfo.workProvinceName) {
        return this.staffInfo.workProvinceName + this.staffInfo.workCityName
      } else {
        return ''
      }
    },
    getWorkAdress() {
      if (this.staffInfo.provinceName) {
        return (
          this.staffInfo.provinceName +
          this.staffInfo.cityName +
          this.staffInfo.countyName +
          this.staffInfo.address
        )
      } else {
        return ''
      }
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
</style>
