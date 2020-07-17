<template>
  <basic-container>
    <avue-crud
      ref="crud"
      v-model="form"
      :option="option"
      :table-loading="loading"
      :data="data"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @refresh-change="refreshChange"
      @on-load="onLoad"
    >
      <template
        slot="menu"
        slot-scope="scope"
      >
        <el-button
          type="text"
          size="small"
          plain
          class="none-border"
          @click.stop="handleWork(scope.row)"
        >
          处理
        </el-button>
        <el-button
          type="text"
          size="small"
          plain
          class="none-border"
          @click.stop="handleDetail(scope.row)"
        >
          详情
        </el-button>
        <el-button
          type="text"
          size="small"
          plain
          class="none-border"
          @click.stop="handleImage(scope.row, scope.index)"
        >
          跟踪
        </el-button>
      </template>
      <template
        slot="processDefinitionVersion"
        slot-scope="{ row }"
      >
        <el-tag>v{{ row.processDefinitionVersion }}</el-tag>
      </template>
    </avue-crud>
    <el-dialog
      title="流程图"
      append-to-body
      :visible.sync="flowBox"
      :fullscreen="true"
    >
      <iframe
        :src="flowUrl"
        width="100%"
        height="700"
        title="流程图"
        frameBorder="no"
        border="0"
        marginWidth="0"
        marginHeight="0"
        scrolling="no"
        allowTransparency="yes"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="flowBox = false">关 闭</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { todoList } from '@/api/work/work'
import { flowCategory } from '@/util/flow'

export default {
  data() {
    return {
      form: {},
      selectionId: '',
      selectionList: [],
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      flowBox: false,
      flowUrl: '',
      workBox: false,
      option: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
        simplePage: true,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        selection: true,
        editBtn: false,
        addBtn: false,
        viewBtn: false,
        delBtn: false,
        dialogWidth: 900,
        menuWidth: 150,
        dialogClickModal: false,
        column: [
          {
            label: '流程分类',
            type: 'select',
            row: true,
            props: {
              label: 'dictValue',
              value: 'dictKey'
            },
            dataType: 'number',
            slot: true,
            prop: 'category',
            search: true,
            hide: true,
            width: 100
          },
          {
            label: '流程名称',
            prop: 'processDefinitionName',
            search: true
          },
          {
            label: '当前步骤',
            prop: 'taskName'
          },
          {
            label: '流程版本',
            prop: 'processDefinitionVersion',
            slot: true,
            width: 80
          },
          {
            label: '申请时间',
            prop: 'createTime',
            width: 165
          }
        ]
      },
      data: []
    }
  },
  computed: {
    ...mapGetters(['flowRoutes']),
    ids() {
      let ids = []
      this.selectionList.forEach((ele) => {
        ids.push(ele.id)
      })
      return ids.join(',')
    }
  },
  mounted() {
    // category

    this.$store.dispatch('CommonDict', 'flow').then((res) => {
      let category = this.option.column.find((it) => it.prop === 'category')
      category.dicData = res
    })
  },
  methods: {
    searchReset() {
      this.query = {}
      this.onLoad(this.page)
    },
    searchChange(params, done) {
      this.query = params
      this.page.currentPage = 1
      this.onLoad(this.page, params)
      done()
    },
    selectionChange(list) {
      this.selectionList = list
    },
    selectionClear() {
      this.selectionList = []
      this.$refs.crud.toggleSelection()
    },
    handleWork(row) {
      this.$router.push({
        path: `/work/process/leave/handle/${row.taskId}/${row.processInstanceId}`
      })
    },
    handleDetail(row) {
      this.$router.push({
        path: `/work/process/leave/detail/${row.processInstanceId}`
      })
    },
    handleImage(row) {
      this.flowUrl = `/api/blade-flow/process/diagram-view?processInstanceId=${row.processInstanceId}`
      this.flowBox = true
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    refreshChange() {
      this.onLoad(this.page, this.query)
    },
    onLoad(page, params = {}) {
      const query = {
        ...this.query,
        category: params.category ? flowCategory(params.category) : null
      }
      this.loading = true
      todoList(page.currentPage, page.pageSize, Object.assign(params, query)).then((res) => {
        const data = res
        this.page.total = data.total
        this.data = data.records
        this.loading = false
        this.selectionClear()
      })
    }
  }
}
</script>

<style>
.none-border {
  border: 0;
  background-color: transparent !important;
}
</style>
