/* eslint-disable */
import Mock from 'mockjs'

export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/api/user/v1/candidate/accept/list' + '.*'), 'post', (options) => {
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
          recruitmentId: '@integer(1, 100)',
          register: '@integer(0, 1)',
          entryDate: '@date()',
          orgId: '@integer(1, 10000000)',
          orgName: '@cword(3, 5)',
          jobId: '@integer(1, 10000000)',
          jobName: '@cword(3, 5)',
          positionId: '@integer(1, 10000000)',
          positionName: '@cword(3, 5)',
          'workProperty|1': [
            'FullTime',
            'Labor',
            'LaborOutsourcing',
            'PartTime',
            'Retirement',
            'Trainee'
          ]
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

  Mock.mock(new RegExp('/api/user/v1/candidate/accept/out' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      resCode: 200,
      resMsg: '',
      response: ''
    }
  })

  Mock.mock(new RegExp('/api/user/v1/candidate/out/to/accept' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      resCode: 200,
      resMsg: '',
      response: ''
    }
  })

  Mock.mock(new RegExp('/api/user/v1/candidate/offer/apply' + '.*'), 'get', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      resCode: 200,
      resMsg: '',
      response: Mock.mock({
        id: '@integer(10000000000, 20000000000)',
        personId: '@integer(10000000000, 20000000000)',
        probation: '@integer(0, 6)',
        entryDate: '@date("yyyy-mm-dd")',
        companyId: '@integer(10000000000, 20000000000)',
        companyName: '@cword(3, 5)',
        orgId: '@integer(1, 10000000)',
        orgName: '@cword(3, 5)',
        jobId: '@integer(1, 10000000)',
        jobName: '@cword(3, 5)',
        positionId: '@integer(1, 10000000)',
        positionName: '@cword(3, 5)',
        'workProperty|1': [
          'FullTime',
          'Labor',
          'LaborOutsourcing',
          'PartTime',
          'Retirement',
          'Trainee'
        ],
        workAddressId: '@integer(10000000000, 20000000000)',
        provinceCode: 'Vm[Z',
        proviceName: 'FmF',
        cityCode: '1R2)@W',
        cityName: 'F6z7tql',
        countyCode: '1R2)@W',
        countyName: 'F6z7tql',
        workProvinceCode: 'Vm[Z',
        workProviceName: 'FmF',
        workCityCode: '1R2)@W',
        workCityName: 'F6z7tql',
        probationSalary: '@integer(2000, 1000000)',
        formalSalary: '@integer(2000, 1000000)'
      })
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
      status: /[7-8]/,
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

  // 放弃入职人员筛选查询接口
  Mock.mock(new RegExp('/api/user/v1/candidate/giveup/list' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))
    let data = []
    for (let i = 0; i < JSON.parse(options.body).pageSize; i++) {
      data.push(
        Mock.mock(
          // {
          //   personId: '@integer(10000000000, 20000000000)',
          //   name: '@cname',
          //   phonenum: '@integer(10000000000, 20000000000)',
          //   sex: '@integer(0, 1)',
          //   age: '@integer(1, 100)',
          //   email: '@email',
          //   provinceCode: 'Vm[Z',
          //   proviceName: 'FmF',
          //   cityCode: '1R2)@W',
          //   cityName: 'F6z7tql',
          //   educationalLevel: 'R1xtN0',
          //   university: 'RH92',
          //   major: 'X[RRQ',
          //   workAge: '@integer(0, 45)',
          //   lastCompany: '@cword(3, 5)',
          //   recruitment: '@natural(1, 14)',
          //   monthSalary: '@natural(4000, 100000)',
          //   resumeUrl: '@url',
          //   attachmentUrl: '@url',
          //   attachmentName: '@cword(3, 5)',
          //   remark: '@sentence(3, 5)',
          //   recruitmentId: '@integer(1, 100)',
          //   register: '@integer(0, 1)',
          //   entryDate: "@date('yyyy-mm-dd')",
          //   orgId: '@integer(1, 10000000)',
          //   orgName: '@cword(3, 5)',
          //   jobId: '@integer(1, 10000000)',
          //   jobName: '@cword(3, 5)',
          //   positionId: '@integer(1, 10000000)',
          //   positionName: '@cword(3, 5)',
          //   'workProperty|1': [
          //     'FullTime',
          //     'Labor',
          //     'LaborOutsourcing',
          //     'PartTime',
          //     'Retirement',
          //     'Trainee'
          //   ]
          // },
          {
            personId: '@integer(10000000000, 20000000000)',
            name: '@cname',
            phonenum: '@integer(10000000000, 20000000000)',
            sex: '@integer(0, 1)',
            age: '@integer(1, 100)',
            email: '@email',
            interview: '@integer(0, 1)',
            provinceCode: '[MXIX9$',
            proviceName: 'HE#',
            cityCode: 'MVZJY&6',
            cityName: 'e5*ffBD',
            educationalLevel: 'pW!',
            university: 'vCdrz',
            major: 'LX^b',
            workAge: '@integer(0, 45)',
            lastCompany: '@cword(3, 5)',
            recruitment: '@natural(1, 14)',
            monthSalary: '@natural(4000, 100000)',
            resumeUrl: '@url',
            attachmentUrl: '@url',
            attachmentName: '@cword(3, 5)',
            remark: '@sentence(3, 5)',
            recruitmentId: '@integer(1, 100)',
            userId: '@integer(10000000000, 20000000000)',
            userName: '@cname',
            createTime: "@date('yyyy-mm-dd')",
            orgId: '@integer(10000000000, 20000000000)',
            orgName: '@cword(3, 5)',
            jobId: '@integer(1, 10000000)',
            jobName: '@cword(3, 5)',
            applyId: '@integer(10000000000, 20000000000)',
            approveStatus: 'kVOUdd',
            pushResume: 'G%L',
            resumeCheckId: 'yHRby',
            addUserId: '^S#*yIJ',
            addUserName: 'RDSa',
            register: 5917353194996804,
            interviewNum: 3562427122611952,
            interviewUserId: 'PL59',
            interviewUserName: 'rIFUp',
            interviewTime: 'zpGn',
            interviewType: '8e1*C',
            interviewId: 'ALI',
            offer: 6846023421373248,
            offerId: '2N)[l(',
            entryDate: '2012-03-25',
            positionId: ')V5q',
            positionName: 'jYe7$b',
            'workProperty|1': [
              'FullTime',
              'Labor',
              'LaborOutsourcing',
              'PartTime',
              'Retirement',
              'Trainee'
            ],
            reason: '87XF'
          }
        )
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

  // 待入职人员详情查询接口
  Mock.mock(new RegExp('/api/user/v1/candidate/accept/detail' + '.*'), 'get', () => {
    let obj = Mock.mock({
      personId: '9K!8CI',
      name: '张三',
      phonenum: 'R*S^x',
      sex: 7563755918717568,
      age: 3184419556824696,
      email: 'Re4A',
      provinceCode: 'eoAobs',
      proviceName: '6Qo(hO',
      cityCode: 'QD*Fb',
      cityName: ']6YJy',
      educationalLevel: 'kPm1%',
      university: 'CF%KQ',
      major: 'yQXiaUb',
      workAge: 3258608990876720,
      lastCompany: 'M6)5io',
      recruitment: 'YA!@I',
      monthSalary: 'pef',
      resumeUrl: 'sL*Q',
      attachmentUrl: '$Uj0',
      attachmentName: 'zXp!p',
      remark: 'gBbXvW%',
      recruitmentId: '*Idi',
      register: 2319986091997976,
      entryDate: '1992-02-15',
      orgId: 'x#GwI',
      orgName: 'zjxve6t',
      jobId: '^6ps',
      jobName: '@QWbxQd',
      positionId: 'leYQy',
      positionName: 'bsiOlAI',
      workProperty: 'LFvF31',
      applyId: 'Il&3l',
      status: 'Rw7ld!',
      companyId: 'PE3X$c',
      companyName: 'q%^MA'
    })

    return {
      resCode: 200,
      resMsg: '',
      response: obj
    }
  })
  // 更改入职日期
  Mock.mock(new RegExp('/user/v1/candidate/entry/date' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))

    return {
      resCode: 200,
      resMsg: '',
      response: '更改离职日期成功'
    }
  })
}
