<template>
  <div class="fill">
    <page-header title="离职交接事项">
      <template slot="rightMenu">
        <el-button
          type="primary"
          size="medium"
          @click="groupEditVisible = true"
        >
          添加分组
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="categoryEditVisible = true"
        >
          添加交接事项
        </el-button>
      </template>
    </page-header>
    <basic-container block>
      <el-alert
        title="使用指南：为了便于员工离职办理更顺畅，可以提前维护员工离职需要处理的事项，通知到各个干系人做准备"
        type="info"
        show-icon
        style=" margin-bottom: 16px;"
      />
      <el-collapse
        v-if="groupList.length > 0"
        v-model="activeGroupIDList"
        v-loading="groupLoading"
        class="groups"
      >
        <el-collapse-item
          v-for="group in groupList"
          :key="group.id"
          :name="group.id"
          class="group-header"
        >
          <div
            slot="title"
            class="group-title"
          >
            <div class="name text-over-length">
              {{ group.name }}
            </div>
            <div class="handover">
              交接人：{{ genGroupHandover(group) }}
            </div>
            <div class="buttons__wrap">
              <el-button
                type="text"
                @click.stop="editCategory({ groupId: group.id })"
              >
                添加交接事项
              </el-button>
              <el-button
                type="text"
                @click.stop="editGroup(group)"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                @click.stop="delGroup(group)"
              >
                删除
              </el-button>
            </div>
          </div>
          <div
            v-loading="group.loading"
            class="group-content"
          >
            <el-collapse-item
              v-for="category in group.categories"
              :key="category.categoryId"
              :name="category.categoryId"
              class="category-header"
            >
              <div
                slot="title"
                class="category-title"
              >
                <div class="name text-over-length">
                  {{ category.categoryName }}
                </div>
                <div class="buttons__wrap">
                  <el-button
                    type="text"
                    @click.stop="editCategory(category)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    type="text"
                    @click.stop="delCategory(category, group)"
                  >
                    删除
                  </el-button>
                </div>
              </div>
              <ul class="category-detail">
                <li
                  v-for="detail in category.details"
                  :key="detail.detailId"
                >
                  {{ detail.detailName }}
                </li>
              </ul>
            </el-collapse-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div
        v-else
        v-loading="groupLoading"
        class="empty"
      >
        您还尚未添加任何离职交接事项
      </div>
    </basic-container>
    <group-edit-dialog
      ref="groupEditDialog"
      :visible.sync="groupEditVisible"
      @submit="getResignGroup"
    />
    <category-edit-dialog
      ref="categoryEditDialog"
      :visible.sync="categoryEditVisible"
      :group-list="groupList"
      :group-loading="groupLoading"
      @submit="refreshCategory"
      @refresh-group="getResignGroup"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  getResignGroup,
  getResignCategory,
  delResignGroup,
  delResignCategory
} from '@/api/personnel/settings'
export default {
  name: 'ResignationSettings',
  components: {
    groupEditDialog: () => import('./components/groupEditDialog'),
    categoryEditDialog: () => import('./components/categoryEditDialog')
  },
  data() {
    return {
      groupList: [],
      activeGroupIDList: [],
      groupLoading: false,
      groupEditVisible: false,
      categoryEditVisible: false
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  watch: {
    activeGroupIDList(newVal, oldValue) {
      if (newVal.length > oldValue.length) {
        let group = this.groupList.find((group) => group.id === newVal.slice(-1)[0])
        if (group && !group.categories) {
          this.getResignCategory(group)
        }
      }
    }
  },
  created() {
    this.getResignGroup()
  },
  methods: {
    getResignGroup() {
      this.groupLoading = true
      getResignGroup(this.companyId)
        .then((res) => {
          this.groupList = res
        })
        .finally(() => {
          this.groupLoading = false
        })
    },
    genGroupHandover(group) {
      if (group.type === 'Org') {
        return '部门负责人'
      } else if (group.type === 'Job') {
        return group.orgName + '-' + group.jobName
      } else if (group.type === 'User') {
        return `${group.userName}(${group.workNo})`
      }
    },
    getResignCategory(group) {
      if (!group) {
        return
      }
      this.$set(group, 'loading', true)
      getResignCategory(group.id)
        .then((categories) => {
          this.$set(
            group,
            'categories',
            categories.map((category) => ({ ...category, groupId: group.id }))
          )
        })
        .finally(() => {
          this.$set(group, 'loading', false)
        })
    },
    refreshCategory(groupId) {
      if (!groupId) {
        return
      }
      this.getResignCategory(this.groupList.find((group) => group.id === groupId))
    },
    editCategory(category) {
      this.$refs['categoryEditDialog'].init(category)
    },
    editGroup(group) {
      this.$refs['groupEditDialog'].init(group)
    },
    delGroup(group) {
      this.$confirm('您确定要删除该分组吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => delResignGroup(group.id))
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getResignGroup()
        })
    },
    delCategory(category, group) {
      this.$confirm('您确定要删除该分类吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => delResignCategory(category.categoryId))
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getResignCategory(group)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-collapse-item__header {
  position: relative;
}
/deep/ .group-header {
  .el-collapse-item__header {
    background: #f7f8fa;
  }
  .el-collapse-item__content {
    border: 1px solid #e3e7e9;
    border-top: 0;
    border-bottom: 0;
  }
}
/deep/ .el-collapse-item__arrow {
  position: absolute;
  margin-left: 24px;
}
/deep/ .category-header {
  .el-collapse-item__header {
    background: #fff;
  }
  .el-collapse-item__content {
    border: 0;
    padding-left: 56px;
  }
}

/deep/ .groups .el-button {
  padding: 0;
}
.groups {
  min-height: 300px;
}
.group-header {
  margin-bottom: 24px;
  .group-title {
    display: flex;
    justify-content: space-between;
    height: 32px;
    line-height: 32px;
    width: 100%;
    padding-left: 56px;
    .name {
      width: 100px;
    }
    .handover {
      width: 300px;
    }
    .buttons__wrap {
      display: flex;
      padding-right: 24px;
    }
  }
}

.group-content {
  min-height: 36px;
  padding-left: 48px;
}
.category-title {
  display: flex;
  justify-content: space-between;
  height: 32px;
  line-height: 32px;
  width: 100%;
  padding-left: 56px;
  .buttons__wrap {
    display: flex;
    padding-right: 24px;
  }
}
.category-detail {
  li {
    line-height: 24px;
  }
}
.empty {
  min-height: 300px;
  text-align: center;
  line-height: 300px;
  color: #757c85;
}

.basic-container--block {
  height: calc(100% - 92px);
  min-height: calc(100% - 92px);
}
</style>
