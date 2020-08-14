<template>
  <div class="notice-edit">
    <page-header
      :title="title"
      :back="goBack"
      show-back
    />
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="formData"
      label-width="0"
    >
      <el-card class="edit-card">
        <el-form-item prop="title">
          <div class="content-li">
            <div class="li-label">
              <span style="color: red">*</span>
              <span>公告标题：</span>
            </div>
            <el-input
              v-model="formData.title"
              class="input-class"
              placeholder="请输入公告标题"
            />
          </div>
        </el-form-item>
        <div class="upload-li">
          <div class="li-label">
            <span style="color: transparent">*</span>
            <span>上传附件：</span>
          </div>
          <el-upload
            class="upload-box"
            action=""
            :before-remove="beforeRemove"
            multiple
            :limit="uploadLimit"
            accept=".doc,.doxs,.jpg,.jpeg,.png,.pdf,.DOC,.DOCS,.JPG,.JPEG,.PBG,.PDF"
            :on-exceed="handleExceed"
            :http-request="httpRequest"
            :file-list="formData.attachment"
          >
            <el-button
              type="primary"
              size="medium"
            >
              点击上传

              <i class="el-icon-upload el-icon--right" />
            </el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >
              只能上传jpg/doc/pdf文件，且不超过500kb
            </div>
          </el-upload>
        </div>
        <el-progress
          v-show="uploading"
          :stroke-width="6"
          :percentage="uploadPercent"
        />
        <tinymce v-model="formData.content" />
        <div class="button-box">
          <el-button
            type="primary"
            size="medium"
            @click="toPublish"
          >
            发布
          </el-button>
          <el-button
            size="medium"
            @click="toPreview"
          >
            预览
          </el-button>
          <el-button
            size="medium"
            @click="toDrafts"
          >
            存草稿
          </el-button>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import {
  creatNotice,
  publishNotice,
  getNoticeDeatil,
  fixNotice
} from '@/api/noticeCenter/noticeCenter'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { uploadQiniu } from '@/util/uploadQiniu'
import { htmlEncode, htmlDecode } from '@/util/util'
export default {
  name: 'NoticeEdit',
  components: {},
  data() {
    return {
      isPreview: false, // 是否是需要预览
      isSave: false, //是否保存过
      isDraft: false, // 是否是草稿
      uploadLimit: 9,
      uploading: false,
      uploadPercent: 0,
      rules: {
        title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }]
      },
      title: '发布公告',
      formData: {},
      parmasData: {}
    }
  },
  computed: {
    ...mapGetters(['userId', 'noticeDetailVuex'])
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === '/noticeCenter/noticeDrafts') {
        vm.title = '编辑公告'
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    this.validateSave(next)
  },
  created() {
    this.resetInit()
    if (this.noticeDetailVuex) {
      this.formData = this.noticeDetailVuex
    }
    this.isSave = false
    if (this.$route.query.id) {
      this.initData()
    }
  },
  methods: {
    goBack() {
      this.validateSave()
    },
    validateSave(next) {
      if (!this.isPreview) {
        let conditionList = [
          this.formData.title === '',
          this.formData.content === '',
          this.formData.attachment.length === 0
        ]
        if (_.every(conditionList, Boolean) || this.isSave) {
          this.clear(next)
        } else {
          let that = this
          this.$confirm(
            '是否对已编辑的内容进行保存，保存的新闻可以在草稿箱中重新编辑',
            '是否保存?',
            {
              confirmButtonText: '保存',
              cancelButtonText: '不保存',
              type: 'warning'
            }
          )
            .then(() => {
              that.isDraft = true
              that.toDrafts()
              that.clear(next)
            })
            .catch(() => {
              that.$message({
                type: 'info',
                message: 'oh~未保存此公告内容！'
              })
              that.clear(next)
            })
        }
      } else {
        next()
      }
    },
    clear(next) {
      this.$refs.ruleForm.clearValidate()
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      if (next) {
        next()
      } else {
        this.isSave = true
        this.$router.go(-1)
      }
    },
    initData() {
      getNoticeDeatil({ id: this.$route.query.id }).then((res) => {
        this.formData.id = res.id
        this.formData.title = res.title
        this.formData.attachment = res.attachment ? res.attachment : []
        this.formData.content = res.content ? htmlDecode(res.content) : ''
        this.formData.userId = this.userId
      })
    },
    resetInit() {
      this.isSave = true
      this.formData = {
        userId: this.userId,
        content: '',
        title: '',
        attachment: []
      }
    },
    httpRequest(file) {
      const that = this
      that.uploading = true
      uploadQiniu(file.file, {
        next({ total }) {
          that.uploadPercent = parseInt(total.percent)
        },
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
        complete({ url }) {
          that.uploading = false
          that.uploadPercent = 0
          let uploadObj = {
            name: file.file.name,
            url: url
          }
          //TODO: 删除后新增再删除有问题
          // console.log('上传之前附件数量==', that.formData.attachment)
          that.formData.attachment.push(uploadObj)
          // console.log('上传之后附件数量==', that.formData.attachment)
        }
      })
    },
    handleExceed(files, attachment) {
      this.$message.warning(
        `当前限制选择 ${this.uploadLimit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + attachment.length} 个文件`
      )
    },
    beforeRemove(file) {
      let that = this
      let index = this.formData.attachment.indexOf(file)
      return this.$confirm(`确定移除 ${file.name}？`).then(() => {
        // console.log('删除之前附件数量==', that.formData.attachment)
        that.formData.attachment.splice(index, 1)
        // console.log('删除之后附件数量==', that.formData.attachment)
        return that.formData.attachment
      })
    },
    validate() {
      this.isPreview = false
      this.parmasData = _.cloneDeep(this.formData)
      if (this.parmasData.content !== '') {
        this.parmasData.content = htmlEncode(this.parmasData.content)
      }
      let isValidate = true
      this.$refs.ruleForm.validate((valid) => {
        isValidate = valid
      })
      return isValidate
    },
    async toPublish() {
      if (!this.validate()) return
      this.isDraft = false
      let data
      if (this.$route.query.id) {
        // 修改
        data = await this.editNotice()
      } else {
        // 完全新建
        data = await this.creatNoticeFun()
      }
      this.publishNoticeFun(data)
    },
    toPreview() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return
        this.isPreview = true
        let previewData = _.cloneDeep(this.formData)
        previewData = Object.assign(previewData, {
          publishTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
          publishUserName: '王华丽'
        })
        this.$store.commit('SET_NOTICE', previewData)
        this.$router.push({
          path: '/noticeCenter/noticeDetail'
        })
      })
    },
    toDrafts() {
      if (!this.validate()) return
      this.isDraft = true
      if (this.$route.query.id) {
        // 修改
        this.editNotice()
      } else {
        // 完全新建
        this.creatNoticeFun()
      }
    },
    editNotice() {
      return fixNotice(this.parmasData).then((res) => {
        if (this.isDraft) {
          this.$message({
            type: 'success',
            message: '已保存至草稿！'
          })
          this.resetInit()
          this.$router.push({
            path: '/noticeCenter/noticeDrafts'
          })
        }
        return res
      })
    },
    creatNoticeFun() {
      return creatNotice(this.parmasData).then((res) => {
        if (this.isDraft) {
          this.$message({
            type: 'success',
            message: '已保存至草稿！'
          })
          this.resetInit()
          this.$router.push({
            path: '/noticeCenter/noticeDrafts'
          })
        }
        return res
      })
    },
    publishNoticeFun(data) {
      publishNotice({ id: data, userId: this.userId }).then(() => {
        this.$message({
          type: 'success',
          message: '已成功发布！'
        })
        this.resetInit()
        this.$router.push({
          path: '/noticeCenter/noticeManage'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.notice-edit {
  .edit-card {
    margin-bottom: 24px;
  }
  .content-li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .li-label {
      font-size: 16px;
      color: #0e001c;
      margin-right: 16px;
    }
    .input-class {
      flex: 1;
    }
  }
  .upload-li {
    display: flex;
    padding: 15px 0;
    border-top: 1px solid #e3e7e9;
    justify-content: flex-start;
    .li-label {
      font-size: 16px;
      color: #0e001c;
      margin-right: 16px;
    }
    .upload-box {
      .el-upload__tip {
        font-size: 12px;
        color: #757c85;
        margin: 4px;
      }
    }
  }
  .button-box {
    margin-top: 20px;
  }
}
</style>
