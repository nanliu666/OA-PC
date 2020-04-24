<template>
  <div class="upload-box">
    <div class="upload-name" @mouseenter="visible" @mouseleave="invisible">
      <i :class="typeIcon" class="typeIcon"></i>
      <div v-show="seen" class="isShow">
        <span class="preview-box" v-if="isPreview"> 预览</span
        ><span class="send-box" @click="openUpload = true">上传</span>
      </div>
    </div>
    <div class="upload-card">{{ typeName }}</div>
    <el-dialog :visible.sync="openUpload" :close-on-click-modal="false" :append-to-body="true">
      <div slot="title" class="dialog-title">
        <span>{{ typeName }}</span
        ><span class="slot-title-box">仅支持2M以内jpg、jpeg、png格式图片上传。</span>
      </div>
      <upload-img :limit="limit" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="openUpload = false">取 消</el-button>
        <el-button type="primary" @click="preserve">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import uploadImg from './uploadImg'
export default {
  data() {
    return {
      openUpload: false,
      seen: false,
      isPreview: false //判断是否有图片
    }
  },
  props: { typeName: String, typeIcon: String, limit: Number },
  components: {
    uploadImg
  },
  methods: {
    visible() {
      this.seen = true
    },
    invisible() {
      this.seen = false
    },
    preserve() {
      this.openUpload = false
      // this.$emit('getUploadImg',this.)
      window.console.log('baocuo ')
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-box {
  margin: 20px;
}
.upload-name {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px 6px 0px 0px;
  box-sizing: border-box;
  width: 200px;
  height: 108px;
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
  .typeIcon {
    font-size: 40px;
  }
}
.upload-card {
  width: 200px;
  height: 40px;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 0px 0px 6px 6px;
  box-sizing: border-box;
  line-height: 40px;
  text-align: center;
  border-top: none;
}
.isShow {
  width: 198px;
  position: relative;
  left: 0px;
  top: -147px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  border-radius: 6px;
  font-size: 18px;
  line-height: 148px;
  height: 148px;
  text-align: center;
}
.preview-box {
  color: #ffffff;
  margin: 20px;
}
.send-box {
  color: #ffffff;
  margin: 20px;
}
.slot-title-box {
  font-size: 4px;
  color: #4e4343;
  margin-left: 10px;
}
// .dialog-title /deep/ .el-dialog__header {
//   border-bottom: 1px solid #cccc;
// }
// .dialog-footer /deep/ .el-dialoel-dialog__footer {
//   border: 1px solid #cccc;
// }
</style>
