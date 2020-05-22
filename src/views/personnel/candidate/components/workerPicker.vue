<template>
  <el-dialog
    :visible="visible"
    title="选择抄送人"
    append-to-body
    class="worker-picker-dialog"
    @opened="dialogOpened()"
    @closed="dialogClosed()"
    @close="handleClose()"
  >
    <div class="main-container">
      <div class="user-container">
        <el-input
          v-model="search"
          placeholder="搜索"
          @change="getUserWorkList(1, true)"
        />
        <ul class="scroll-list-container">
          <li
            v-for="item in userList"
            :key="item.userId"
            class="list-item"
          >
            <el-checkbox
              :value="selectedList.findIndex((i) => i.userId === item.userId) >= 0"
              @change="(value) => handleItemCheck(item, value)"
            />
            <div class="text">
              <div class="name">
                {{ item.name }}
              </div>
              <div class="orgName">
                {{ item.orgName }}
              </div>
            </div>
          </li>
          <div
            v-if="userList.length === 0 && !loading"
            class="no-data"
          >
            暂无数据
          </div>
          <div
            v-show="loading"
            class="loading"
          >
            <i class="el-icon-loading" />
          </div>
        </ul>
      </div>
      <div class="divider" />
      <div class="selected-container">
        已选择
        <div class="selected-list">
          <div
            v-for="item in selectedList"
            :key="item.userId"
            class="list-item"
          >
            <div class="text">
              <div class="name">
                {{ item.name }}
              </div>
              <div class="orgName">
                {{ item.orgName }}
              </div>
            </div>
            <i
              class="el-icon-close"
              @click="handleItemCheck(item, false)"
            />
          </div>
        </div>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="handleClose()"
      >取 消</el-button>
      <el-button
        size="medium"
        type="primary"
        @click="handleSubmit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getUserWorkList } from '@/api/org/org'

export default {
  name: 'WorkerPicker',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: '',
      userList: [],
      selectedList: [],
      pageNo: 1,
      pageSize: 10,
      noMore: false,
      loading: false
    }
  },
  methods: {
    handleClose() {
      this.selectedList = []
      this.search = ''
      this.noMore = false
      this.pageNo = 1
      this.$emit('update:visible', false)
    },
    handleSubmit() {
      this.$emit('submit', this.selectedList)
      this.handleClose()
    },
    init(selectedList = []) {
      this.selectedList = selectedList.slice()
      this.$emit('update:visible', true)
    },
    getUserWorkList(pageNo, isRefresh = false) {
      if (this.loading || (this.noMore && !isRefresh)) {
        return
      }
      this.loading = true
      let _pageNo = pageNo ? pageNo : this.pageNo
      getUserWorkList({
        pageNo: _pageNo,
        pageSize: this.pageSize,
        search: this.search
      }).then((res) => {
        if (isRefresh) {
          this.userList = res.data
        } else {
          this.userList.push(...res.data)
        }
        if (res.data.length < this.pageSize) {
          this.noMore = true
        }
        this.pageNo = _pageNo + 1
        this.loading = false
      })
    },
    handleItemCheck(item, checked) {
      if (!checked) {
        this.selectedList = this.selectedList.filter((i) => i.userId !== item.userId)
      } else {
        this.selectedList.push(item)
      }
    },
    // 弹出框打开后，监听左边列表的滚动事件
    dialogOpened() {
      this.getUserWorkList(1, true)
      window.document
        .querySelector('.worker-picker-dialog .scroll-list-container')
        .addEventListener('scroll', () => this.getUserWorkList())
    },
    dialogClosed() {
      window.document
        .querySelector('.worker-picker-dialog .scroll-list-container')
        .removeEventListener('scroll', () => this.getUserWorkList())
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  .user-container {
    flex: 1;
    padding: 24px 0;
    .scroll-list-container {
      margin-top: 16px;
      max-height: 400px;
      overflow: auto;
      .list-item {
        display: flex;
        height: 40px;
        cursor: pointer;
        align-items: center;
        margin-bottom: 16px;
      }
    }
    .no-data {
      line-height: 60px;
      text-align: center;
    }
  }
  .divider {
    width: 1px;
    background: #e3e7e9;
    margin: 0 24px;
  }
  .selected-container {
    flex: 1;
    padding: 24px 0;
    .selected-list {
      margin-top: 16px;
      max-height: 400px;
      overflow: auto;
      .list-item {
        display: flex;
        height: 56px;
        align-items: center;
        justify-content: space-between;
        background: #f5f6f6;
        border-radius: 4px;
        margin-bottom: 16px;
        padding-left: 24px;
        padding-right: 12px;
        i {
          cursor: pointer;
        }
      }
    }
  }
}
.list-item {
  .text {
    margin-left: 16px;
    .name {
      color: #202940;
      margin-bottom: 4px;
    }
    .orgName {
      color: #a0a8ae;
      line-height: 14px;
    }
  }
}
/deep/.el-dialog__body {
  padding: 0 24px;
  // border-top: 1px solid #e3e7e9;
  // border-bottom: 1px solid #e3e7e9;
}
/deep/.el-dialog__header {
  padding: 16px 24px;
}
/deep/.el-checkbox__inner {
  height: 16px;
  width: 16px;
}
.loading {
  text-align: center;
}
</style>
