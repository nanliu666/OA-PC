<template>
  <div class="upload-box">
    <div
      class="upload-name"
      @mouseenter="visible"
      @mouseleave="invisible"
    >
      <i
        :class="typeIcon"
        class="typeIcon iconfont"
      />
      <div
        v-show="seen"
        class="isShow"
      >
        <span
          v-show="showPreview"
          class="preview-box"
          @click="PictureCardPreview"
        >预览</span>
        <span
          class="send-box"
          @click="openUploadBtn"
        >上传</span>
      </div>
    </div>
    <div class="upload-card">
      {{ typeName }}
    </div>
    <el-dialog
      :visible.sync="openUpload"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <div
        slot="title"
        class="dialog-title"
      >
        <span class="typeName">{{ typeName }}</span>
        <span class="slot-title-box">(仅支持2M以内jpg、jpeg、png格式图片上传。)</span>
      </div>
      <upload-img
        :id="id"
        :limit="limit"
        :list-data="listData"
      />
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="medium"
          @click="openUpload = false"
        >
          取 消
        </el-button>
        <el-button
          size="medium"
          type="primary"
          @click="preserve"
        >
          保 存
        </el-button>
      </div>
    </el-dialog>
    <view-pictures ref="viewPicture" />
  </div>
</template>
<script>
import { lookUpAttachmentInfo } from '@/api/personnel/attach'
import viewPictures from './viewPictures'
import uploadImg from './uploadImg'
export default {
  components: {
    uploadImg,
    viewPictures
  },
  props: {
    typeName: { type: String, default: '' },
    typeIcon: { type: String, default: '' },
    limit: { type: Number, default: 15 },
    id: { type: Number, default: 0 },
    listData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      openUpload: false,
      seen: false,
      lookUpData: {
        //查询接口
        pageNo: 1,
        pageSize: 15,
        categoryId: this.id, //附件分类ID
        userId: this.$route.params.userId,
        name: '' //非必填
      },
      firstEnter: true,
      showPreview: false
    }
  },
  mounted() {},
  methods: {
    visible() {
      if (this.firstEnter) {
        lookUpAttachmentInfo(this.lookUpData).then((res) => {
          if (res.totalNum > 0) {
            this.showPreview = true
          }
        })
        this.firstEnter = false
      }
      this.seen = true
    },
    invisible() {
      this.seen = false
    },
    preserve() {
      this.openUpload = false
      // this.$emit('getUploadImg',this.)
    },
    openUploadBtn() {
      this.openUpload = true
    },
    //预览
    PictureCardPreview() {
      lookUpAttachmentInfo(this.lookUpData).then((res) => {
        this.$refs.viewPicture.init(res.data)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-box {
  margin: 20px;
}
.upload-name {
  position: relative;
  background: repeating-linear-gradient(145deg, #115fd4 0, #ffffff 1px, #115fd4 0, #115fd4 12px);
  border: 1px solid #73b9ff;
  border-bottom: none;
  border-radius: 4px 4px 0px 0px;
  box-sizing: border-box;
  width: 189px;
  height: 88px;
  line-height: 100px;
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
    color: #fff;
    line-height: 88px;
  }
  .typeIconImg {
    width: 200px;
    height: 108px;
  }
}
.upload-card {
  width: 189px;
  height: 36px;
  background-color: #fbfdff;
  border: 1px solid #e3e7e9;
  border-radius: 0px 0px 6px 6px;
  box-sizing: border-box;
  line-height: 36px;
  text-align: center;
  border-top: none;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
}
.isShow {
  width: 188px;
  position: absolute;
  left: -1px;
  top: 0px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  border-radius: 4px 4px 0 0;
  font-size: 18px;
  line-height: 87px;
  height: 87px;
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
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #738399;
  margin-left: 15px;
}
/deep/ .el-dialog__header {
  margin: 20px 20px 10px;
  border-bottom: 1px solid #d0d3d6;
}
.typeName {
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #202940;
  line-height: 28px;
}
/deep/ .el-dialog__header {
  padding-left: 0px;
}
/deep/ .el-dialog__footer {
  margin: 20px 20px 10px;
  border-top: 1px solid #d0d3d6;
}
/deep/ .el-upload--picture-card {
  width: 189px;
  height: 124px;
  background: #f5f6f6;
  border: 1px solid #e3e7e9;
  border-radius: 4px;
  border-radius: 4px;
}
/deep/ .el-upload--picture-card i {
  display: none;
}
</style>
