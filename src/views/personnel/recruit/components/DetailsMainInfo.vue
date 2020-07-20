<template>
  <div class="DetailsMainInfo">
    <div class="header">
      <span class="header__title"> {{ _.get(data, 'userName') }}提交的招聘需求 </span>
      <el-tag
        v-if="data.status"
        class="header__tag"
        :type="tagType"
      >
        {{ translator({ dictKey: 'status', value: data.status }) }}
      </el-tag>
    </div>

    <div class="content">
      <el-row class="messages">
        <el-col
          class="content__info"
          :span="6"
        >
          <span class="content__info--label">需求编号:</span>
          <span class="content__info--value">{{ data.id }}</span>
        </el-col><el-col
          class="content__info"
          :span="6"
        >
          <span class="content__info--label">提交人:</span>
          <span class="content__info--value">{{ data.userName }}</span>
        </el-col>
        <el-col
          class="content__info"
          :span="6"
        >
          <span class="content__info--label">提交时间:</span>
          <span class="content__info--value">{{ data.createTime }}</span>
        </el-col>
        <el-col
          class="content__info"
          :span="6"
        >
          <span class="content__info--label">状态:</span>
          <span class="content__info--value content__info--active">
            {{ translator({ dictKey: 'progress', value: data.progress }) }}
          </span>
        </el-col>
      </el-row>

      <div class="operations">
        <slot name="operations" />
      </div>
    </div>
  </div>
</template>

<script>
const PROGRESS_DICTS = [
  {
    dictKey: 'Approved',
    dictValue: '招聘中'
  },
  {
    dictKey: 'Finished',
    dictValue: '已结束'
  }
]

const STATUS_DICTS = [
  {
    dictKey: 'Handled',
    dictValue: '已分配'
  },
  {
    dictKey: 'UnHandle',
    dictValue: '待分配'
  }
]

export default {
  name: 'DetailsMainInfo',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dictionary: {
        progress: PROGRESS_DICTS,
        status: STATUS_DICTS
      }
    }
  },

  computed: {
    /**
     * 是否有操作列
     * @return {boolean}
     */
    tagType() {
      let tagType = ''
      switch (this.tag) {
        case STATUS_DICTS[0].dictKey:
          tagType = 'success'
          break
        case STATUS_DICTS[1].dictKey:
        default:
          tagType = 'info'
          break
      }
      return tagType
    }
  },

  methods: {
    // 翻译字典
    translator({ value, dictKey, $config: config }) {
      if (!(dictKey = dictKey || _.get(config, 'dictKey'))) {
        return value
      }

      const dicts = this.dictionary[dictKey]
      // 如果字典为 undefined 时候加载字典
      if (!dicts) this.loadDictionary(dictKey)
      let result = value
      _.each(dicts, (item) => {
        if (item.dictKey === _.trim(value)) {
          result = item.dictValue
          return false
        }
      })
      return result
    },

    // 添加字典
    async loadDictionary(dictKey) {
      const dict = await this.$store.dispatch('CommonDict', dictKey)
      this.$set(this.dictionary, dictKey, dict)
      return dict
    }
  }
}
</script>

<style lang="sass" scoped>
$color_active: #368AFA
$color_label: #718199
$font_size_md: 16px
$font_size_sm: 0.75 * $font_size_md
$font_size_lg: 1.25 * $font_size_md

.DetailsMainInfo
  .header
    &__title
      font-size: $font_size_md
      font-weight: bold
      line-height: 24px
    &__tag
      margin-left: 3rem
  .content
    margin-top: 2rem
    display: flex
    &__info
      display: flex
      flex-direction: column
      &--label
        color: $color_label
        font-size: $font_size_sm
      &--value
        margin-top: .5rem
      &--active
        color: $color_active
    .messages
      flex-grow: 1 // 占据所有多余的空间
    .operations:not(:last-child)
      margin-left: 1rem
</style>
