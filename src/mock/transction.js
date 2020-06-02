import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return

  //人事异动员工筛选接口
  Mock.mock(new RegExp('/api/user/v1/user/change/list' + '.*'), 'post', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          userId: '@natural(1, 100)',
          workNo: '@natural(1, 100)',
          name: '@cname',
          companyName: '百利宏集团',
          orgName: '设计部',
          jobName: '交互设计',
          positionName: '普通员工',
          newCompanyName: '百利宏集团',
          newOrgName: '产品部',
          newJobName: '产品经理',
          newPositionName: '经理',
          status: 'Try',
          effectDate: '@date',
          phonenum: '@integer',
          type: 'Position',
          reason: '@cparagraph(2, 5)',
          remark: '@cparagraph(2, 5)'
        })
      )
    }
    return {
      response: {
        totalNum: 50,
        totalPage: 50,
        data: list
      }
    }
  })
  //人事筛选
  Mock.mock(new RegExp('/api/user/v1/user/change/info' + '.*'), 'post', () => {
    return {
      response: {
        response: 'ok'
      }
    }
  })
  // 获取员工信息
  Mock.mock(new RegExp('/api/user/v1/user/info' + '.*'), 'get', () => {
    return {
      response: {
        userId: '20200426',
        name: '张无忌',
        workNo: '123',
        reason: '',
        companyName: '易宝广州分公司',
        orgName: '百利宏OA',
        jobName: '开发工程师',
        positionName: '前端开发工程师',
        effectDate: '',
        remark: '',
        companyId: '1252523599903072259',
        orgId: '1262951869450633218',
        jobId: '1262996469389250561',
        positionId: '1262997402550587393'
      }
    }
  })
}
