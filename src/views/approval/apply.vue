<template>
  <div style="height:100%;width: 100% ">
    <div class="header">
      <div>
        发起申请
      </div>
    </div>
    <div class="view-case">
      <div class="content flex flex-justify-start flex-items">
        <div
          v-for="(it, i) in info"
          :key="i"
          class="todo flex flex-justify-start "
          @click="jump(it)"
        >
          <div class="images">
            <!--              <el-image-->
            <!--                :src="it.iconUrl"-->
            <!--                class="imgs"-->
            <!--              />-->
            <i
              class="imgs iconfont  menu-user-filled"
              style="color:red"
            />
          </div>
          <div class="info">
            <div class="info-title">
              {{ it.name }}
            </div>
            <div class="info-explain">
              {{ it.remark }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getApprForm } from '@/api/approval/approval'

export default {
  name: 'Apply',
  data() {
    return {
      info: [],
      showData: ['UserFormalInfo', 'UserLeaveInfo']
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getApprForm().then((res) => {
        // this.info = res
        this.info = []
        res.map((it) => {
          if (this.showData.includes(it.formKey)) this.info.push(it)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  max-width: 1152px;
  margin: 0 auto;
  flex-flow: row wrap;
  .todo {
    /*width: 352px;*/
    width: 30%;
    height: 136px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    border-radius: 4px;
    margin-right: 24px;
    box-sizing: border-box;
    margin-bottom: 24px;
    padding: 24px;
    .images {
      .imgs {
        height: 48px;
        width: 48px;
        border-radius: 50%;
        display: inline-block;
      }
      margin-right: 16px;
    }
    .info {
      max-width: 232px;
      .info-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        letter-spacing: 0;
        text-align: left;
        line-height: 24px;
        font-weight: 800;
      }
      .info-explain {
        /*margin-top: 8px;*/
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        letter-spacing: 0;
        text-align: left;
        line-height: 22px;
      }
    }
  }
}
</style>
