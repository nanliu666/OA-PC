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
          <li class="approval-li">
            <div class="title-box">
              <div class="li-title">
                {{ item.name }}（{{ item.processes.length }}）
              </div>
              <div class="action-box">
                <el-button
                  class="action-button"
                  type="text"
                  @click="renameApproval(item.name)"
                >
                  重命名
                </el-button>
                <el-button
                  type="text"
                  :class="{ 'action-button': item.processes.length === 0 }"
                  :disabled="item.processes.length !== 0"
                >
                  删除
                </el-button>
              </div>
            </div>
            <ul
              v-for="(processesItem, processesIndex) in item.processes"
              :key="processesIndex"
              class="detail-ul"
            >
              <li class="detail-li">
                <div class="li-left">
                  <i class="icon-drag drag-i" />
                  <div class="logo-box">
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
                  <el-button type="text">
                    停用
                  </el-button>
                  <el-button type="text">
                    移动到
                  </el-button>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </basic-container>
    <add-new-process-dialog
      v-if="dialogVisible"
      :dialog-visible.sync="dialogVisible"
      :sub-group-name.sync="subGroupName"
      :dialog-type="dialogType"
    />
  </div>
</template>
<script>
import { getProcessList } from '@/api/apprProcess/apprProcess'
import addNewProcessDialog from '@/views/apprProcess/components/addNewProcessDialog'

export default {
  name: 'ApprovalIndex',
  components: { addNewProcessDialog },
  data() {
    return {
      symbolKey: 'xlink:href',
      dialogVisible: false,
      subGroupName: '',
      dialogType: 'add',
      processListData: []
    }
  },
  mounted() {
    getProcessList().then((res) => {
      // window.console.log('res==', res)
      this.processListData = res
    })
  },
  methods: {
    groupSort() {},
    renameApproval(name) {
      this.dialogVisible = true
      this.subGroupName = name
      this.dialogType = 'rename'
    },
    addNewGroup() {
      this.dialogVisible = true
      this.subGroupName = ''
      this.dialogType = 'add'
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
