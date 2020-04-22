<template>
  <div class="material">
    <basic-container>
      <el-row>
        <el-col class="title-type">
          <el-divider direction="vertical"></el-divider>
          <div>员工基本资料</div>
        </el-col>
        <el-col>
          <upload title="yiyiyi" />
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title-type">
          <el-divider direction="vertical"></el-divider>
          <div>员工档案资料</div>
        </el-col>
        <el-col>
          <upload title="weewrwer" />
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title-type">
          <el-divider direction="vertical"></el-divider>
          <div>员工离职资料</div>
        </el-col>
        <el-col>
          <upload title="sadasdasf" />
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import upload from './upload'
export default {
  data() {
    return {}
  },
  components: {
    upload
  }
}
</script>
<style lang="scss" scoped>
.material .el-col {
  display: flex;
  line-height: 15px;
}
.title-type {
  position: relative;
  > div {
    z-index: 10;
    padding-right: 10px;
    background-color: #fff;
  }
  &:after {
    content: '';
    width: calc(100% - 50px);

    display: block;
    border-bottom: 1px dashed #000;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(50px, -50%);
    z-index: 1;
  }
}
</style>
