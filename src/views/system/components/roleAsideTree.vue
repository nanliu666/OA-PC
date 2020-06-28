<template>
  <div>
    <div
      v-if="showSearch"
      class="search-input"
    >
      <el-input
        v-model="searchInput"
        size="medium"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
      />
    </div>
    <el-tree
      ref="tree"
      :data="treeList || []"
      :node-key="props.id"
      :default-expanded-keys="[currentId]"
      :highlight-current="true"
      :filter-node-method="filterNode"
      @node-click="node"
    >
      <div
        slot-scope="{ node, data }"
        class="custom-tree-node"
        @click.prevent="onClickNode(node, data)"
      >
        <span><i
                v-if="node.level === 1 && showFolder"
                class="el-icon-folder"
                style="margin-right: 5px;"
              />{{ data[props.label] }}
          <span v-if="data.roleNum">{{ `(${data.roleNum})` }}</span>
        </span>
        <el-dropdown
          v-if="showMore"
          class="right-content"
          trigger="hover"
          @command="handleCommand($event, node, data)"
        >
          <span
            class="el-dropdown-link more-column"
            @click.stop=""
          >
            <i class="el-icon-more" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="edit">
              编辑
            </el-dropdown-item>
            <el-dropdown-item command="del">
              删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'AsideTree',
  props: {
    groupId: {
      type: String,
      default: ''
    },
    showMore: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    treeList: {
      type: Array,
      default: () => []
    },
    currentId: {
      type: [String, Number],
      default: ''
    },
    showFolder: {
      type: Boolean,
      default: true
    },
    props: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          id: 'id'
        }
      }
    }
  },
  data() {
    return {
      searchInput: '',
      cateId: ''
    }
  },
  watch: {
    currentId: {
      handler(newVal, oldVal) {
        if (newVal && !oldVal) {
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(newVal)
          })
        }
      },
      deep: true
    },
    searchInput(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    /**
     * @author guanfenda
     * @desc 节点选中
     *
     * */
    node(data) {
      if (!data.roleNum) {
        this.cateId = data.cateId
        this.$emit('update:groupId', this.cateId)
      }
    },
    filterNode(value, data) {
      return data[this.props.label].indexOf(value) !== -1
    },
    onClickNode(node, data) {
      // console.log(node, data)
      if (node.level > 1) {
        this.$emit('reload', data)
      }
    },
    handleCommand(command, node, data) {
      this.$emit(command, node, data)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-input {
  margin-bottom: 10px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;

  .right-content {
    display: none;
  }

  &:hover {
    .right-content {
      display: inline-block;
    }
  }

  .more-column {
    display: inline-block;
    transform: rotate(90deg);
    -ms-transform: rotate(90deg); /* IE 9 */
    -moz-transform: rotate(90deg); /* Firefox */
    -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
    -o-transform: rotate(90deg);
  }
}
</style>
