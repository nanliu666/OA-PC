<template>
  <div>
    <page-header
      title="确认离职"
      show-back
      :back="goBack"
    />
    <basic-container class="info-wrap">
      <!-- 头部 员工name  userId orgname jobname -->
      <div class="header-wrap">
        <div class="name-box">
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="info-row">
          <div class="workNo-box info-row-item">
            <span>工号：</span>
            <span>{{ userInfo.workNo }}</span>
          </div>
          <div class="orgName-box info-row-item">
            <span>部门:</span>
            <span>{{ userInfo.orgName }}</span>
          </div>
          <div class="jobName-box info-row-item">
            <span>职位:</span>
            <span>{{ userInfo.jobName }}</span>
          </div>
        </div>
      </div>
    </basic-container>

    <basic-container>
      <!-- 提醒 : "交接还没完成" -->
      <el-alert
        v-if="!isFinished"
        title="该员工离职交接事项尚未完成，请完成后再确认离职"
        type="info"
        show-icon
        class="tip-wrap"
      />
      <!-- <div v-if="!isFinished" class="tag-wrap">
				<i class="el-icon-warning-outline icon-warning" />
				该员工离职交接事项尚未完成，请完成后再确认离职
			</div> -->
      <!-- 折叠版 -->
      <!-- 一级折叠版 -->
      <el-collapse
        v-model="activeNames"
        v-loading="groupLoading"
      >
        <el-collapse-item name="default-open">
          <!-- 离职事项标题 -->
          <template slot="title">
            <div class="leave-matter-header">
              <div>
                <span class="title">离职交接事项</span>
              </div>
              <div class="isFinished-wrap">
                <span v-if="isFinished">已完成</span>
                <span v-else>进行中</span>
              </div>
            </div>
          </template>
          <!-- 二级折叠版  -->
          <el-collapse-item
            v-for="(group, index) in noteGroup"
            :key="group.id"
            :name="index"
            class="groups"
          >
            <!--分组名称  行政部。。。  -->
            <template slot="title">
              <div class="leave-group-header">
                <i
                  :class="
                    group.status == 'Confirmed'
                      ? ' el-icon-circle-check icon-success'
                      : ' el-icon-warning-outline icon-warning'
                  "
                />
                <span>{{ group.name }}</span>
                <div class="isFinished-wrap">
                  <span v-if="group.status == 'Confirmed'">已确认</span>
                  <el-button
                    v-else
                    type="text"
                    size="medium"
                    @click.stop="handelUrging(group)"
                  >
                    催办
                  </el-button>
                </div>
              </div>
            </template>
            <!-- 事项分类 -->
            <div
              v-for="category in group.categoryres"
              :key="category.categoryId"
              class="category-wrap"
            >
              <div class="title">
                {{ category.categoryName }}
              </div>
              <!-- 事项详情 -->
              <div
                v-for="detail in category.details"
                :key="detail.detailId"
                class="category-item"
              >
                {{ detail.detailName }}
              </div>
            </div>
          </el-collapse-item>
          <!-- </el-collapse> -->
        </el-collapse-item>
      </el-collapse>

      <!-- 确认离职表单 -->
      <div
        v-if="isFinished"
        class="confirm-leave-wrap"
      >
        <el-row
          type="flex"
          justify="center"
        >
          <el-col
            :xl="16"
            :lg="16"
            :md="18"
            :sm="20"
            :xs="22"
            :span="24"
          >
            <el-row>
              <el-col :span="24">
                <div class="title">
                  确认离职
                </div>
                <el-alert
                  title="提示：离职日期为员工最后工作日，员工状态在离职日期次日变更为“已离职"
                  type="info"
                  show-icon
                  style="margin-top:20px"
                />
              </el-col>
            </el-row>
            <el-form
              ref="confirmForm"
              :model="confirmDataForm"
              :rules="confirmRules"
              label-width="100px"
              label-position="top"
            >
              <el-row>
                <!-- 预计离职日期 -->
                <el-col :span="10">
                  <el-form-item label="预计离职日期">
                    <el-date-picker
                      v-model="leaveData.lastDate"
                      type="date"
                      placeholder="选择日期"
                      style="width : 100%"
                      disabled
                    />
                  </el-form-item>
                </el-col>
                <!-- 申请离职日期 -->
                <el-col
                  :span="10"
                  :offset="4"
                >
                  <el-form-item label="申请离职日期">
                    <el-date-picker
                      v-model="leaveData.applyDate"
                      type="date"
                      placeholder="选择日期"
                      style="width : 100%"
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <!-- 离职原因 -->
                <el-col :span="10">
                  <el-form-item label="离职原因">
                    <el-select
                      v-model="leaveData.reason"
                      placeholder="请选择"
                      style="width : 100%"
                      disabled
                    >
                      <el-option
                        v-for="item in selectLeaveReason"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 离职原因说明 -->
                <el-col
                  :span="10"
                  :offset="4"
                >
                  <el-form-item label="离职原因说明">
                    <el-input
                      v-model="leaveData.remark"
                      style="width : 100%"
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 实际离职日期 -->

              <el-row>
                <el-col :span="10">
                  <el-form-item
                    label="实际离职日期"
                    prop="leaveDate"
                  >
                    <el-date-picker
                      v-model="confirmDataForm.leaveDate"
                      type="date"
                      placeholder="选择日期"
                      style="width : 100%"
                      prop="leaveDate"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 备注 -->

              <el-row>
                <el-col :span="10">
                  <el-form-item label="备注">
                    <el-input
                      v-model="confirmDataForm.remark"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入"
                      style="width : 100%"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="16">
                <el-button
                  size="medium"
                  @click="handelCancel"
                >
                  取消
                </el-button>
                <el-button
                  type="primary"
                  size="medium"
                  :loading="btnloading"
                  @click="handelConfirm"
                >
                  确认离职
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { getStaffBasicInfo } from '@/api/personalInfo.js'
import {
  getLeaveNoteGroup,
  getLeaveNoteCategory,
  userLeaveUrgeOrg,
  getLeaveInfo,
  confirmLeave
} from '@/api/leave/leave'

export default {
  data() {
    return {
      userId: '',
      // userId: '1264805583983218689',
      groupLoading: false,
      userInfo: {
        jobName: '',
        orgName: '',
        workNo: '',
        name: ''
      },
      //   折叠版
      activeNames: ['default-open'],
      //   事项分组
      noteGroup: [],
      leaveData: {
        lastDate: '',
        applyDate: '',
        reason: '',
        remark: ''
      },
      // 确认离职表单
      confirmDataForm: {
        id: '',
        leaveDate: '',
        remark: '',
        userId: ''
      },
      //   离职表单的校验
      confirmRules: {
        leaveDate: [
          {
            required: true,
            message: '请选择实际日期',
            trigger: 'blur'
          }
        ]
      },
      //离职原因选择组
      selectLeaveReason: [],
      btnloading: false
    }
  },
  computed: {
    //   判断noteGroup数组中的status，全是Confirmed 完成   有UnConfirm 没完成
    isFinished() {
      let res = this.noteGroup.some((item) => {
        return item.status === 'UnConfirm'
      })

      return !res
    }
  },
  created() {
    //   获取页面基本信息
    this.initInfo()
    // 获取离职信息
    this.getLeave()
    // console.log(this.userId);
    this.getLeaveReason()
  },
  methods: {
    //   获取页面基本信息
    async initInfo() {
      this.userId = this.$route.query.userId
      // 获取员工信息
      let { name, workNo, orgName, jobName } = await getStaffBasicInfo({
        userId: this.userId
      })
      this.userInfo = {
        name,
        workNo,
        orgName,
        jobName
      }
      // 获取组离职事项分组数据
      this.groupLoading = true
      let resLeaveNote = await getLeaveNoteGroup({
        userId: this.userId
      })
      // //   获取离职事项分组明细
      resLeaveNote.forEach(async (item) => {
        let categoryres = await getLeaveNoteCategory({
          groupId: item.id
        })
        item.categoryres = categoryres
      })
      // 排序  已完成-未完成
      resLeaveNote.sort((a, b) => {
        return a.status.charCodeAt() - b.status.charCodeAt()
      })

      this.noteGroup = resLeaveNote
      this.groupLoading = false
    },
    // 获取员工离职信息
    async getLeave() {
      let { id, applyDate, lastDate, reason, remark, leaveDate } = await getLeaveInfo({
        userId: this.userId
      })
      this.leaveData = {
        lastDate,
        applyDate,
        reason,
        remark
      }
      this.confirmDataForm = {
        id,
        leaveDate,
        remark: '',
        userId: this.userId
      }
    },
    // 点击确认离职
    async handelConfirm() {
      this.btnloading = true
      await confirmLeave({
        ...this.confirmDataForm
      }).finally(() => {
        this.btnloading = false
      })
      this.$message.success('确认离职成功', 1000, this.$router.go(-1))
    },
    // 获取离职原因选择组
    getLeaveReason() {
      this.$store.dispatch('CommonDict', 'LeaveReason').then((res) => {
        // 离职原因下拉选择框
        let selectLeaveReason = []
        res.forEach((item) => {
          selectLeaveReason.push({
            label: item.dictValue,
            value: item.dictKey
          })
        })
        this.selectLeaveReason = selectLeaveReason
      })
    },
    // 点击取消
    handelCancel() {
      this.$router.go(-1)
    },
    // 点击催办
    handelUrging(data) {
      userLeaveUrgeOrg({ groupId: data.id, userId: this.userId, type: 'B2C' }).then(() => {
        return this.$message.success('催办成功')
      })
    },
    //goBack
    goBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.info-wrap {
  margin-bottom: 8px;
}

// 头部个人信息
.header-wrap {
  .name-box {
    span {
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #333333;
      line-height: 30px;
    }
  }

  .info-row {
    display: flex;
    justify-content: flex-start;

    .info-row-item {
      margin: 10px 50px 0 0;

      span {
        padding-left: 10px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #0e001c;
        line-height: 20px;
      }

      :first-child {
        padding-left: 0px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #757c85;
      }
    }
  }
}

// 提示框
.tip-wrap {
  margin-bottom: 16px;
  /deep/ .el-alert__icon {
    color: #207efa;
    font-size: 16px;
  }
  /deep/ .el-alert__title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #202940;
  }
}

// 没完成图标
.icon-warning {
  color: #207efa;
  font-size: 16px;
  margin-right: 16px;
}

// 已完成图标
.icon-success {
  color: #53c962;
  font-size: 16px;
  margin-right: 16px;
}

// 离职交接事项标题
.leave-matter-header {
  position: relative;
  width: 100%;
  margin-left: 56px;

  .title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #202940;
  }

  .isFinished-wrap {
    position: absolute;
    right: 20px;
    top: 0;

    span {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #202940;
    }
  }
}

.groups {
  /deep/ .el-collapse-item__arrow {
    position: absolute;
    left: 56px;
  }

  /deep/.el-collapse-item__header {
    background: #ffffff;
  }
}

/deep/ .el-collapse-item__header {
  position: relative;
  background: #f7f8fa;
}

/deep/ .el-collapse-item__arrow {
  position: absolute;
  left: 24px;
}

// 分组名称  行政部 。。。。
.leave-group-header {
  position: relative;
  width: 100%;
  margin-left: 85px;

  span {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #202940;
  }

  .isFinished-wrap {
    position: absolute;
    right: 20px;
    top: 0;

    span {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #202940;
    }
  }
}

// 事项分类  考勤假期。。。。
.category-wrap {
  .title {
    margin-left: 134px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #202940;
  }

  .category-item {
    margin-left: 148px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #757c85;
    margin-top: 2px;
  }
}

// 确认离职表单
.confirm-leave-wrap {
  margin-top: 50px;
  margin-left: 50px;
}
</style>
