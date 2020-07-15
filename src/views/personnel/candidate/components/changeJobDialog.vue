<template>
  <el-dialog
    :title="titleObj[type] || ''"
    :visible.sync="visible"
    width="30%"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <el-form
      ref="ruleForm"
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
      <el-form-item label="恢复候选人到">
        <el-select
          v-model="form.status"
          placeholder="请选择"
        >
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
        :loading="loading"
        @click="submit"
      >确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import { getRecruitmentList, changeCandidateJob, recoverCandidate } from '@/api/personnel/candidate'
// import { getOrgTreeSimple } from '@/api/org/org'
import { addToCandidate } from '@/api/personnel/person'

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
        recruitmentId: [{ required: true, message: '请选择关联应聘职位', trigger: 'blur' }],
        status: [{ required: true, message: '请选择候选人恢复后状态', trigger: 'blur' }]
      },
      orgId: '',
      orgList: [],
      person: {},
      loading: false,
      type: 'change',
      titleObj: {
        change: '更改应聘职位',
        recover: '恢复为候选人',
        add: '添加到候选人'
      }
    }
  },
  computed: {
    ...mapGetters(['userId']),
    statusList() {
      let statusList = [
        { label: '待沟通', value: '1' },
        { label: '初选通过', value: '2' },
        { label: '面试通过', value: '4' }
      ]
      return statusList.filter((item) => {
        return Number(item.value) <= Number(this.person.status)
      })
    }
  },
  created() {
    getRecruitmentList({
      userId: this.userId
    }).then((res) => {
      this.recruitmentList = res
    })
    // getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
    //   this.config.treeParams.data = res
    //   this.$refs['orgTree'].treeDataUpdateFun(res)
    // })
  },
  methods: {
    handleClose() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.$emit('update:visible', false)
    },
    changeJob(data) {
      this.type = 'change'
      this.person = JSON.parse(JSON.stringify(data))
      this.$emit('update:visible', true)
    },
    recover(data) {
      this.type = 'recover'
      this.person = JSON.parse(JSON.stringify(data))
      this.$emit('update:visible', true)
    },
    init(type, data) {
      this.type = type
      this.person = JSON.parse(JSON.stringify(data))
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
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return
        }
        const params = {
          personId: this.person.personId,
          recruitmentId: this.form.recruitmentId,
          userId: this.$store.state.user.userInfo.user_id
        }
        this.loading = true

        let submitFunc
        if (this.type === 'change') {
          submitFunc = changeCandidateJob
        } else if (this.type === 'recover') {
          submitFunc = recoverCandidate
        } else if (this.type === 'add') {
          submitFunc = addToCandidate
        }

        submitFunc(params)
          .then(() => {
            this.$message.success('操作成功')
            Object.assign(this.$data.form, this.$options.data().form)
            this.$emit('refresh')
            this.$emit('update:visible', false)
          })
          .catch(() => {
            this.$message.error('操作失败')
          })
          .finally(() => {
            this.loading = false
          })
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
