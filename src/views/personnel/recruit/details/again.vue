<template>
  <el-dialog
    title="分配招聘需求"
    :visible="visible"
    width="30%"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <div>
      <div>
        职位介绍
      </div>
      <el-row type="flex">
        <el-col :span="8">
          需求人数：25
        </el-col>
        <el-col :span="8">
          已分配：4
        </el-col>
        <el-col :span="8">
          待分配：21
        </el-col>
      </el-row>
    </div>
    <el-form
      ref="dynamicValidateForm"
      :inline="true"
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
                <el-input v-model="domain.userId" />
              </el-col>
              <el-col :span="12">
                <el-input v-model="domain.taskNum" />
              </el-col>
              <el-button
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
          <i class="el-icon-plus" /> 新增域名
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// import { taskDistribution } from '@/api/personnel/recruitment'
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
      dynamicValidateForm: {
        users: [
          {
            userId: null,
            taskNum: 1
          }
        ]
      }
    }
  },
  methods: {
    doNotSave() {
      this.$emit('isDoNotSave')
      this.$router.go(-1)
      return this.handleClose()
    },
    init() {
      this.$emit('update:visible', true)
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    goBack() {
      this.$router.go(-1)
      return this.handleClose()
    },
    addDomain() {
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
  swidth: 100% !important;
}
</style>
