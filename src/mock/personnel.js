import Mock from 'mockjs'

const workAddress = {
  resCode: 200,
  resMsg: '',
  response: {
    totalNum: -6513384773192480,
    totalPage: 5838632650963572,
    data: [
      {
        id: 'Cws!m',
        provinceCode: '140000',
        provinceName: '山西省',
        cityCode: '140500',
        cityName: '晋城市',
        countyCode: '140502',
        countyName: '7h6HE',
        address: 'jE)T!E'
      },
      {
        id: 'Lf%Cnw',
        provinceCode: '440000',
        provinceName: '广东省',
        cityCode: '440100',
        cityName: '广州市',
        countyCode: '440103',
        countyName: '4^VDL',
        address: 's[Dlwc'
      }
    ]
  }
}

export default ({ mock }) => {
  if (!mock) return
  //获取附件分类接口数据
  Mock.mock(new RegExp('/user/v1/user/attachment/category' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          name: '@cname',
          iconUrl: 'el-icon-picture-outline',
          maxLimit: '2',
          'type|1': ['员工基本资料', '员工档案资料'],
          sort: '0'
        })
      )
    }
    return {
      response: {
        data: list
      }
    }
  })
  //获取附件接口数据
  Mock.mock(new RegExp('user/v1/user/attachment/info' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 5; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          userId: '@increment',
          name: '@cname',
          'url|1': [
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          ],
          categoryId: '555',
          updateTime: '454548784112',
          createTime: '454548784112'
        })
      )
    }
    return {
      response: {
        data: list
      }
    }
  })

  Mock.mock(new RegExp('/api/user/v1/user/work/address' + '.*'), 'get', () => {
    return workAddress
  })

  Mock.mock(new RegExp('/api/user/v1/user/list' + '.*'), 'post', () => {
    const userList = {
      resCode: 200,
      resMsg: '',
      response: {
        totalNum: 2788916,
        totalPage: 4039344649382640,
        data: [
          {
            userId: 'AZq@Sz',
            workNo: 'f9ecu1!',
            name: '(UV',
            orgId: 'PX!#',
            orgName: 'HWjG@k',
            jobId: 'aZib9g',
            jobName: 'CF(',
            positionId: 'cwtrYk',
            positionName: 'NF2cwK',
            status: 'Try',
            entryDate: '1981-10-27',
            phonenum: 'Q0@)mR',
            leaveDate: '1970-05-17',
            leaveReason: '!cZFO6p',
            tags: [
              {
                tagId: 'ZSe)9',
                tagName: 'GURY'
              }
            ]
          },
          {
            userId: 'QYkNm',
            workNo: '[ZtTgR',
            name: '2k@G!8',
            orgId: 'Bkf',
            orgName: 'mfIP1',
            jobId: '6W4acm',
            jobName: '9QdEgg',
            positionId: 'bRW#e3',
            positionName: '[d*1',
            status: 'Formal',
            entryDate: '1975-11-26',
            phonenum: 'FRYq&@h',
            leaveDate: '2006-05-31',
            leaveReason: '2#(SC*',
            tags: [
              {
                tagId: '0Cbm',
                tagName: 'Wuz['
              }
            ]
          },
          {
            userId: 'kEd#',
            workNo: '3#!',
            name: '3JKu[',
            orgId: 'IZrsd',
            orgName: '3V[3x(L',
            jobId: 'YcB&!o',
            jobName: 'zioM',
            positionId: 'fyMSBP',
            positionName: 'D*1',
            status: 'Leaved',
            entryDate: '2010-11-17',
            phonenum: 'QTEDP!',
            leaveDate: '1991-10-11',
            leaveReason: 'eOn',
            tags: [
              {
                tagId: 'e*SW',
                tagName: '8%*w'
              }
            ]
          },
          {
            userId: 'Soz[',
            workNo: 'H7[',
            name: 'qH#)p',
            orgId: 'V^W',
            orgName: 'VQC',
            jobId: 'VDkRz',
            jobName: 'b!sdWS',
            positionId: 'Dr@gxc^',
            positionName: 'Wvi(#',
            status: 'WaitLeave',
            entryDate: '2005-12-28',
            phonenum: 'd#@TE',
            leaveDate: '1981-04-30',
            leaveReason: ']pd36%',
            tags: [
              {
                tagId: 'K4S)D',
                tagName: '21gGu'
              }
            ]
          }
        ]
      }
    }
    return userList
  })

  Mock.mock(new RegExp('/api/user/v1/user/status/stat' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          status: 'Try',
          statusNum: 1231
        },
        {
          status: 'Formal',
          statusNum: 1564
        },
        {
          status: 'Leaved',
          statusNum: 135122
        },
        {
          status: 'WaitLeave',
          statusNum: 15
        }
      ]
    }
  })
  Mock.mock(new RegExp('/api/org/v1/position/define' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          id: 'J4D4O',
          name: 'oj%25'
        }
      ]
    }
  })
  Mock.mock(new RegExp('/api/org/v1/job/list' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          jobId: 'rutwR',
          jobName: 'JlgJv$'
        }
      ]
    }
  })
  Mock.mock(new RegExp('/api/org/v1/organization/company' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          orgId: '!xoLp',
          orgName: '$1BG9',
          orgType: 'fq&'
        }
      ]
    }
  })
  Mock.mock(new RegExp('/api/org/v1/organization/tree' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          orgId: '0',
          orgName: '#EH6o',
          orgType: '%*Mz',
          sort: -8008198835721628,
          children: [
            {
              orgId: 'ZFRQ',
              orgName: 'y4CE',
              orgType: 'RcV(z',
              sort: -1569808853743480,
              children: []
            }
          ]
        }
      ]
    }
  })
  Mock.mock(new RegExp('/api/user/v1/user/workno' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        workNo: '1234'
      }
    }
  })
  Mock.mock(new RegExp('/api/user/v1/user/info/check' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {}
    }
  })
  Mock.mock(new RegExp('/api/user/v1/user/info' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {}
    }
  })
}

// 制造转正管理接口
Mock.mock(new RegExp('/api/user/v1/staff/list' + '.*'), 'post', () => {
  let list = []
  for (let i = 0; i < 12; i++) {
    list.push(
      Mock.mock({
        id: '@increment',
        name: '@cname',
        workNo: 'f9ecu1!',
        'userNum|0-100': 0,
        createTime: '@date',
        updateTime: '@date'
      })
    )
  }
  return {
    resCode: 200,
    resMsg: '描述',
    response: {
      totalNum: 12,
      totalPage: 12,
      data: list
    }
  }
})
