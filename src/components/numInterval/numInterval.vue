<template>
  <div class="numInterval">
    <el-form
      ref="form"
      :model="value"
      :rules="rules"
      :inline="true"
      class="numInterval-form"
    >
      <el-form-item prop="min">
        <el-input
          v-model="value.min"
          @input="handleMinChange"
        />
      </el-form-item>
      <span>至</span>
      <el-form-item prop="max">
        <el-input
          v-model="value.max"
          @input="handleMaxChange"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// const MIN_NUMBER = 1
const MAX_NUMBER = 100000000

export default {
  name: 'NumInterval',
  props: {
    value: {
      type: Object,
      default: () => {
        return { min: '', max: '' }
      }
    }
  },
  data() {
    return {
      rules: {
        min: [
          // { required: true, message: '必填项，请填写', trigger: 'blur' },
          { validator: this.validateCom, trigger: 'blur' },
          { validator: this.validateMin, trigger: 'blur' }
        ],
        max: [
          // { required: true, message: '必填项，请填写', trigger: 'blur' },
          { validator: this.validateCom, trigger: 'blur' },
          { validator: this.validateMax, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getFormData() {
      const ret = {}
      this.$refs.form.validate((valid) => {
        ret.valid = valid
        ret.form = this.form
      })
      return ret
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    handleMinChange() {
      this.value.min = this.value.min.replace(/[^\d.]/g, '')
      this.value.min = this.value.min.replace('.', '')
      this.$refs.form.validateField('max')
      this.$emit('update:value', this.value)
    },
    handleMaxChange() {
      this.value.max = this.value.max.replace(/[^\d.]/g, '')
      this.value.max = this.value.max.replace('.', '')
      this.$refs.form.validateField('min')
      this.$emit('update:value', this.value)
    },
    validateCom(rule, value, callback) {
      const one = Number(value)
      if (Number.isInteger(one)) {
        // if (one < MIN_NUMBER) {
        //   return callback(new Error('必须大于0'))
        // } else
        if (one > MAX_NUMBER) {
          return callback(new Error('必须小于100000000'))
        }
        return callback()
      }
      return callback(new Error('必须为正整数'))
    },
    validateMin(rule, value, callback) {
      const one = Number(value)
      const max = Number(this.value.max)
      if (!max || one < max) {
        return callback()
      }
      return callback(new Error('不得大于最大值'))
    },
    validateMax(rule, value, callback) {
      const one = Number(value)
      const min = Number(this.value.min)
      if (!min || one > min) {
        return callback()
      }
      return callback(new Error('不得小于最小值'))
    }
  }
}
</script>

<style lang="scss" scoped>
.numInterval {
  // display: inline-block;
  width: 100%;
  .numInterval-form {
    width: 100%;
    > span {
      margin: 0 7px;
      text-align: center;
    }
    .el-form-item {
      margin-right: 0;
      margin-left: 0px;
      width: calc(50% - 14px);
      // padding-right: 0;
      .el-form-item__content {
        width: 100%;
      }
    }
  }
}
/deep/ .el-form-item__content {
  width: 100%;
}
</style>
