<template>
  <el-dialog
    title="分配招聘需求"
    :visible="visible"
    width="38%"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <div>
      <div />

      <el-row
        type="flex"
        :gutter="52"
      >
        <el-col :span="8">
          <span> 需求人数：{{ Totalnumberpeople }}</span>
        </el-col>
        <el-col :span="8">
          <span> 已分配：{{ Assigned }}</span>
        </el-col>
        <el-col :span="8">
          <span> 待分配：{{ Numberofpeople }}</span>
        </el-col>
      </el-row>
    </div>
    <el-form
      ref="dynamicValidateForm"
      :model="dynamicValidateForm"
    >
      <el-row type="flex">
        <el-col :span="12">
          指定招聘人员
        </el-col>
        <el-col :span="12">
          招聘任务
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            v-for="domain in dynamicValidateForm.users"
            :key="domain.key"
          >
            <el-row
              :span="24"
              type="flex"
            >
              <el-col :span="12">
                <el-select
                  v-model="domain.userId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.name"
                    :label="item.name"
                    :value="item.userId"
                  />
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-input-number
                  v-model="domain.taskNum"
                  controls-position="right"
                  :min="1"
                  :max="Numberofpeople"
                  style="margin-right: 5px;"
                  @change="calWhetherBeyond"
                />
              </el-col>
              <el-button
                v-show="isDelete"
                type="text"
                @click.prevent="removeDomain(domain)"
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
          <i class="el-icon-plus" />新增域名
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
      @click="onSubmitted"
    >
      确定
    </el-button>
  </el-dialog>
</template>

<script>
import { taskDistribution } from '@/api/personnel/recruitment'
import { getUserWorkList } from '@/api/org/org'
export default {
  name: 'OrgEdit',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recruitmentId: '',
      isDelete: false,
      Totalnumberpeople: 25,
      Numberofpeople: 21,
      Assigned: 4,
      dynamicValidateForm: {
        users: [
          {
            userId: null,
            taskNum: 1
          }
        ]
      },
      options: []
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
  methods: {
    doNotSave() {
      this.$emit('isDoNotSave')
      this.$router.go(-1)
      this.handleClose()
    },
    async init(row) {
      let { id } = row
      this.recruitmentId = id
      await getUserWorkList({ pageNo: 1, pageSize: 15 }).then((res) => {
        this.options = res.data
      })
      this.$emit('update:visible', true)
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    goBack() {
      this.$router.go(-1)
      this.handleClose()
    },
    addDomain() {
      let accumulation = this.calWhetherBeyond()
      if (accumulation > this.Numberofpeople) return
      this.dynamicValidateForm.users.push({
        userId: '',
        taskNum: 1
      })
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.users.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.users.splice(index, 1)
      }
    },
    calWhetherBeyond() {
      var total = null
      this.dynamicValidateForm.users.forEach((item) => {
        total += item.taskNum
      })
      if (total > this.Numberofpeople) {
        this.$message({
          showClose: true,
          message: '请注意！ 需求总人数不能大于待分配人数',
          type: 'error'
        })
      }
      return total
    },
    onSubmitted() {
      let accumulation = this.calWhetherBeyond()
      if (accumulation !== this.Numberofpeople) {
        this.$message({
          showClose: true,
          message: '请注意！分配需求人数要等与需求总人数',
          type: 'error'
        })
      } else {
        let parms = {}
        parms.recruitmentId = this.recruitmentId
        parms.users = this.dynamicValidateForm.users
        taskDistribution(parms).then(() => {
          this.$message({ message: '操作成功', type: 'success' })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pageHeader {
  height: 48px;
  line-height: 48px;
  font-size: 18px;
}
.newOrgDailog {
  .el-select {
    width: 100%;
  }
}
.addressLoading {
  text-align: center;
}
/deep/ .el-form-item__error {
  padding-top: 0;
}
/deep/ .newOrgDailog {
  .el-form--label-top {
    .el-form-item__label {
      padding: 0 0 0 0;
    }
  }
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #ccc;
}

.riskSpan {
  padding-bottom: 10px;
}

/deep/ .el-dialog__body {
  padding: 30px 35px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
/deep/ .el-form-item {
  width: 100% !important;
}
/deep/ .el-form-item__content {
  width: 100% !important;
}
</style>
