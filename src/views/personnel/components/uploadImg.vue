<template>
  <div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
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
      <i slot="default" class="isonError">重新上传</i>
    </el-upload>
    <!-- <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="true" :append-to-body="true"> -->
    <!-- <img width="100%" :src="dialogImageUrl" alt /> -->
    <viewPictures ref="viewPicture" />
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import viewPictures from './viewPictures'
import { queryUploadData } from '@/api/personnel/uploaddata'
export default {
  props: { limit: Number },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      isonError: false,
      ajaxData: {
        pageNo: 1,
        pageSize: 10,
        categoryId: '33',
        userId: '33',
        name: '33' //非必填
      },
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
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
    //发网络请求初始化数据
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
}
</style>
