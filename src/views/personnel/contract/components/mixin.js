const mixin = {
  data() {
    return {
      form: {
        name: ''
      },
      selectionList: [],
      loading: false,
      show: true,
      // tableConfig: {
      //   showHandler: true,
      //   enablePagination: true,
      //   handlerColumn: {
      //     width: 120
      //   }
      // },
      // columns: [
      //   {
      //     label: '姓名',
      //     width: 120,
      //     prop: 'name',
      //     slot: true
      //   },
      //   {
      //     label: '工号',
      //     width: 120,
      //     prop: 'workNo'
      //   },
      //   {
      //     label: '部门',
      //     prop: 'orgName',
      //     width: 120
      //   },
      //   {
      //     label: '职位',
      //     width: 120,
      //     prop: 'jobName'
      //   },
      //   {
      //     label: '岗位',
      //     width: 120,
      //     prop: 'positionName'
      //   },
      //   {
      //     label: '工作性质',
      //     width: 120,
      //     prop: 'workProperty',
      //     slot: true
      //   },
      //   {
      //     label: '员工状态',
      //     width: 120,
      //     prop: 'status',
      //     slot: true
      //   },
      //   {
      //     label: '入职日期',
      //     width: 120,
      //     prop: 'entryDate'
      //   },
      //   {
      //     label: '手机号码',
      //     prop: 'phonenum',
      //     width: 120
      //   },
      //   {
      //     label: '合同公司',
      //     width: 120,
      //     prop: 'contractName'
      //   },
      //   {
      //     label: '合同编号',
      //     width: 120,
      //     prop: 'contractCode'
      //   },
      //   {
      //     label: '合同类型',
      //     width: 120,
      //     prop: 'contractType',
      //     slot: true
      //   },
      //   {
      //     label: '合同状态',
      //     prop: 'contractStatus',
      //     width: 120,
      //     slot: true
      //   },
      //   {
      //     label: '合同开始日期',
      //     prop: 'beginContractDate',
      //     width: 120
      //   },
      //   {
      //     label: '合同结束日期',
      //     prop: 'endContractDate',
      //     width: 120
      //   },
      //   {
      //     label: '合同签订次数',
      //     prop: 'signNum',
      //     width: 120
      //   }
      // ],
      page: {
        pageSize: 2,
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
