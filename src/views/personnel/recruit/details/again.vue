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
        <span class="demandSize">需求人数:{{ Totalnumberpeople }}</span>
      </el-col>
      <el-col :span="8">
        <span class="demandSize">
          已分配: <span id="assigned">{{ Assigned }}</span></span>
      </el-col>
      <el-col :span="8">
        <span class="demandSize">
          待分配: <span id="assigned">{{ Numberofpeople }}</span></span>
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
                  <el-input
                    v-model="plens"
                    placeholder="姓名/工号"
                    @change="requeWorkList(15)"
                  >
                    <i
                      slot="prefix"
                      class="el-input__icon el-icon-search"
                      @click="requeWorkList(15)"
                    />
                  </el-input>

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
  name: 'Again',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      plens: '',
      recruitmentId: '',
      isDelete: false,
      Totalnumberpeople: 25,
      Numberofpeople: null,
      Assigned: 4,
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
    },
    recruitmentId: function(newval, oldval) {
      if (newval !== oldval) {
        let itemArr = this.dynamicValidateForm.users.splice(0, 1)
        itemArr[0].userId = null
        this.dynamicValidateForm.users = itemArr
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
    async init(row) {
      this.list = row
      let { id, entryNum, needNum, jumpnot } = row
      this.jumpnot = jumpnot
      this.recruitmentId = id
      this.Totalnumberpeople = needNum
      this.Assigned = entryNum
      this.Numberofpeople = needNum - entryNum
      await this.requeWorkList(15)
      this.$emit('update:visible', true)
    },
    handleClose() {
      if (typeof this.dynamicValidateForm.users !== 'undefined') {
        let itemArr = this.dynamicValidateForm.users.splice(0, 1)
        itemArr[0].userId = null
        this.dynamicValidateForm.users = itemArr
      }
      this.$emit('update:visible', false)
      if (this.jumpnot === 'yes') {
        this.$emit('dataJump')
      }
    },
    requeWorkList(page) {
      getUserWorkList({ pageNo: 1, pageSize: page }).then((res) => {
        this.options = res.data
      })
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
    calWhetherBeyond(Submitted) {
      var total = null
      this.dynamicValidateForm.users.forEach((item) => {
        total += item.taskNum
      })
      if (Submitted !== 'onSubmitted' && total >= this.Numberofpeople) {
        this.$message({
          showClose: true,
          message: '请注意！ 需求总人数不能大于待分配人数',
          type: 'error'
        })
      }
      return total
    },
    onSubmitted() {
      let accumulation = this.calWhetherBeyond('onSubmitted')
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
        this.$emit('update:visible', false)
        this.$emit('getTableData')
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
