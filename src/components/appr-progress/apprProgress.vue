<template>
  <div>
    <div class="notice-user-list">
      <template v-for="(node, index) in progress.nodes">
        <i
          v-if="index !== 0"
          :key="`icon-${index}`"
          class="icon-arrow-right-outlined icon-arrow"
        />
        <div
          :key="node.id"
          :class="['node', { last: index === progress.nodes.length - 1 }]"
        >
          <div class="node-name">
            {{ node.name }}
          </div>
          <div class="user">
            <el-dropdown
              trigger="click"
              @command="handleSelect($event, node)"
            >
              <span class="el-dropdown-link">
                <div class="head">
                  <i
                    v-if="node.user"
                    class="el-icon-user"
                  />
                  <i
                    v-else
                    class="icon-tips-plus-outlined"
                  />
                </div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="user in node.users"
                  :key="user.id"
                  :command="user"
                >
                  {{ user.name }}({{ user.workNo }})
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <div class="name">
              {{ node.user ? node.user.name : '' }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { getAppProcess, createApprApply } from '@/api/approval/approval'
import { mapGetters } from 'vuex'
import { FormKeysCN } from '@/const/approve'

export default {
  name: 'ApprProcess',
  props: {
    formKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      progress: {
        nodes: []
      },
      pickerVisible: false
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    title() {
      return `${this.userInfo.nick_name}发起了${FormKeysCN[this.formKey]}审批`
    }
  },
  watch: {
    formKey: {
      handler(val) {
        this.getApprProcess(val)
      },
      immediate: true
    }
  },
  methods: {
    getApprProcess(formKey) {
      getAppProcess(formKey).then((res) => {
        this.progress = res
      })
    },
    /**
     * 校验，成功返回true
     */
    validate() {
      return !this.progress.nodes.some((node) => !node.user)
    },
    submit(id) {
      if (!this.validate()) {
        return
      }
      return createApprApply(this.genData(id))
    },
    genData(formId) {
      return {
        formKey: this.formKey,
        title: this.title,
        formId,
        userId: this.userInfo.user_id,
        processId: this.progress.id,
        nodes: this.progress.nodes.map((node) => ({
          nodeId: node.id,
          userId: node.user && node.user.id,
          isStart: node.isStart
        }))
      }
    },
    handleSubmit({ nodeId, selectList }) {
      let node = this.progress.nodes.find((node) => node.id === nodeId)
      if (node) {
        node.users = selectList.map((user) => ({ id: user.id, name: user.name }))
      }
    },
    handleSelect(user, node) {
      this.$set(node, 'user', user)
    }
  }
}
</script>

<style lang="scss" scoped>
.notice-user-list {
  display: flex;
  align-items: flex-start;
  .node-name {
    line-height: 16px;
    text-align: center;
  }
  .user {
    flex-direction: column;
    display: flex;
    align-items: center;
    &.last {
      margin-right: 12px;
    }
    .head {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: rgba(245, 246, 246, 0.5);
      border: 1px dashed rgba(117, 124, 133, 0.5);
      text-align: center;
      margin: 12px 0;
      cursor: pointer;
      color: #757c85;
      i {
        line-height: 34px;
        font-size: 20px;
      }
    }
    .name {
      line-height: 16px;
    }
  }
  .icon-arrow {
    margin: 0 24px;
    margin-top: 25px;
  }
}
</style>
