import store from '@/store/index'
import { getWorkAddressList, getOrgPosition, getOrgJob } from '@/api/personnel/roster'
import { getOrgTreeSimple, getUserWorkList } from '@/api/org/org'

// let WorkProperty = [],
//   RecruitmentChannel = [],
//   ContractType = [],
//   IDType = [],
//   EducationalLevel = [],
//   Nation = [],
//   PoliticalStatus = [],
//   HouseholdType = [],
//   LeaveReason = []
function loadReasonArr(params) {
  let arr = [
    {
      label: '主动离职',
      options: []
    },
    {
      label: '被动离职',
      options: []
    }
  ]
  params.forEach((item) => {
    if (item.dictKey.indexOf('A') > -1) {
      arr[0].options.push(item)
    } else {
      arr[1].options.push(item)
    }
  })
  return arr
}

export default async () => {
  const WorkProperty = await store.dispatch('CommonDict', 'WorkProperty')
  const RecruitmentChannel = await store.dispatch('CommonDict', 'RecruitmentChannel')
  const ContractType = await store.dispatch('CommonDict', 'ContractType')
  const IDType = await store.dispatch('CommonDict', 'IDType')
  const EducationalLevel = await store.dispatch('CommonDict', 'EducationalLevel')
  const Nation = await store.dispatch('CommonDict', 'Nation')
  const PoliticalStatus = await store.dispatch('CommonDict', 'PoliticalStatus')
  const HouseholdType = await store.dispatch('CommonDict', 'HouseholdType')
  const LeaveReason = await store.dispatch('CommonDict', 'LeaveReason')
  const WorkAddress = (await getWorkAddressList({ pageNo: 1, pageSize: 50 })).data
  const orgTree = await getOrgTreeSimple({ parentOrgId: 0 })
  const LeaderList = (await getUserWorkList({ pageNo: 1, pageSize: 100 })).data
  const positionList = await getOrgPosition({ pageNo: 1, pageSize: 100 })
  const jobList = (await getOrgJob()).data

  return [
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
              label: 'orgName',
              value: 'orgId'
            },
            placeholder: '请选择关联部门',
            dicData: orgTree
          }
        },
        {
          type: 'select',
          data: '',
          label: '职位',
          field: 'jobs',
          arrField: 'jobId',
          config: { multiple: true, optionLabel: 'jobName', optionValue: 'jobId' },
          options: jobList
        },
        {
          type: 'select',
          data: '',
          label: '岗位',
          field: 'positions',
          arrField: 'positionId',
          config: { multiple: true, optionLabel: 'name', optionValue: 'id' },
          options: positionList
        },
        {
          type: 'select',
          data: '',
          label: '上级领导',
          field: 'leader',
          arrField: 'leaderId',
          config: { multiple: true, optionLabel: 'name', optionValue: 'userId' },
          options: LeaderList
        },
        {
          type: 'select',
          data: '',
          label: '工作性质',
          field: 'workProperties',
          arrField: 'workProperty',
          config: { multiple: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: WorkProperty
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
          pageNo: 1,
          arrField: 'workAddressId',
          config: { multiple: true, optionLabel: 'address', optionValue: 'id' },
          options: WorkAddress
        },
        {
          type: 'select',
          data: '',
          label: '招聘渠道',
          field: 'recruitments',
          arrField: 'recruitment',
          config: { multiple: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: RecruitmentChannel
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
          config: { multiple: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: ContractType
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
          config: { multiple: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: IDType
        },
        { type: 'input', data: '', label: '证件号码', field: 'idNo', config: {} },
        { type: 'numInterval', data: { min: '', max: '' }, label: '年龄', field: 'minAge,maxAge' },
        {
          type: 'select',
          data: '',
          label: '最高学历',
          field: 'educationalLevels',
          arrField: 'educationalLevel',
          config: { multiple: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: EducationalLevel
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
          arrField: 'nation',
          config: { multiple: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: Nation
        },
        {
          type: 'select',
          data: '',
          label: '政治面貌',
          field: '"politicalStatuses',
          arrField: 'politicalStatus',
          config: { multiple: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: PoliticalStatus
        },
        { type: 'cascader', data: '', label: '籍贯', field: 'natives', config: {}, options: [] },
        {
          type: 'select',
          data: '',
          label: '户籍类型',
          field: 'householdTypes',
          config: { multiple: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: HouseholdType
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
          config: { multiple: true, group: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: loadReasonArr(LeaveReason)
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
}
