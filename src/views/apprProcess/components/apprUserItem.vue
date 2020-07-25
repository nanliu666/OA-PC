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
          <template v-for="(user, index) in userList">
            <div
              v-if="index !== 0"
              :key="`icon-${index}`"
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
                  class="icon-tips-error-small close"
                  @click="deleteUser(index)"
                />
              </div>
              <div class="appr-user-item__username">
                {{ user.userName }}
              </div>
            </div>
          </template>
          <div
            v-if="isMulti && userList.length > 0"
            class="appr-user-item__separator"
          >
            {{ isCounterSign ? '+' : '/' }}
          </div>
          <div
            v-if="isMulti || userList.length === 0"
            class="appr-user-item__plus"
            @click="pickUser(userList)"
          >
            <i class="icon-tips-plus-outlined" />
          </div>
        </div>
      </div>
    </div>
    <appr-user-item
      v-if="processData.childNode"
      :process-data="processData.childNode"
    />
  </div>
</template>

<script>
import pickUser from '@/components/appr-progress/userPicker.js'

export default {
  name: 'ApprUserItem',
  props: {
    processData: {
      type: Object,
      default: () => ({ properties: {} })
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
    userList() {
      return this.processData.type === 'approver'
        ? this._.get(this.processData.properties, 'approvers', [])
        : this.processData.type === 'copy'
        ? this._.get(this.processData.properties, 'menbers', [])
        : []
    },
    isMulti() {
      return this.processData.properties ? this.processData.properties.optionalMultiUser : false
    },
    tips() {
      if (this.processData.type === 'approver') {
        return this.isMulti
          ? this.isCounterSign
            ? '需所有审批人同意'
            : '一人同意即可'
          : '一人审批'
      } else if (this.processData.type === 'copy') {
        return `抄送${this.userList.length > 0 ? this.userList.length + '人' : ''}`
      }
      return ''
    }
  },
  methods: {
    deleteUser(index) {
      if (this.processData.type === 'approver') {
        this.processData.properties.approvers.splice(index, 1)
      } else if (this.processData.type === 'copy') {
        this.processData.properties.menbers.splice(index, 1)
      }
    },
    setUser(userList) {
      if (this.processData.type === 'approver') {
        this.$set(this.processData.properties, 'approvers', userList)
      } else if (this.processData.type === 'copy') {
        this.$set(this.processData.properties, 'menbers', userList)
      }
    },
    pickUser(userList) {
      pickUser(
        userList.map((user) => ({ ...user, name: user.userName, id: user.id || user.userId })),
        {
          callback: (selectedUsers) => {
            this.setUser(selectedUsers.map((user) => ({ ...user, userName: user.name })))
          },
          multiple: this.isMulti
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.appr-user-item {
  position: relative;
  padding-bottom: 20px;
  &__first {
    margin-top: 20px;
  }
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
  &__wrapper {
    position: relative;
    padding-left: 28px;
    top: -6px;
  }
  &__title {
    font-size: 18px;
    margin-right: 6px;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
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
      color: #757c85;
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 14px;
      z-index: 100;
      cursor: pointer;
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
