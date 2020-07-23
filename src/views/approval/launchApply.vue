<template>
  <div style="height:100%;width: 100% ">
    <!--    <div class="header">-->
    <!--      <div>-->
    <!--        发起申请-->
    <!--      </div>-->
    <!--    </div>-->
    <pageHeader title="发起申请" />
    <basicContainer>
      <div class="content flex flex-justify-start flex-items">
        <div
          v-for="(it, i) in info"
          :key="i"
          class="todo flex flex-justify-start "
          @click="jump(it.formKey)"
        >
          <div class="images">
            <svg
              class="imgs icon"
              aria-hidden="true"
            >
              <use :[key]="'#' + it.iconUrl" />
            </svg>
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
    </basicContainer>
  </div>
</template>

<script>
import { checkApplyNum } from '@/api/leave/leave'
import { getApprForm } from '@/api/approval/approval'
import { mapGetters } from 'vuex'

export default {
  name: 'Apply',
  data() {
    return {
      key: 'xlink:href',
      info: [],
      showData: ['UserFormalInfo', 'UserLeaveInfo']
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters(['userId'])
  },
  methods: {
    jump(formKey) {
      if (formKey === this.showData[0]) {
        if (this.$store.getters.status === 'Formal' || this.$store.getters.status === 'WaitLeave') {
          //员工状态，Try-试用期，Formal-正式，Leaved-已离职，WaitLeave-待离职
          this.$message.warning('你已经是正式员工')
          return
        }
        this.$router.push({
          path: '/personnel/administration/apply'
        })
      } else if (formKey === this.showData[1]) {
        // 检查是否已经有正在审批中的离职申请
        checkApplyNum({ userId: this.userId, formKey: 'UserLeaveInfo' }).then((res) => {
          if (res.approveNum !== 0) {
            this.$message.error('你已提交了离职申请,不能重复提交')
            return
          }
          this.$router.push({
            path: '/personnel/leave/applyLeave'
          })
        })
      }
      // /personnel/administration/apply
    },
    getData() {
      getApprForm().then((res) => {
        // this.info = res
        this.info = []
        res.map((it) => {
          if (this.showData.includes(it.formKey)) {
            this.info.push(it)
          }
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
  cursor: pointer;
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
      text-align: center;
      display: inline-block;

      /*overflow: hidden;*/
      margin-right: 16px;
      .imgs {
        text-align: center;
        line-height: 48px;
        height: 48px;
        width: 48px;
        margin-right: 0px;
        /*border-radius: 50%;*/
        display: inline-block;
        font-size: 32px;
        color: #fff;
        background: #fff;
      }
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
