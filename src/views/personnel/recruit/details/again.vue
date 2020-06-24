<template>
  <el-dialog
    title="分配招聘需求"
    :visible="visible"
    width="38%"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <el-row
      type="flex"
      :gutter="52"
      class="displayBar"
    >
      <el-col
        :span="8"
        class="frame"
      >
        <span class="demandSize"> 职位名称</span>
        <span class="content">{{ list.jobName }}</span>
      </el-col>
      <el-col
        :span="8"
        class="frame"
      >
        <span class="demandSize"> 紧急程度</span>
        <span class="content">{{ calWorkYear(list.emerType) }}</span>
      </el-col>
      <el-col :span="8">
        <span class="demandSize"> 到岗日期 </span>
        <span class="content"> {{ list.joinDate }}</span>
      </el-col>
    </el-row>
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
        <span class="demandSize">需求人数:{{ Totalnumberpeople }}</span>
      </el-col>
    </el-row>

    <el-form
      ref="dynamicValidateForm"
      :model="dynamicValidateForm"
      class="textForm"
    >
      <el-row type="flex">
        <el-col :span="12">
          <span class="department">指定招聘人员</span>
        </el-col>
        <el-col :span="12">
          <span class="department">招聘任务</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            v-for="user in dynamicValidateForm.users"
            :key="user.creatId"
          >
            <el-row
              :span="24"
              type="flex"
            >
              <el-col :span="12">
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
                    v-loading="loading"
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
              <el-col :span="12">
                <el-input-number
                  v-model="user.taskNum"
                  controls-position="right"
                  :min="1"
                  :max="Numberofpeople"
                  style="margin-left: 5px;"
                  :precision="0"
                />
              </el-col>
              <el-button
                v-show="isDelete"
                type="text"
                @click.prevent="removeUsers(user)"
              >
                <i class="el-icon-delete" />
              </el-button>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
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
      @click="onSubmitted(dynamicValidateForm.users)"
    >
      确定
    </el-button>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { taskDistribution } from '@/api/personnel/recruitment'
import { getStaffBasicInfo } from '@/api/personalInfo'
import { getUserWorkList } from '@/api/org/org'
import { createUniqueID } from '@/util/util'
import { getOrgUserList } from '@/api/system/user'
export default {
  name: 'Again',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tltoTaskNum: null,
      orgId: null,
      loading: false,
      personnel: null,
      recruitmentId: '',
      isDelete: false,
      Totalnumberpeople: 0,
      Numberofpeople: null,
      Assigned: 0,
      EmerType: [],
      jumpnot: null,
      list: {
        jobName: '销售经理',
        emerType: '特急',
        joinDate: '2020-02-02'
      },
      dynamicValidateForm: {
        users: [
          {
            id: createUniqueID(),
            userId: null,
            taskNum: 1,
            options: [],
            loading: false
          }
        ]
      }
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
  watch: {
    'dynamicValidateForm.users.length': function(newval) {
      if (newval > 1) {
        this.isDelete = true
      } else {
        this.isDelete = false
      }
    }
  },
  mounted() {
    this.$store.dispatch('CommonDict', 'EmerType').then((res) => {
      this.EmerType = res
    })
  },
  methods: {
    doNotSave() {
      this.$emit('isDoNotSave')
      this.$router.go(-1)
      this.handleClose()
    },
    init(row) {
      this.list = row
      let { id, entryNum, needNum, jumpnot } = row
      this.jumpnot = jumpnot
      this.recruitmentId = id
      this.Totalnumberpeople = needNum
      this.Assigned = entryNum
      this.Numberofpeople = needNum - entryNum
      this.$emit('update:visible', true)
      getStaffBasicInfo({ userId: this.userId }).then((res) => {
        this.orgId = res.orgId
      })
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
    requeWorkList(page) {
      getUserWorkList({ pageNo: 1, pageSize: 15, search: this.personnel }).then((res) => {
        page.options = res.data
      })
      this.personnel = null
    },
    requeUserList(page, isBoolean) {
      if (isBoolean) {
        page.loading = true
        getOrgUserList({ pageNo: 1, pageSize: 15, orgId: this.orgId })
          .then((res) => {
            page.loading = false
            page.options = res.data.filter(
              (option) =>
                !this.dynamicValidateForm.users.map((user) => user.userId).includes(option.userId)
            )
          })
          .catch(() => {
            page.loading = false
          })
      }
    },
    addDomain() {
      if (this.dynamicValidateForm.users.some((user) => !user.userId)) {
        this.$message.error('请先选择员工')
        return
      }
      this.dynamicValidateForm.users.push({
        userId: '',
        taskNum: 1,
        creatId: createUniqueID(),
        options: [],
        loading: false
      })
    },
    removeUsers(item) {
      let index = this.dynamicValidateForm.users.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.users.splice(index, 1)
      }
    },
    calWhetherBeyond() {
      var total = null
      this.dynamicValidateForm.users.map((item) => {
        total += item.taskNum
      })
      return total
    },
    onSubmitted(users) {
      let accumulation = this.calWhetherBeyond()
      debugger
      if (accumulation === this.Totalnumberpeople) {
        taskDistribution({
          recruitmentId: this.recruitmentId,
          users: users
            .filter((item) => item.userId)
            .map((user) => ({ userId: user.userId, taskNum: user.taskNum }))
        })
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
    calWorkYear(type) {
      let typeWord
      this.EmerType.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
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
.demandSize {
  display: block;
  font-size: 12px;
  color: #718199;
  line-height: 18px;
  text-align: center;
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

.frame {
  border-right: 1px solid #ccc;
  margin-bottom: 20px;
}

.content {
  display: block;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #202940;
  line-height: 24px;
  margin-bottom: 10px;
  text-align: center;
}
</style>
