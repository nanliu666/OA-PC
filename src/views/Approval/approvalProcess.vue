<template>
  <div style="height:100%;width: 100% ">
    <div class="header">
      <div>审批流程</div>
    </div>
    <div class="approval">
      <div class="content flex flex-justify-start flex-items">
        <div
          v-for="(it, i) in info"
          :key="i"
          class="todo flex flex-justify-start "
          @click="jump(it)"
        >
          <div class="images">
            <el-image
              :src="it.iconUrl"
              class="imgs"
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
    <approval-dialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
    />
  </div>
</template>

<script>
import approvalDialog from '@/views/approval/components/approvalDialog'
import { getApprForm } from '@/api/approval/approval'
export default {
  name: 'ApprovalProcess',
  components: {
    approvalDialog
  },
  data() {
    return {
      dialogVisible: false,
      info: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getApprForm().then((res) => {
        this.info = res
      })
    },
    jump(it) {
      // this.dialogVisible = true
      let params = {
        formKey: it.formKey
      }
      this.$router.push({
        path: '/approval/approvalDetail',
        query: params
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #202940;
  line-height: 28px;
  font-weight: bold;
  margin-top: 14px;
}
.approval {
  margin-top: 16px;
  background: #ffffff;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 24px !important;
  min-height: calc(100% - 120px);
  .form_ {
    padding-top: 40px;
    width: 400px;
    margin: 0 auto;
    font-size: 14px;
    .label_ {
      /*display: inline-block;*/
      /*margin-top:24px;*/
      /*margin-bottom:8px;*/
    }
    .tip {
      font-size: 12px;
      line-height: 14px;
      color: #a0a8ae;
    }
    .bt {
      /*margin-top: 40px;*/
    }
  }
}
.content {
  max-width: 1152px;
  margin: 0 auto;
  /*padding: 24px 0px 24px 24px;*/
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
