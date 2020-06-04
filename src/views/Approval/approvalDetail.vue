<template>
  <div style="height:100%;width: 100% ">
    <div class="header">
      <div><i class="icon el-icon-arrow-left" /> 审批流程</div>
    </div>
    <div class="view-case approval">
      <div class="flex flex-justify-start flex-items title">
        <i class="el-icon-caret-bottom" />审批流程
        <el-link
          type="primary"
          class="hellp"
        >
          审批流程帮助
        </el-link>
      </div>
      <approvalcompoent :approval-list.sync="approvalList" />
      <div class="footer">
        <el-button
          type="primary"
          size="medium"
          @click="onsubmit"
        >
          保存
        </el-button>
        <el-button size="medium">
          取消
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import approvalcompoent from '@/views/approval/components/approvalcompoent'
import { getAppProcess } from '@/api/approval/approval'

export default {
  name: 'ApprovalDetail',
  components: { approvalcompoent },
  data() {
    return {
      input: '',
      note: '',
      initData: {},
      approvalList: [
        {
          id: '1',
          name: '部门主管',
          isStart: '0',
          isEnd: '0',
          parentId: '',
          childId: '',
          isEdit: false,
          users: {}
        },
        {
          id: '2',
          name: '综合管理部',
          isStart: '0',
          isEnd: '0',
          parentId: '',
          childId: '',
          isEdit: false,
          users: {}
        },
        {
          id: '3',
          name: '控股负责人',
          isStart: '0',
          isEnd: '0',
          parentId: '',
          childId: '',
          isEdit: false,
          users: {}
        },
        {
          id: '4',
          name: '总裁',
          isStart: '0',
          isEnd: '0',
          parentId: '',
          childId: '',
          isEdit: false,
          users: {}
        }
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    /**
     * @author guanfenda
     * @desc 获取流程节点
     * */
    getData() {
      let params = {
        formKey: this.$route.query.formKey
      }
      getAppProcess(params).then((res) => {
        this.initData = res
        if (!res.id) {
          return
        }
        this.approvalList = res.nodes
      })
    },
    /**
     * @author guanfenda
     * @desc 提交流程
     * */
    onsubmit() {
      let isUser = this.approvalList.find((it) => {
        if (!it.users.id) {
          //如果存在没有选择审批人给提示
          this.$message.warning('请选择节点  ' + it.name + ' 负责人')
          return it
        }
      })
      if (isUser) return //不给提交
      if (this.initData.id) {
        // let params = {
        //   id:this.initData.id,
        //   note:this.note,
        //   version:this.initData.version,
        // }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.approval {
  padding-left: 400px !important;
  position: relative;
}

.icon {
  font-weight: bold;
}

.title {
  font-size: 16px;
  margin-left: -10px;
  margin-top: 30px;
  .hellp {
    font-size: 16px;
    margin-left: 16px;
  }
}

.footer {
  position: absolute;
  bottom: 50px;
}
</style>
