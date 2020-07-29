<template>
  <div class="appr-user-item__box">
    <div :class="['appr-user-item', { 'appr-user-item__first': isFirst }]">
      <div
        v-if="processData.childNode"
        class="appr-user-item__tail"
      />
      <div class="appr-user-item__node" />
      <div class="appr-user-item__wrapper">
        <div class="appr-user-item__header">
          <span class="appr-user-item__title">{{
            processData.properties ? processData.properties.title : ''
          }}</span>
          <span class="appr-user-item__tips">{{ tips }}</span>
        </div>
        <div class="appr-user-item__content">
          <template v-for="(user, index) in processData.userList">
            <div
              v-if="index !== 0"
              :key="`separator-${index}`"
              class="appr-user-item__separator"
            >
              {{ isCounterSign ? '+' : '/' }}
            </div>
            <div
              :key="user.userId"
              class="appr-user-item__user"
            >
              <div class="appr-user-item__avatar">
                <i class="icon-usercircle avatar" />
                <i
                  v-if="selectable"
                  class="icon-tips-error-small close"
                  @click="deleteUser(index)"
                />
              </div>
              <div class="appr-user-item__username">
                {{ user.name }}
              </div>
            </div>
          </template>
          <div
            v-if="isMulti && processData.userList.length > 0"
            class="appr-user-item__separator"
          >
            {{ isCounterSign ? '+' : '/' }}
          </div>
          <div
            v-if="(isMulti || processData.userList.length === 0) && selectable"
            class="appr-user-item__plus"
          >
            <el-dropdown
              trigger="click"
              @command="handleSelect($event)"
            >
              <span class="el-dropdown-link">
                <i class="icon-tips-plus-outlined" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="option in optionList"
                  :key="option.id"
                  :command="option"
                >
                  {{ option.name }}({{ option.workNo }})
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <appr-picker-item
      v-if="processData.childNode"
      :process-data="processData.childNode"
    />
  </div>
</template>

<script>
// import pickUser from '@/components/appr-progress/userPicker.js'

export default {
  name: 'ApprPickerItem',
  props: {
    processData: {
      type: Object,
      default: () => ({ properties: {}, userList: [] })
    },
    isFirst: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 是否会签
    isCounterSign() {
      return this.processData.properties ? this.processData.properties.counterSign : false
    },
    optionList() {
      return this.processData.type === 'approver'
        ? this._.get(this.processData, 'properties.approvers', [])
        : this.processData.type === 'copy'
        ? this._.get(this.processData, 'properties.members', [])
        : []
    },
    isMulti() {
      return this._.get(this.processData, 'properties.optionalMultiUser', false)
    },
    selectable() {
      return this._.get(this.processData, 'properties.assigneeType', null) === 'optional'
    },
    tips() {
      if (this.processData.type === 'approver') {
        return this.isMulti
          ? this.isCounterSign
            ? '需所有审批人同意'
            : '一人同意即可'
          : '一人审批'
      } else if (this.processData.type === 'copy') {
        return `抄送${
          this.processData.userList.length > 0 ? this.processData.userList.length + '人' : ''
        }`
      }
      return ''
    }
  },
  beforeMount() {
    this.initUserList()
  },
  methods: {
    initUserList() {
      let userList
      if (this.selectable) {
        userList = []
      } else if (this.processData.type === 'approver') {
        userList = this._.get(this.processData, 'properties.approvers', [])
      } else if (this.processData.type === 'copy') {
        userList = this._.get(this.processData, 'properties.members', [])
      }
      this.$set(this.processData, 'userList', userList)
    },

    handleSelect(data) {
      this.processData.userList.push(data)
    },
    // pickUser(userList) {
    //   pickUser(userList, {
    //     callback: (selectedUsers) => {
    //     },
    //     multiple: this.isMulti
    //   })
    // },
    deleteUser(index) {
      this.processData.userList.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.appr-user-item {
  position: relative;
  &__tail {
    position: absolute;
    left: 4px;
    height: 100%;
    border-left: 2px solid #e4e7ed;
  }
  &__node {
    position: absolute;
    background-color: #e4e7ed;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    width: 12px;
    height: 12px;
    left: -1px;
  }
  &__header {
    line-height: 24px;
  }
  &__wrapper {
    position: relative;
    padding-left: 28px;
    top: -3px;
  }
  &__title {
    font-size: 18px;
    margin-right: 6px;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
  }
  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(245, 246, 246, 0.5);
    text-align: center;
    margin: 8px auto;
    position: relative;
    .avatar {
      font-size: 40px;
      line-height: 40px;
      color: #757c85;
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 14px;
      z-index: 100;
      cursor: pointer;
      line-height: 14px;
    }
  }
  &__username {
    line-height: 16px;
    text-align: center;
  }
  &__separator {
    height: 40px;
    line-height: 40px;
    margin: 8px;
  }
  &__plus {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(245, 246, 246, 0.5);
    border: 1px dashed rgba(117, 124, 133, 0.5);
    text-align: center;
    margin: 8px 0 24px;
    cursor: pointer;
    color: #757c85;
    i {
      line-height: 40px;
      font-size: 20px;
    }
  }
}
</style>
