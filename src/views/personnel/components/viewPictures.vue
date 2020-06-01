<template>
  <!-- [{url: '' }, {url: '' }] -->
  <!-- 调用 this.$refs.viewPicture.init(pictureList, index); -->
  <div>
    <el-image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="pictureList"
    />
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  components: {
    ElImageViewer
  },
  data() {
    return {
      pictureList: [],
      showViewer: false
    }
  },
  methods: {
    // 初始化
    init(list) {
      this.showViewer = true
      this.pictureList = list.map((item) => {
        return item.url
      })
    },
    switchImg(i) {
      this.$refs.picView.setActiveItem(i)
    },
    closeViewer() {
      this.showViewer = false
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-image-viewer__mask {
  opacity: 0.75;
}

/deep/ .el-icon-circle-close {
  color: #fff;
}

.small-img {
  justify-content: center;

  display: flex;
  width: 100%;
  height: 50px;
  overflow: hidden;
}
.small-img img {
  margin: 8px;
  height: 50px;
  width: 50px;
  background: rgba(0, 0, 0, 0.5);
}
#view-picture {
  // 图片预览
  .picture-view-modal {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;

    justify-content: center;
    align-items: center;

    .el-dialog {
      margin: 0 !important;
      background-color: transparent;
      box-shadow: none;
      width: 950px;
      height: 100%;
      max-height: calc(100% - 60px);
      overflow: hidden;
    }

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 0;
      position: relative;
      width: 950px;
      height: 100%;
      max-height: initial;
      // max-height: 100%;
      overflow: hidden;
      // background: red;

      .close-btn {
        position: absolute;
        right: 20px;
        top: 0px;
        z-index: 10;
        background-color: #666;
        border-color: #666;
        padding: 11px;

        i.el-icon-close {
          font-size: 18px;
        }
      }
    }

    .el-dialog__footer {
      display: none;
    }

    .el-carousel {
      height: 100%;
      width: 100%;
      position: relative;

      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flex;
      display: -o-flex;
      display: flex;

      justify-content: center;

      .el-carousel__container {
        height: 100%;
        width: 800px;

        .el-carousel__arrow--left {
          left: -80px;
          background-color: transparent;

          i {
            font-size: 46px;
          }
        }

        .el-carousel__arrow--right {
          right: -70px;
          background-color: transparent;

          i {
            font-size: 46px;
          }
        }
      }

      .el-carousel__item {
        width: 100%;
        height: 100%;
        transition: all 0s !important;

        > div {
          width: 100%;
          height: 100%;

          background-color: #000;

          display: -webkit-flex;
          display: -moz-flex;
          display: -ms-flex;
          display: -o-flex;
          display: flex;

          justify-content: center;
          align-items: center;

          img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }
}
</style>
