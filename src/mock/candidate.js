/* eslint-disable */

import Mock from 'mockjs'

export default ({ mock }) => {
  if (!mock) return

  Mock.mock(new RegExp('/api/user/v1/candidate/status/stat' + '.*'), 'get', (options) => {
    console.log(options.url, JSON.parse(options.body))
    let data = []
    for (let i = 0; i < 7; i++) {
      data.push(
        Mock.mock({
          status: i,
          statusNum: '@integer(1, 10000)'
        })
      )
    }
    return {
      resCode: 200,
      resMsg: '',
      response: data
    }
  })

  Mock.mock(new RegExp('/api/user/v1/candidate/list' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))
    let data = []
    for (let i = 0; i < JSON.parse(options.body).pageSize; i++) {
      data.push(
        Mock.mock({
          personId: '@integer(10000000000, 20000000000)',
          name: '@cname',
          phonenum: '@integer(10000000000, 20000000000)',
          sex: '@integer(0, 1)',
          age: '@integer(1, 100)',
          email: '@email',
          interview: '@integer(0, 1)',
          provinceCode: 'Vm[Z',
          proviceName: 'FmF',
          cityCode: '1R2)@W',
          cityName: 'F6z7tql',
          educationalLevel: 'R1xtN0',
          university: 'RH92',
          major: 'X[RRQ',
          workAge: '@integer(0, 45)',
          lastCompany: '@cword(3, 5)',
          recruitment: '@natural(1, 14)',
          monthSalary: '@natural(4000, 100000)',
          resumeUrl: '@url',
          attachmentUrl: '@url',
          attachmentName: '@cword(3, 5)',
          remark: '@sentence(3, 5)',
          //   status: String(Math.floor(Math.random() * 7)),
          status: /[0-6]/,
          recruitmentId: '@integer(1, 100)',
          userId: '@integer(1, 1000000)',
          userName: '@cname',
          createTime: "@date('yyyy-mm-dd')",
          orgId: '@integer(1, 10000000)',
          orgName: '@cword(3, 5)',
          jobId: '@integer(1, 10000000)',
          jobName: '@cword(3, 5)'
        })
      )
    }
    return {
      resCode: 200,
      resMsg: '',
      response: {
        totalNum: 12345,
        data: data
      }
    }
  })

  Mock.mock(new RegExp('/api/user/v1/candidate/out' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      resCode: 200,
      resMsg: '',
      response: ''
    }
  })

  Mock.mock(new RegExp('/api/user/v1/candidate/recruitment/list' + '.*'), 'get', (options) => {
    console.log(options.url, JSON.parse(options.body))
    Mock.Random.extend({
      constellation: function() {
        const orgTree = [
          '1252523599903072257',
          '1252523599903072258',
          '1252523599903072259',
          '1252523599903072260',
          '1252523599903072261',
          '1257922456241659905',
          '1257943561580855298',
          '1257948555810025473'
        ]
        return this.pick(orgTree)
      }
    })
    let data = []
    for (let i = 0; i < 20; i++) {
      data.push(
        Mock.mock({
          id: '@integer(1, 100000000)',
          orgId: '@constellation',
          orgName: '@cword(3, 5)',
          jobId: '@integer(1, 100000000)',
          jobName: '@cword(3, 5)',
          positionId: '@integer(1, 100000000)',
          positionName: '@cword(3, 5)'
        })
      )
    }
    return {
      resCode: 200,
      resMsg: '',
      response: data
    }
  })

  Mock.mock(new RegExp('/api/user/v1/candidate/job/change' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      resCode: 200,
      resMsg: '',
      response: ''
    }
  })

  Mock.mock(new RegExp('/api/user/v1/candidate/recover' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      resCode: 200,
      resMsg: '',
      response: ''
    }
  })

  Mock.mock(new RegExp('/api/user/v1/candidate/offer/accept' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      resCode: 200,
      resMsg: '',
      response: ''
    }
  })

  Mock.mock(new RegExp('/api/user/v1/candidate/offer/change' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      resCode: 200,
      resMsg: '',
      response: ''
    }
  })

  Mock.mock(new RegExp('/api/user/v1/person/info' + '.*'), 'get', (options) => {
    console.log(options.url, JSON.parse(options.body))
    let tags = []
    for (let i = 0; i < 3; i++) {
      tags.push(
        Mock.mock({
          tagId: '@integer(1, 100000000)',
          name: '@cword(3, 5)',
          color: '@color'
        })
      )
    }
    Mock.Random.extend({
      constellation: function() {
        const educationalLevel = [
          'Primary',
          'Juniormiddle',
          'High',
          'JuniorCollege',
          'Undergraduate',
          'Master',
          'Doctor',
          'PostDoctoral',
          'VocationalHigh',
          'SecondarySpecialized',
          'Technical',
          'SecondaryNormal',
          'Other'
        ]
        return this.pick(educationalLevel)
      }
    })
    let data = Mock.mock({
      personId: '@integer(10000000000, 20000000000)',
      name: '@cname',
      phonenum: '@integer(10000000000, 20000000000)',
      sex: '@integer(0, 1)',
      age: '@integer(1, 100)',
      email: '@email',
      interview: '@integer(0, 1)',
      provinceCode: 'Vm[Z',
      proviceName: 'FmF',
      cityCode: '1R2)@W',
      cityName: 'F6z7tql',
      educationalLevel: '@constellation',
      university: 'RH92',
      major: 'X[RRQ',
      workAge: '@integer(0, 45)',
      lastCompany: '@cword(3, 5)',
      'recruitment|1': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
      monthSalary: '@natural(4000, 100000)',
      resumeUrl: '@url',
      attachmentUrl: '@url',
      attachmentName: '@cword(3, 5)',
      remark: '@sentence(3, 5)',
      status: /[0-6]/,
      recruitmentId: '@integer(1, 100)',
      userId: '@integer(1, 1000000)',
      userName: '@cname',
      createTime: "@date('yyyy-mm-dd')",
      orgId: '@integer(1, 10000000)',
      orgName: '@cword(3, 5)',
      jobId: '@integer(1, 10000000)',
      jobName: '@cword(3, 5)'
    })
    data.tags = tags
    return {
      resCode: 200,
      resMsg: '',
      response: data
    }
  })

  Mock.mock(new RegExp('/api/user/v1/person/record' + '.*'), 'get', (options) => {
    console.log(options.url, JSON.parse(options.body))
    let data = []
    for (let i = 0; i < 20; i++) {
      data.push(
        Mock.mock({
          userId: '@integer(10000000000, 20000000000)',
          name: '@cname',
          content: '@csentence(5, 20)',
          remark: '@csentence(5, 30)',
          createTime: '@date("yyyy-yy-y MM:MM:dd")'
        })
      )
    }
    return {
      resCode: 200,
      resMsg: '',
      response: data
    }
  })
}
