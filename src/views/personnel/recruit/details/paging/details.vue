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
                  <span class="distance">{{}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="原岗位" />
              </el-col>
              <el-col
                :span="10"
                :offset="4"
              >
                <el-form-item label="变更为" />
              </el-col>
            </el-row>
            <!-- 生效日期 -->
            <el-row class="btn-box">
              <el-col :span="10">
                <el-form-item
                  label="生效日期"
                  prop="effectDate"
                />
              </el-col>
            </el-row>
            <!-- 备注 -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" />
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
        name: 'xxx'
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
