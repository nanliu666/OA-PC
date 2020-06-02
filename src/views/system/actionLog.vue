<template>
  <div>
    <page-header title="操作日志" />
    <basic-container>
      <avue-crud
        ref="crud"
        :option="option"
        :data="data"
        :page="page"
        @current-change="currentChange"
        @size-change="sizeChange"
        @refresh-change="refreshChange"
        @on-load="onLoad"
      >
        <template slot="menuLeft">
          <search-pop-over
            :require-options="requireOptions"
            :popover-options="popoverOptions"
            @submit="submit"
          />
        </template>
        <template
          slot="status"
          slot-scope="{ row }"
        >
          {{ row.status === 'Success' ? '成功' : '失败' }}
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { getActionLog } from '@/api/system/user'
import searchPopOver from '@/components/searchPopOver'
import { tableOptions } from '../../util/constant'
export default {
  components: {
    searchPopOver
  },
  data() {
    return {
      data: [],
      ajaxData: {
        pageNo: 1, //请求页码
        pageSize: 10, //每页数据
        model: '', //模糊搜索
        userName: '', //用户名
        beginTime: '', //查询开始时间
        endTime: '', //查询结束时间
        status: '' //状态
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      requireOptions: [
        {
          type: 'dataPicker',
          field: 'beginTime,endTime',
          data: '',
          label: '操作时间',
          config: {
            type: 'datetimerange',
            'range-separator': '至',
            'value-format': 'yyyy-MM-dd HH:mm:ss',
            'default-time': ['00:00:00', '23:59:59']
          }
        },
        {
          type: 'input',
          field: 'userName',
          label: '操作人',
          config: { 'suffix-icon': 'el-icon-search' }
        }
      ],
      popoverOptions: [
        { type: 'input', field: 'model', label: '模块', config: {} },
        {
          type: 'select',
          field: 'status',
          data: '',
          label: '状态',
          options: [
            { value: 'Success', label: '成功' },
            { value: 'Fail', label: '失败' }
          ],
          config: {}
        }
      ],
      option: {
        ...tableOptions,
        refreshBtn: true,
        height: 'auto',
        calcHeight: 80,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        selection: true,
        menu: false,
        size: 'medium',
        column: [
          {
            label: '操作时间',
            prop: 'createTime',
            width: 180
          },
          {
            label: '操作人',
            prop: 'name',
            display: false
          },
          {
            label: '模块',
            prop: 'model',
            display: false
          },
          {
            label: '状态',
            prop: 'status',
            display: false,
            slot: true
          },
          {
            label: '操作内容',
            prop: 'content',
            display: false
          },
          {
            label: 'IP',
            prop: 'ip',
            display: false
          }
        ]
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getActionLog(this.ajaxData).then((res) => {
        this.data = res.data
        this.page.total = res.totalNum
      })
    },
    currentChange(currentPage) {
      this.ajaxData.pageNo = currentPage
      this.initData()
      this.page.currentPage = currentPage
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.ajaxData.pageSize = pageSize
      this.initData()
    },
    refreshChange() {
      this.initData()
    },
    onLoad() {},
    submit(params) {
      let { pageNo, pageSize } = this.ajaxData
      this.ajaxData = { pageNo, pageSize, ...params }
      this.initData()
    }
  }
}
</script>
