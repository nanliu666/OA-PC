import Mock from 'mockjs'

const normalData = {
  resCode: 200,
  resMsg: '操作成功',
  response: {}
}
export default (mock) => {
  if (!mock) return
  Mock.mock(new RegExp('/api/user/v1/candidate/recruitment/list' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          orgId: '@increment',
          orgName: '@string( 2, 10)',
          jobId: '@increment',
          jobName: '@string( 2, 10)',
          positionId: '@increment',
          positionName: '@string( 2, 10)'
        })
      )
    }
    return {
      ...normalData,
      response: list
    }
  })
  Mock.mock(new RegExp('/api/user/v1/person/info' + '.*'), 'get', () => {
    return {
      ...normalData,
      response: Mock.mock({
        personId: '@increment',
        name: '@cname',
        phonenum: /[0-9]{11}/,
        'sex|1': [0, 1],
        age: '@integer(20, 100)',
        email: '@email',
        'interview|1': ['0', '1'],
        provinceCode: /[0-9]{5}/,
        proviceName: '@province',
        cityCode: /[0-9]{5}/,
        cityName: '@city',
        educationalLevel: 'Primary',
        university: '@cname',
        major: '@cname',
        workAge: '@integer(2, 10)',
        lastCompany: '@cname',
        'recruitment|1': [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14'
        ],
        monthSalary: '@integer(2000, 20000)',
        resumeUrl: '@url',
        attachmentUrl: '@url',
        attachmentName: '@cname',
        remark: '@cparagraph',
        status: '@string( 2, 10)',
        recruitmentId: '@string( 2, 10)',
        userId: '@string( 2, 10)',
        userName: '@cname',
        createTime: '@date',
        addUserId: '@string( 2, 10)',
        addUserName: '@cname',
        jobName: '@string( 5, 10)'
      })
    }
  })
  // 人才库筛选查询
  Mock.mock(new RegExp('/api/user/v1/talent/list' + '.*'), 'post', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          personId: '@increment',
          name: '@cname',
          phonenum: /[0-9]{11}/,
          'sex|1': [0, 1],
          age: '@integer(20, 100)',
          email: '@email',
          'interview|1': ['0', '1'],
          provinceCode: /[0-9]{5}/,
          proviceName: '@province',
          cityCode: /[0-9]{5}/,
          cityName: '@city',
          'educationalLevel|1': ['Primary', 'Juniormiddle', 'High'],
          university: '@cname',
          major: '@cname',
          workAge: '@integer(2, 10)',
          lastCompany: '@cname',
          'recruitment|1': [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14'
          ],
          monthSalary: '@integer(2000, 20000)',
          resumeUrl: '@url',
          attachmentUrl: '@url',
          attachmentName: '@cname',
          remark: '@cparagraph',
          status: '@string( 2, 10)',
          recruitmentId: '@string( 2, 10)',
          userId: '@string( 2, 10)',
          userName: '@cname',
          createTime: '@date',
          addUserId: '@string( 2, 10)',
          addUserName: '@cname'
        })
      )
    }
    return {
      ...normalData,
      response: {
        totalNum: 100,
        data: list
      }
    }
  })
  // 获取员工信息
  Mock.mock(new RegExp('/api/user/v1/person/info' + '.*'), 'post', () => {
    return normalData
  })
  // 修改员工信息
  Mock.mock(new RegExp('/api/user/v1/person/info' + '.*'), 'put', () => {
    return normalData
  })
  // 添加人才库
  Mock.mock(new RegExp('/api/user/v1/talent/info' + '.*'), 'post', () => {
    return normalData
  })
  // 添加候选人
  Mock.mock(new RegExp('/api/user/v1/candidate/info' + '.*'), 'post', () => {
    return normalData
  })
  // 添加人才到候选人接口
  Mock.mock(new RegExp('/api/user/v1/talent/to/candidate' + '.*'), 'post', () => {
    return normalData
  })
  // 发送offer
  Mock.mock(new RegExp('/api/user/v1/candidate/offer/send' + '.*'), 'post', () => {
    return normalData
  })
  // 新建offer
  Mock.mock(new RegExp('/api/user/v1/candidate/offer' + '.*'), 'post', () => {
    return normalData
  })
  // 编辑offer
  Mock.mock(new RegExp('/api/user/v1/candidate/offer' + '.*'), 'put', () => {
    return normalData
  })
  // 获取offer申请
  Mock.mock(new RegExp('/api/user/v1/candidate/offer/apply' + '.*'), 'get', () => {
    return {
      normalData,
      response: {
        probationSalary: 10000,
        formalSalary: 12000
      }
    }
  })
  // 获取offer
  Mock.mock(new RegExp('/api/user/v1/candidate/offer' + '.*'), 'get', () => {
    return {
      normalData,
      response: {
        ccEmail: 'liukangqi56@gmail.com',
        entryDate: '2020-05-05',
        noticeUser: '1258244944030916609#Zeus#0001,1262998215033409537#游荣昌#0002',
        phonenum: '11111111111',
        template: 'Normal',
        title: '标题',
        userId: '1263038146921418753',
        validDay: '5',
        workAddressId: '1263361372388093953'
      }
    }
  })
}
