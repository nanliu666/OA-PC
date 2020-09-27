<template>
  <el-dialog
    class="entry-dialog"
    title="快捷入口设置"
    :visible.sync="$parent.hasEntryDialog"
    width="600px"
    :modal-append-to-body="false"
    @close="closeDialog"
  >
    <div class="entry-body">
      <div class="entry-title">
        <span class="entry-main-title">
          已选择的：
        </span>
        <span class="entry-sub-title">
          (鼠标点击或拖拽快捷入口调整排序或增删)
        </span>
      </div>
      <draggable
        group="dragList"
        class="entry-ul"
        :list="selectList"
        @end="dragEnd"
      >
        <li
          v-for="(item, index) in selectList"
          :key="index"
          class="entry-li"
        >
          <div class="li-title-box">
            <div class="icon-title">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use :[symbolKey]="`#${item.icon ? item.icon : 'icon-infor-small'}`" />
              </svg>
              <div
                class="icon-box"
                @click="deleteIcon(item.id)"
              >
                <i class="el-icon-error" />
              </div>
            </div>
            <div class="li-title">
              {{ item.name }}
            </div>
          </div>
        </li>
      </draggable>
    </div>
    <div class="entry-body add-entry">
      <div class="entry-title">
        <span class="entry-main-title">
          待添加的：
        </span>
        <span class="entry-sub-title">
          (拖拽添加快捷入口)
        </span>
      </div>
      <draggable
        group="dragList"
        class="all-entry-ul"
        :list="diffEntryList"
      >
        <li
          v-for="(item, index) in diffEntryList"
          :key="index"
          class="all-entry-li"
        >
          <div class="li-title-box">
            <div class="icon-title">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use :[symbolKey]="`#${item.icon ? item.icon : 'icon-infor-small'}`" />
              </svg>
            </div>
            <div class="li-title">
              {{ item.name }}
            </div>
          </div>
        </li>
      </draggable>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="closeDialog">
        取 消
      </el-button>
      <el-button
        type="primary"
        @click="resetEntryList"
      >
        保 存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAllShortcutInfo, putShortcutInfo } from '@/api/msg/msg'
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
export default {
  name: 'EntryDialog',
  components: {
    draggable
  },
  props: {
    initData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      symbolKey: 'xlink:href',
      allEntryList: [],
      diffEntryList: []
    }
  },
  computed: {
    ...mapGetters(['userId']),
    selectList() {
      return _.cloneDeep(this.initData)
    }
  },
  mounted() {
    this.initAllData()
  },
  methods: {
    closeDialog() {
      this.$parent.hasEntryDialog = false
    },
    dragEnd() {
      this.$forceUpdate()
    },
    deleteIcon(data) {
      let index = _.findIndex(this.selectList, (item) => item.id == data)
      if (index === -1) return
      this.selectList.splice(index, 1)
      this.getDiffList()
      this.$forceUpdate()
    },
    initAllData() {
      let params = {
        userId: this.userId
      }
      getAllShortcutInfo(params).then((res) => {
        this.allEntryList = res
        this.getDiffList()
      })
    },
    getDiffList() {
      this.diffEntryList = _.differenceBy(this.allEntryList, this.selectList, 'id')
    },
    resetEntryList() {
      let params = []
      this.selectList.map((item, index) => {
        params.push({ userId: this.userId, id: item.id, sort: index })
      })
      if (params.length === 0) {
        this.$message({
          message: '已选择的不可为空',
          type: 'error'
        })
      } else {
        putShortcutInfo(params).then(() => {
          this.closeDialog()
          this.$emit('refresh')
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-dialog__body {
  padding-top: 0px;
  padding-bottom: 10px;
}
.entry-dialog {
  .entry-body {
    .entry-title {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      .entry-main-title {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #212a3f;
      }
      .entry-sub-title {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #757c85;
      }
    }
    .entry-ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      border-radius: 4px;
      border: 1px solid #e3e7e9;
      padding: 48px 100px 20px 100px;
      &::after {
        flex: auto;
        content: ' ';
        width: calc(100% / 3); //这个宽度和子元素宽度一致
        height: 0;
        display: block;
      }
      .entry-li {
        width: calc(100% / 3);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 24px;
      }
    }
  }
  .li-title-box {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 80px;
    &:hover {
      cursor: move;
    }
    .icon-box {
      position: absolute;
      cursor: pointer;
      right: -3px;
      top: -7px;
    }
    .icon-title {
      position: relative;
      width: 32px;
    }
    .icon {
      width: 32px;
      height: 32px;
    }
    .li-title {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #718199;
      margin-top: 8px;
    }
  }
  .add-entry {
    margin-top: 10px;
    border-radius: 4px;
    background-color: rgba(227, 231, 233, 0.49);
    border-radius: 4px;
    padding: 16px;
    .all-entry-ul {
      display: flex;
      flex-wrap: wrap;
      .all-entry-li {
        width: 100px;
        height: 100px;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #e3e7e9;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #718199;
        margin-right: 7px;
        margin-bottom: 7px;
        &:nth-child(5n + 5) {
          margin-right: 0;
        }
        .li-title-box {
          .li-title {
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .icon-title {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
        }
        .icon {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
}
</style>
