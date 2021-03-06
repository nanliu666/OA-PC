import store from '@/store/index'
import { getWorkAddressList, getOrgPosition, getOrgJob } from '@/api/personnel/roster'
import { getOrgTreeSimple, getUserWorkList } from '@/api/org/org'
import { provinceAndCityData } from 'element-china-area-data'
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
  // const WorkProperty = await store.dispatch('CommonDict', 'WorkProperty')
  // const RecruitmentChannel = await store.dispatch('CommonDict', 'RecruitmentChannel')
  // const ContractType = await store.dispatch('CommonDict', 'ContractType')
  // const IDType = await store.dispatch('CommonDict', 'IDType')
  // const EducationalLevel = await store.dispatch('CommonDict', 'EducationalLevel')
  // const Nation = await store.dispatch('CommonDict', 'Nation')
  // const PoliticalStatus = await store.dispatch('CommonDict', 'PoliticalStatus')
  // const HouseholdType = await store.dispatch('CommonDict', 'HouseholdType')
  // const LeaveReason = await store.dispatch('CommonDict', 'LeaveReason')
  // const WorkAddress = (await getWorkAddressList({ pageNo: 1, pageSize: 50 })).data
  // const orgTree = await getOrgTreeSimple({ parentOrgId: 0 })
  // const LeaderList = (await getUserWorkList({ pageNo: 1, pageSize: 100 })).data
  // const positionList = await getOrgPosition({ pageNo: 1, pageSize: 100 })
  // const jobList = await getOrgJob()

  return [
    {
      label: '在职信息',
      showMore: false,
      questions: [
        {
          type: 'treeSelect',
          // data多选是数组单选是字符串
          data: [],
          label: '部门',
          field: 'orgs',
          arrField: 'orgId',
          config: {
            multiple: true,
            selectParams: {
              placeholder: '请输入内容',
              multiple: true
            },
            treeParams: {
              data: [],
              'check-strictly': true,
              'default-expand-all': false,
              'expand-on-click-node': false,
              clickParent: true,
              filterable: false,
              props: {
                children: 'children',
                label: 'orgName',
                disabled: 'disabled',
                value: 'orgId'
              }
            }
          },
          firstLoad(flag, item, callBack) {
            // fage为true，selsec框展开
            if (flag && item.config.treeParams.data.length === 0) {
              item.loadMoreFun(item, callBack)
            }
          },
          loadMoreFun(item, callBack) {
            if (item.loading || item.noMore) return
            item.loading = true
            getOrgTreeSimple({ parentOrgId: 0 }).then((res) => {
              if (res.length > 0) {
                item.config.treeParams.data.push(...res)
                item.loading = false
                item.noMore = true
                callBack(item, res)
              }
            })
          }
        },
        {
          type: 'select',
          data: '',
          label: '职位',
          field: 'jobs',
          arrField: 'jobId',
          config: { multiple: true, optionLabel: 'jobName', optionValue: 'jobId' },
          options: [],
          loading: false,
          noMore: false,
          firstLoad(flag, item) {
            if (flag && item.options.length === 0) {
              item.loadMoreFun(item)
            }
          },
          loadMoreFun(item) {
            if (item.loading || item.noMore) return
            item.loading = true
            getOrgJob().then((res) => {
              if (res.length > 0) {
                item.options.push(...res)
                item.loading = false
                item.noMore = true
              }
            })
          }
        },
        {
          type: 'select',
          data: '',
          label: '岗位',
          field: 'positions',
          arrField: 'positionId',
          config: { multiple: true, optionLabel: 'name', optionValue: 'id' },
          options: [],
          loading: false,
          noMore: false,
          pageNo: 1,
          firstLoad(flag, item) {
            if (flag && item.options.length === 0) {
              item.loadMoreFun(item)
            }
          },
          loadMoreFun(item) {
            if (item.loading || item.noMore) return
            item.loading = true
            getOrgPosition({ pageNo: item.pageNo, pageSize: 100 }).then((res) => {
              item.options.push(...res)
              item.pageNo += 1
              item.loading = false
              item.noMore = true
            })
          }
        },
        {
          type: 'select',
          data: '',
          label: '上级领导',
          field: 'leader',
          arrField: 'leaderId',
          config: { multiple: true, optionLabel: 'name', optionValue: 'userId' },
          options: [],
          loading: false,
          noMore: false,
          pageNo: 1,
          firstLoad(flag, item) {
            if (flag && item.options.length === 0) {
              item.loadMoreFun(item)
            }
          },
          loadMoreFun(item) {
            if (item.loading || item.noMore) return
            item.loading = true
            getUserWorkList({ pageNo: item.pageNo, pageSize: 100 }).then((res) => {
              if (res.data.length > 0) {
                item.options.push(...res.data)
                item.pageNo += 1
                item.loading = false
              } else {
                item.noMore = true
                item.loading = false
              }
            })
          }
        },
        {
          type: 'select',
          data: '',
          label: '工作性质',
          field: 'workProperties',
          arrField: 'workProperty',
          config: { multiple: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: [],
          firstLoad(flag, item) {
            if (flag && item.options.length === 0) {
              store.dispatch('CommonDict', 'WorkProperty').then((res) => {
                item.options = res
              })
            }
          }
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
          config: { multiple: true, optionLabel: 'address', optionValue: 'id' },
          options: [],
          loading: false,
          noMore: false,
          pageNo: 1,
          firstLoad(flag, item) {
            if (flag && item.options.length === 0) {
              item.loadMoreFun(item)
            }
          },
          loadMoreFun(item) {
            if (item.loading) return
            item.loading = true
            getWorkAddressList({ pageNo: item.pageNo, pageSize: 50 }).then((res) => {
              if (res.data.length > 0) {
                item.options.push(...res.data)
                item.pageNo += 1
                item.loading = false
              } else {
                item.noMore = true
                item.loading = false
              }
            })
          }
        },
        {
          type: 'select',
          data: '',
          label: '招聘渠道',
          field: 'recruitments',
          arrField: 'recruitment',
          config: { multiple: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: [],
          firstLoad(flag, item) {
            if (flag && item.options.length === 0) {
              store.dispatch('CommonDict', 'RecruitmentChannel').then((res) => {
                item.options = res
              })
            }
          }
        },
        {
          type: 'dataPicker',
          data: '',
          label: '入职日期',
          field: 'beginEntryDate,endEntryDate',
          config: { type: 'daterange', 'range-separator': '至' }
        },
        {
          type: 'select',
          data: '',
          label: '试用期',
          field: 'minProbation,maxprobation',
          config: { multiple: true },
          options: [
            { label: '1个月', value: 1 },
            { label: '2个月', value: 2 },
            { label: '3个月', value: 3 },
            { label: '4个月', value: 4 },
            { label: '5个月', value: 5 },
            { label: '6个月', value: 6 }
          ]
        },
        {
          type: 'dataPicker',
          data: '',
          label: '转正日期',
          field: 'beginFormalDate,endFormalDate',
          config: { type: 'daterange', 'range-separator': '至' }
        },
        {
          type: 'numInterval',
          data: { min: '', max: '' },
          label: '司龄(年)',
          field: 'minEntryAge,maxEntryAge'
        },
        {
          type: 'select',
          data: '',
          label: '合同类型',
          field: 'contractTypes',
          arrField: 'contractType',
          config: { multiple: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: [],
          firstLoad(flag, item) {
            if (flag && item.options.length === 0) {
              store.dispatch('CommonDict', 'ContractType').then((res) => {
                item.options = res
              })
            }
          }
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
        {
          type: 'numInterval',
          data: { min: '', max: '' },
          label: '现合同期限',
          field: 'minPeriod,maxPeriod'
        },
        {
          type: 'numInterval',
          data: { min: '', max: '' },
          label: '合同续签次数',
          field: 'minRenewNum,maxRenewNum'
        }
      ]
    },
    {
      label: '个人信息',
      showMore: false,
      questions: [
        {
          type: 'select',
          data: '',
          label: '性别',
          field: 'sex',
          config: {},
          options: [
            { label: '男', value: '1' },
            { label: '女', value: '0' }
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
          options: [],
          firstLoad(flag, item) {
            if (flag && item.options.length === 0) {
              store.dispatch('CommonDict', 'IDType').then((res) => {
                item.options = res
              })
            }
          }
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
          options: [],
          firstLoad(flag, item) {
            if (flag && item.options.length === 0) {
              store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
                item.options = res
              })
            }
          }
        },
        {
          type: 'numInterval',
          data: { min: '', max: '' },
          label: '工龄',
          field: 'minWorkAge,maxWorkAge'
        },
        {
          type: 'select',
          data: '',
          label: '婚姻状况',
          field: 'marriage',
          config: {},
          options: [
            { label: '未婚', value: '0' },
            { label: '已婚', value: '1' },
            { label: '已婚已育', value: '2' }
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
          options: [],
          firstLoad(flag, item) {
            if (flag && item.options.length === 0) {
              store.dispatch('CommonDict', 'Nation').then((res) => {
                item.options = res
              })
            }
          }
        },
        {
          type: 'select',
          data: '',
          label: '政治面貌',
          field: 'politicalStatuses',
          arrField: 'politicalStatus',
          config: { multiple: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: [],
          firstLoad(flag, item) {
            if (flag && item.options.length === 0) {
              store.dispatch('CommonDict', 'PoliticalStatus').then((res) => {
                item.options = res
              })
            }
          }
        },
        {
          type: 'cascader',
          data: '',
          label: '籍贯',
          field: 'nativeProvinces,nativeCities',
          config: {},
          options: provinceAndCityData
        },
        {
          type: 'select',
          data: '',
          label: '户籍类型',
          field: 'householdTypes',
          config: { multiple: true, optionLabel: 'dictValue', optionValue: 'dictKey' },
          options: [],
          firstLoad(flag, item) {
            if (flag && item.options.length === 0) {
              store.dispatch('CommonDict', 'HouseholdType').then((res) => {
                item.options = res
              })
            }
          }
        }
      ]
    },
    {
      label: '离职信息',
      showMore: false,
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
          options: [],
          firstLoad(flag, item) {
            if (flag && item.options.length === 0) {
              store.dispatch('CommonDict', 'LeaveReason').then((res) => {
                item.options = loadReasonArr(res)
              })
            }
          }
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
