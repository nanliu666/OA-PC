<template>
  <div class="fill">
    <page-header title="代办中心" />
    <basic-container block>
      <common-table
        :config="tableConfig"
        :page="page"
        :columns="columns"
        :data="tableData"
      >
        <search-popover
          ref="searchPopover"
          slot="topMenu"
          :require-options="searchConfig.requireOptions"
          :popover-options="searchConfig.popoverOptions"
          @submit="handleSubmit"
        />
      </common-table>
    </basic-container>
  </div>
</template>
<script>
import { todoTypeCN } from '@/const/todo'
import { getTodoList } from '@/api/todo/todo'

export default {
  name: 'TodoList',
  components: {
    SearchPopover: () => import('@/components/searchPopOver/index')
  },
  data() {
    return {
      query: {},
      loading: true,
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      tableConfig: {
        showHandler: false,
        enablePagination: true,
        showIndexColumn: false
      },
      columns: [
        {
          label: '标题',
          prop: 'title',
          minWidth: '300px'
        },
        {
          label: '类型',
          prop: 'type',
          formatter(record) {
            return todoTypeCN[record.type]
          }
        },
        {
          label: '时间',
          prop: 'createTime'
        }
      ],
      tableData: [],
      searchConfig: {
        requireOptions: [
          {
            type: 'input',
            field: 'title',
            label: '',
            data: '',
            options: [],
            config: { placeholder: '标题', 'suffix-icon': 'el-icon-search' }
          }
        ],
        popoverOptions: [
          {
            type: 'select',
            field: 'type',
            label: '类型',
            data: '',
            options: Object.keys(todoTypeCN).map((key) => ({ value: key, label: todoTypeCN[key] })),
            config: {}
          },
          {
            type: 'dataPicker',
            data: '',
            label: '时间',
            field: 'beginTime,endTime',
            config: {
              type: 'datetimerange',
              'range-separator': '至',
              'value-format': 'yyyy-MM-dd HH:mm:ss',
              'default-time': ['00:00:00', '23:59:59']
            }
          },
          {
            type: 'select',
            field: 'isWarn',
            label: '是否预警',
            options: [
              { label: '是', value: 1 },
              { label: '否', value: 0 }
            ],
            data: '',
            config: {}
          }
        ]
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    handleSubmit(params) {
      this.query = params
      this.loadData()
    },
    loadData() {
      this.loading = true
      getTodoList({
        pageNo: this.page.currentPage,
        pageSize: this.page.size,
        ...this.query
      })
        .then((res) => {
          this.page.total = res.totalNum
          this.tableData = res.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
