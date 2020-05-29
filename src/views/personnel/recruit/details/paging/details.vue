<template>
  <div>
    <basic-container>
      <el-row
        type="flex"
        justify="center"
        style="padding-top:40px}"
      >
        <el-col
          :xl="16"
          :lg="16"
          :md="18"
          :sm="20"
          :xs="22"
        >
          <el-form
            ref="applyForm"
            :model="personnel"
            label-width="80px"
          >
            <el-row>
              <el-col :span="10">
                <el-form-item label="原职位">
                  <span class="distance">{{ personnel.name }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="申请时间">
                  <span class="distance">{{ personnel.createTime }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="申请公司">
                  <span class="distance">{{ personnel.company }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="用人部门">
                  <span class="distance">{{ personnel.orgName }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="职位">
                  <span class="distance">{{ personnel.name }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="岗位">
                  <span class="distance">{{ personnel.createTime }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="工作性质">
                  <span class="distance">{{ personnel.company }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="需求人数">
                  <span class="distance">{{ personnel.orgName }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="到岗日期">
                  <span class="distance">{{ personnel.name }}</span>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="薪酬范围">
                  <span class="distance">{{ personnel.createTime }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="学历要求">
                  <span class="distance">{{ personnel.createTime }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="职位要求">
                  <li class="distance">
                    {{ personnel.createTime }}
                  </li>
                  <li class="distance">
                    {{ personnel.createTime }}
                  </li>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="工作职责">
                  <li class="distance">
                    {{ personnel.createTime }}
                  </li>
                  <li class="distance">
                    {{ personnel.createTime }}
                  </li>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="招聘原因">
                  <span class="distance">{{ personnel.createTime }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="工作职责">
                  <li class="distance">
                    {{ personnel.createTime }}
                  </li>
                  <li class="distance">
                    {{ personnel.createTime }}
                  </li>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
export default {
  name: 'Details',
  data() {
    return {
      // 请求数据params and 员工信息
      personnel: {
        name: 'xxx',
        createTime: 'xxx',
        company: 'xxx',
        orgName: 'xxx',
        jobId: 'xxx'
      }
    }
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
    justify-content: space-around;
    margin: 26px 0;
    div {
      margin: 0 30px;
    }
  }
}

.distance {
  margin-left: 10px;
}
</style>
