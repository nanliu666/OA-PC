<template>
  <el-card
    class="news-card"
    shadow="never"
  >
    <div class="header">
      <span class="title">
        <span>新闻中心</span>
        <i
          class="icon-arrow-right-outlined"
          style="margin-right:12px;cursor: pointer; "
        />
      </span>
    </div>
    <ul
      v-if="newsList.length !== 0"
      class="content-ul"
    >
      <li
        v-for="(item, index) in newsList"
        :key="index"
        class="content-li"
      >
        <el-image
          fit="cover"
          class="li-img"
          :src="item.picUrl"
        />
        <div class="li-content">
          <el-tooltip
            class="item"
            effect="dark"
            :content="item.title"
            placement="top"
          >
            <div class="li-title">
              {{ item.title }}
            </div>
          </el-tooltip>
          <div class="li-time">
            {{ item.publishTime }}
          </div>
        </div>
      </li>
    </ul>
  </el-card>
</template>

<script>
import { getNewsCenterList } from '@/api/newsCenter/newCenter'
export default {
  name: 'NewsCard',
  data() {
    return {
      newsList: []
    }
  },
  created() {
    let parmas = {
      pageNo: 1,
      pageSize: 5
    }
    getNewsCenterList(parmas).then((res) => {
      this.newsList = res
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.news-card {
  flex: 1;
  // 头部
  .header {
    .title {
      cursor: pointer;
      span {
        font-size: 18px;
        color: #202940;
        line-height: 28px;
        font-weight: bold;
      }
      .icon-arrow-right-outlined {
        color: #a0a8ae;
      }
    }
  }
  .content-ul {
    .content-li {
      cursor: pointer;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #e3e7e9;
      height: calc(332px / 3);
      &:last-child {
        border-bottom: 0;
      }
      /deep/ .el-image__inner {
        width: 70px;
        height: 60px;
        margin-right: 10px;
        border-radius: 4px;
      }
      .li-content {
        width: calc(100% - 80px);
        display: flex;
        flex-direction: row;
        align-items: stretch;
        flex-wrap: wrap;
        height: 60px;
        .li-title {
          font-size: 14px;
          color: #202940;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .li-time {
          color: #757c85;
          font-size: 14px;
          align-self: flex-end;
          width: 100%;
        }
      }
    }
  }
}
</style>
