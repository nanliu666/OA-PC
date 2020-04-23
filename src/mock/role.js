import Mock from 'mockjs'

const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}

const cateList = {
  ...normalData,
  response: [
    {
      groupId: 1,
      groupName: '百利宏集团',
      paramKey: 'account.registerUser',
      categories: [
        {
          categoryId: 2,
          categoryName: '财务部',
          roleNum: 0
        },
        {
          categoryId: 3,
          categoryName: '设计部',
          roleNum: 15
        },
        {
          categoryId: 4,
          categoryName: '资金管理表',
          roleNum: 20
        },
        {
          categoryId: 5,
          categoryName: '结算处',
          roleNum: 11
        },
        {
          categoryId: 6,
          categoryName: '会计处'
        }
      ]
    }
  ]
}

const positionData = {
  ...normalData,
  response: [
    {
      positionId: 0,
      positionName: '岗位',
      children: [
        {
          positionId: 1,
          positionName: '普通员工'
        },
        {
          positionId: 2,
          positionName: '主管'
        },
        {
          positionId: 3,
          positionName: '经理'
        },
        {
          positionId: 4,
          positionName: '总经理'
        },
        {
          positionId: 5,
          positionName: '总裁'
        }
      ]
    }
  ]
}

const jobsData = {
  ...normalData,
  response: [
    {
      deptName: '百利宏集团',
      deptId: 0,
      children: [
        {
          jobId: 1,
          jobName: '总经理'
        },
        {
          jobId: 2,
          jobName: '副总经理'
        },
        {
          deptName: '设计部',
          deptId: 3,
          children: [
            {
              deptName: '设计中心',
              deptId: 4,
              children: [
                {
                  jobId: 5,
                  jobName: '交互设计'
                },
                {
                  jobId: 6,
                  jobName: '视觉设计'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
// function getAllQuery(options) {
//   const querys = options.url.split('?')[1].split('&')
//   const data = {}
//   querys.forEach((item) => {
//     let arr = item.split('=')
//     data[arr[0]] = arr[1]
//   })
// }

export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/api/sys/v1/role/category/define' + '.*'), 'get', () => {
    return cateList
  })

  Mock.mock(new RegExp('/api/sys/v1/role/category/define' + '.*'), 'post', normalData)

  Mock.mock(new RegExp('/api/sys/v1/role/category/define' + '.*'), 'put', normalData)

  Mock.mock(new RegExp('/api/sys/v1/role/group/define' + '.*'), 'post', normalData)

  Mock.mock(new RegExp('/api/sys/v1/role/group/define' + '.*'), 'put', normalData)

  Mock.mock(new RegExp('/api/sys/v1/Positions' + '.*'), 'get', positionData)

  Mock.mock(new RegExp('/api/sys/v1/role' + '.*'), 'post', normalData)

  Mock.mock(new RegExp('/api/sys/v1/jobs' + '.*'), 'get', jobsData)

  Mock.mock(new RegExp('/api/sys/v1/role' + '.*'), 'delete', jobsData)

  Mock.mock(new RegExp('/api/sys/v1/role' + '.*'), 'put', jobsData)
  Mock.mock(new RegExp('/api/sys/v1/preTree' + '.*'), 'get', cateList)
  Mock.mock(new RegExp('/api/sys/v1/user/add' + '.*'), 'post', jobsData)
  Mock.mock(new RegExp('/api/sys/v1/user/add' + '.*'), 'get', () => {
    const arr = [
      {
        jobNum: 'L00001',
        name: '张彩云',
        dept: '会计部',
        userId: 0
      },
      {
        jobNum: 'L00002',
        name: '黎成',
        dept: '资金管理部',
        id: 1
      }
    ]
    let response = []
    for (let i = 0; i < 8; i++) {
      response.push(
        Mock.mock({
          jobNum: '@character()@natural(100, 1000)',
          name: '@cword(3,5)',
          dept: '@cword(4,6)',
          userId: '@natural(100, 1000)'
        })
      )
    }
    return {
      ...normalData,
      response: [...arr, ...response]
    }
  })
  Mock.mock(new RegExp('/api/sys/v1/user/list' + '.*'), 'get', () => {
    let response = []
    for (let i = 0; i < 10; i++) {
      response.push(
        Mock.mock({
          jobNum: '@character()@natural(100, 1000)',
          name: '@cword(2,3)',
          dept: '@cword(6,6)',
          userId: '@natural(100, 1000)',
          job: '@cword(4,4)'
        })
      )
    }
    return {
      ...normalData,
      response: [...response]
    }
  })
  Mock.mock(new RegExp('/sys/v1/role' + '.*'), 'get', () => {
    const response = []
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(Math.random() * 3)
      let arr = ['Job', 'Position', 'No']
      response.push(
        Mock.mock({
          roleId: '@character()@natural(100, 1000)',
          roleName: '@cword(3,5)',
          type: arr[index],
          remark: '@cword(10,20)',
          jobs: [
            {
              jobId: 1,
              jobName: '总经理'
            },
            {
              jobId: 5,
              jobName: '交互设计'
            }
          ],
          positions: [
            {
              positionId: 2,
              positionName: '主管'
            }
          ],
          userNum: '@integer(1, 100)',
          workNum: '@integer(1, 100)'
        })
      )
    }
    return {
      ...normalData,
      response
    }
  })
}
