import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return

  //通讯录部门查询接口
  Mock.mock(new RegExp('/api/user/v1/user/address/book/org' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 2; i++) {
      list.push(
        Mock.mock({
          orgId: '@integer(1, 1000000)',
          orgName: '@ctitle(2,2)',
          userId: '@integer(1, 1000000)',
          userName: '@cname',
          'type|1': ['Enterprise', 'Company', 'Department', 'Group'],
          remark: '@ctitle(5,5)',
          code: '@integer(1, 1000000)'
        })
      )
    }

    return {
      response: [
        {
          orgId: '',
          orgName: '百利宏',
          userId: '',
          userName: '',
          type: 'Enterprise',
          remark: '',
          code: ''
        }
      ]
    }
  })
  Mock.mock(new RegExp('/api/user/v1/user/address/book/user' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 5; i++) {
      list.push(
        Mock.mock({
          userId: '@integer(1, 1000000)',
          workNo: '@integer(1, 4000)',
          name: '@cname',
          avatarUrl: 'Qp#H',
          pinyin: '4f6n5',
          orgId: '@integer(1, 1000000)',
          orgName: '@ctitle(2,2)',
          jobId: '@integer(1, 1000000)',
          jobName: '@ctitle(2,2)',
          'sex|1': [0, 1],
          phonenum: '@integer(1, 1000000)',
          email: '@integer(1, 1000000)',
          leaderId: '@integer(1, 1000000)',
          leaderName: '@cname'
        })
      )
    }

    return {
      response: list
    }
  })
}
