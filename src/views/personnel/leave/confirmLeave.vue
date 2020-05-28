<template>
  <div>
    <page-header
      title="确认离职"
      show-back
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
      <div
        v-if="isFinished === true ? true : false"
        class="tag-wrap"
      >
        <i class="el-icon-warning-outline icon-warning" />
        该员工离职交接事项尚未完成，请完成后再确认离职
      </div>
      <!-- 折叠版 -->
      <!-- 一级折叠版 -->
      <el-collapse v-model="activeNames">
        <el-collapse-item>
          <!-- 离职事项标题 -->
          <template slot="title">
            <div class="leave-matter-header">
              <div>
                <span class="title">离职交接事项</span>
              </div>
              <div class="isFinished-wrap">
                <span v-if="isFinished">进行中</span>
                <span v-else>已完成</span>
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
                    group.isFinished == '1'
                      ? ' el-icon-warning-outline icon-warning'
                      : ' el-icon-circle-check icon-success'
                  "
                />
                <span>{{ group.name }}</span>
                <div class="isFinished-wrap">
                  <span v-if="group.isFinished == '1'">已确认</span>
                  <el-button
                    v-else
                    type="text"
                    size="medium"
                    @click="handelUrging"
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
        v-if="!isFinished"
        class="confirm-leave-wrap"
      >
        <div class="title">
          确认离职
        </div>
        <p class="tips">
          提示：离职日期为员工最后工作日，员工状态在离职日期次日变更为“已离职”
        </p>
        <el-row>
          <el-col
            :xl="16"
            :lg="16"
            :md="18"
            :sm="20"
            :xs="22"
          >
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
                      v-model="confirmDataForm.lastDate"
                      type="date"
                      placeholder="选择日期"
                      style="width : 80%"
                      disabled
                    />
                  </el-form-item>
                </el-col>
                <!-- 申请离职日期 -->
                <el-col :span="10">
                  <el-form-item label="申请离职日期">
                    <el-date-picker
                      v-model="confirmDataForm.applyDate"
                      type="date"
                      placeholder="选择日期"
                      style="width : 80%"
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
                      v-model="confirmDataForm.reason"
                      placeholder="请选择"
                      style="width : 80%"
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
                <el-col :span="10">
                  <el-form-item label="离职原因说明">
                    <el-select
                      v-model="confirmDataForm.remark"
                      placeholder="请选择"
                      style="width : 80%"
                      disabled
                    >
                      <el-option
                        :label="confirmDataForm.remark"
                        :value="confirmDataForm.remark"
                      />
                    </el-select>
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
                      style="width : 80%"
                      prop="leaveDate"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 备注 -->

              <!-- <el-row>
                                <el-col :span="8">
                                    <el-form-item label="备注">
                                        <el-input type="textarea" :rows="2" placeholder="请输入" style="width : 80%" 
                                        v-model="confirmDataForm.remark">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row> -->
            </el-form>
          </el-col>
        </el-row>
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
              @click="handelConfirm"
            >
              确认离职
            </el-button>
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
  getLeaveInfo,
  confirmLeave
} from '@/api/leave/leave'

export default {
  data() {
    return {
      userId: this.$route.query.userId,
      // userId: '1264805583983218689',
      companyId: '',
      groupLoading: false,
      userInfo: {
        jobName: '',
        orgName: '',
        workNo: '',
        name: ''
      },
      //   折叠版
      activeNames: [],
      //   事项分组
      noteGroup: [],
      // 确认离职表单
      confirmDataForm: {
        id: '',
        lastDate: '',
        applyDate: '',
        leaveDate: '',
        reason: '',
        remark: ''
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
      selectLeaveReason: []
    }
  },
  computed: {
    //   判断noteGroup数组中的isFinished，全是1 完成   有0 没完成
    isFinished() {
      let res = this.noteGroup.some((item) => {
        return item.isFinished == 0
      })

      return res
    }
  },
  created() {
    //   获取页面基本信息
    this.initInfo({
      userId: this.userId
    })
    // 获取离职信息
    this.getLeave()
    // console.log(this.userId);
    this.getLeaveReason()
  },
  methods: {
    //   获取页面基本信息
    async initInfo(params) {
      // 获取员工信息
      let { name, workNo, orgName, jobName, companyId } = await getStaffBasicInfo(params)
      this.companyId = companyId
      this.userInfo = {
        name,
        workNo,
        orgName,
        jobName
      }
      // 获取组离职事项分组数据
      let resLeaveNote = await getLeaveNoteGroup({
        companyId: this.companyId,
        userId: this.userId
      })
      //   获取离职事项分组明细
      resLeaveNote.forEach(async (item) => {
        let categoryres = await getLeaveNoteCategory({
          groupId: item.id,
          isFinished: item.isFinished
        })
        item.categoryres = categoryres
      })
      this.noteGroup = resLeaveNote
    },
    // 获取员工离职信息
    async getLeave() {
      let { id, applyDate, lastDate, reason, remark, lastDate: leaveDate } = await getLeaveInfo({
        userId: this.userId
      })
      // let res = await getLeaveInfo({
      //     userId: this.userId
      // })
      // console.log(res);

      this.confirmDataForm = {
        id,
        applyDate,
        lastDate,
        reason,
        remark,
        leaveDate
      }
    },
    // 点击确认离职
    async handelConfirm() {
      await confirmLeave({
        ...this.confirmDataForm,
        userId: this.userId
      })
      this.$message.success('确认离职成功', 1000, () => {
        this.$router.go(-1)
      })
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
    handelUrging() {
      alert('点击了催办')
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
    justify-content: start;

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
.tag-wrap {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
  margin: 10px 0;
  background: #f7f8fa;
  width: 100%;
  height: 36px;
  line-height: 36px;
}

// 没完成图标
.icon-warning {
  color: #207efa;
  width: 16px;
  height: 16px;
}

// 已完成图标
.icon-success {
  color: #53c962;
  width: 16px;
  height: 16px;
}

// 离职交接事项标题
.leave-matter-header {
  position: relative;
  width: 100%;
  margin-left: 20px;

  .title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #202940;
  }

  .isFinished-wrap {
    position: absolute;
    right: 10px;
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
    left: 24px;
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
}

// 分组名称  行政部 。。。。
.leave-group-header {
  position: relative;
  width: 100%;
  margin-left: 40px;

  span {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #202940;
  }

  .isFinished-wrap {
    position: absolute;
    right: 10px;
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
    margin-left: 60px;
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: #202940;
  }

  .category-item {
    margin-left: 80px;
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: #757c85;
  }
}

// 确认离职表单
.confirm-leave-wrap {
  margin-top: 50px;
  margin-left: 50px;
}
</style>
