<template>
  <div>
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
    >
      <i slot="default" v-if="isonError" class="isonError">重新上传</i>
      <i class="el-icon-plus" v-else></i>
    </el-upload>
    <viewPictures ref="viewPicture" />
  </div>
</template>

<script>
import viewPictures from './viewPictures'
import { queryUploadData, deleteUploadData, sendUploadData, reviseUploadData } from '@/api/personnel/uploaddata'
import { uploadQiniu } from '@/util/uploadQiniu'
export default {
  props: { limit: Number },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      isonError: false,
      ajaxData: {
        //查询接口
        pageNo: 1,
        pageSize: 10,
        categoryId: '33',
        userId: '33',
        name: '33' //非必填
      },
      delete: {
        //删除接口
        id: '' //材料附件ID
      },
      sendData: {
        //上传接口
        userId: '', //用户ID
        categoryId: '', //	附件分类ID
        attachments: [{ name: '', url: '' }]
      },
      reviseData: {
        id: '', //	材料附件ID
        categoryId: '', //附件分类ID(分必填)
        name: '' //	附件源文件名称，不能超过32个字(分必填)
      },
      fileList: [
        {
          id: 2, //	附件材料ID
          userId: 2, //用户ID
          categoryId: 2, //附件分类ID
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          id: 2, //	附件材料ID
          userId: 2, //用户ID
          categoryId: 2, //附件分类ID
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          id: 2, //	附件材料ID
          userId: 2, //用户ID
          categoryId: 2, //附件分类ID
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          id: 2, //	附件材料ID
          userId: 2, //用户ID
          categoryId: 2, //附件分类ID
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
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
      this.delete.id = file.id
      deleteUploadData(this.delete).then((res) => {
        window.console.log(res, '删除')
      })
      console.log(file, fileList, '删除')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.$refs.viewPicture.init(this.fileList, this.fileList.length)
      this.dialogVisible = true
    },
    handleExceed(file, fileList) {
      const self = this
      self.$message.warning('身份证照只能上传两张哦')
    },
    uploadRequst(config) {
      var observer = {
        next(res) {
          console.log(res)
        },
        error(err) {
          console.log(res)
        },
        complete(res) {
          console.log(res)
        }
      }
      uploadQiniu(config.file, observer).catch((err) => console.error(err))
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
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
        window.console.log(res, '获得材料接口')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.isonError {
  color: red;
}
</style>
