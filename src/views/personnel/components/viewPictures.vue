<template>
  <!-- [{url: '' }, {url: '' }] -->
  <!-- 调用 this.$refs.viewPicture.init(pictureList, index); -->
  <div id="view-picture">
    <el-dialog
      title="照片预览"
      :visible.sync="modal"
      class="picture-view-modal"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <!-- <el-button type="info" class="close-btn" icon="el-icon-close" circle @click="modal = false"></el-button> -->
      <el-carousel
        ref="picView"
        trigger="click"
        indicator-position="none"
        arrow="always"
        :autoplay="false"
        :loop="false"
      >
        <el-carousel-item v-for="(i, index) in pictureList" :key="index" name="i">
          <!-- <div> -->
          <!-- <img :src="i.url" /> -->
          <!-- </div> -->
          <el-image style="width: 100%; height: 100%" :src="i.url" fit="contain"></el-image>
        </el-carousel-item>
      </el-carousel>
      <div>
        <!-- <el-carousel indicator-position="none" arrow="always" :autoplay="false" :loop="false" type="card" height="80px">
          <el-carousel-item v-for="(i, index) in pictureList" :key="index">
            <el-image style="width: 100%; height: 100%" :src="i.url" fit="contain"></el-image>
          </el-carousel-item>
        </el-carousel> -->
        <div class="small-img">
          <img v-for="(i, index) in pictureList" :key="index" :src="i.url" alt="" @click="switchImg(index)" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      pictureList: []
    }
  },

  methods: {
    // 初始化
    init(list, index) {
      this.pictureList = list
      this.modal = true

      setTimeout(() => {
        this.$refs.picView.setActiveItem(index ? index : 0)
      })
    },
    switchImg(i) {
      this.$refs.picView.setActiveItem(i)
    }
  }
}
</script>

<style lang="scss" scoped>
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
