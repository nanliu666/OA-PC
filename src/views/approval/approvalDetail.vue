<template>
  <div style="height:100%;width: 100% ">
    <div class="header">
      <div>
        <i
          class="icon el-icon-arrow-left"
          @click="back"
        /> 审批流程
      </div>
    </div>
    <div class="view-case approval">
      <div class="flex flex-justify-start flex-items title">
        <i class="el-icon-caret-bottom" />审批流程
        <el-link
          type="primary"
          class="hellp"
          @click="handleNote"
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
        <el-button
          size="medium"
          @click="back"
        >
          取消
        </el-button>
      </div>
    </div>
    <noteDialog
      v-if="dialogVisible"
      :note.sync="note"
      :dialog-visible.sync="dialogVisible"
    />
  </div>
</template>

<script>
import approvalcompoent from '@/views/approval/components/approvalcompoent'
import { getAppProcess, putAppProcess, postAppProcess } from '@/api/approval/approval'
import noteDialog from '@/views/approval/components/noteDialog'

export default {
  name: 'ApprovalDetail',
  components: { approvalcompoent, noteDialog },
  data() {
    return {
      dialogVisible: false,
      input: '',
      note: '',
      initData: {},
      approvalList: [
        {
          id: '',
          name: '部门主管',
          isStart: 0,
          isEnd: 0,
          parentId: '',
          childId: '',
          isEdit: false,
          users: []
        },
        {
          id: '',
          name: '综合管理部',
          isStart: 0,
          isEnd: 0,
          parentId: '',
          childId: '',
          isEdit: false,
          users: []
        },
        {
          id: '',
          name: '控股负责人',
          isStart: 0,
          isEnd: 0,
          parentId: '',
          childId: '',
          isEdit: false,
          users: []
        },
        {
          id: '',
          name: '总裁',
          isStart: 0,
          isEnd: 0,
          parentId: '',
          childId: '',
          isEdit: false,
          users: []
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
     * @desc 返回审批流程
     *
     * */
    back() {
      this.$router.push({
        path: '/approval/approvalProcess'
      })
    },
    /**
     * @author guanfenda
     * @desc 处理显示帮助弹框
     *
     * */
    handleNote() {
      this.dialogVisible = true
    },
    filerData(data, list) {
      if (!(list.length >= data.length)) {
        if (list.length === 0) {
          data.map((it) => {
            if (it.isStart === 1) {
              list.push(it)
            }
          })
        } else {
          data.map((it) => {
            if (list[list.length - 1].childId && list[list.length - 1].childId == it.id) {
              list.push(it)
            }
          })
        }
        this.filerData(data, list)
      }
    },
    /**
     * @author guanfenda
     * @desc 获取流程节点
     * */
    getData() {
      let params = {
        formKey: this.$route.query.formKey
      }
      getAppProcess(params).then((res) => {
        let list = []
        this.filerData(res.nodes, list)
        list.map((it) => (it.isEdit = false))

        this.initData = res
        this.note = res.note

        debugger
        if (!res.id) {
          return
        }
        this.approvalList = list
      })
    },
    /**
     * @author guanfenda
     * @desc 提交流程
     * */
    onsubmit() {
      let isUser = this.approvalList.find((it) => {
        if (!(it.users[0] && it.users[0].id)) {
          //如果存在没有选择审批人给提示
          this.$message.warning('请选择节点  ' + it.name + ' 负责人')
          return it
        }
      })
      if (isUser) return //不给提交

      if (this.initData.id) {
        let params = {
          id: this.initData.id,
          note: this.note
        }
        putAppProcess(params).then(() => {})
      }
      let params = {
        formKey: this.$route.query.formKey,
        note: this.note,
        nodes: []
      }
      this.approvalList.map((it, index) => {
        //给节点赋节点id
        it.id = index + 1
      })
      this.approvalList.reduce((prev, cur) => {
        // 处理前后
        if (prev.id === 1) {
          //开始节点
          prev.isStart = 1
        }
        if (cur.id === this.approvalList.length) {
          //结束节点
          cur.isEnd = 1
        }
        cur.parentId = prev.id
        prev.childId = cur.id
        return cur
      })
      params.nodes = this.approvalList
      postAppProcess(params).then(() => {
        this.$message.success('提交成功')
        setTimeout(() => {
          this.back()
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.approval {
  padding-left: 200px !important;
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
