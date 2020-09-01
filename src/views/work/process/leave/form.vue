<template>
  <basic-container>
    <avue-form
      v-model="form"
      :option="option"
      @submit="handleSubmit"
    />
  </basic-container>
</template>

<script>
import { leaveProcess } from '@/api/work/process'

export default {
  data() {
    return {
      form: {
        taskUser: '1258244944030916609'
      },
      option: {
        group: [
          {
            icon: 'el-icon-info',
            label: '请假基础信息',
            prop: 'group1',
            column: [
              {
                label: '审批人员',
                prop: 'taskUser',
                type: 'select',
                dicUrl: '/api/blade-user/user-list',
                props: {
                  label: 'account',
                  value: 'id'
                },
                span: 24,
                rules: [
                  {
                    required: true,
                    message: '请选择审批人员',
                    trigger: 'blur'
                  }
                ]
              },
              {
                label: '开始时间',
                prop: 'startTime',
                type: 'datetime',
                valueFormat: 'yyyy-MM-dd HH:mm:ss',
                rules: [
                  {
                    required: true,
                    message: '请选择开始时间',
                    trigger: 'blur'
                  }
                ]
              },
              {
                label: '结束时间',
                prop: 'endTime',
                type: 'datetime',
                valueFormat: 'yyyy-MM-dd HH:mm:ss',
                rules: [
                  {
                    required: true,
                    message: '请选择结束时间',
                    trigger: 'blur'
                  }
                ]
              },
              {
                label: '请假理由',
                prop: 'reason',
                type: 'textarea',
                span: 24,
                rules: [
                  {
                    required: true,
                    message: '请输入请假理由',
                    trigger: 'blur'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      // const params = {
      //   processDefinitionId: this.$route.params.processDefinitionId,
      //   ...this.form
      // }
      // let reason = this.form.reason.split(',')
      try {
        let s = JSON.parse(this.form.reason)
        let params = {
          processDefinitionId: this.$route.params.processDefinitionId,
          businessKey: '{key1}:{key2}',
          processMap: {
            ...s
          }
        }
        leaveProcess(params).then((resp) => {
          const data = resp
          if (data) {
            this.$message.success('提交成功')
            this.$router.$avueRouter.closeTag()
            this.$router.push({ path: '/work/start' })
          } else {
            this.$message.error(data.msg || '提交失败')
          }
        })
      } catch (err) {
        let params = {
          processDefinitionId: this.$route.params.processDefinitionId,
          businessKey: '{key1}:{key2}',
          processMap: {
            data: this.$route.params.processDefinitionId,
            name: 'fenda',
            phone: '15089906928',
            days: '3'
          }
        }
        leaveProcess(params).then((resp) => {
          const data = resp
          if (data) {
            this.$message.success('提交成功')
            this.$router.$avueRouter.closeTag()
            this.$router.push({ path: '/work/start' })
          } else {
            this.$message.error(data.msg || '提交失败')
          }
        })
      }
    }
  }
}
</script>
