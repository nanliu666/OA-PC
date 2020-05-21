<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    />
  </div>
</template>

<script>
export default {
  name: 'AvueForm',
  props: {
    form: {
      type: Object,
      default: function() {
        return {}
      }
    },
    option: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      contactsForm: {}
      // contactsOption:{
      //   menuBtn: false,
      //   labelPosition: 'top',
      //   size: 'medium',
      //   column: [
      //     {
      //       label: '紧急联系人姓名',
      //       prop: 'name',
      //       type: 'input',
      //       row: false,
      //       span: 12,
      //       placeholder: '紧急联系人关系',
      //       rules: [
      //         {
      //           required: true,
      //           message: '紧急联系人电话',
      //           trigger: 'blur'
      //         }
      //       ]
      //     },
      //     {
      //       label: '紧急联系人关系',
      //       prop: 'relationship',
      //       type: 'input',
      //       row: false,
      //       span: 12,
      //       placeholder: '请输入职位类别名称',
      //       rules: [
      //         {
      //           required: true,
      //           message: '请输入职位类别名称',
      //           trigger: 'blur'
      //         }
      //       ]
      //     },
      //     {
      //       label: '紧急联系人电话',
      //       prop: 'telephone',
      //       type: 'input',
      //       row: true,
      //       span: 12,
      //       placeholder: '请输入职位类别名称',
      //       rules: [
      //         {
      //           required: true,
      //           message: '请输入职位类别名称',
      //           trigger: 'blur'
      //         }
      //       ]
      //     },
      //   ]
      // },
    }
  },
  methods: {
    submit(data, done) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        done()
      }, 500)
    },
    error() {
      // console.log(data)
    }
  }
}
</script>

<style scoped></style>
