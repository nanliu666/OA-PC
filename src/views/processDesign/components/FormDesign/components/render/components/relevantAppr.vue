<template>
  <div class="relevant-appr">
    <div class="relevant-appr__selection">
      <ul>
        <li
          v-for="item in value"
          :key="item.id"
          @click="jumpToDetail(item)"
        >
          <span class="relevant-appr__title">{{ item.title }}</span>
          <span class="relevant-appr__end">
            <span
              class="relevant-appr__status"
              :style="{
                color: statusToText(item.status).color
              }"
              v-text="statusToText(item.status).text"
            />
            <i
              v-if="hasOperate"
              class="icon-tips-close-outlined"
              @click.stop="handleDeleteItem(item)"
            /></span>
        </li>
      </ul>
      <div
        v-if="hasOperate"
        class="relevant-appr__plus"
        @click="handlePick"
      >
        <i class="el-icon-plus" />
      </div>
    </div>
    <el-dialog
      title="关联审批单"
      append-to-body
      :visible="visible"
      custom-class="relvant-appr-dialog"
      width="1000px"
      @close="handleCancel"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="我发起的"
          name="myApply"
        >
          <common-table
            ref="table0"
            :columns="columns"
            :config="tableConfig"
            :data="myApplyList"
            :loading="myApplyLoading"
            :page-config="tablePageConfig"
            :page="myApplyPage"
            @current-page-change="handleMyApplyPageChange"
            @select="handleSelect"
          >
            <!-- 状态列 -->
            <template
              v-if="row.status"
              slot="status"
              slot-scope="{ row }"
            >
              <span
                class="status-span"
                :style="{
                  color: statusToText(row.status).color,
                  backgroundColor: statusToText(row.status).backgroundColor
                }"
                v-text="statusToText(row.status).text"
              />
            </template>
            <!-- 当前审批人 -->
            <template
              slot="approveUser"
              slot-scope="{ row }"
            >
              <span v-text="getApproveUser(row.approveUser)" />
            </template>
          </common-table>
        </el-tab-pane>
        <el-tab-pane
          label="我审批的"
          name="myAppr"
        >
          <common-table
            ref="table1"
            :columns="columns"
            :config="tableConfig"
            :data="myApprList"
            :loading="myApprLoading"
            :page-config="tablePageConfig"
            :page="myApprPage"
            @current-page-change="handleMyApprPageChange"
            @select="handleSelect"
          >
            <!-- 状态列 -->
            <template
              v-if="row.status"
              slot="status"
              slot-scope="{ row }"
            >
              <span
                class="status-span"
                :style="{
                  color: statusToText(row.status).color,
                  backgroundColor: statusToText(row.status).backgroundColor
                }"
                v-text="statusToText(row.status).text"
              />
            </template>
            <!-- 当前审批人 -->
            <template
              slot="approveUser"
              slot-scope="{ row }"
            >
              <span v-text="getApproveUser(row.approveUser)" />
            </template>
          </common-table>
        </el-tab-pane>
        <el-tab-pane
          label="抄送我的"
          name="copyMe"
        >
          <common-table
            ref="table2"
            :columns="columns"
            :config="tableConfig"
            :data="copyMeList"
            :loading="copyMeLoading"
            :page-config="tablePageConfig"
            :page="copyMePage"
            @current-page-change="handleCopyMePageChange"
            @select="handleSelect"
          >
            <!-- 状态列 -->
            <template
              v-if="row.status"
              slot="status"
              slot-scope="{ row }"
            >
              <span
                class="status-span"
                :style="{
                  color: statusToText(row.status).color,
                  backgroundColor: statusToText(row.status).backgroundColor
                }"
                v-text="statusToText(row.status).text"
              />
            </template>
            <!-- 当前审批人 -->
            <template
              slot="approveUser"
              slot-scope="{ row }"
            >
              <span v-text="getApproveUser(row.approveUser)" />
            </template>
          </common-table>
        </el-tab-pane>
      </el-tabs>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <span class="dialog-footer__processnames">{{ apprProcessNames }}</span>
        <span>
          <el-button
            size="small"
            @click="handleCancel"
          >取 消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="handleSubmit"
          >确 定</el-button>
        </span></span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCopyApproveList,
  getHasApproveList,
  getMyApproveList
} from '@/api/apprProcess/apprProcess'
import { mapGetters } from 'vuex'

const TABLE_CONFIG = {
  enablePagination: true,
  enableMultiSelect: true,
  rowKey: 'apprNo'
}
// 表格属性
const TABLE_COLUMNS = [
  {
    label: '审批编号',
    width: 150,
    slot: true,
    prop: 'apprNo'
  },
  {
    label: '标题',
    minWidth: 100,
    prop: 'title'
  },
  {
    label: '审批类型',
    prop: 'processName',
    minWidth: 100
  },
  {
    label: '申请部门',
    prop: 'orgName',
    minWidth: 100
  },
  {
    label: '申请时间',
    prop: 'applyTime',
    minWidth: 100
  },
  {
    label: '完成时间',
    prop: 'completeTime',
    minWidth: 100
  },
  {
    label: '当前状态',
    slot: true,
    prop: 'status',
    minWidth: 100
  },
  {
    label: '当前审批人',
    slot: true,
    prop: 'approveUser',
    minWidth: 100
  }
]
const TABLE_PAGE_CONFIG = {
  layout: 'prev, pager, next, jumper, ->, total'
}
// 状态配置
const STATUS_TO_TEXT = {
  Approve: {
    text: '审批中',
    color: '#4d84f4',
    backgroundColor: '#ecf3ff'
  },
  Pass: {
    text: '已通过',
    color: '#52c300',
    backgroundColor: '#eaf9e7'
  },
  Reject: {
    text: '已拒绝',
    color: '#e2393e',
    backgroundColor: '#f7e7e7'
  },
  Corvidae: {
    text: '待完善',
    color: '#c124ff',
    backgroundColor: '#f6deff'
  },
  Cancel: {
    text: '已撤回',
    color: '#999999',
    backgroundColor: '#d9d9d9'
  }
}
// 关联审批
export default {
  name: 'RelevantAppr',
  props: {
    hasOperate: {
      type: Boolean,
      default: true
    },
    apprTypes: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: [],
      visible: false,
      columns: TABLE_COLUMNS,
      tableConfig: TABLE_CONFIG,
      tablePageConfig: TABLE_PAGE_CONFIG,
      activeName: 'myApply',
      myApplyList: [],
      myApplyPage: {
        currentPage: 1,
        size: 5,
        total: 0
      },
      myApplyLoading: false,
      myApprList: [],
      myApprPage: {
        currentPage: 1,
        size: 5,
        total: 0
      },
      myApprLoading: false,
      copyMeList: [],
      copyMePage: {
        currentPage: 1,
        size: 5,
        total: 0
      },
      copyMeLoading: false
    }
  },
  computed: {
    apprProcessKeys() {
      return this.apprTypes.map((item) => item.processKey).join(',')
    },
    apprProcessNames() {
      return this.apprTypes.map((item) => item.processName).join(',')
    },
    query() {
      return {
        processKey: this.apprProcessKeys,
        userId: this.userId
      }
    },
    ...mapGetters(['userId'])
  },
  watch: {
    visible(val) {
      if (val === true) {
        this.init(this.value)
      }
    }
  },
  mounted() {
    this.loadMyApplyList()
    this.loadCopyMeList()
    this.loadMyApprList()
  },
  methods: {
    init() {
      this.activeName = 'myApply'
      setTimeout(() => {
        this.clearSelection()
      })
    },
    clearSelection() {
      this.selected = []
      this.$refs.table0.clearSelection()
      this.$refs.table1.clearSelection()
      this.$refs.table2.clearSelection()
    },
    handleSubmit() {
      this.$emit('input', _.uniqBy([...this.selected, ...this.value], 'apprNo'))
      this.visible = false
    },
    handleCancel() {
      this.selected = []
      this.visible = false
    },
    handlePick() {
      this.visible = true
    },
    handleSelect(selection) {
      this.selected = _.uniqBy([...this.selected, ...selection], 'apprNo')
    },
    handleDeleteItem(item) {
      this.$emit(
        'input',
        this.value.filter((i) => i.apprNo !== item.apprNo)
      )
    },
    // 处理跳转
    jumpToDetail(row) {
      this.$router.push({
        path: '/apprProcess/apprDetail',
        query: { formId: row.formId, formKey: row.formKey, apprNo: row.apprNo, preview: true }
      })
    },
    /**
     * 获取用户姓名列表
     */
    getApproveUser(data) {
      if (!Array.isArray(data)) return
      let nameList = []
      data.map((item) => {
        nameList.push(item.userName)
      })
      return nameList.join('+')
    },
    /**
     * 英文状态对应中文字段
     */
    statusToText(status) {
      return STATUS_TO_TEXT[status]
    },
    handleMyApplyPageChange(currentPage) {
      this.myApplyPage.currentPage = currentPage
      this.loadMyApplyList()
    },
    loadMyApplyList() {
      this.myApplyLoading = true
      getMyApproveList({
        pageNo: this.myApplyPage.currentPage,
        pageSize: this.myApplyPage.size,
        ...this.query
      })
        .then((res) => {
          this.myApplyList = res.data
        })
        .finally(() => {
          this.myApplyLoading = false
        })
    },
    handleCopyMePageChange(currentPage) {
      this.copyMePage.currentPage = currentPage
      this.loadCopyMeList()
    },
    loadCopyMeList() {
      this.copyMeLoading = true
      getCopyApproveList({
        pageNo: this.copyMePage.currentPage,
        pageSize: this.copyMePage.size,
        ...this.query
      })
        .then((res) => {
          this.copyMeList = res.data
        })
        .then(() => {
          this.copyMeLoading = false
        })
    },
    handleMyApprPageChange(currentPage) {
      this.myApprPage.currentPage = currentPage
      this.loadMyApprList()
    },
    loadMyApprList() {
      this.myApprLoading = true
      getHasApproveList({
        pageNo: this.myApprPage.currentPage,
        pageSize: this.myApprPage.size,
        ...this.query
      })
        .then((res) => {
          this.myApprList = res.data
        })
        .then(() => {
          this.myApprLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$commonWidth: 72px;
.relevant-appr {
  &__plus {
    cursor: pointer;
    background: #edf8ff;
    border: 1px solid #9cd1ff;
    border-radius: 4px;
    box-sizing: border-box;
    width: $commonWidth;
    height: $commonWidth;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 40px;
      color: #9cd1ff;
      width: $commonWidth;
      height: $commonWidth;
      line-height: $commonWidth;
      text-align: center;
    }
  }
  &__selection {
    ul {
      display: flex;
      flex-direction: column;
      li {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 40px;
        margin-bottom: 8px;
        padding: 0 10px;
        border: 1px solid #c6cbce;
        border-radius: 4px;
        i {
          margin-left: 20px;
          color: #a0a8ae;
          cursor: pointer;
        }
      }
    }
    &__title {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
<style lang="scss">
.relvant-appr-dialog {
  .multi-menu {
    display: none !important;
  }
  .top-menu {
    display: none !important;
  }
  .dialog-footer {
    display: flex;
    justify-content: space-between;
    &__processnames {
      width: 300px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
