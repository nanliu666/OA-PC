const mixin = {
  data() {
    return {
      form: {
        name: ''
      },
      selectionList: [],
      loading: false,
      show: true,
      tableConfig: {
        showHandler: true,
        enablePagination: true,
        enableMultiSelect: true,
        handlerColumn: {
          width: 120
        }
      },
      columns: [
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '工号',
          prop: 'workNo'
        },
        {
          label: '部门',
          prop: 'orgName'
        },
        {
          label: '职位',
          prop: 'jobName'
        },
        {
          label: '岗位',
          prop: 'positionName'
        },
        {
          label: '工作性质',
          prop: 'workProperty'
        },
        {
          label: '员工状态',
          prop: 'status'
        },
        {
          label: '入职日期',
          prop: 'entryDate'
        },
        {
          label: '手机号码',
          prop: 'phonenum'
        },
        {
          label: '合同公司',
          prop: 'contractName'
        },
        {
          label: '合同编号',
          prop: 'contractCode'
        },
        {
          label: '合同类型',
          prop: 'contractType'
        },
        {
          label: '合同开始日期',
          prop: 'beginContractDate',
          width: 120
        },
        {
          label: '合同结束日期',
          prop: 'endContractDate',
          width: 120
        },
        {
          label: '合同签订次数',
          prop: 'signNum',
          width: 120
        }
      ],
      page: {
        pageSize: 100,
        pagerCount: 1,
        total: 10
      }
    }
  },
  computed: {},
  methods: {
    close() {
      this.show = false
    },
    sizeChange(val) {
      this.params.pageSize = val
      this.params.pageNo = 1
      this.page.pagerCount = 1
    },
    currentChange(val) {
      this.params.pageNo = val
      this.page.pagerCount = val
    },

    search() {}
  }
}
export default mixin
