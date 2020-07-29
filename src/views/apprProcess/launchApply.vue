<template>
  <div class="launch-style">
    <basicContainer block>
      <ul
        v-for="(item, index) in processListData"
        :key="index"
        class="approval-ul"
      >
        <li
          class="approval-li"
          :class="{ 'empty-approval': item.processes.length === 0 }"
        >
          <div
            class="title-box"
            @click.stop="hideCurrent(index)"
          >
            <span>{{ item.name }}（{{ item.processes.length }}）</span>
            <span
              v-if="item.processes.length !== 0"
              class="hide-span"
            >{{
              currentIndexList.indexOf(index) === -1 ? '收起' : '展开'
            }}</span>
          </div>
          <ul
            v-show="currentIndexList.indexOf(index) === -1"
            class="detail-ul"
          >
            <li
              v-for="(processesItem, processesIndex) in item.processes"
              :key="processesIndex"
              class="detail-li"
            >
              <div class="logo-box">
                <svg
                  class="icon"
                  aria-hidden="true"
                >
                  <use :[symbolKey]="'#icon-' + processesItem.icon" />
                </svg>
              </div>
              <div class="content-box">
                <div class="content-title">
                  {{ processesItem.processName }}
                </div>
                <el-tooltip
                  v-if="processesItem.remark"
                  effect="dark"
                  placement="top-start"
                  :content="processesItem.remark"
                >
                  <div class="content-des">
                    {{ processesItem.remark }}
                  </div>
                </el-tooltip>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </basicContainer>
  </div>
</template>

<script>
import { getUserProcessList } from '@/api/apprProcess/apprProcess'
import { mapGetters } from 'vuex'

export default {
  name: 'Apply',
  data() {
    return {
      symbolKey: 'xlink:href',
      processListData: [],
      currentIndexList: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    this.initData()
  },

  methods: {
    /**
     * 初始化数据
     */
    initData() {
      let parmas = {
        userId: this.userId,
        processName: ''
      }
      getUserProcessList(parmas).then((res) => {
        this.processListData = res
      })
    },
    /**
     * 隐藏li
     */
    hideCurrent(index) {
      let currentIndex = this.currentIndexList.indexOf(index)
      if (currentIndex > -1) {
        this.currentIndexList.splice(currentIndex, 1)
      } else {
        this.currentIndexList.push(index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.basic-container--block {
  height: calc(100% - 48px);
  min-height: calc(100% - 48px);
}
.launch-style {
  margin-top: 24px;
}
.approval-ul {
  padding-bottom: 15px;
  .approval-li {
    &:hover {
      cursor: pointer;
    }
    .title-box {
      @include flexJustify;
      @include flexAlign;
      height: 42px;
      padding: 0 24px;
      background-color: #f7f8fa;
      font-size: 16px;
      color: #202940;
      font-weight: 500;
      .hide-span {
        cursor: pointer;
      }
    }
  }
  .empty-approval {
    padding-bottom: 0;
  }
  .detail-ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-decoration: none;
    &::after {
      content: '';
      height: 0;
      width: calc((100% - 24px * 2) / 3);
    }
    .detail-li {
      box-sizing: border-box;
      margin-top: 15px;
      margin-right: 24px;
      width: calc((100% - 24px * 2) / 3);
      height: 100px;
      display: flex;
      justify-content: flex-start;
      height: 136px;
      padding: 24px 24px 0;
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      &:nth-child(3n + 3) {
        margin-right: 0;
      }
      .logo-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 14px 0 0;
        width: 48px;
        height: 48px;
        svg {
          width: 40px;
          height: 40px;
        }
      }
      .content-box {
        .content-title {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 600;
        }
        .content-des {
          margin-top: 8px;
          max-width: 232px;
          color: #757c85;
          @include ellipsisMultiline(2);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
