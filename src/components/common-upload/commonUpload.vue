<template>
  <el-upload
    ref="upload"
    v-loading="uploading"
    class="upload"
    action=""
    :limit="limit"
    :multiple="multiple"
    :show-file-list="false"
    :http-request="httpRequest"
    :before-upload="beforeUpload"
  >
    <slot />
    <slot
      slot="tips"
      name="tips"
    />
  </el-upload>
</template>

<script>
import { uploadQiniu } from '@/util/uploadQiniu'

export default {
  name: 'CommonUpload',
  props: {
    // 上传前校验
    beforeUpload: {
      type: Function,
      default: () => {}
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: null
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      uploading: false
    }
  },
  methods: {
    httpRequest(file) {
      const that = this
      that.uploading = true
      uploadQiniu(file.file, {
        // next({ total }) {
        //     that.uploadPercent = parseInt(total.percent)
        // },
        error(err) {
          that.uploading = false
          if (err.code === 614) {
            that.$message.error('上传失败，已存在相同文件')
          } else {
            that.$message.error('上传失败，请联系管理员')
            // eslint-disable-next-line
            console.error('upload err:', err)
          }
        },
        complete({ url, fileName }) {
          that.uploading = false
          let newFile = {
            fileUrl: url,
            fileName,
            localName: file.file.name
          }
          let newValue = [newFile]
          if (that.multiple) {
            newValue = [...that.value, newFile]
          }
          that.$emit('input', newValue)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  display: inline-block;
}
</style>
