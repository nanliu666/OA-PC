<template>
  <el-dialog
    title="重新分配招聘需求"
    :visible="visible"
    width="1200px"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <el-row
      type="flex"
      :gutter="52"
    >
      <el-col :span="8">
        <span class="demandSize">
          已分配: <span id="assigned">{{ assignedCount }}</span></span>
      </el-col>
      <el-col :span="8">
        <span class="demandSize">
          待分配: <span id="assigned">{{ noAssignedCount }}</span></span>
      </el-col>

      <el-col :span="8">
        <span class="demandSize">需求总数:{{ Totalnumberpeople }}</span>
      </el-col>
    </el-row>

    <el-form
      ref="dynamicValidateForm"
      :model="dynamicValidateForm"
      class="textForm"
    >
      <el-row type="flex">
        <el-col :span="8">
          <span class="department">指定招聘人员</span>
        </el-col>
        <el-col :span="4">
          <span class="department">招聘任务</span>
        </el-col>
        <el-col :span="4">
          <span class="department">已入职</span>
        </el-col>
        <el-col :span="4">
          <span class="department">候选人</span>
        </el-col>
        <el-col :span="4">
          <span class="department">剩余任务</span>
        </el-col>
      </el-row>

      <el-form-item
        v-for="user in dynamicValidateForm.users"
        :key="user.id"
      >
        <el-row
          :gutter="6"
          type="flex"
        >
          <el-col
            v-if="user.Rendering === 'Rendering'"
            :span="8"
          >
            <el-select
              v-model="user.userId"
              v-loading="user.loading"
              placeholder="请选择"
              @visible-change="
                (isBoolean) => {
                  requeUserList(user, isBoolean)
                }
              "
            >
              <el-input
                v-model="personnel"
                placeholder="姓名/工号"
                @change="requeWorkList(user)"
              >
                <i
                  slot="prefix"
                  class="el-input__icon el-icon-search"
                  @click="requeWorkList(user)"
                />
              </el-input>
              <el-option
                v-for="item in user.options"
                :key="item.userId"
                :label="item.name"
                :value="item.userId"
              />
            </el-select>
          </el-col>
          <el-col
            v-else
            :span="8"
          >
            <el-input
              v-model="user.name"
              :disabled="user.peopleDisabled"
            />
          </el-col>

          <el-col :span="4">
            <el-input
              :value="user.olditem"
              :disabled="user.disabled"
            />
          </el-col>
          <el-col :span="4">
            <el-input
              :value="user.entryNum"
              :disabled="user.disabled"
            />
          </el-col>
          <el-col :span="4">
            <el-input
              :value="user.candidateNum"
              :disabled="user.disabled"
            />
          </el-col>
          <el-col :span="4">
            <el-input-number
              v-model="user.taskNum"
              controls-position="right"
              :min="0"
              :max="Totalnumberpeople"
              :precision="0"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button
          type="text"
          @click="addDomain"
        >
          <i class="el-icon-plus" />添加
        </el-button>
      </el-form-item>
    </el-form>
    <el-button
      size="medium"
      @click="handleClose"
    >
      取消
    </el-button>
    <el-button
      type="primary"
      size="medium"
      @click="onSubmitted()"
    >
      确定
    </el-button>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { getStaffBasicInfo } from '@/api/personalInfo'
import { queryDistribution, putDistribution } from '@/api/personnel/recruitment'
import { getUserWorkList } from '@/api/org/org'
import { createUniqueID } from '@/util/util'
import { getOrgUserList } from '@/api/system/user'
export default {
  name: 'Assigned',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['userId']),
    assignedCount: function() {
      return this.dynamicValidateForm.users.reduce((total, item) => total + item.taskNum, 0)
    },
    noAssignedCount() {
      return this.Totalnumberpeople - this.assignedCount
    }
  },
  data() {
    return {
      orgId: '',
      personnel: '',
      jumpnot: null,
      recruitmentId: '',
      Totalnumberpeople: 0,
      Assigned: 0,
      dynamicValidateForm: {
        users: [
          {
            id: createUniqueID(),
            name: '',
            peopleDisabled: true,
            disabled: true,
            entryNum: 0,
            candidateNum: 0,
            taskNum: 0,
            // 用于捕获用户userId的数组
            options: []
          }
        ]
      }
    }
  },
  mounted() {
    getStaffBasicInfo({ userId: this.userId }).then((res) => {
      this.orgId = res.orgId
    })
  },
  methods: {
    doNotSave() {
      this.$emit('isDoNotSave')
      this.$router.go(-1)
      this.handleClose()
    },
    init(row) {
      let { id, needNum, jumpnot } = row
      this.jumpnot = jumpnot
      this.recruitmentId = id
      this.Totalnumberpeople = needNum
      this.$emit('update:visible', true)
      queryDistribution({ recruitmentId: row.id }).then((res) => {
        this.dynamicValidateForm.users = res.map((item) => ({
          ...item,
          olditem: item.taskNum,
          taskNum: item.taskNum - item.entryNum,
          peopleDisabled: true,
          disabled: true
        }))
      })
    },
    requeWorkList(page) {
      getUserWorkList({ pageNo: 1, pageSize: 15, search: this.personnel }).then((res) => {
        page.options = res.data
      })
      this.personnel = null
    },
    requeUserList(page, isBoolean) {
      if (isBoolean) {
        if (page.options) {
          page.loading = true
          getOrgUserList({ pageNo: 1, pageSize: 15, orgId: this.orgId })
            .then((res) => {
              page.options = res.data.filter(
                (option) =>
                  !this.dynamicValidateForm.users.map((user) => user.userId).includes(option.userId)
              )
              page.loading = false
            })
            .catch(() => {
              page.loading = false
            })
        }
      }
    },
    handleClose() {
      if (this.dynamicValidateForm.users) {
        let itemArr = this.dynamicValidateForm.users.splice(0, 1)
        itemArr[0].userId = null
        this.dynamicValidateForm.users = itemArr
      }
      this.$emit('update:visible', false)
      if (this.jumpnot) {
        this.$emit('dataJump')
      }
    },
    addDomain() {
      if (this.dynamicValidateForm.users && this.dynamicValidateForm.users.length === 0) {
        this.$message({
          showClose: true,
          message: '当前需求暂无可用员工, 请关闭重试',
          type: 'warning'
        })
        this.$emit('update:visible', false)
      } else {
        if (this.dynamicValidateForm.users.some((user) => !user.userId)) {
          this.$message.error('请先选择员工')
          return
        }
        this.dynamicValidateForm.users.push({
          loading: false,
          name: '',
          creatId: createUniqueID(),
          userId: '',
          taskNum: 0,
          disabled: true,
          Rendering: 'Rendering',
          options: []
        })
      }
    },
    calWhetherBeyond() {
      var total = null
      if (this.dynamicValidateForm.users) {
        this.dynamicValidateForm.users.forEach((item) => {
          total += item.taskNum
        })
        return total
      }
    },
    onSubmitted(parms = {}) {
      // 判断人数是否相当
      let total = this.calWhetherBeyond()
      if (total === this.Totalnumberpeople) {
        parms.recruitmentId = this.recruitmentId
        parms.users = this.dynamicValidateForm.users
          .filter((item) => item.userId || item.taskNum)
          .map((item) => ({
            userId: item.userId,
            taskNum: item.taskNum,
            // 利用已经生成的ID来判断当前分配状态是否为已经生成
            operatorType: item.id ? 'Update' : 'Add'
          }))
        putDistribution(parms)
          .then(() => {
            this.$message({ message: '操作成功', type: 'success' })
            this.refresh()
          })
          .catch(() => {
            this.refresh()
          })
      } else {
        this.$message({
          showClose: true,
          message: '请注意！分配需求人数要等与需求总人数',
          type: 'error'
        })
      }
    },
    refresh() {
      this.$emit('update:visible', false)
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header {
  border-bottom: 1px solid #ccc;
}

/deep/ .el-dialog__body {
  padding: 30px 35px;
}
.textForm {
  margin-top: 10px;
}

#assigned {
  color: #1989fa;
}
.department {
  font-size: 14px;
  color: #212a3f;
  text-align: right;
  font-weight: 600;
}

/deep/ .el-input__inner {
  width: 100% !important;
}

/deep/ .el-select {
  width: 100% !important;
}
</style>
