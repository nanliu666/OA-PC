<template>
  <div>
    <page-header
      title="确认离职"
      show-back
    />
    <basic-container>
      <el-row>
        <el-col :span="24">
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
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="24">
          <div>该员工离职交接事项尚未完成，请完成后再确认离职</div>
        </el-col>
      </el-row>-->

      <el-row
        type="flex"
        justify="center"
      >
        <el-col>
          <!-- 折叠版 -->
          <el-row
            type="flex"
            justify="center"
          >
            <el-col :span="16">
              <!-- 一级折叠版 -->
              <el-collapse>
                <el-collapse-item>
                  <!-- 离职事项标题 -->
                  <template slot="title">
                    <div class="leave-matter-header">
                      <div>
                        <i class="header-icon el-icon-info" />
                        <span>离职交接事项</span>
                      </div>
                      <div>
                        <span v-if="isFinished">已完成</span>
                        <span v-else>进行中</span>
                      </div>
                    </div>
                  </template>
                  <!-- 二级折叠版  -->
                  <el-collapse
                    v-model="activeNames"
                    @change="handleChange"
                  >
                    <el-collapse-item
                      v-for="(group, index) in noteGroup"
                      :key="group.id"
                      :name="index"
                    >
                      <!--分组名称  行政部。。。  -->
                      <template slot="title">
                        <div>
                          <i class="header-icon el-icon-info" />
                          {{ group.name }}
                          <span v-if="group.isFinished == '1'">已确认</span>
                          <el-button
                            v-else
                            type="text"
                            size="medium"
                          >
                            催办
                          </el-button>
                        </div>
                      </template>
                      <!-- 事项分类 -->
                      <div
                        v-for="category in group.categoryres"
                        :key="category.categoryId"
                      >
                        <div>{{ category.categoryName }}</div>
                        <!-- 事项详情 -->
                        <div
                          v-for="detail in category.details"
                          :key="detail.detailId"
                        >
                          {{ detail.detailName }}
                        </div>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </el-collapse-item>
              </el-collapse>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="center"
          >
            <el-col :span="16">
              <div>确认离职</div>
              <p>提示：离职日期为员工最后工作日，员工状态在离职日期次日变更为“已离职”</p>
            </el-col>
          </el-row>
          <!-- 确认离职表单 -->
          <el-form
            ref="confirmForm"
            :model="confirmDataForm"
            :rules="confirmRules"
            label-width="100px"
            label-position="top"
          >
            <el-row
              type="flex"
              justify="center"
            >
              <!-- 预计离职日期 -->
              <el-col :span="8">
                <el-form-item label="预计离职日期">
                  <el-date-picker
                    v-model="confirmDataForm.lastDate"
                    type="date"
                    placeholder="选择日期"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <!-- 申请离职日期 -->
              <el-col :span="8">
                <el-form-item label="申请离职日期">
                  <el-date-picker
                    v-model="confirmDataForm.applyDate"
                    type="date"
                    placeholder="选择日期"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row
              type="flex"
              justify="center"
            >
              <!-- 离职原因 -->
              <el-col :span="8">
                <el-form-item label="离职原因">
                  <el-select
                    v-model="confirmDataForm.reason"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      :label="confirmDataForm.reason"
                      :value="confirmDataForm.reason"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 离职原因说明 -->
              <el-col :span="8">
                <el-form-item label="离职原因说明">
                  <el-select
                    v-model="confirmDataForm.remark"
                    placeholder="请选择"
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

            <el-row
              type="flex"
              justify="center"
            >
              <el-col :span="16">
                <el-form-item
                  label="实际离职日期"
                  prop="leaveDate"
                >
                  <el-date-picker
                    v-model="confirmDataForm.leaveDate"
                    type="date"
                    placeholder="选择日期"
                    prop="leaveDate"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 备注 -->

            <!-- <el-row type="flex" justify="center">
              <el-col :span="16">
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入"
                    v-model="confirmDataForm.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>-->
          </el-form>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        justify="center"
      >
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
      //   userId: this.$route.query.userId,
      userId: '1264805583983218689',
      companyId: '',
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
        leaveDate: [{ required: true, message: '请选择实际日期', trigger: 'blur' }]
      }
      //   离职信息
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
    this.initInfo(this.userId)
    // 获取离职信息
    this.getLeave()
  },
  methods: {
    //   获取页面基本信息
    async initInfo(params) {
      // 获取员工信息
      let resInfo = await getStaffBasicInfo(params)
      let { name, workNo, orgName, jobName, companyId } = resInfo
      //   console.log(resInfo)
      this.companyId = companyId
      this.userInfo = { name, workNo, orgName, jobName }
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
      let { applyDate, lastDate, reason, remark, lastDate: leaveDate } = await getLeaveInfo(
        this.userId
      )
      this.confirmDataForm = { applyDate, lastDate, reason, remark, leaveDate }
    },
    // 点击确认离职
    async handelConfirm() {
      await confirmLeave(this.confirmDataForm)
      this.$message.success('确认离职成功', 1000, () => {
        this.$router.go(-1)
      })
    },
    // 点击取消
    handelCancel() {
      this.$router.go(-1)
    }
    // 折叠版数据
    // handleChange(val) {}
  }
}
</script>

<style lang="scss" scoped>
.header-wrap {
  margin-top: 20px;
  .name-box {
    display: flex;
    justify-content: center;
    margin-top: 36px;
    span {
      font-size: 30px;
    }
  }
  .info-row {
    display: flex;
    justify-content: center;
    margin: 26px 0;
    .info-row-item {
      margin: 0 50px;
    }
  }
}
.leave-matter-header {
  display: flex;
  justify-content: space-around;
}
</style>
