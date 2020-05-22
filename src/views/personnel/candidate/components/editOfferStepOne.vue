<template>
  <el-row
    type="flex"
    justify="center"
  >
    <el-col
      :xl="8"
      :lg="10"
      :md="12"
      :sm="14"
      :xs="18"
    >
      <div class="user-info">
        <span class="name">{{ personInfo.name }}</span>
        <div class="divider" />
        <span class="info-wr">
          <div>电话：{{ personInfo.phonenum }}</div>
          <div>应聘职位：{{ personInfo.jobName }}</div>
        </span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="top"
        style="margin-top:24px;"
        size="medium"
      >
        <el-form-item
          label="入职日期"
          prop="entryDate"
        >
          <el-date-picker
            v-model="form.entryDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择入职日期"
          />
        </el-form-item>
        <el-form-item
          label="入职联系人"
          prop="userId"
        >
          <lazy-select
            v-model="form.userId"
            :load="loadUser"
            placeholder="请选择入职联系人"
            :option-props="{
              label: 'name',
              value: 'userId',
              key: 'userId'
            }"
          />
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="phonenum"
        >
          <el-input
            v-model="form.phonenum"
            maxlength="11"
            @input="(v) => inputNumber(v, 'phonenum')"
          />
        </el-form-item>
        <el-form-item
          label="报道地址"
          prop="workAddressId"
        >
          <lazy-select
            v-model="form.workAddressId"
            :load="loadWorkAddress"
            placeholder="请选择报道地址"
            :option-props="{
              label: 'address',
              value: 'id',
              key: 'id'
            }"
          />
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import { getUserWorkList } from '@/api/org/org'
import { getWorkAddressList } from '@/api/personnel/roster'

export default {
  name: 'EditOfferStepOne',
  components: {
    lazySelect: () => import('@/components/lazy-select/lazySelect')
  },
  props: {
    personInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        userId: null,
        entryDate: null,
        phonenum: null,
        workAddressId: null
      },
      rules: {
        phonenum: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^[0-9]{11}$/, message: '长度必须为11位', trigger: 'blur' }
        ],
        workAddressId: [{ required: true, message: '请输入工作地址', trigger: 'change' }],
        userId: [{ required: true, message: '请输入入职联系人', trigger: 'change' }],
        entryDate: [{ required: true, message: '请输入入职日期', trigger: 'blur' }]
      }
    }
  },
  methods: {
    init(data) {
      this.form = { ...data }
    },
    inputNumber(value, key) {
      value = value.replace(/[^\d]/g, '')
      this.form[key] = value
    },
    loadUser(params) {
      return getUserWorkList(params)
    },
    loadWorkAddress(params) {
      return getWorkAddressList(params)
    },
    clear() {
      this.$refs.form.clearValidate()
      this.form = this.$options.data().form
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            reject()
            return
          }
          resolve(this.form)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  height: 77px;
  background: #f7f8fa;
  border-radius: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-top: 24px;
  .name {
    font-size: 18px;
    color: #333333;
    line-height: 28px;
    flex-grow: 1;
    text-align: right;
    flex-grow: 1;
    font-weight: bold;
  }
  .divider {
    display: inline-block;
    height: 45px;
    margin: 0px 24px;
    width: 1px;
    background: #e3e7e9;
  }
  .info-wr {
    display: inline-block;
    flex-grow: 3;
  }
}
</style>
