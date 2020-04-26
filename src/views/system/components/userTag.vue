<template>
  <div>
    <el-input
      v-model="searchValue"
      placeholder="标签内容"
      suffix-icon="el-icon-search"
      size="small"
      class="search-input"
      @blur="getTagList"
    />
    <ul>
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ active: tag === activeTag }"
        @click="handleClick(tag)"
      >
        <template v-if="!tag.editing">
          <span>{{ tag.name }}({{ tag.userNum }})</span>
          <el-dropdown
            style="float:right;height:12px"
            trigger="click"
            @command="(command) => handleCommand(command, tag)"
            @click.native.stop=""
          >
            <span class="el-dropdown-link"> <i class="el-icon-more" /> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="edit">
                编辑
              </el-dropdown-item>
              <el-dropdown-item command="delete">
                删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <el-input
            :v-model="tag.name"
            placeholder="请输入标签内容"
            style="width:calc(100% - 80px);"
          />
          <div style="float:right;">
            <el-button
              type="text"
              @click="handleSubmit(tag)"
            >
              确定
            </el-button>
            <el-button
              type="text"
              @click="handleQuit(tag)"
            >
              取消
            </el-button>
          </div>
        </template>
      </li>
    </ul>
    <div style="text-align: center;">
      <el-button
        icon="el-icon-plus"
        type="text"
        @click="handleAdd"
      >
        新建标签
      </el-button>
    </div>
  </div>
</template>

<script>
import { getTagList, createTag, modifyTag, deleteTag } from '@/api/system/user'

export default {
  name: 'UserTag',
  props: {
    activeTag: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      searchValue: '',
      tagList: []
    }
  },
  created() {
    this.getTagList()
  },
  methods: {
    getTagList() {
      const params = {
        pageNo: 1,
        pageSize: 999,
        name: this.searchValue
      }
      getTagList(params).then((res) => {
        this.tagList = res
        this.$emit('update:activeTag', this.tagList[0])
      })
    },
    deleteTag(tag) {
      deleteTag({ id: tag.id }).then(() => {
        this.$message.success('删除成功')
      })
    },
    handleClick(tag) {
      if (!tag.editing) {
        this.$emit('update:activeTag', tag)
      }
    },
    handleCommand(command, tag) {
      if (this.activeTag === tag) {
        this.$emit('update:activeTag', {})
      }
      if (command == 'edit') {
        this.$set(tag, 'editing', true)
      } else if (command == 'delete') {
        this.$confirm('删除标签后，标签内的成员也会同步被清除，确定删除该标签么？', '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteTag(tag)
        })
      }
    },
    handleQuit() {
      this.getTagList()
    },
    handleSubmit(tag) {
      let func = createTag
      if (tag.id) {
        func = modifyTag
      }
      func(tag).then(() => {
        this.$message.success('保持成功')
      })
    },
    handleAdd() {
      this.tagList.push({
        name: '',
        editing: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
ul li {
  margin-bottom: 8px;
  line-height: 30px;
  cursor: pointer;
  &.active {
    background: #f2f2f2;
  }
}
.search-input {
  margin-bottom: 8px;
}
</style>
