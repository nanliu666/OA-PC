<template>
  <common-upload
    v-model="fileList"
    :disabled="disabled"
    class="uploader"
    :before-upload="beforeImageUpload"
    :class="{ 'btn-disabled': disabled }"
  >
    <template #default>
      <div
        v-if="!disabled"
        class="uploader__btn"
      >
        <i class="el-icon-plus uploader-icon" />
      </div>
      <ul class="upload-ul">
        <li
          v-for="(item, index) in uploadList"
          :key="index"
          class="upload-li"
          @click.stop="() => void 0"
        >
          <div class="upload-detail-box">
            <i class="el-icon-document" />
            <span class="upload-detail">{{ item.localName }}</span>
          </div>
          <i
            v-if="!disabled"
            class="el-icon-delete"
            @click="deleteUpload(index)"
          />
        </li>
      </ul>
    </template>
  </common-upload>
</template>

<script>
export default {
  name: 'FileUpload',
  components: {
    CommonUpload: () => import('@/components/common-upload/commonUpload')
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
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
        this.$message.error('附件已存在，请勿重复上传')
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
      const isLt100M = file.size / 1024 / 1024 < 100
      if (!isLt100M) {
        this.$message.error('上传图片大小不能超过 100MB!')
      }
      return isLt100M
    }
  }
}
</script>

<style lang="scss" scoped>
$commonWidth: 80px;
.uploader {
  .upload-ul {
    .upload-li {
      margin: 10px 0;
      cursor: default;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 450px;
      height: 20px;
      line-height: 1;
      .el-icon-document {
        margin-right: 4px;
      }
      .upload-detail-box {
        display: flex;
        align-items: center;
      }
      .upload-detail {
        margin-right: 6px;
        display: inline-block;
        max-width: 450 * 0.8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .el-icon-delete {
        align-self: center;
        cursor: pointer;
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
