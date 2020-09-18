<template>
  <div>
    <el-upload
      action
      :http-request="uploadRequst"
      :show-file-list="false"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess"
      :multiple="true"
      :on-error="onError"
      :on-exceed="exceedFun"
      accept="image/jpeg, image/jpg, image/png"
    >
      <i
        v-if="isonError"
        slot="default"
        class="isonError"
      >重新上传</i>
      <!-- 进度条 -->
      <div class="action-upload">
        <el-progress
          v-show="uploading"
          :stroke-width="6"
          :percentage="uploadPercent"
        />
        <el-image
          v-show="!uploading && imageUrl"
          style="width: 100px; height: 100px"
          :src="imageUrl"
          fit="contain"
        />
        <!--                  <span v-show="!uploading">点击上传</span>-->
      </div>
    </el-upload>
  </div>
</template>

<script>
import { uploadQiniu } from '@/util/uploadQiniu'
export default {
  name: 'UploadIamge',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageUrl: '',
      noFile: true,
      isonError: false,
      uploading: false,
      uploadPercent: 0,
      lookUpData: {
        //查询接口
        pageNo: 1,
        pageSize: 10,
        categoryId: this.id,
        userId: this.$route.params.userId,
        name: '' //非必填
      },
      deleteData: {
        //删除接口
        id: this.id //材料附件ID
      },
      uploadData: {
        //上传接口
        userId: this.$route.params.userId, //用户ID
        categoryId: this.id, //	附件分类ID
        attachments: [{ name: '', url: '' }]
      },
      modifyData: {
        id: this.id, //	材料附件ID
        categoryId: '', //附件分类ID(分必填)
        name: '' //	附件源文件名称，不能超过32个字(分必填)
      },
      fileList: [],
      pictureList: [],
      uploadItem: {},
      changeAttachmentDialog: false
    }
  },
  watch: {
    url: {
      handler(data) {
        this.imageUrl = data
      },
      immediate: true
    }
  },
  methods: {
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
          // eslint-disable-next-line
        },
        complete(data) {
          that.uploading = false
          that.imageUrl = data.url
          that.$emit('update:url', that.imageUrl)
          that.handleAvatarSuccess()
          that.uploadPercent = 0
        }
      })
    },
    beforeAvatarUpload(file) {
      // eslint-disable-next-line  no-control-regex
      if (file.name.replace(/[\x00-\xff]/gi, '--').length > 64) {
        this.$message.error('文件名过长,无法上传')
        return false
      }
      const isJPG = /^image\/(jpeg|png|jpg)$/.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 jpg、jpeg、png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess() {
      // const self = this
      // self.$message.success('上传成功')
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    exceedFun() {
      this.$message.error('上传附件数量超过限制')
    },
    onError() {
      this.isonError = true
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-upload--picture-card {
  width: 102px;
  height: 102px;
}
</style>
