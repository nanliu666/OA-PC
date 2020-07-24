<template>
  <div class="approval-index-style">
    <basic-container
      block
      style="margin: 24px 0"
    >
      <section class="index-header-box">
        <h2 class="h2-title">
          审批
        </h2>
        <div class="button-box">
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
      </section>
      <section class="approval-section">
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
                v-if="item.name !== '未启用'"
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
            <ul
              v-for="(processesItem, processesIndex) in item.processes"
              :key="processesIndex"
              class="detail-ul"
            >
              <li class="detail-li">
                <div class="li-left">
                  <i
                    v-if="item.name !== '未启用'"
                    class="icon-drag drag-i"
                  />
                  <div
                    class="logo-box"
                    :class="{ 'filter-gray': item.name === '未启用' }"
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
                    <el-popover
                      v-if="processesItem.remark"
                      placement="top-start"
                      width="420"
                      trigger="hover"
                      :content="processesItem.remark"
                    >
                      <div
                        slot="reference"
                        class="content-des"
                      >
                        {{ processesItem.remark }}
                      </div>
                    </el-popover>
                  </div>
                </div>
                <div class="li-middle">
                  <div>可见范围</div>
                  <div class="middle-span">
                    全部可见
                  </div>
                </div>
                <div class="li-right">
                  <el-button type="text">
                    编辑
                  </el-button>
                  <div
                    v-if="item.name !== '未启用'"
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
                      @click="enableApproval(processesItem)"
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
                      v-if="processesItem.status === 0"
                      type="text"
                      @click="deleteProcesses(processesItem)"
                    >
                      删除
                    </el-button>
                    <el-tooltip
                      v-if="processesItem.status === 1"
                      class="item"
                      effect="dark"
                      content="无法删除，当前审批还有进行中的流程"
                      placement="top-start"
                    >
                      <button
                        type="text"
                        class="disable-action-button"
                        style="color: #a9beff"
                      >
                        删除
                      </button>
                    </el-tooltip>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </basic-container>
    <process-dialog
      v-if="dialogOptions.dialogVisible"
      :dialog-options.sync="dialogOptions"
      :sub-group.sync="subGroup"
      @reloadData="reloadFatherData"
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
  releaseProcess
} from '@/api/apprProcess/apprProcess'
import processDialog from '@/views/apprProcess/components/processDialog'
import { deepClone } from '@/util/util'
export default {
  name: 'ApprovalIndex',
  components: { processDialog },
  data() {
    return {
      symbolKey: 'xlink:href',
      subGroup: {},
      dialogOptions: {
        dialogTitle: '',
        dialogType: 'add',
        dialogVisible: false
      },
      processListData: []
    }
  },
  mounted() {
    this.refreshData()
  },
  methods: {
    reloadFatherData() {
      this.refreshData()
    },
    async refreshData() {
      let resData = {}
      await getProcessList().then((res) => {
        resData = res
        // window.console.log('审批list res==', res)
      })
      await getDraftList().then((res) => {
        resData = [...resData, ...res]
      })
      window.console.log('审批列表数据==', resData)
      this.processListData = resData
    },
    /**
     * 启用
     */
    enableApproval(processesItem) {
      // TODO 直接启用到该审批流程之前所在分组，缺失信息，现在只做启用到选择分组
      this.dialogOptions = {
        dialogTitle: `将"${processesItem.processName}"启用到`,
        dialogVisible: true,
        dialogType: 'enable'
      }
    },
    /**
     * 发布
     */
    publishApproval(data, processesItem) {
      window.console.log(data, processesItem)
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
      window.console.log(data)
      this.$confirm('您确定要删除该审批流程吗？', '删除流程', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteProcess({ id: data.processId }).then((res) => {
            window.console.log('delete res==', res)
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
    groupSort() {},
    /**
     * 移动到
     */
    moveApproval(data, processesItem) {
      let target = deepClone(data)
      target.processes = processesItem
      this.dialogOptions = {
        dialogTitle: `将"${processesItem.processName}"移动到`,
        dialogVisible: true,
        dialogType: 'move'
      }
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
    deleteApproval(data) {
      // window.console.log('data==', data)
      this.$confirm('您确定要删除该审批分组吗？', '删除分组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteCategory({ id: data.id }).then((res) => {
            window.console.log('delete res==', res)
            this.$message.success(`删除成功`)
            this.refreshData()
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    renameApproval(data) {
      this.subGroup = data
      this.dialogOptions = {
        dialogTitle: `重命名分组`,
        dialogVisible: true,
        dialogType: 'rename'
      }
    },
    addNewGroup() {
      this.subGroup = {}
      this.dialogOptions = {
        dialogTitle: `新建分组`,
        dialogVisible: true,
        dialogType: 'add'
      }
    },
    createApproval() {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.approval-index-style {
  .index-header-box {
    @include flexJustify;
    @include flexAlign;
    .h2-title {
      font-size: 18px;
      color: #202940;
      margin: 0;
    }
    .button-box {
    }
  }
  .approval-section {
    padding-top: 16px;
    .margin-left-10 {
      margin-left: 10px;
    }
    .approval-ul {
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
              color: #202940;
            }
          }
        }
      }
      .disable-action-button {
        color: #c0c4cc;
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
