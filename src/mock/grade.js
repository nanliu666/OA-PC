import Mock from 'mockjs'

const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}

const orgdata = {
  ...normalData,
  response: [
    {
      parentId: '',
      sort: '1',
      id: '1',
      name: '百利宏',
      type: 'Enterprise',
      code: '1231',
      userId: '001',
      workNo: '1231',
      userName: 'CEO',
      jobNum: '1',
      userNum: '1',
      workNum: '1',
      remark: '董事长',
      categoryId: '1',
      categoryName: '董事长'
    },
    {
      parentId: '1',
      sort: '2',
      id: '2',
      name: '百利宏化工',
      type: 'Company',
      code: '1232',
      userId: '002',
      workNo: '12312',
      userName: '百利宏化工CEO',
      jobNum: '1',
      userNum: '1',
      workNum: '1',
      remark: '总经理2',
      categoryId: '2',
      categoryName: '总经理'
    },
    {
      parentId: '1',
      sort: '3',
      id: '3',
      name: '百利宏医药',
      type: 'Company',
      code: '1233',
      userId: '003',
      workNo: '12313',
      userName: '百利宏医药工CEO',
      jobNum: '1',
      userNum: '1',
      workNum: '1',
      remark: '总经理3',
      categoryId: '2',
      categoryName: '总经理'
    },
    {
      parentId: '2',
      sort: '4',
      id: '4',
      name: '百利宏化工事业部',
      type: 'Department',
      code: '1234',
      userId: '004',
      workNo: '12314',
      userName: '事业部经理',
      jobNum: '1',
      userNum: '1',
      workNum: '1',
      remark: '经理4',
      categoryId: '3',
      categoryName: '经理'
    },
    {
      parentId: '2',
      sort: '5',
      id: '5',
      name: '百利宏化工技术部',
      type: 'Department',
      code: '1235',
      userId: '005',
      workNo: '12315',
      userName: '事业部经理',
      jobNum: '1',
      userNum: '1',
      workNum: '1',
      remark: '经理5',
      categoryId: '3',
      categoryName: '经理'
    },
    {
      parentId: '3',
      sort: '6',
      id: '6',
      name: '百利宏医药技术部',
      type: 'Department',
      code: '1236',
      userId: '006',
      workNo: '12316',
      userName: '事业部经理',
      jobNum: '1',
      userNum: '1',
      workNum: '1',
      remark: '经理6',
      categoryId: '3',
      categoryName: '经理'
    },
    {
      parentId: '3',
      sort: '7',
      id: '7',
      name: '百利宏医药计算机部',
      type: 'Department',
      code: '1237',
      userId: '007',
      workNo: '12317',
      userName: '经理7',
      jobNum: '1',
      userNum: '1',
      workNum: '1',
      remark: '经理',
      categoryId: '3',
      categoryName: '经理'
    },
    {
      parentId: '4',
      sort: '8',
      id: '8',
      name: '技术小组',
      type: 'Group',
      code: '1238',
      userId: '008',
      workNo: '12318',
      userName: '飞洒',
      jobNum: '1',
      userNum: '1',
      workNum: '1',
      remark: '经理',
      categoryId: '4',
      categoryName: '小组'
    },
    {
      parentId: '5',
      sort: '9',
      id: '9',
      name: '技术小组2',
      type: 'Group',
      code: '1239',
      userId: '009',
      workNo: '12318',
      userName: '发撒',
      jobNum: '1',
      userNum: '1',
      workNum: '1',
      remark: '小组',
      categoryId: '4',
      categoryName: '小组'
    },
    {
      parentId: '9',
      sort: '10',
      id: '10',
      name: '职位1',
      type: 'Job',
      code: '123101',
      userId: '0010',
      workNo: '12318',
      userName: '富士达,士大夫,萨芬',
      jobNum: '1',
      userNum: '1',
      workNum: '1',
      remark: '小组',
      categoryId: '5',
      categoryName: '职位'
    }
  ]
}
const orgList = {
  ...normalData,
  response: [
    {
      orgId: '1',
      orgName: '百利宏',
      children: [
        {
          orgId: '2',
          orgName: '百利宏化工',
          children: [
            {
              orgId: '4',
              orgName: '百利宏化工事业部',
              children: [
                {
                  orgId: '8',
                  orgName: '技术小组',
                  children: []
                }
              ]
            },
            {
              orgId: '5',
              orgName: '百利宏化工事业部事业部',
              children: [
                {
                  orgId: '9',
                  orgName: '技术小组2',
                  children: [
                    {
                      orgId: '10',
                      orgName: '职位1',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          orgId: '3',
          orgName: '百利宏医药',
          children: [
            {
              orgId: '6',
              orgName: '百利宏医药技术部',
              children: []
            },
            {
              orgId: '7',
              orgName: '百利宏医药计算机部',
              children: []
            }
          ]
        }
      ]
    }
  ]
}
const addSuccess = {
  ...normalData,
  response: {}
}

export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/api/org/v1/organization/view' + '.*'), 'get', () => {
    return orgdata
  })
  Mock.mock(new RegExp('/api/org/v1/organization' + '.*'), 'get', () => {
    return orgList
  })
  Mock.mock(new RegExp('/api/org/v1/organization' + '.*'), 'post', () => {
    return addSuccess
  })
  Mock.mock(new RegExp('/api/org/v1/organization' + '.*'), 'put', () => {
    return addSuccess
  })
  Mock.mock(new RegExp('/api/org/v1/organization' + '.*'), 'delete', () => {
    return addSuccess
  })
}
