<template>
  <div class="material">
    <basic-container>
      <el-row>
        <el-col class="title-type">
          <el-divider direction="vertical"></el-divider>
          <div>员工基本资料</div>
        </el-col>
        <el-col>
          <upload typeName="身份证原件照片" typeIcon="el-icon-s-custom" :limit="2" />
          <upload typeName="学历证书" typeIcon="el-icon-s-custom" />
          <upload typeName="学位证书" typeIcon="el-icon-s-custom" />
          <upload typeName="个人证件照" typeIcon="el-icon-s-custom" />
          <upload typeName="工资银行" typeIcon="el-icon-bank-card" />
          <upload typeName="社保卡" typeIcon="el-icon-bank-card" />
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title-type">
          <el-divider direction="vertical"></el-divider>
          <div>员工档案资料</div>
        </el-col>
        <el-col class="employee-files">
          <upload typeName="劳动合同" typeIcon="el-icon-picture-outline" />
          <upload typeName="入职简历" typeIcon="el-icon-picture-outline" />
          <upload typeName="面试登记表" typeIcon="el-icon-picture-outline" />
          <upload typeName="入职登记表" typeIcon="el-icon-picture-outline" />
          <upload typeName="入职体检单" typeIcon="el-icon-picture-outline" />
          <upload typeName="上家公司离职证明" typeIcon="el-icon-picture-outline" />
          <upload typeName="转正申请表" typeIcon="el-icon-picture-outline" />
          <upload typeName="人事异动申请表" typeIcon="el-icon-picture-outline" />
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title-type">
          <el-divider direction="vertical"></el-divider>
          <div>员工离职资料</div>
        </el-col>
        <el-col>
          <upload typeName="离职审批" typeIcon="el-icon-picture-outline" />
          <upload typeName="离职证明" typeIcon="el-icon-picture-outline" />
          <upload typeName="离职申请表" typeIcon="el-icon-picture-outline" />
          <upload typeName="工作交接表" typeIcon="el-icon-picture-outline" />
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import upload from './upload'
import { getUploadData } from '@/api/personnel/uploaddata'
export default {
  data() {
    return {}
  },
  components: {
    upload
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getUploadData().then((res) => {
        window.console.log(res, '获得材料分类')
      })
    }
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
.employee-files {
  display: flex;
  float: left;
  flex-wrap: wrap;
}
</style>
