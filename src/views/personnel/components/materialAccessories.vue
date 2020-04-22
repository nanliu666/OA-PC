<template>
  <div class="material">
    <basic-container>
      <el-row>
        <el-col>
          <el-divider direction="vertical"></el-divider>
          <div>
            员工基本资料
            ------------------------------------------------------------------------------------------------------------------
          </div>
        </el-col>
        <el-col>
          <upload />
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-divider direction="vertical"></el-divider>
          <div>
            员工档案资料
            ------------------------------------------------------------------------------------------------------------------
          </div>
        </el-col>
        <el-col>
          <upload />
          <elx-img-box />
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-divider direction="vertical"></el-divider>
          <div>
            员工离职资料
            ------------------------------------------------------------------------------------------------------------------
          </div>
        </el-col>
        <el-col>
          <upload />
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import upload from './upload'
import elxImgBox from './elxImgBox'
export default {
  data() {
    return {}
  },
  components: {
    upload,
    elxImgBox
  }
}
</script>
<style lang="scss" scoped>
.material .el-col {
  display: flex;
  line-height: 15px;
}
</style>
