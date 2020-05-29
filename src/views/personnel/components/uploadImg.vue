<template>
  <div>
    <div class>
      <div class="upload">
        <template :class="noFile ? 'no-file' : 'image-list'">
          <div
            v-for="(item, index) in fileList"
            :key="index"
            class="upload-box"
          >
            <div class="molde">
              <img
                class="upload-img"
                :src="item.url"
                alt
              >
              <div class="upload-after">
                <span
                  class="pictures"
                  @click="isPictures(index, item)"
                >
                  <i class="el-icon-view common-right" />
                </span>
                <span
                  class="pictures"
                  @click="isDelete(index, item.id)"
                >
                  <i class="el-icon-delete common-left" />
                </span>
              </div>
              <div class="upload-name">
                {{ item.name }}
              </div>
            </div>
          </div>
        </template>
        <el-upload
          v-show="!(limit === fileList.length)"
          action
          :http-request="uploadRequst"
          :show-file-list="false"
          list-type="picture-card"
          :limit="limit"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :multiple="true"
          :on-error="onError"
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
            <span v-show="!uploading">点击上传</span>
          </div>
        </el-upload>
      </div>
    </div>
    <view-pictures ref="viewPicture" />
  </div>
</template>
<script>
import viewPictures from './viewPictures'
import {
  lookUpAttachmentInfo,
  deleteAttachmentInfo,
  uploadAttachmentInfo
} from '@/api/personnel/attach'
import { uploadQiniu } from '@/util/uploadQiniu'
export default {
  name: 'UploadImg',
  components: {
    viewPictures
  },
  props: { limit: { type: Number, default: 15 }, id: { type: Number, default: 0 } },
  data() {
    return {
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
      uploadItem: {}
    }
  },
  watch: {
    fileList: {
      handler(data) {
        if (data.length > 0) {
          this.noFile = false
        } else {
          this.noFile = true
        }
      },
      deep: true
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    isPictures(index) {
      let tempImgList = [...this.fileList]
      let temp = []
      for (let i = 0; i < index; i++) {
        temp.push(tempImgList.shift())
      }
      this.$refs.viewPicture.init(tempImgList.concat(temp))
    },
    isDelete(index, id) {
      this.$confirm('您确认要删除该文件吗？', '删除文件？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteData.id = id
        this.fileList.splice(index, 1)
        deleteAttachmentInfo(this.deleteData).then(() => {
          // this.fileList.splice(index, 1)
          this.initData()
        })
      })
    },

    // handleExceed(file, fileList) {
    //   const that = this
    //   that.$message.warning('此证照只能上传两张哦')
    // },
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
          const params = {
            userId: that.$route.params.userId,
            categoryId: that.id,
            attachments: [{ name: file.file.name, url: data.url }]
          }
          uploadAttachmentInfo(params).then(() => {
            that.$message.success('上传成功')
            that.initData()
          })
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
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.image-list {
  display: none;
}
.upload {
  display: flex;
  flex-wrap: wrap;
}
.upload-img {
  border-radius: 4px 4px 0 0;
  width: 191px;
  height: 88px;
  z-index: 3;
}
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
  // overflow: hidden;
  background-color: #fff;
  // border: 1px solid #c0ccda;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 191px;
  height: 90px;
  margin: 0 8px 45px 0;
  display: inline-block;
  position: relative;
}
.upload-after {
  border-radius: 4px 4px 0 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
}
.molde:hover .upload-after {
  border-radius: 4px 4px 0 0;
  position: absolute;
  width: 191px;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.common-left {
  margin-left: 10px;
}
.common-right {
  width: 14px;
  height: 9px;
  margin-left: 0px;
  margin-right: 10px;
  font-size: 22px;
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
/deep/ .action-upload {
  height: 124px;
  line-height: 124px;
  border-radius: 2px;
  border-radius: 2px;
  background: #f5f6f6;
}
/deep/ .action-upload span {
  width: 109px;
  height: 32px;
  border: 1px dashed #207efa;
  padding: 8px 30px;
  color: #207efa;
  background: #ffffff;
}
.upload-name {
  text-align: center;
  line-height: 36px;
  margin-top: -4px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #202940;
  overflow: hidden;
  height: 36px;
  width: 189px;
  border: 1px solid #e3e7e9;
  border-radius: 0 0 4px 4px;
}
/deep/ .el-progress {
  line-height: 9;
}
</style>
