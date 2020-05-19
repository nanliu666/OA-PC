<template>
  <el-dialog
    title="推送审核"
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
        v-show="multiple"
        label="已选择"
      >
        <template v-for="item in candiateList">
          <el-tag
            :key="item.personId"
            style="margin-right:8px"
          >
            {{ item.name }}
          </el-tag>
        </template>
      </el-form-item>
      <el-form-item
        label="审核人"
        prop="userId"
      >
        <el-select
          v-model="form.userId"
          v-loadmore="moreUserList"
          placeholder="请选择审核人"
        >
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.name"
            :value="item.userId"
          />
          <div
            v-show="loadUserList"
            class="addressLoading"
          >
            <i class="el-icon-loading" />
          </div>
          <div
            v-show="noMoreUser"
            style="text-align: center; font-size:14px;color: #606266;"
          >
            没有更多了
          </div>
        </el-select>
      </el-form-item>
      <el-form-item
        label="备注"
        prop="remark"
      >
        <el-input
          v-model="form.remark"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          maxlength="200"
          show-word-limit
        />
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
import { getUserWorkList } from '@/api/org/org'

export default {
  name: 'PushAuditDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: { userId: '', remark: '' },
      userList: [],
      userListPageNo: 1,
      loadUserList: false,
      noMoreUser: false,
      rules: {
        userId: [{ required: true, message: '请选择审核人', trigger: 'blur' }]
      },
      loading: false,
      candiateList: [],
      multiple: false
    }
  },
  created() {
    this.moreUserList()
  },
  methods: {
    handleClose() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.$emit('update:visible', false)
    },
    submit() {
      this.$message.info('此功能待开发')
    },
    pushAudit(item) {
      if (Array.isArray(item)) {
        this.candiateList = JSON.parse(JSON.stringify(item))
        this.multiple = true
      } else {
        this.candiateList = [JSON.parse(JSON.stringify(item))]
        if (
          !this.userList.find((it) => {
            return it.userId === item.userId
          })
        ) {
          this.userList.push({ userId: item.userId, name: item.userName })
        }
        this.form.userId = item.userId
        this.multiple = false
      }
      this.$emit('update:visible', true)
    },
    moreUserList() {
      if (this.loadUserList || this.noMoreUser) return
      this.loadUserList = true
      getUserWorkList({ pageNo: this.userListPageNo, pageSize: 100 }).then((res) => {
        if (res.data.length > 0) {
          this.userList.push(...res.data)
          this.userListPageNo += 1
          this.loadUserList = false
        } else {
          this.noMoreUser = true
          this.loadUserList = false
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
