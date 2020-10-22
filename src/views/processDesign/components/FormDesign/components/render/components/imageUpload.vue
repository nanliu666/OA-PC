<template>
  <common-upload
    v-model="fileList"
    :disabled="disabled"
    :limit="limit"
    class="uploader"
    :before-upload="beforeImageUpload"
    :class="{ 'btn-disabled': disabled }"
  >
    <template #default>
      <ul class="upload-ul">
        <li
          v-for="(item, index) in uploadList"
          :key="index"
          class="upload-li"
          @click.stop="() => void 0"
        >
          <el-image
            class="upload-li-thumbnail"
            fit="fill"
            :src="item.url"
            :preview-src-list="_.map(fileList, ({ url }) => url)"
          />
          <div class="thumbnail-mask">
            <i
              class="el-icon-delete"
              @click="deleteUpload(index)"
            />
          </div>
        </li>
        <div
          v-if="_.size(uploadList) < limit"
          class="uploader__btn"
        >
          <i class="el-icon-plus uploader-icon" />
        </div>
      </ul>
    </template>
  </common-upload>
</template>

<script>
export default {
  name: 'ImageUpload',
  components: {
    CommonUpload: () => import('@/components/common-upload/commonUpload')
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      fileList: [],
      uploadList: []
    }
  },
  watch: {
    fileList(value) {
      if (_.size(value) === 0) return
      let index = _.findIndex(this.uploadList, (item) => item.localName === value[0].localName)
      if (index > -1) {
        this.$message.error('图片已存在，请勿重复上传')
      }
      this.uploadList = _.uniqBy([...this.uploadList, ...value], 'localName')
      this.$emit('input', this.uploadList)
    }
  },
  created() {
    this.fileList = _.isEmpty(this.value) ? [] : this.value
  },
  methods: {
    deleteUpload(index) {
      this.fileList.splice(index, 1)
      this.uploadList.splice(index, 1)
    },
    beforeImageUpload(file) {
      const TYPE_LIST = ['image/jpeg', 'image/jpg', 'image/png']
      const isJPG = _.some(TYPE_LIST, (item) => file.type === item)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片只能是jpeg/jpg/png格式之一!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
$commonWidth: 80px;
.uploader {
  .upload-ul {
    display: flex;
    flex-wrap: wrap;
    .upload-li {
      position: relative;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      width: $commonWidth;
      height: $commonWidth;
      margin: 0 8px 8px 0;
      .upload-li-thumbnail {
        width: 100%;
        height: 100%;
      }
      .thumbnail-mask {
        position: absolute;
        width: $commonWidth;
        height: 30px;
        left: 0;
        bottom: 0;
        opacity: 0;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        color: #ffffff;
        .el-icon-zoom-in {
          margin-right: 10px;
        }
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .uploader__btn {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: $commonWidth;
    height: $commonWidth;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover,
    &:focus {
      border-color: #207efa;
    }
    .uploader-icon {
      font-size: 40px;
      color: #8c939d;
      width: $commonWidth;
      height: $commonWidth;
      line-height: $commonWidth;
      text-align: center;
    }
  }
}
.btn-disabled {
  /deep/ .el-upload {
    cursor: default;
  }
  .uploader__btn {
    &:hover,
    &:focus {
      border-color: #c0ccda;
    }
  }
}
</style>
