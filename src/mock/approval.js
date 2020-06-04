import Mock from 'mockjs'

const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}
const json = {
  ...normalData,
  response: [
    {
      id: '1',
      name: '招聘需求',
      formKey: 'Recruitment',
      iconUrl: '',
      remark: '在中台产品的研发过程中，会出现不同的设计规范和实现方式...',
      sort: ''
    },
    {
      id: '2',
      name: '录用申请',
      formKey: 'PersonOfferApply',
      iconUrl: '',
      remark: '在中台产品的研发过程中，会出现不同的设计规范和实现方式...',
      sort: ''
    },
    {
      id: '3',
      name: '转正申请',
      formKey: 'UserFormalInfo',
      iconUrl: '',
      remark: '在中台产品的研发过程中，会出现不同的设计规范和实现方式...',
      sort: ''
    },
    {
      id: '4',
      name: '合同续签申请',
      formKey: 'UserContractInfo',
      iconUrl: '',
      remark: '在中台产品的研发过程中，会出现不同的设计规范和实现方式...',
      sort: ''
    },
    {
      id: '5',
      name: '离职申请',
      formKey: 'UserLeaveInfo',
      iconUrl: '',
      remark: '在中台产品的研发过程中，会出现不同的设计规范和实现方式...',
      sort: ''
    },
    {
      id: '6',
      name: '人事异动申请',
      formKey: 'UserChangeInfo',
      iconUrl: '',
      remark: '在中台产品的研发过程中，会出现不同的设计规范和实现方式...',
      sort: ''
    }
  ]
}
const approvalList = {
  ...normalData,
  response: [
    {
      id: '1',
      name: '部门主管',
      isStart: '1',
      isEnd: '0',
      parentId: '',
      childId: '',
      isEdit: false,
      users: {
        id: '12',
        name: '张三',
        workNo: '001'
      }
    },
    {
      id: '2',
      name: '部门主管',
      isStart: '1',
      isEnd: '0',
      parentId: '',
      childId: '',
      isEdit: false,
      users: {
        id: '123',
        name: '富士达',
        workNo: '002'
      }
    }
  ]
}
export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/appr/v1/appr/form' + '.*'), 'get', () => {
    return json
  })
  Mock.mock(new RegExp('/appr/v1/appr/process' + '.*'), 'get', () => {
    return approvalList
  })
}
// /appr/v1/appr/process
