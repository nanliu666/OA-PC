<template>
  <el-popover
    placement="bottom-start"
    trigger="click"
    popper-class="oa-tree_select"
    :width="treeMinWidth"
  >
    <div :class="{ limitCheck: limitCheck || false }">
      <div
        v-if="isSearch"
        class="search-bar"
      >
        <div class="search-input">
          <el-input
            v-model="searchInput"
            size="medium"
            placeholder="请输入内容"
          >
            <template slot="append">
              <i class="el-icon-search" />
            </template>
          </el-input>
        </div>
        <div
          v-if="!isSingle"
          class="rela-wrap"
        >
          <el-checkbox
            v-model="checked"
            @change="onClickSearch"
          >
            仅显示未关联
          </el-checkbox>
        </div>
      </div>
      <el-tree
        v-if="filterList.length > 0"
        ref="tree"
        :data="filterList || []"
        :default-expanded-keys="value"
        :default-checked-keys="value"
        show-checkbox
        :check-strictly="true"
        :node-key="keyID"
        :props="{ label }"
        :filter-node-method="filterNode"
        @check="handleCheckChange"
      />
      <p
        v-else
        class="no-data_text"
      >
        {{ option.noDataText || '无数据' }}
      </p>
    </div>
    <div
      id="treeBtn"
      slot="reference"
      class="tree-button"
    >
      <div class="tags-list">
        <div v-if="showLabelList.length > 0">
          <el-tag
            v-for="(c, index) in showLabelList"
            :key="index"
            style="margin-right: 5px;"
            size="small"
            closable
            @close="handleCloseCategory(index)"
          >
            {{ c[label] }}
          </el-tag>
        </div>
        <div
          v-else
          style="color: #C0C4CC"
        >
          {{ option.placeholder }}
        </div>
        <i class="el-icon-arrow-down el-icon--right" />
      </div>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: 'TreeSelect',
  props: {
    isSingle: {
      // 是否单项选择
      type: Boolean,
      default: () => {
        return false
      }
    },
    option: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: [Array, String],
      default: () => []
    },
    isSearch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      node: {},
      searchInput: '',
      checked: false,
      treeMinWidth: '300',
      filterList: [],
      normalHeight: 38
    }
  },

  computed: {
    showLabelList() {
      return (
        (this.value || []).map((data) => {
          return this.getSelectItem(this.filterList, data, this.keyID) || {}
        }) || []
      )
    },
    limitCheck() {
      return this.option.limitCheck || false
    },
    label() {
      return this.option.props ? this.option.props.label : 'label'
    },
    keyID() {
      return this.option.props ? this.option.props.value : 'id'
    }
  },
  watch: {
    'option.dicData': {
      handler(val) {
        this.filterList = val
      },
      immediate: true,
      deep: true
    },
    searchInput(val) {
      this.onClickSearch(val)
    },
    value: {
      handler(val) {
        this.$emit('input', val)
        this.$nextTick(() => {
          setTimeout(this.changePopPosition, 400)
          this.setCheckedKeys()
          this.onClickSearch()
        })
      },
      deep: true
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    filterNode(value, data) {
      if (this.checked) {
        const index = this.value.findIndex((item) => data[this.keyID] === item)
        return data[this.label].indexOf(value) !== -1 && index === -1
      } else {
        return data[this.label].indexOf(value) !== -1
      }
    },
    changePopPosition() {
      if (document.getElementsByClassName('oa-tree_select')[0]) {
        let inputTop = document.getElementsByClassName('oa-tree_select')[0].style.top.replace('px', '') * 1
        let inputHeight = document.getElementById('treeBtn').offsetHeight
        if (this.normalHeight !== inputHeight) {
          inputTop += inputHeight - this.normalHeight
          this.normalHeight = inputHeight
          document.getElementsByClassName('oa-tree_select')[0].style.top = inputTop + 'px'
        }
      }
    },
    onClickSearch() {
      this.$refs.tree.filter(this.searchInput)
    },
    getSelectItem(arr1, data, key) {
      let obj
      for (let i = 0; i < arr1.length; i++) {
        let item = arr1[i]
        if (item[key] === data) {
          obj = item
          break
        } else if (item.children && item.children.length > 0) {
          let findData = this.getSelectItem(item.children, data, key)
          if (findData) {
            obj = findData
            break
          }
        }
      }
      return obj
    },
    handleResize() {
      this.$nextTick(() => {
        this.treeMinWidth = document.getElementById('treeBtn').offsetWidth - 25 + ''
      })
    },
    handleCloseCategory(index) {
      this.value.splice(index, 1)
    },
    handleCheckChange(data, checked) {
      // this.$emit('input', checked.checkedKeys)
      if (this.isSingle) {
        if (checked) {
          this.node = this.node === data ? {} : data
          this.$refs.tree.setCheckedNodes([data])
          if (this.node.id) {
            let id = this.node.id || null
            this.$emit('input', [id])
          }
        } else {
          if (this.node === data) {
            this.node = {}
            this.$refs.tree.setCheckedNodes([this.node])
            this.$emit('input', [])
          }
        }
      } else {
        this.$emit('input', checked.checkedKeys)
      }
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys(this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}

.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}

/deep/ .el-tree-node.is-current > .el-tree-node__content {
  color: #606266;
}

.search-bar {
  padding: 15px 0;
  display: flex;
  align-items: center;

  .search-input {
    flex: 1;
  }

  .rela-wrap {
    padding: 10px;

    /deep/ .el-checkbox__input > .el-checkbox__inner {
      display: inline-block;
    }
  }
}

.tree-button {
  width: 100%;
  min-height: 36px;
  line-height: 36px;
  text-align: left;
  /*padding: 0 10px !important;*/
  border: 1px solid #dcdfe6;

  border-radius: 5px;

  .tags-list {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
  }

  /deep/ .el-icon--right {
    display: flex;
    align-items: center;
    margin: 0 10px;
    color: #dcdfe6;
  }
}

.no-data_text {
  /*padding: 10px 0;*/
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.limitCheck {
  /deep/ .is-leaf + .el-checkbox .el-checkbox__inner {
    display: inline-block;
  }

  /deep/ .el-checkbox__input > .el-checkbox__inner {
    display: none;
  }
}
</style>
