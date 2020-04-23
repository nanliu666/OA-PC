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
          roleNum: 15
        },
        {
          categoryId: 3,
          categoryName: '设计部',
          roleNum: 0
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

  Mock.mock(new RegExp('/sys/v1/role' + '.*'), 'get', () => {
    const response = []
    for (let i = 0; i < 10; i++) {
      const index = Math.round(Math.random())
      let arr = ['Job', 'Position']
      response.push(
        Mock.mock({
          roleId: '@character()@natural(100, 1000)',
          roleName: '@cword(3,5)',
          type: arr[index],
          jobs: [
            {
              jobId: 1,
              jobName: '交互设计1'
            },
            {
              jobId: 2,
              jobName: '视觉设计1'
            }
          ],
          positions: [
            {
              positionId: 1,
              positionName: '交互设计2'
            },
            {
              positionId: 2,
              positionName: '视觉设计2'
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
