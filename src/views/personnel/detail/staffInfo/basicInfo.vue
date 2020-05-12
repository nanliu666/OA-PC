<template>
  <div
    id="basic"
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
        ref="basicInfo"
        :model="staffInfo"
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
              v-show="readonlyBasicInfo"
              label="姓名:"
            >
              <span class="info-item-value">{{ staffInfo.name }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="姓名:"
              prop="name"
            >
              <el-input
                v-model="staffInfo.name"
                placeholder="请输入2-10位汉字、英文、空格和点号"
              />
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item
              label="性别:"
              prop="sex"
            >
              <el-radio
                v-model="staffInfo.sex"
                :label="1"
              >
                男
              </el-radio>
              <el-radio
                v-model="staffInfo.sex"
                :label="2"
              >
                女
              </el-radio>
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
              label="手机号码:"
            >
              <span class="info-item-value">{{ staffInfo.phonenum }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="手机号码:"
              prop="phonenum"
            >
              <el-input v-model="staffInfo.phonenum" />
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="公司邮箱:"
            >
              <span class="info-item-value">{{ staffInfo.email }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="公司邮箱:"
              prop="email"
            >
              <el-input v-model="staffInfo.email" />
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
              label="证件类型:"
            >
              <span class="info-item-value">{{ staffInfo.idType }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="证件类型:"
              prop="idType"
            >
              <el-select
                v-model="staffInfo.idType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in credentOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
              label="证件号码:"
            >
              <span class="info-item-value">{{ staffInfo.idNo }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="证件号码:"
              prop="idNo"
            >
              <el-input v-model="staffInfo.idNo" />
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
              label="出生日期:"
            >
              <span class="info-item-value">{{ staffInfo.birthDate }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="出生日期:"
              prop="birthDate"
            >
              <el-date-picker
                v-model="staffInfo.birthDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>

          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="年龄:">
              <span class="info-item-value">
                {{ getAge }}
              </span>
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
              label="工龄:"
            >
              <span class="info-item-value">{{ calcWorkAge }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="首次参加工作的时间:"
              prop="firstWorkDate"
            >
              <el-date-picker
                v-model="staffInfo.firstWorkDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>

          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="婚姻状况:"
            >
              <span class="info-item-value">
                {{ staffInfo.marriage == '1' ? '已婚' : '未婚' }}
              </span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="婚姻状况:"
              prop="marriage"
            >
              <el-select v-model="staffInfo.marriage">
                <el-option
                  label="未婚"
                  :value="0"
                />
                <el-option
                  label="已婚"
                  :value="1"
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
              label="健康状况:"
            >
              <span class="info-item-value">{{ staffInfo.health }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="健康状况:"
              prop="health"
            >
              <el-input v-model="staffInfo.health" />
            </el-form-item>
          </el-col>

          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="民族:"
            >
              <span class="info-item-value">
                {{ staffInfo.nation }}
              </span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="民族:"
              prop="nation"
            >
              <el-input v-model="staffInfo.nation" />
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
              label="政治面貌:"
            >
              <span class="info-item-value">{{ staffInfo.politicalStatus }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="政治面貌:"
              prop="politicalStatus"
            >
              <el-select
                v-model="staffInfo.politicalStatus"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in politicalOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
              label="籍贯:"
            >
              <span class="info-item-value">
                {{ formatNativePlace }}
              </span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="籍贯:"
            >
              <el-cascader
                ref="cascaderAddr"
                :options="regionCascader.option"
                :separator="'/'"
                @change="regionChange"
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
              label="户籍类型:"
            >
              <span class="info-item-value">{{ staffInfo.householdType }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="户籍类型:"
              prop="householdType"
            >
              <el-select v-model="staffInfo.householdType">
                <el-option
                  v-for="item in householdOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
              label="身份证地址:"
            >
              <span class="info-item-value">
                {{ staffInfo.idAddress }}
              </span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="身份证地址:"
              prop="idAddress"
            >
              <el-input v-model="staffInfo.idAddress" />
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
              label="现住址:"
            >
              <span class="info-item-value">{{ staffInfo.userAddress }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="现住址:"
              prop="userAddress"
            >
              <el-input v-model="staffInfo.userAddress" />
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
import { isMobile, validateName, isEmail } from '@/util/validate'
import { editStaffBasicInfo } from '../../../../api/personalInfo.js'
import { deepClone } from '@/util/util'
import { provinceAndCityData } from 'element-china-area-data'

let staffInfo = {}
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      staffInfo: {},
      region: [],
      readonlyBasicInfo: true,
      householdOptions: [
        {
          value: '城镇户口',
          label: '城镇户口'
        },
        {
          value: '农村户口',
          label: '农村户口'
        },
        {
          value: '居民户口',
          label: '居民户口'
        }
      ],
      politicalOptions: [
        {
          value: '群众',
          label: '群众'
        },
        {
          value: '中共党员',
          label: '中共党员'
        },
        {
          value: '共青团员',
          label: '共青团员'
        },
        {
          value: '普通居民/群众',
          label: '普通居民/群众'
        },
        {
          value: '中共预备党员',
          label: '中共预备党员'
        },
        {
          value: '民革党员',
          label: '民革党员'
        },
        {
          value: '民盟盟员',
          label: '民盟盟员'
        },
        {
          value: '民建会员',
          label: '民建会员'
        },
        {
          value: '农工党党员',
          label: '农工党党员'
        },
        {
          value: '致公党党员',
          label: '致公党党员'
        },
        {
          value: '九三学社社员',
          label: '九三学社社员'
        },
        {
          value: '台盟盟员',
          label: '台盟盟员'
        },
        {
          value: '无党派民主人士',
          label: '无党派民主人士'
        }
      ],
      credentOptions: [
        {
          value: '身份证',
          label: '身份证'
        },
        {
          value: '港澳居民来往内地通行证',
          label: '港澳居民来往内地通行证'
        },
        {
          value: '台湾居民来往大陆通行证',
          label: '台湾居民来往大陆通行证'
        },
        {
          value: '外国护照',
          label: '外国护照'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      rules: {
        phonenum: [
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
              if (!value || (value && !validateName(value))) {
                callback(new Error('请输入2-10位汉字、英文、空格和点号'))
              } else {
                callback()
              }
            }
          }
        ],
        email: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入邮箱'))
              } else if (value && !isEmail(value)) {
                callback(new Error('邮箱格式有误'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      regionCascader: {
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
  methods: {
    regionChange(value) {
      let thsAreaCode = this.$refs['cascaderAddr'].getCheckedNodes()[0].pathLabels
      this.staffInfo.nativeProvinceName = thsAreaCode[0]
      this.staffInfo.nativeCityName = thsAreaCode[1]
      this.staffInfo.nativeProvinceCode = value[0]
      this.staffInfo.nativeCityCode = value[1]
    },
    editInfo() {
      staffInfo = deepClone(this.staffInfo)
      this.readonlyBasicInfo = false
    },
    saveInfo() {
      this.$refs['basicInfo'].validate((isPass) => {
        if (isPass) {
          let params = {
            userId: this.$route.params.userId,
            name: this.staffInfo.name,
            sex: this.staffInfo.sex,
            nativeCityCode: this.staffInfo.nativeCityCode,
            nativeCityName: this.staffInfo.nativeCityName,
            nativeProvinceCode: this.staffInfo.nativeProvinceCode,
            nativeProvinceName: this.staffInfo.nativeProvinceName,
            health: this.staffInfo.health,
            nation: this.staffInfo.nation,
            householdType: this.staffInfo.householdType,
            birthDate: this.staffInfo.birthDate,
            idNo: this.staffInfo.idNo,
            idType: this.staffInfo.idType,
            phonenum: this.staffInfo.phonenum,
            email: this.staffInfo.email,
            firstWorkDate: this.staffInfo.firstWorkDate,
            marriage: this.staffInfo.marriage,
            politicalStatus: this.staffInfo.politicalStatus,
            idAddress: this.staffInfo.idAddress,
            userAddress: this.staffInfo.userAddress
          }
          editStaffBasicInfo(params).then(() => {
            this.readonlyBasicInfo = true
            staffInfo = deepClone(this.staffInfo)
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          })
        }
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
@import url('../staffInfo.scss');
</style>
