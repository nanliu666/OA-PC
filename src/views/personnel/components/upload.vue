<template>
  <div>
    <div class="upload-name" @click="openUpload=true">
      <i class="el-icon-plus"></i>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="openUpload"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <upload-img />

      <div slot="footer" class="dialog-footer">
        <el-button @click="openUpload = false">取 消</el-button>
        <el-button type="primary" @click="openUpload = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import uploadImg from './uploadImg'
export default {
  data() {
    return {
      openUpload: false
    }
  },
  props: ['title'],
  components: {
    uploadImg
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.upload-name {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  line-height: 146px;
  vertical-align: top;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: 0;
  .el-icon-plus {
    font-size: 28px;
    color: #8c939d;
  }
  .el-icon-plus:before {
    content: '\E6D9';
  }
}
</style>
