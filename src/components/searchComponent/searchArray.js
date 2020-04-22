export default [
  {
    label: '在职信息',
    showMore: true,
    questions: [
      {
        type: 'treeSelect',
        data: '',
        label: '部门',
        field: 'orgs',
        arrField: 'orgId',
        config: { multiple: true },
        options: {
          props: {
            label: 'label',
            value: 'orgId'
          },
          placeholder: '请选择关联部门',
          dicData: []
        }
      },
      { type: 'select', data: '', label: '职位', field: 'jobs', arrField: 'jobId', config: { multiple: true } },
      {
        type: 'select',
        data: '',
        label: '岗位',
        field: 'positions',
        arrField: 'positionId',
        config: { multiple: true }
      },
      {
        type: 'select',
        data: '',
        label: '上级领导',
        field: 'leader',
        arrField: 'leaderId',
        config: { multiple: true }
      },
      {
        type: 'select',
        data: '',
        label: '工作性质',
        field: 'workProperties',
        arrField: 'workProperty',
        config: { multiple: true },
        options: [
          { label: '全职', value: '' },
          { label: '实习生', value: '' },
          { label: '兼职', value: '' },
          { label: '劳务派遣', value: '' },
          { label: '退休返聘', value: '' },
          { label: '劳务外包', value: '' }
        ]
      },
      {
        type: 'select',
        data: '',
        label: '员工状态',
        field: 'statuses',
        arrField: 'status',
        config: { multiple: true },
        options: [
          { label: '试用期', value: 'Try' },
          { label: '正式', value: 'Formal' },
          { label: '待离职', value: 'WaitLeave' },
          { label: '已离职', value: 'Leaved' }
        ]
      },
      {
        type: 'select',
        data: '',
        label: '工作地址',
        field: 'workAddressIds',
        arrField: 'workAddressId',
        config: { multiple: true }
      },
      {
        type: 'select',
        data: '',
        label: '应聘渠道',
        field: 'recruitments',
        arrField: 'recruitment',
        config: { multiple: true },
        options: [
          { label: '前程无忧', value: '' },
          { label: '智联招聘', value: '' },
          { label: '拉勾网', value: '' },
          { label: '猎聘网', value: '' },
          { label: '中国人才热线', value: '' },
          { label: '58同城', value: '' },
          { label: '赶集网', value: '' },
          { label: 'BOSS直聘', value: '' },
          { label: '大街网', value: '' },
          { label: '中华英才网', value: '' },
          { label: '内部举荐', value: '' },
          { label: '员工推荐', value: '' },
          { label: '其他', value: '' },
          { label: '微信招聘', value: '' }
        ]
      },
      {
        type: 'dataPicker',
        data: '',
        label: '入职日期',
        field: 'beginEntryDate,endEntryDate',
        config: { type: 'daterange', 'range-separator': '至' }
      },
      {
        type: 'dataPicker',
        data: '',
        label: '试用期',
        field: 'minProbation,maxprobation',
        config: { type: 'monthrange', 'range-separator': '至' }
      },
      {
        type: 'dataPicker',
        data: '',
        label: '转正日期',
        field: 'beginFormalDate,endFormalDate',
        config: { type: 'daterange', 'range-separator': '至' }
      },
      { type: 'numInterval', data: { min: '', max: '' }, label: '司龄(年)', field: 'minEntryAge,maxEntryAge' },
      {
        type: 'select',
        data: '',
        label: '合同类型',
        field: 'contractTypes',
        arrField: 'contractType',
        config: { multiple: true },
        options: [
          { label: '固定期限劳动合同', value: '' },
          { label: '无固定期限劳动合同', value: '' },
          { label: '以完成一定工作任务为期限的劳动合同', value: '' },
          { label: '实习协议', value: '' },
          { label: '劳务合同', value: '' },
          { label: '返聘协议', value: '' },
          { label: '劳务派遣合同', value: '' },
          { label: '借调合同', value: '' },
          { label: '其他', value: '' }
        ]
      },
      {
        type: 'dataPicker',
        data: '',
        label: '首次合同开始日期',
        field: 'beginBeginFirstDate,endBeginFirstDate',
        config: { type: 'daterange', 'range-separator': '至' }
      },
      {
        type: 'dataPicker',
        data: '',
        label: '首次合同结束日期',
        field: 'beginEndFirstDate,endEndFirstDate',
        config: { type: 'daterange', 'range-separator': '至' }
      },
      {
        type: 'dataPicker',
        data: '',
        label: '现合同开始日期',
        field: 'beginBeginNowDate,endBeginNowDate',
        config: { type: 'daterange', 'range-separator': '至' }
      },
      {
        type: 'dataPicker',
        data: '',
        label: '现合同结束日期',
        field: 'beginEndNowDate,endEndNowDate',
        config: { type: 'daterange', 'range-separator': '至' }
      },
      { type: 'numInterval', data: { min: '', max: '' }, label: '现合同期限', field: 'minPeriod,maxPeriod' },
      { type: 'numInterval', data: { min: '', max: '' }, label: '合同续签次数', field: 'minRenewNum,maxRenewNum' }
    ]
  },
  {
    label: '个人信息',
    showMore: true,
    questions: [
      {
        type: 'select',
        data: '',
        label: '性别',
        field: 'sex',
        config: { multiple: true },
        options: [
          { label: '男', value: 1 },
          { label: '女', value: 0 }
        ]
      },
      { type: 'input', data: '', label: '手机号码', field: 'phonenum', config: {} },
      { type: 'input', data: '', label: '邮箱', field: 'email', config: { type: 'email' } },
      {
        type: 'select',
        data: '',
        label: '证件类型',
        field: 'idTypes',
        arrField: 'idType',
        config: { multiple: true },
        options: [
          { label: '身份证', value: '' },
          { label: '港澳居民来往内地通行证', value: '' },
          { label: '台湾居民来往大陆通行证', value: '' },
          { label: '外国护照', value: '' },
          { label: '其他', value: '' }
        ]
      },
      { type: 'input', data: '', label: '证件号码', field: 'idNo', config: {} },
      { type: 'numInterval', data: { min: '', max: '' }, label: '年龄', field: 'minAge,maxAge' },
      {
        type: 'select',
        data: '',
        label: '最高学历',
        field: 'educationalLevels',
        arrField: 'educationalLevel',
        config: { multiple: true },
        options: [
          { label: '小学', value: '' },
          { label: '初中', value: '' },
          { label: '高中', value: '' },
          { label: '大专', value: '' },
          { label: '本科', value: '' },
          { label: '硕士', value: '' },
          { label: '博士', value: '' },
          { label: '博士后', value: '' },
          { label: '职高', value: '' },
          { label: '中专', value: '' },
          { label: '技校', value: '' },
          { label: '中等师范学校', value: '' },
          { label: '其他', value: '' }
        ]
      },
      { type: 'numInterval', data: { min: '', max: '' }, label: '工龄', field: 'minWorkAge,maxWorkAge' },
      {
        type: 'select',
        data: 'marriage',
        label: '婚姻状况',
        field: '',
        config: { multiple: true },
        options: [
          { label: '未婚', value: 0 },
          { label: '已婚', value: 1 }
        ]
      },
      { type: 'input', data: '', label: '健康状况', field: 'health', config: {} },
      {
        type: 'select',
        data: '',
        label: '民族',
        field: 'nations',
        config: { multiple: true },
        options: [
          { label: '汉族', value: '' },
          { label: '等其他民族', value: '' }
        ]
      },
      {
        type: 'select',
        data: '',
        label: '政治面貌',
        field: '"politicalStatuses',
        arrField: 'politicalStatus',
        config: { multiple: true },
        options: [
          { label: '群众', value: '' },
          { label: '中共党员', value: '' },
          { label: '共青团员', value: '' },
          { label: '普通居民/群众', value: '' },
          { label: '中共预备党员', value: '' },
          { label: '民革党员', value: '' },
          { label: '民盟盟员', value: '' },
          { label: '民建会员', value: '' },
          { label: '民进会员', value: '' },
          { label: '农工党党员', value: '' },
          { label: '致公党党员', value: '' },
          { label: '九三学社社员', value: '' },
          { label: '台盟盟员', value: '' },
          { label: '无党派民主人士', value: '' }
        ]
      },
      { type: 'cascader', data: '', label: '籍贯', field: 'natives', config: {}, options: [] },
      {
        type: 'select',
        data: '',
        label: '户籍类型',
        field: 'householdTypes',
        config: { multiple: true },
        options: [
          { label: '城镇户口', value: '' },
          { label: '农村户口', value: '' },
          { label: '居民户口', value: '' }
        ]
      }
    ]
  },
  {
    label: '离职信息',
    showMore: true,
    questions: [
      {
        type: 'dataPicker',
        data: '',
        label: '离职日期',
        field: 'beginLeaveDate,endLeaveDate',
        config: { type: 'daterange', 'range-separator': '至' }
      },
      {
        type: 'select',
        data: '',
        label: '离职原因',
        field: 'leaveReasons',
        arrField: 'leaveReason',
        config: { multiple: true, group: true },
        options: [
          {
            label: '主动离职',
            options: [
              {
                value: '',
                label: '家庭原因'
              },
              {
                value: '',
                label: '身体原因'
              },
              {
                value: '',
                label: '薪资原因'
              },
              {
                value: '',
                label: '交通不便'
              },
              {
                value: '',
                label: '工作压力'
              },
              {
                value: '',
                label: '管理问题'
              },
              {
                value: '',
                label: '无晋升机会'
              },
              {
                value: '',
                label: '职业规划'
              },
              {
                value: '',
                label: '合同到期放弃续签'
              },
              {
                value: '',
                label: '其他个人原因'
              }
            ]
          },
          {
            label: '被动离职',
            options: [
              {
                value: '',
                label: '试用期内辞退'
              },
              {
                value: '',
                label: '违反公司条例'
              },
              {
                value: '',
                label: '组织调整/裁员'
              },
              {
                value: '',
                label: '绩效不达标辞退'
              },
              {
                value: '',
                label: '合同到期不续签'
              },
              {
                value: '',
                label: '其他原因被动离职'
              }
            ]
          }
        ]
      },
      {
        type: 'input',
        data: '',
        label: '离职原因说明',
        field: 'leaveReasonNote',
        config: {}
      }
    ]
  }
]
