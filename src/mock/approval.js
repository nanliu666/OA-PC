/* eslint-disable no-console */

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
const approvalList = Mock.mock({
  ...normalData,
  response: {
    id: '150165',
    note: '合同流程',
    version: '1.0.0',
    nodes: [
      {
        id: '1',
        name: '部门主管',
        isStart: 1,
        isEnd: 0,
        parentId: '',
        childId: '2',
        isEdit: false,
        users: [
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          },
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          },
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          },
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          }
        ]
      },
      {
        id: '2',
        name: '综合管理部',
        isStart: '0',
        isEnd: '0',
        parentId: 1,
        childId: 4,
        isEdit: false,
        users: [
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          },
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          },
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          },
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          }
        ]
      },
      {
        id: '3',
        name: '控股负责人',
        isStart: '0',
        isEnd: 1,
        parentId: 3,
        childId: '',
        isEdit: false,
        users: [
          {
            id: '1',
            name: '@cname',
            workNo: '001'
          }
        ]
      },
      {
        id: '4',
        name: '总裁',
        isStart: 0,
        isEnd: 0,
        parentId: '2',
        childId: '3',
        isEdit: false,
        users: [
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          },
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          },
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          },
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          }
        ]
      }
    ]
  }
})

const success = {
  ...normalData,
  response: {}
}
export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/appr/v1/appr/form' + '.*'), 'get', () => {
    return json
  })
  Mock.mock(new RegExp('/appr/v1/appr/process' + '.*'), 'get', () => {
    return approvalList
  })
  Mock.mock(new RegExp('/appr/v1/appr/process' + '.*'), 'post', () => {
    return success
  })
  Mock.mock(new RegExp('/appr/v1/appr/process' + '.*'), 'put', () => {
    return success
  })
  Mock.mock(new RegExp('/appr/v1/appr/apply/submit' + '.*'), 'post', (options) => {
    console.log('提交审批：', options.url, JSON.parse(options.body))
    return success
  })
}
// /appr/v1/appr/process
