<template>
  <basic-container>
    <avue-form :option="option" v-model="form" :upload-before="uploadBefore" :upload-after="uploadAfter"></avue-form>
  </basic-container>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          imgUrl: [],
        },
        option: {
          labelWidth: 120,
          column: [
            {
              label: '流程类型',
              prop: 'flowCategory',
              type: 'select',
              dicUrl: `/api/blade-system/dict/dictionary?code=flow`,
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [
                {
                  required: true,
                  message: '请选择流程类型',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '附件上传',
              prop: 'imgUrl',
              type: 'upload',
              loadText: '附件上传中，请稍等',
              span: 24,
              propsHttp: {
                res: 'data.0'
              },
              tip: '请上传 bpmn20.xml 标准格式文件',
            },
          ]
        }
      }
    },
    methods: {
      uploadBefore(file, done, loading) {
        console.log(file)
        done()
        this.$message.success('上传前的方法')
      },
      uploadAfter(res, done, loading) {
        console.log(res)
        done()
        this.$message.success('上传后的方法')
      },
      submit() {
        this.$message.success('当前数据' + JSON.stringify(this.form))
      }
    }
  }
</script>
