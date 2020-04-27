<template>
  <div>
    <div class>
      <div class="upload">
        <div class="upload-box">
          <div class="upload-after">
            <img src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" alt />
            <span class="pictures">
              <i class="el-icon-zoom-in common-right"></i>
            </span>
            <span class="pictures">
              <i class="el-icon-delete common-left"></i>
            </span>
          </div>
        </div>
      </div>
      <el-upload
        action
        :http-request="uploadRequst"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :limit="limit"
        :on-exceed="handleExceed"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :file-list="fileList"
        :multiple="true"
        :on-error="onError"
        accept="image/jpeg, image/jpg, image/png"
      >
        <i slot="default" v-if="isonError" class="isonError">重新上传</i>
        <i class="el-icon-plus" v-else></i>
        <el-progress v-show="uploading" type="circle" :stroke-width="6" :percentage="uploadPercent"></el-progress>
      </el-upload>
    </div>
    <view-pictures ref="viewPicture" />
  </div>
</template>
<script>
import viewPictures from './viewPictures'
import {
  lookUpAttachmentInfo,
  deleteAttachmentInfo,
  uploadAttachmentInfo,
  modifyAttachmentInfo
} from '@/api/personnel/attach'
import { uploadQiniu } from '@/util/uploadQiniu'
export default {
  props: { limit: { type: Number, default: '' }, id: { type: Number, default: '' } },
  data() {
    return {
      showViewer: false,
      list: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ],
      isonError: false,
      uploading: false,
      uploadPercent: 0,
      lookUpData: {
        //查询接口
        pageNo: 1,
        pageSize: 10,
        categoryId: this.id,
        userId: this.$store.getters.userId,
        name: '' //非必填
      },
      deleteData: {
        //删除接口
        id: this.id //材料附件ID
      },
      uploadData: {
        //上传接口
        userId: this.$store.getters.userId, //用户ID
        categoryId: this.id, //	附件分类ID
        attachments: [{ name: '', url: '' }]
      },
      modifyData: {
        id: this.id, //	材料附件ID
        categoryId: '', //附件分类ID(分必填)
        name: '' //	附件源文件名称，不能超过32个字(分必填)
      },
      fileList: [],
      pictureList: []
    }
  },
  components: {
    viewPictures
  },
  mounted() {
    this.initData()
  },
  methods: {
    //删除
    handleRemove(file, fileList) {
      //删除接口
      this.deleteData.id = file.id
      deleteAttachmentInfo(this.deleteData).then((res) => {})
    },
    //预览
    handlePictureCardPreview(file) {
      console.log(file, 'file0000', file.id)
      this.showViewer = true
      this.$refs.viewPicture.init(this.fileList)
    },
    handleExceed(file, fileList) {
      const that = this
      that.$message.warning('此证照只能上传两张哦')
    },
    uploadRequst(file) {
      const that = this
      that.uploading = true
      uploadQiniu(file.file, {
        next({ total }) {
          that.uploadPercent = parseInt(total.percent)
        },
        error(err) {
          that.uploading = false
          that.$message.error(err.message)
          // that.uploading = false;
          // eslint-disable-next-line
        },
        complete(res) {
          that.uploading = false
          that.$message.success('上传成功')
          // that.uploading = false;
          // that.selectedUrl = res.url;
          // that.fileList.push({
          //   categoryId: that.parentCategoryId,
          //   materialName: file.file.name,
          //   materialUrl: res.url,
          //   viewUrl,
          //   fileType,
          //   type: 'MATERIAL',
          //   size: file.file.size,
          //   url: res.url
          // })
          // that.$emit('selectCallback', res.url, fileName);
          // that.close();
          that.uploadPercent = 0
        }
      })
    },
    beforeAvatarUpload(file) {
      if (file.name.replace(/[^\x00-\xff]/gi, '--').length > 64) {
        this.$message.error('文件名过长,无法上传')
        return false
      }
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 jpg、jpeg、png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess(res, file) {
      const self = this
      self.$message.success('上传成功')
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    onError() {
      this.isonError = true
    },
    //发网络请求初始化数据--附件查询
    initData() {
      lookUpAttachmentInfo(this.lookUpData).then((res) => {
        this.fileList = res.data

        // this.pictureList = res.data.map((item) => {
        //   return item.url
        // })
        // console.log(this.fileList, 'this.fileList')
      })
    }
    // closeViewer() {
    //   this.showViewer = false
    // }
  }
}
</script>

<style lang="scss" scoped>
.iconView {
  height: 146px;
  width: 146px;
  // background: rgba(0, 0, 0, 0.5);
  top: 50%;
  left: 50%;
  margin-left: -73px;
  margin-top: -73px;
  position: absolute;
  text-align: center;
  line-height: 146px;
}
.el-icon-view {
  font-size: 14px;
}
.upload-box {
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  margin: 0 8px 8px 0;
  display: inline-block;
  position: relative;
}
.upload-after {
  border-radius: 6px;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-left {
  margin-left: 10px;
}
.common-right {
  margin-left: 0px;
  margin-right: 10px;
}
.isonError {
  color: red;
}
.upload-title {
  height: 20px;
  width: 146px;
  border: 1px solid #cccc;
  text-align: center;
  line-height: 20px;
  margin-top: -10px;
  border-radius: 6px;
}

.image__wr {
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  margin: 0 8px 8px 0;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  img {
    margin: auto;
    width: 100%;
    height: 100%;
  }
  .icon-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    font-size: 50px;
    color: white;
  }
  &.icon__wr {
    img {
      width: initial;
      height: initial;
      width: 146px;
      height: 146px;
    }
  }
}
</style>
