import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return
  // 1.员工离职申请
  Mock.mock(new RegExp('/api/user/v1/user/leave/info' + '.*'), 'post', () => {
    return {
      response: '申请离职信息成功'
    }
  })
  //2.待离职、已离职员工筛选  数据
  Mock.mock(new RegExp('/api/user/v1/user/leave/list' + '.*'), 'post', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          userId: '@integer(1, 100)',
          workNo: '@integer(1, 100)',
          name: '@cname',
          orgId: '@integer(1, 100)',
          orgName: '@ctitle(1,3)',
          jobId: '@integer(1, 100)',
          jobName: '@ctitle(1,3)',
          positionId: '@integer(1, 100)',
          positionName: '@ctitle(1,3)',
          workProperty: 'FullTime',
          status: 'WaitLeave',
          entryDate: '@date()',
          phonenum: '@natural(1000, 500000)',
          applyDate: '@date()',
          lastDate: '@date()',
          leaveDate: '@date()',
          leaveReason: 'A01',
          leaveRemark: '@cparagraph(1, 2)'
        })
      )
    }
    return {
      response: {
        totalNum: 50,
        totalPage: 10,
        data: list
      }
    }
  })
  //3、员工离职信息查询数据
  Mock.mock(new RegExp('/api/user/v1/user/leave/info' + '.*'), 'get', () => {
    let response = Mock.mock({
      id: '4654132165',
      lastDate: '@date("")',
      applyDate: '@date("")',
      leaveDate: '@date("")',
      reason: '家庭原因',
      remark: '家庭住址变更交通不便'
    })
    return {
      response: response
    }
  })
  // 4.调整离职信息数据
  Mock.mock(new RegExp('/api/user/v1/user/leave/info' + '.*'), 'put', () => {
    return {
      response: '修改离职信息成功'
    }
  })
  // 5.员工确认离职数据
  Mock.mock(new RegExp('/api/user/v1/user/leave/confirm' + '.*'), 'post', () => {
    return {
      response: '确认离职信息成功'
    }
  })
  // 6.员工放弃离职数据
  Mock.mock(new RegExp('/api/user/v1/user/leave/giveup' + '.*'), 'post', () => {
    return {
      response: '放弃离职信息成功'
    }
  })
  // 7.员工离职交接事项分组查询接口
  Mock.mock(new RegExp('/api/user/v1/user/leave/note/group' + '.*'), 'get', () => {
    // let list = [];
    // for (let i = 0; i < 5; i++) {
    //   list.push(
    //     Mock.mock({
    //       id: '@integer(1, 100)',
    //       name: '人事部',
    //       isFinished: '1'
    //     })
    //   )
    // }

    return {
      response: [
        {
          id: '54654',
          name: '人事部',
          isFinished: '1'
        },
        {
          id: '654654',
          name: '行政部',
          isFinished: '0'
        },
        {
          id: '46546',
          name: '离得区乜部',
          isFinished: '1'
        },
        {
          id: '4654',
          name: '吴鸠知部',
          isFinished: '0'
        }
      ]
    }
  })
  // 8.员工离职交接事项分类查询接口
  Mock.mock(new RegExp('/api/user/v1/user/leave/note/category' + '.*'), 'get', () => {
    // let list = []
    // for (let i = 0; i < 5; i++) {
    //   list.push(
    // Mock.mock({
    //   detailId: '@natural(1, 100)',
    //   detailName: '@cword(3, 5)'
    // })
    //   )
    // }
    // let { categoryId, categoryName } = Mock.mock({
    //   categoryId: '@natural(1, 100)',
    //   categoryName: '@cword(3, 5)'
    // })
    return {
      response: [
        {
          categoryId: '00001',
          categoryName: '考勤假期',
          details: [
            {
              detailId: '4546546546487',
              detailName: '离职月考勤结算'
            },
            {
              detailId: '546541',
              detailName: '年休假期结算'
            }
          ]
        },
        {
          categoryId: '2134651',
          categoryName: '薪资福利',
          details: [
            {
              detailId: '654132165',
              detailName: '工资结算'
            },
            {
              detailId: '5465asdf41',
              detailName: '社会保险、住房公积金办理'
            },
            {
              detailId: '5641634657',
              detailName: '劳动合同处理'
            }
          ]
        }
      ]
    }
  })
  // 9.离职证明信息的查询
  Mock.mock(new RegExp('/api/user/v1/user/leave/cert' + '.*'), 'get', () => {
    let response = Mock.mock({
      userId: '@integer(1, 100)',
      workNo: '@integer(1, 100)',
      name: '@name',
      idType: '',
      idNo: '@integer(1, 100)',
      companyId: '@integer(1, 100)',
      companyName: '@cword(3, 5)',
      orgId: '@integer(1, 100)',
      orgName: '@cword(3, 5)',
      jobId: '@integer(1, 100)',
      jobName: '@cword(3, 5)',
      entryDate: '@date("")',
      leaveDate: '@date("YYYY-MM-DD")',
      relieveDate: '@date("YYYY-MM-DD")'
    })
    return {
      response: response
    }
  })
}
