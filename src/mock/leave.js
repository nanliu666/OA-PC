import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return
  // 1.员工离职申请
  Mock.mock(new RegExp('/user/v1/user/leave/info' + '.*'), 'post', () => {
    return {
      response: '申请离职信息成功'
    }
  })
  //2.待离职、已离职员工筛选  数据
  Mock.mock(new RegExp('/user/v1/user/leave/list' + '.*'), 'post', () => {
    let list = []
    for (let i = 0; i < 50; i++) {
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
          workProperty: '',
          status: 'Leaved',
          entryDate: '@date("YYYY-MM-DD")',
          phonenum: '@natural(1000, 500000)',
          applyDate: '@date("YYYY-MM-DD")',
          lastDate: '@date("YYYY-MM-DD")',
          leaveDate: '@date("YYYY-MM-DD")',
          leaveReason: '',
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
  Mock.mock(new RegExp('/user/v1/user/leave/info' + '.*'), 'get', () => {
    let response = Mock.mock({
      id: '@integer(1, 100)',
      lastDate: '@date("YYYY-MM-DD")',
      applyDate: '@date("YYYY-MM-DD")',
      leaveDate: '@date("YYYY-MM-DD")',
      reason: '',
      remark: '@cparagraph(1, 2)'
    })
    return {
      response: response
    }
  })
  // 4.调整离职信息数据
  Mock.mock(new RegExp('/user/v1/user/leave/info' + '.*'), 'put', () => {
    return {
      response: '修改离职信息成功'
    }
  })
  // 5.员工确认离职数据
  Mock.mock(new RegExp('/user/v1/user/leave/confirm' + '.*'), 'post', () => {
    return {
      response: '确认离职信息成功'
    }
  })
  // 6.员工放弃离职数据
  Mock.mock(new RegExp('/user/v1/user/leave/giveup' + '.*'), 'post', () => {
    return {
      response: '放弃离职信息成功'
    }
  })
  // 7.员工离职交接事项分组查询接口
  Mock.mock(new RegExp('/user/v1/user/leave/note/group' + '.*'), 'get', () => {
    let response = Mock.mock({
      id: '@integer(1, 100)',
      name: '@ctitle(1,3)',
      isFinished: '1'
    })
    return {
      response: response
    }
  })
  // 8.员工离职交接事项分类查询接口
  Mock.mock(new RegExp('/user/v1/user/leave/note/category' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 5; i++) {
      list.push(
        Mock.mock({
          detailId: '@natural(1, 100)',
          detailName: '@cword(3, 5)'
        })
      )
    }
    let { categoryId, categoryName } = Mock.mock({
      categoryId: '@natural(1, 100)',
      categoryName: '@cword(3, 5)'
    })
    return {
      response: {
        categoryId: categoryId,
        categoryName: categoryName,
        details: list
      }
    }
  })
  // 9.离职证明信息的查询
  Mock.mock(new RegExp('/user/v1/user/leave/cert' + '.*'), 'get', () => {
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
      entryDate: '@date("YYYY-MM-DD")',
      leaveDate: '@date("YYYY-MM-DD")',
      relieveDate: '@date("YYYY-MM-DD")'
    })
    return {
      response: response
    }
  })
}
