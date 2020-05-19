<template>
  <el-dialog
    :title="type === 'change' ? '更改应聘职位' : '恢复为候选人'"
    :visible.sync="visible"
    width="30%"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <el-form
      ref="ruleForm"
      v-loading="loading"
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="top"
    >
      <el-form-item
        label="关联应聘职位"
        prop="recruitmentId"
      >
        <el-select
          v-model="form.recruitmentId"
          placeholder="请选择应聘职位（对应招聘需求）"
          @change="recruitmentChange"
        >
          <el-option
            v-for="item in recruitmentList"
            :key="item.id"
            :label="item.jobName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="用人部门">
        <el-select
          v-model="orgId"
          placeholder="请选择"
          disabled
        >
          <el-option
            v-for="item in orgList"
            :key="item.orgId"
            :label="item.orgName"
            :value="item.orgId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="handleClose"
      >取消</el-button>
      <el-button
        type="primary"
        size="medium"
        @click="submit"
      >确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
// import ElTreeSelect from '@/components/elTreeSelect/elTreeSelect'
import { getRecruitmentList, changeCandidateJob, recoverCandidate } from '@/api/personnel/candidate'
import { getOrgTreeSimple } from '@/api/org/org'

export default {
  name: 'ChangeJobDialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: { recruitmentId: '' },
      recruitmentList: [],
      rules: {
        recruitmentId: [{ required: true, message: '请选择关联应聘职位', trigger: 'blur' }]
      },
      config: {
        selectParams: {
          placeholder: '请选择',
          multiple: false,
          disabled: true
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
      },
      orgId: '',
      orgList: [],
      candidata: {},
      loading: false,
      type: 'change'
    }
  },
  created() {
    getRecruitmentList().then((res) => {
      this.recruitmentList = res
    })
    getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
      this.config.treeParams.data = res
      this.$refs['orgTree'].treeDataUpdateFun(res)
    })
  },
  methods: {
    handleClose() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.$emit('update:visible', false)
    },
    changeJob(data) {
      this.type = 'change'
      this.candidata = JSON.parse(JSON.stringify(data))
      this.$emit('update:visible', true)
    },
    recover(data) {
      this.type = 'recover'
      this.candidata = JSON.parse(JSON.stringify(data))
      this.$emit('update:visible', true)
    },
    recruitmentChange() {
      this.recruitmentList.forEach((item) => {
        if (item.id === this.form.recruitmentId) {
          this.orgList.push({ orgId: item.orgId, orgName: item.orgName })
          this.orgId = item.orgId
        }
      })
    },
    submit() {
      this.$refs.ruleForm.validate((valid, obj) => {
        if (valid) {
          const params = {
            personId: this.candidata.personId,
            recruitmentId: this.form.recruitmentId
          }
          this.loading = true
          if (this.type === 'change') {
            changeCandidateJob(params)
              .then(() => {
                this.$message.success('更改成功!')
                this.loading = false
                Object.assign(this.$data.form, this.$options.data().form)
                this.$emit('refresh')
                this.$emit('update:visible', false)
              })
              .catch(() => {
                this.loading = false
                this.$message.error('更改失败')
              })
          } else {
            params.userId = this.$store.state.user.userInfo.user_id
            recoverCandidate(params)
              .then(() => {
                this.$message.success('恢复成功!')
                this.loading = false
                Object.assign(this.$data.form, this.$options.data().form)
                this.$emit('refresh')
                this.$emit('update:visible', false)
              })
              .catch(() => {
                this.loading = false
                this.$message.error('恢复失败')
              })
          }
        } else {
          this.$message.error(obj[Object.keys(obj)[0]][0].message)
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-select {
  width: 100%;
}
</style>
