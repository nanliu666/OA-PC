<template>
  <el-card
    v-loading="loading"
    class="NewsManageSidebar wrapper"
    shadow="never"
  >
    <div class="wrapper__top">
      <span class="wrapper__top--title">
        栏目管理
      </span>
    </div>

    <el-divider />

    <ul class="category">
      <!-- <li
        class="category__item"
        :class="{ 'category__item--active': _.eq(value, null) }"
      >
        <span
          class="category__item--label"
          @click="() => handleItemClick(null)"
        >所有分类</span>
      </li> -->
      <li
        v-for="(item, index) of data"
        :key="index"
        class="category__item"
        :class="{ 'category__item--active': _.eq(value, item.id) }"
      >
        <template v-if="!item.$_isEditing">
          <span
            class="category__item--label"
            @click="() => handleItemClick(item)"
          >
            {{ item.name }}
          </span>

          <span class="category__item--operation">
            <el-dropdown @command="(handler) => handler()">
              <span class="el-dropdown-link">
                <i class="el-icon-more" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="() => handleItemEditBtnClick(item)"
                >编辑</el-dropdown-item>
                <el-dropdown-item
                  :command="() => handleRemoveItemBtnClick(item)"
                >删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </template>
        <template v-else>
          <el-form
            :ref="`form${index}`"
            inline
            class="category__item"
            :model="item"
            :rules="{ $_name: [{ required: true, message: '栏目名称不能为空' }] }"
          >
            <el-form-item prop="$_name">
              <el-input
                v-model="item.$_name"
                placeholder="请输入栏目名称"
                size="mini"
                style="width:calc(100% - 80px);"
              />
              <div style="float:right;">
                <el-button
                  type="text"
                  size="mini"
                  @click="
                    () =>
                      _.head($refs[`form${index}`])
                        .validate()
                        .then(() => handleItemConfirmBtnClick(item))
                        .catch(() => void 0)
                  "
                >
                  确定
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => handleItemCancelBtnClick(item)"
                >
                  取消
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </li>
    </ul>

    <!-- v-if="!hasEditing" -->
    <div class="btn__add">
      <el-button
        v-show="_.every(data, ({ id }) => id)"
        icon="el-icon-plus"
        style="padding:0;"
        type="text"
        @click="() => handleCreateBtnClick()"
      >
        新建栏目
      </el-button>
    </div>
  </el-card>
</template>

<script>
import {
  getNewsCategory,
  delNewsCategory,
  putNewsCategory,
  postNewsCategory
} from '@/api/newsCenter/newCenter'

export default {
  name: 'NewsManageSidebar',
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      data: [],
      loading: false
    }
  },
  methods: {
    handleCreateBtnClick() {
      this.data.push({
        $_isEditing: true,
        $_name: ''
      })
    },
    handleItemEditBtnClick(item) {
      this.$set(item, '$_isEditing', true)
      this.$set(item, '$_name', item.name)
    },
    handleRemoveItemBtnClick({ id }) {
      this.$confirm('是否删除删除栏目？', {
        title: '提示',
        type: 'warning'
      }).then(async () => {
        await delNewsCategory({ id })
        this.$message.success('删除成功')
        this.refresh()
      })
    },
    handleItemClick(item) {
      const id = _.get(item, 'id', null)
      this.$emit('input', id)
    },

    // 提交所做的修改
    handleItemConfirmBtnClick({ id, $_name }) {
      this.loading = true
      const params = _.pickBy({ id, name: $_name })
      const isCreate = _.isNil(id) // 如果id不存在则是新建,否则是修改
      ;(isCreate ? postNewsCategory : putNewsCategory)(params)
        .then(() => {
          this.$message.success(isCreate ? '新建成功' : '修改成功')
        })
        .finally(() => {
          this.loading = false
          this.refresh()
        })
    },
    handleItemCancelBtnClick(item) {
      if (_.isNil(item.id)) {
        return this.data.pop()
      }
      item.$_isEditing = false
      item.$_name = null
    },

    refresh() {
      return Promise.all([this.loadSidebarData()])
    },

    // 加载分类数据
    async loadSidebarData(params) {
      if (this.loading) {
        return
      }
      try {
        this.loading = true
        const data = await getNewsCategory(params)
        this.data = data
        if (_.isNull(this.value)) {
          this.$emit('input', _.head(data) && _.head(data).id)
        }
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
$color_active: #368AFA
$color_danger: #ff6464
$color_icon: #757C85
$color_hover: #207EFA

.wrapper
  position: relative
  background: white
  height: 100%
  &__top
    display: flex
    justify-content: space-between
    &--title,&--operation
      font-weight: bold
      font-size: medium
    &--operation
      color: $color_active
      cursor: pointer
      font-weight: normal
  .category
    &__item
      $background_offset: 10px
      align-items: center
      display: flex
      min-height: 30px
      justify-content: space-between
      overflow: visible
      &--active
        color: $color_active
        position: relative
        &::before,&::after
          pointer-events: none
          background: $color_active
          content: ""
          height: 100%
          left: - $background_offset
          position: absolute
        &::before
          width: 3px
          opacity: .9
        &::after
          opacity: .1
          padding-left: 2 * $background_offset
          width: 100%
      i.el-icon-more,&--label
        cursor: pointer
      i.el-icon-more
        color: $color_icon
      &--editing
        display: block
  .btn__add
    bottom: 2rem
    margin: auto
    position: absolute
    text-align: center
    width: calc(100% - 32px)
  /deep/
    .el-card__body
      padding-left: 16px
      padding-right: 16px
</style>
