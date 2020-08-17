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
            :on-remove="handleRemove"
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
      formData: {
        userId: this.userId,
        content: '',
        title: '',
        attachment: []
      },
      parmasData: {},
      compareAttachment: []
    }
  },
  computed: {
    ...mapGetters(['userId', 'noticeDetailVuex', 'userInfo'])
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 草稿箱进入，需要显示标题为编辑公告
      if (from.path === '/noticeCenter/noticeDrafts') {
        vm.title = '编辑公告'
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    this.validateSave(next)
  },
  created() {
    if (this.$route.query.id) {
      // 编辑的时候，需要通过详情接口拿回数据，再做处理
      this.initData()
    } else {
      // 完全新增的时候，判断vuex是否存在，存在就使用vuex的数据
      this.setVuexData()
    }
  },
  methods: {
    /**
     * 手动返回
     */
    goBack() {
      this.validateSave()
    },
    /**
     * 验证保存
     * 在手动点击右箭头返回（无法传入next），以及其他路由离开之前的验证
     */
    validateSave(next) {
      // 预览离开，不做校验
      if (this.isPreview) {
        next()
      } else {
        let conditionList = [
          this.formData.title === '',
          this.formData.content === '',
          this.formData.attachment.length === 0
        ]
        // 不存在内容（填写了标题或者上传了文件或者富文本内有数据）或者已经保存后可以直接返回
        if (_.every(conditionList, Boolean) || this.isSave) {
          this.clear(next)
        } else {
          // 不满足以上条件需要进行保存确认
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
              // 存草稿操作
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
      }
    },
    /**
     * 清除标签，执行退出当前页面，清除表格内数据
     */
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
    /**
     * 处理预览返回后的显示问题（编辑进入预览、完全新增预览）
     */
    setVuexData() {
      if (this.noticeDetailVuex) {
        this.formData = this.noticeDetailVuex
      }
    },
    /**
     * 编辑的时候初始化数据
     */
    initData() {
      getNoticeDeatil({ id: this.$route.query.id }).then((res) => {
        this.formData = res
        this.formData.attachment = res.attachment ? res.attachment : []
        // 用来比较编辑的时候修改附件后，之前的附件数据
        this.compareAttachment = _.cloneDeep(this.formData.attachment)
        // 回显富文本需要解码
        this.formData.content = res.content ? htmlDecode(res.content) : ''
        this.formData.userId = this.userId
        this.setVuexData()
      })
    },
    /**
     * 上传文件
     */
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
          that.formData.attachment.push(uploadObj)
        }
      })
    },
    /**
     * 超限提醒
     */
    handleExceed(files, attachment) {
      this.$message.warning(
        `当前限制选择 ${this.uploadLimit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + attachment.length} 个文件`
      )
    },
    /**
     * 移除附件处理
     */
    handleRemove(file) {
      // 实现缩略图模板时删除文件
      let fileList = this.formData.attachment
      let index = fileList.findIndex((fileItem) => {
        return fileItem.uid === file.uid
      })
      this.formData.attachment.splice(index, 1)
    },
    /**
     * 提交前的数据处理以及表单验证
     */
    validate() {
      this.isPreview = false
      // 参数深克隆一次，因为显示富文本和传值的不一样
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
    /**
     * 发布
     */
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
    /**
     * 预览
     */
    toPreview() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return
        this.isPreview = true
        // 预览的数据，深克隆一次，然后添加发布时间和发布人
        let previewData = _.cloneDeep(this.formData)
        previewData = Object.assign(previewData, {
          publishTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
          publishUserName: this.userInfo.nick_name
        })
        this.$store.commit('SET_NOTICE', previewData)
        this.$router.push({
          path: '/noticeCenter/noticeDetail'
        })
      })
    },
    /**
     * 存草稿
     */
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
    /**
     * 编辑修改
     */
    editNotice() {
      // 取并集
      let targetAttachment = _.unionBy(this.parmasData.attachment, this.compareAttachment, 'name')
      // 取差集
      let xorArray = _.xorBy(this.parmasData.attachment, this.compareAttachment, 'name')
      // 取删除的数组 -- 用差集和之前的笔记得出删除的部分
      let delArray = _.intersectionBy(this.compareAttachment, xorArray, 'name')
      // 取新增的数组 -- 用差集和现在参数比较得出新增的部分
      let addArray = _.intersectionBy(this.parmasData.attachment, xorArray, 'name')
      targetAttachment.map((item) => {
        delArray.map((addItem) => {
          if (item.name === addItem.name) {
            item.operatorType = 'Del'
          }
        })
        addArray.map((addItem) => {
          if (item.name === addItem.name) {
            item.operatorType = 'Add'
          }
        })
      })
      this.parmasData.attachment = targetAttachment
      return fixNotice(this.parmasData).then((res) => {
        this.daraftSuccess()
        return res
      })
    },
    /**
     * 新建公告
     */
    creatNoticeFun() {
      return creatNotice(this.parmasData).then((res) => {
        this.daraftSuccess()
        return res
      })
    },
    /**
     * 成功提示
     */
    daraftSuccess() {
      if (this.isDraft) {
        this.$message({
          type: 'success',
          message: '已保存至草稿！'
        })
        this.isSave = true
        this.$router.push({
          path: '/noticeCenter/noticeDrafts'
        })
      }
    },
    /**
     * 发布公告
     */
    publishNoticeFun(data) {
      publishNotice({ id: data, userId: this.userId }).then(() => {
        this.$message({
          type: 'success',
          message: '已成功发布！'
        })
        this.isSave = true
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
      /deep/.el-upload-list__item {
        width: 80%;
      }
    }
  }
  .button-box {
    margin-top: 20px;
  }
}
</style>
