<template>
  <div
    ref="wrapper"
    class="NewsEdit wrapper"
  >
    <page-header
      title="新闻发布"
      :back="() => handleBack()"
      show-back
    />

    <basic-container
      v-loading="loading"
      block
    >
      <common-form
        ref="form"
        :columns="formColumns"
        :model="formData"
        :config="{
          labelPosition: 'left',
          labelWidth: '120px'
        }"
      >
        <template #picUrl>
          <common-upload
            v-model="uploader.fileList"
            :limit="uploader.limit"
            class="uploader"
          >
            <template #default>
              <div
                v-if="_.size(uploader.fileList) < uploader.limit && _.isNil(formData.picUrl)"
                class="uploader__btn"
              >
                <i class="icon-tips-plus-outlined" />
                <span class="uplader__btn--text">点击上传</span>
              </div>

              <div
                v-else
                class="uploader__previewer"
                @click.stop="() => void 0"
              >
                <el-image
                  style="width: 100px; height: 100px"
                  :src="formData.picUrl"
                  :preview-src-list="_.map(uploader.fileList, ({ fileUrl }) => fileUrl)"
                />
              </div>
            </template>

            <template slot="tip">
              <span
                v-if="_.size(uploader.fileList) < uploader.limit && _.isNil(formData.picUrl)"
                class="uploader__description"
              >
                图片大小不超过5M
              </span>
              <el-button
                v-else
                type="text"
                @click="() => handleUploaderRemove()"
              >
                删除封面
              </el-button>
            </template>
          </common-upload>
        </template>
      </common-form>

      <div class="container__editor">
        <tinymce v-model="formData.content" />
      </div>

      <div class="container__buttons">
        <el-button
          :loading="submitting"
          size="medium"
          type="primary"
          @click="() => handlePublishBtnClick()"
        >
          发布
        </el-button>
        <el-button
          size="medium"
          @click="() => handlePreviewBtnClick()"
        >
          预览
        </el-button>
        <el-button
          size="medium"
          @click="() => handleSaveDraftBtnClick().catch((error) => error)"
        >
          存草稿
        </el-button>
      </div>
    </basic-container>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  getNewsCategory,
  postV1News,
  postNewsPublish,
  getNewsDetail,
  putV1News
} from '@/api/newsCenter/newCenter'
import CommonUpload from '@/components/common-upload/commonUpload'
import { mapGetters } from 'vuex'

// 接口需要的参数
const API_PARAMS = ['id', 'title', 'categoryId', 'picUrl', 'content', 'brief', 'userId']
// vue 深度监听
const vmSetDeep = (target, key, value) => {
  const set = Vue.set
  if (_.isObject(value)) {
    set(target, key, _.isArray(value) ? [] : {})
    for (let k in value) {
      vmSetDeep(target[key], k, value[k])
    }
  } else {
    set(target, key, value)
  }
}

export default {
  name: 'NewsEdit',
  components: {
    CommonUpload
  },

  data() {
    const FORM_COLUMNS = [
      {
        itemType: 'input',
        label: '新闻标题',
        prop: 'title',
        required: true,
        span: 24
      },
      {
        itemType: 'select',
        label: '新闻栏目',
        options: [],
        prop: 'categoryId',
        props: {
          label: 'name',
          value: 'id'
        },
        required: true,
        span: 24
      },
      {
        itemType: 'slot',
        label: '添加封面',
        prop: 'picUrl',
        props: {
          label: 'jobName',
          value: 'id'
        },
        required: true,
        span: 24
      }
    ]
    return {
      formColumns: FORM_COLUMNS,
      loading: false,
      formData: {},

      uploader: {
        fileList: [],
        limit: 1,
        loading: false,
        previewVisible: false,
        progress: 0
      },
      submitting: false,
      hasEdit: false // 用于标记是否进行了修改
    }
  },

  computed: {
    // 根据 formData.content生成brief
    brief() {
      const { content } = this.formData
      const BRIEF_MAX_LEN = 200 // 长度限制为200
      // 清除所有的tag元素,并 反转义 得到 原始的数据
      return _(content)
        .replace(new RegExp('<[^>]*>', 'g'), '')
        .substr(0, BRIEF_MAX_LEN)
        .trim()
    },

    // 查询参数
    _formData() {
      const { userId, brief } = this
      const formData = _.cloneDeep(this.formData)
      formData.content = _.escape(formData.content)
      return _(null)
        .assign(formData, { userId, brief })
        .pick(API_PARAMS)
        .value()
    },

    id() {
      return this.$route.query.id || null
    },
    // userId() {
    //   return this.$route.query.userId || null
    // }

    ...mapGetters(['userId'])
  },

  watch: {
    // 同步uploader与表单
    'uploader.fileList'(val) {
      const file = _.head(val)
      const url = _.get(file, 'fileUrl', null)
      this.$set(this.formData, 'picUrl', url)
    },

    formData: {
      deep: true,
      handler() {
        this.clearValidate()
        this.hasEdit = true
      }
    }
  },

  // 路由hook
  beforeRouteEnter(to, from, next) {
    to.meta.$keepAlive = false // 禁用页面缓存
    const { raw } = to.params
    next((vm) => {
      for (let prop in raw) {
        vmSetDeep(vm, prop, raw[prop])
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    next()
  },

  created() {
    this.refresh()
  },

  methods: {
    handlePublishBtnClick() {
      this.validate()
        .then(async () => {
          try {
            await this.$confirm('确认发布新闻吗？', '提示', {
              type: 'info'
            })
            try {
              this.submitting = true
              // 需要先存为草稿再发布新闻
              const { id } = await this.postNews(_.pickBy(this._formData))
              await this.publishNews(id)
              this.$message.success('发布成功')
              this.hasEdit = false
              this.handleBack()
            } catch (error) {
              this.$message.error(error.message)
            } finally {
              this.submitting = false
            }
          } catch (error) {
            this.$message.info('取消操作')
          }
        })
        .catch((error) => {
          _.isString(error) && this.$message.warning(error)
          this.scrollTop() // 校验不通过的时候到顶部的提示文本处
        })
    },
    handlePreviewBtnClick() {
      const { _formData } = this
      this.$router.push(
        {
          path: '/newsCenter/newsDetail'
        },
        (route) => {
          route.params.data = _formData
          route.params.raw = _.cloneDeep(this.$data) // 传递原始数据
        }
      )
    },
    handleSaveDraftBtnClick() {
      return this.validate()
        .then(async () => {
          try {
            await this.$confirm('确认存储草稿吗？', '提示', {
              type: 'info'
            })
            _.isNull(this.id)
              ? await this.postNews(_.pickBy(this._formData))
              : await this.updateNews(_.pickBy(this._formData))
            this.$message.success('保存成功')
            this.hasEdit = false
            this.handleBack()
          } catch (error) {
            this.$message.info('取消操作')
            throw new Error('取消操作')
          }
        })
        .catch((error) => {
          this._.isString(error) && this.$message.warning(error)
          this.scrollTop() // 校验不通过的时候到顶部的提示文本处
          throw error // => false
        })
    },
    handleBack() {
      this.handleLeave()
        .then(() => {
          this.$router.back()
          this.$store.commit('DEL_TAG', this.tag)
        })
        .catch(() => {})
    },

    handleUploaderRemove() {
      this.uploader.fileList = []
    },

    // 处理用户离开进行保存等相关操作
    async handleLeave() {
      // 如果表单为空 或 用户没有对数据进行编辑
      if (
        _(this.formData)
          .pickBy()
          .isEmpty() ||
        !this.hasEdit
      ) {
        return
      } else {
        try {
          await this.$confirm(
            '是否对已编辑的内容进行保存，保存的新闻可以在草稿箱中重新编辑',
            '提示',
            {
              confirmButtonText: '保存',
              cancelButtonText: '不保存',
              type: 'warning'
            }
          )
          return this.handleSaveDraftBtnClick()
        } catch (error) {
          // 不保存操作
        }
      }
    },

    // 加载详细
    async loadDetail(id = this.id) {
      this.loading = true
      const data = _(await getNewsDetail({ id }))
        .pick(API_PARAMS)
        .omit('id')
        .value()
      for (let key in data) {
        this.$set(this.formData, key, data[key])
      }
      this.formData.content = _.unescape(this.formData.content) // 反转义获取 dom
      this.loading = false
      // 修改了formData 重置标记
      this.$nextTick(() => (this.hasEdit = false))
      return data
    },

    validate(...args) {
      // const BRIEF_MIN_LEN = 10 // 限制最小输入长度
      return new Promise((resolve, reject) => {
        this.$refs.form
          .validate(...args)
          .then((data) => {
            resolve(data)
            // if (_.size(this.brief) < BRIEF_MIN_LEN) {
            //   reject('内容太少，请重新输入')
            // } else {
            //   resolve(data)
            // }
          })
          .catch((error) => reject(error))
      })
    },
    clearValidate(...args) {
      return this.$refs.form.clearValidate(...args)
    },

    scrollTop() {
      this.$refs.wrapper.parentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      // this.$refs.wrapper.scrollTop = 0
    },

    refresh() {
      // 表单栏目选择
      getNewsCategory().then(
        (res) =>
          (_.find(this.formColumns, {
            prop: 'categoryId'
          }).options = res)
      )
      if (this.id) {
        this.loadDetail()
      }
    },

    // 存储草稿
    async postNews(params) {
      this.loading = true
      const data = await postV1News(params)
      this.loading = false
      return data
    },

    // 更新数据
    async updateNews(params) {
      this.loading = true
      const data = await putV1News(_.assign({ id: this.id }, params))
      this.loading = false
      return data
    },

    // 发布接口
    async publishNews(id) {
      return await postNewsPublish({ id, userId: this.userId })
    }
  }
}
</script>

<style lang="sass" scoped>
$color_active: #368AFA
$color_border: #E3E7E9
$color_placeholder: #757C85
$color_font_uploader: #A0A8AE

.wrapper
  .basic-container--block
    height: 0
    min-height: calc(100% - 92px)
  .uploader
    $height: 120px
    $width: 120px
    align-items: center
    display: flex
    flex-direction: column
    justify-content: space-between
    width: fit-content
    .uploader__description
      font-size: smaller
      color: $color_placeholder
    &__btn
      display: flex
      flex-direction: column
      justify-content: center
      height: $height
      width: $width
      border: 1px dashed $color_border
      color: $color_font_uploader
    &__previewer
      height: $height
      width: $width
  .container__buttons
    margin-top: 1rem

  /deep/.el-form-item
    // margin-bottom: 11px // 减少底边距会造成错误提示的文本显示样式问题
  /deep/.el-col
    border-bottom: 1px solid $color_border
  /deep/.el-select
    max-width: 228px
</style>
