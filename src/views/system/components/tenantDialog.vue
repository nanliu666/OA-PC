<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialog"
      width="550px"
      append-to-body
      :before-close="handleClose"
    >
      <div v-loading="loading">
        <div>
          <commonForm
            ref="form"
            :model="form"
            :columns="columns"
          >
            <template slot="logo">
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
                  <span v-show="!uploading">点击上传</span>
                </div>
              </el-upload>
            </template>
            <template slot="favicon">
              上传favicon
            </template>
          </commonForm>
        </div>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="medium"
            @click="handleClose"
          >
            取 消
          </el-button>
          <el-button
            type="primary"
            size="medium"
            @click="onsubmit"
          >
            确 定
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postTenant, putTenant } from '@/api/system/tenant'
import { uploadQiniu } from '@/util/uploadQiniu'
import { lookUpAttachmentInfo, uploadAttachmentInfo } from '@/api/personnel/attach'
export default {
  name: 'CreateTenant',
  props: {
    title: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      limit: 1,
      type: '',
      newDialog: false,
      infoText: [],
      loading: false,
      form: {
        tenantId: '',
        tenantName: '',
        domain: '',
        copyright: '',
        logo: '',
        favicon: ''
      },
      dialog: true,
      columns: [
        {
          span: 24,
          prop: 'tenantId',
          itemType: 'input',
          label: '租户ID',
          required: true
        },
        {
          span: 24,
          prop: 'tenantName',
          itemType: 'input',
          label: '租户名称',
          required: true
        },
        {
          span: 24,
          prop: 'domain',
          itemType: 'input',
          label: '绑定域名',
          required: true
        },
        {
          span: 24,
          prop: 'copyright',
          itemType: 'input',
          label: '版权',
          required: true
        },
        {
          span: 24,
          prop: 'logo',
          itemType: 'slot',
          label: 'logo链接',
          required: true
        },
        {
          span: 24,
          prop: 'favicon',
          itemType: 'slot',
          label: '网站图标',
          required: true
        }
      ],

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
    dialog: {
      handler: function() {
        this.$emit('update:dialogVisible', this.dialog)
      }
    },
    row: {
      handler: function(data) {
        let { tenantId, tenantName, domain, copyright, logo, favicon } = data
        this.form = {
          tenantId,
          tenantName,
          domain,
          copyright,
          logo,
          favicon
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onsubmit() {
      this.$refs.form.validate().then(() => {
        let params = {
          ...this.form
        }
        this.loading = true
        let tenant = this.row.tenantId ? putTenant : postTenant
        tenant(params)
          .then(() => {
            this.dialog = false
            this.$listeners.updataData()
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false
            }, 1000)
          })
      })
    },
    handleClose() {
      this.dialog = false
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
    exceedFun() {
      this.$message.error('上传附件数量超过限制')
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
/deep/ .el-dialog__header {
  padding: 16px 0;
  margin: 0 24px;
  border-bottom: 1px solid rgba(208, 211, 214, 0.44);
  font-size: 18px;
  color: #202940;
  line-height: 24px;
}

/deep/ .el-dialog__body {
  padding: 24px;
}

/deep/ .el-dialog__footer {
  padding: 0px 24px 24px;
}

/deep/ .el-form-item__label {
  line-height: 20px;
  font-size: 14px;
  color: #0f0000;
}

/deep/ .el-form-item {
  margin-bottom: 24px;
}
.dialog-footer {
  text-align: right;
}
</style>
