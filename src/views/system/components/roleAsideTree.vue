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
      >
        <template slot="append">
          <i
            class="el-icon-search"
            style="cursor: pointer"
            @click="onClickSearch"
          />
        </template>
      </el-input>
    </div>
    <el-tree
      ref="tree"
      :data="filterList || []"
      :node-key="'id'"
      :filter-node-method="filterNode"
    >
      <div
        slot-scope="{ node, data }"
        class="custom-tree-node"
        @click.prevent="onClickNode(node, data)"
      >
        <span><i
          v-if="node.level === 1"
          class="el-icon-folder"
          style="margin-right: 5px;"
        />{{ node.label }}</span>
        <el-dropdown
          v-if="showMore"
          class="right-content"
          trigger="hover"
          @command="handleCommand($event, node, data)"
        >
          <span class="el-dropdown-link more-column">
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
    showMore: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      filterList: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ]
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    onClickNode(node, data) {
      console.log(node, data)
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
