<template>
  <div class="approval-index-style fill">
    <basic-container block>
      <section class="index-header-box">
        <h2 class="h2-title">
          审批
        </h2>
        <div
          v-if="!dragOptions.sortVisible"
          class="button-box"
        >
          <el-button
            size="medium"
            @click="groupSort"
          >
            分组排序
          </el-button>
          <el-button
            size="medium"
            @click="addNewGroup"
          >
            新建分组
          </el-button>
          <el-button
            size="medium"
            type="primary"
            @click="createApproval"
          >
            创建审批
          </el-button>
        </div>
        <div
          v-else
          class="button-box"
        >
          <el-button
            size="medium"
            @click="cancelSort"
          >
            取消
          </el-button>
          <el-button
            size="medium"
            type="primary"
            @click="saveSort"
          >
            保存
          </el-button>
        </div>
      </section>
      <section
        v-if="!dragOptions.sortVisible"
        class="approval-section"
      >
        <ul
          v-for="(item, index) in processListData"
          :key="index"
          class="approval-ul"
        >
          <li
            class="approval-li"
            :class="{ 'empty-approval': item.processes.length === 0 }"
          >
            <div class="title-box">
              <div class="li-title">
                {{ item.name }}（{{ item.processes.length }}）
              </div>
              <div
                v-if="item.code !== 'draftProcess'"
                class="action-box"
              >
                <el-button
                  class="action-button"
                  type="text"
                  @click="renameApproval(item)"
                >
                  重命名
                </el-button>
                <el-button
                  v-if="item.processes.length === 0"
                  class="action-button"
                  type="text"
                  @click="deleteApproval(item)"
                >
                  删除
                </el-button>
                <el-tooltip
                  v-if="item.processes.length !== 0"
                  class="item"
                  effect="dark"
                  content="无法删除组，请先删除/移动组内审批"
                  placement="top-start"
                >
                  <button
                    type="text"
                    class="disable-action-button"
                  >
                    删除
                  </button>
                </el-tooltip>
              </div>
            </div>
            <draggable
              v-model="item.processes"
              :animation="200"
              :sort="item.code !== 'draftProcess'"
              :disabled="item.code === 'draftProcess'"
              @end="dragEnd(item, index)"
            >
              <transition-group name="flip-list">
                <ul
                  v-for="(processesItem, processesIndex) in item.processes"
                  :key="processesIndex"
                  class="detail-ul"
                >
                  <li class="detail-li">
                    <div class="li-left">
                      <i
                        v-if="item.code !== 'draftProcess'"
                        class="icon-drag drag-i"
                      />
                      <div
                        class="logo-box"
                        :class="{ 'filter-gray': item.code === 'draftProcess' }"
                      >
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
                    </div>
                    <div class="li-middle">
                      <div>可见范围</div>
                      <div class="middle-span">
                        {{ processesItem.visibleRange }}
                      </div>
                    </div>
                    <div class="li-right">
                      <el-button
                        type="text"
                        @click="createApproval(processesItem)"
                      >
                        编辑
                      </el-button>
                      <div
                        v-if="item.code !== 'draftProcess'"
                        class="margin-left-10"
                      >
                        <el-button
                          type="text"
                          @click="disableApproval(processesItem)"
                        >
                          停用
                        </el-button>
                        <el-button
                          type="text"
                          @click="moveApproval(item, processesItem)"
                        >
                          移动到
                        </el-button>
                      </div>
                      <div
                        v-else
                        class="margin-left-10"
                      >
                        <el-button
                          v-if="processesItem.status === 1"
                          type="text"
                          @click="enableApproval(item, processesItem)"
                        >
                          启用
                        </el-button>
                        <el-button
                          v-if="processesItem.status === 0"
                          type="text"
                          @click="publishApproval(item, processesItem)"
                        >
                          发布
                        </el-button>
                        <el-button
                          type="text"
                          @click="deleteProcesses(processesItem)"
                        >
                          删除
                        </el-button>
                      </div>
                    </div>
                  </li>
                </ul>
              </transition-group>
            </draggable>
          </li>
        </ul>
      </section>
      <drag-list
        v-if="dragOptions.sortVisible"
        :drag-options.sync="dragOptions"
      />
    </basic-container>
    <process-dialog
      v-if="dialogOptions.dialogVisible"
      :dialog-options.sync="dialogOptions"
      :sub-group.sync="subGroup"
      @reloadData="refreshData"
    />
  </div>
</template>
<script>
import {
  getProcessList,
  deleteCategory,
  stopProcessCategory,
  getDraftList,
  deleteProcess,
  releaseProcess,
  sortCategory,
  sortProcess
} from '@/api/apprProcess/apprProcess'
import processDialog from '@/views/apprProcess/components/processDialog'
import dragList from '@/views/apprProcess/components/dragList'
import draggable from 'vuedraggable'
import { deepClone } from '@/util/util'
const DRAFTCODE = 'draftProcess' // 定义弃用code
export default {
  name: 'ApprovalIndex',
  components: { processDialog, dragList, draggable },
  data() {
    return {
      symbolKey: 'xlink:href',
      dragOptions: {
        sortVisible: false,
        sortData: {}
      },
      subGroup: {},
      dialogOptions: {
        dialogTitle: '',
        dialogType: 'add',
        dialogVisible: false
      },
      processListData: [],
      tempProcessList: []
    }
  },
  mounted() {
    this.refreshData()
  },
  methods: {
    /**
     * 重新刷新数据
     */
    async refreshData() {
      let resData = {}
      await getProcessList().then((res) => {
        resData = res
        // window.console.log('可用res==', res)
        this.dragOptions.sortData = res
        resData.map((item) => {
          item.processes = _.sortBy(item.processes, 'sort')
        })
        resData = _.sortBy(resData, 'sort')
      })
      await getDraftList().then((res) => {
        // window.console.log('弃用res==', res)
        // 因接口返回数据不同，故专门写成如审批列表结构
        let resetData = [
          {
            id: 0,
            name: '未启用',
            code: DRAFTCODE,
            processes: res,
            sort: 9999
          }
        ]
        resData = [...resData, ...resetData]
      })
      this.processListData = resData
      // window.console.log('加载审批列表数据==', resData)
      // 拖拽的时候用来对比的原先的列表
      this.tempProcessList = deepClone(resData)
    },
    /**
     * 拖拽结束
     */
    dragEnd(data, index) {
      if (data.processes.length <= 1) return
      let parmas = []
      // 暂存拖拽数组和获取数据的数组的id集合
      let temProcessIdList = []
      let temDataIdList = []
      data.processes.map((item, processesIndex) => {
        parmas.push({
          processId: item.processId,
          categoryId: data.id,
          sort: processesIndex + 1
        })
        temDataIdList.push(item.processId)
      })
      this.tempProcessList[index].processes.forEach((tempItem) => {
        temProcessIdList.push(tempItem.processId)
      })
      let isSame = true // 当前两个数组是否相同，默认是两个相同的
      temProcessIdList.forEach((item, index) => {
        if (temDataIdList[index] !== item) {
          isSame = false
        }
      })
      // window.console.log('拖拽结束 parmas==', JSON.stringify(parmas))
      // 当拖拽后的结果与之前暂存的是同一个数组时，不需要调用排序
      if (isSame) return
      sortProcess(parmas).then(() => {
        this.refreshData()
      })
    },
    /**
     * 启用
     */
    enableApproval(data, processesItem) {
      this.dialogOptions = {
        dialogTitle: `将"${processesItem.processName}"启用到`,
        dialogVisible: true,
        dialogType: 'enable'
      }
      // 深克隆防止污染渲染数组
      let target = deepClone(data)
      target.processes = processesItem
      this.subGroup = target
    },
    /**
     * 发布
     */
    publishApproval(data, processesItem) {
      // window.console.log(data, processesItem)
      let that = this
      this.$confirm(
        `
      <div style="margin-left: 20px">
        <p>发布并启用会进入到审批所设置的分组，并启用该审批</p>
        <p>仅发布则在作为未启用的正式审批放在未启用分组中</p>
      </div>
      `,
        `"用印申请"发布`,
        {
          distinguishCancelAndClose: true,
          dangerouslyUseHTMLString: true,
          confirmButtonText: '发布并启用',
          cancelButtonText: '仅发布'
        }
      )
        .then(() => {
          that.releaseProcessApi(processesItem, 1)
        })
        .catch(() => {
          that.releaseProcessApi(processesItem, 0)
        })
    },
    /**
     * type = 0 是仅启用 1表示启用并发布
     */
    releaseProcessApi(processesItem, type) {
      let parmas = {
        processId: processesItem.processId,
        categoryId: ''
      }
      releaseProcess(parmas).then(() => {
        if (type === 0) {
          this.$message.success(`${processesItem.processName}已发布到【未启用】分组中`)
        } else {
          this.$message.success(`${processesItem.processName}已发布到【XXX】分组中`)
        }
      })
    },
    /**
     * 删除审批行程
     */
    deleteProcesses(data) {
      // window.console.log(data)
      this.$confirm('您确定要删除该审批流程吗？', '删除流程', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteProcess({ processId: data.processId }).then(() => {
            // window.console.log('delete res==', res)
            this.$message.success(`删除成功`)
            this.refreshData()
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    /**
     * 分组排序
     */
    groupSort() {
      this.dragOptions.sortVisible = true
    },
    /**
     * 取消排序
     */
    cancelSort() {
      this.dragOptions.sortVisible = false
    },
    /**
     * 保存排序
     */
    saveSort() {
      let params = []
      this.dragOptions.sortData.map((item, index) => {
        params.push({
          id: item.id,
          sort: index + 1
        })
      })
      // window.console.log('保存排序参数==', params)
      sortCategory(params).then(() => {
        this.sortRefreshData()
      })
    },
    /**
     * 保存后选刷新列表，再关闭页面，防止抖动
     */
    async sortRefreshData() {
      await this.refreshData()
      this.dragOptions.sortVisible = false
    },
    /**
     * 移动到
     */
    moveApproval(data, processesItem) {
      this.dialogOptions = {
        dialogTitle: `将"${processesItem.processName}"移动到`,
        dialogVisible: true,
        dialogType: 'move'
      }
      let target = deepClone(data)
      target.processes = processesItem
      this.subGroup = target
    },
    /**
     * 停用审批
     */
    disableApproval(data) {
      stopProcessCategory({ processId: data.processId }).then(() => {
        this.$message.success(`停用成功`)
        this.refreshData()
      })
    },
    /**
     * 删除分组
     */
    deleteApproval(data) {
      // window.console.log('data==', data)
      this.$confirm('您确定要删除该审批分组吗？', '删除分组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteCategory({ id: data.id }).then(() => {
            // window.console.log('delete res==', res)
            this.$message.success(`删除成功`)
            this.refreshData()
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    /**
     * 重命名
     */
    renameApproval(data) {
      this.subGroup = data
      this.dialogOptions = {
        dialogTitle: `重命名分组`,
        dialogVisible: true,
        dialogType: 'rename'
      }
    },
    /**
     * 新建分组
     */
    addNewGroup() {
      this.subGroup = {}
      this.dialogOptions = {
        dialogTitle: `新建分组`,
        dialogVisible: true,
        dialogType: 'add'
      }
    },
    /**
     * 创建审批
     */
    createApproval(data) {
      this.$router.push({
        path: '/process/design',
        query: data ? { processId: data.processId, formKey: data.formKey } : ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.flip-list-move {
  transition: transform 0.5s;
}
.basic-container--block {
  height: calc(100% - 48px);
  min-height: calc(100% - 48px);
}
.approval-index-style {
  margin-top: 24px;
  .index-header-box {
    @include flexJustify;
    @include flexAlign;
    .h2-title {
      font-size: 18px;
      color: #202940;
      margin: 0;
    }
  }
  .approval-section {
    padding-top: 16px;
    .margin-left-10 {
      margin-left: 10px;
    }
    .approval-ul {
      &:last-child {
        .approval-li {
          padding-bottom: 0;
        }
      }
      .approval-li {
        padding-bottom: 15px;
        .title-box {
          @include flexJustify;
          @include flexAlign;
          height: 42px;
          padding: 0 24px;
          background-color: #f7f8fa;
          border-bottom: 1px solid #e4e7e9;
          .li-title {
            font-size: 16px;
            color: #202940;
            font-weight: 500;
          }
          .action-box {
            .action-button {
              // color: #202940;
            }
          }
        }
      }
      .disable-action-button {
        // color: #c0c4cc;
        color: #a9beff;
        cursor: pointer;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        text-align: center;
        padding: 13px 0px;
        font-size: 14px;
        border: 0;
        background-color: transparent;
        margin-left: 10px;
      }
      .empty-approval {
        padding-bottom: 0;
      }
      .detail-ul {
        .detail-li {
          @include flexJustify;
          @include flexAlign;
          height: 80px;
          padding: 0 24px;
          border-bottom: 1px solid #e9e9e9;
          &:hover {
            background-color: #f2faff;
          }
          .li-left {
            @include flexAlign;
            justify-self: start;
            min-width: calc(7 / 12 * 100%);
            .drag-i {
              width: 24px;
              height: 24px;
              display: flex;
              justify-content: center;
              align-items: center;
              &:hover {
                cursor: move;
              }
            }
            .logo-box {
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 14px;
              width: 48px;
              height: 48px;
              svg {
                width: 40px;
                height: 40px;
              }
            }
            .filter-gray {
              filter: grayscale(100%);
              filter: gray;
            }
            .content-box {
              .content-title {
                font-size: 14px;
                color: #202940;
                font-weight: 600;
              }
              .content-des {
                margin-top: 4px;
                max-width: 300px;
                color: #757c85;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
              }
            }
          }
          .li-middle {
            min-width: calc(1 / 12 * 100%);
            .middle-span {
              color: #757c85;
              margin-top: 4px;
            }
          }
          .li-right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
</style>
