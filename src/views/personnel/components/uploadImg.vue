<template>
  <div>
    <div class="upload-box">
      <!-- <div
        :class="['image__wr', file.fileType !== 'image' && file.fileType !== 'video' && 'icon__wr']"
        v-for="(file, index) in fileList"
        :key="index"
      >
        <img :src="file.url" />
        <i class="el-icon-view iconView"></i>
      </div> -->

      <el-upload
        action=""
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
        accept="image/jpeg,image/jpg,image/png"
      >
        <i slot="default" v-if="isonError" class="isonError">重新上传</i>
        <i class="el-icon-plus" v-else></i>
      </el-upload>
      <el-progress v-show="uploading" :text-inside="true" :stroke-width="20" :percentage="uploadPercent"></el-progress>
    </div>

    <view-pictures ref="viewPicture" />
  </div>
</template>

<script>
import viewPictures from './viewPictures'
import { queryUploadData, deleteUploadData, sendUploadData, reviseUploadData } from '@/api/personnel/uploaddata'
import { uploadQiniu } from '@/util/uploadQiniu'
export default {
  props: { limit: { type: Number, default: '' }, id: { type: Number, default: '' } },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      isonError: false,
      uploading: false,
      uploadPercent: 0,
      ajaxData: {
        //查询接口
        pageNo: 1,
        pageSize: 10,
        categoryId: this.id,
        userId: this.$store.getters.userId,
        name: '' //非必填
      },
      delete: {
        //删除接口
        id: this.id //材料附件ID
      },
      sendData: {
        //上传接口
        userId: this.$store.getters.userId, //用户ID
        categoryId: this.id, //	附件分类ID
        attachments: [{ name: '', url: '' }]
      },
      reviseData: {
        id: this.id, //	材料附件ID
        categoryId: '', //附件分类ID(分必填)
        name: '' //	附件源文件名称，不能超过32个字(分必填)
      },
      fileList: []
    }
  },
  components: {
    // this.$store.state.userData.xxx
    viewPictures
  },
  mounted() {
    this.initData()
  },
  methods: {
    //删除
    handleRemove(file, fileList) {
      //删除接口
      this.delete.id = file.id
      deleteUploadData(this.delete).then((res) => {})
    },
    //预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      window.console.log(file, '文件夹')
      this.$refs.viewPicture.init(this.fileList, this.fileList.length)
      this.dialogVisible = true
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
      queryUploadData(this.ajaxData).then((res) => {
        this.fileList = res.data
      })
    }
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
  display: flex;
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
