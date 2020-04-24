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
        provinceCode: 'w7GYYP',
        provinceName: 'MmOE',
        cityCode: 'wFX&',
        cityName: '*@m',
        countyCode: 'oGBQ',
        countyName: '7h6HE',
        address: 'jE)T!E'
      },
      {
        id: 'Lf%Cnw',
        provinceCode: 'Fr37bY',
        provinceName: '2QzW',
        cityCode: '9Tqtr@',
        cityName: ')VHL)^^',
        countyCode: 'fZL',
        countyName: '4^VDL',
        address: 's[Dlwc'
      },
      {
        id: 'Lf%Cnw',
        provinceCode: 'Fr37bY',
        provinceName: '2QzW',
        cityCode: '9Tqtr@',
        cityName: ')VHL)^^',
        countyCode: 'fZL',
        countyName: '4^VDL',
        address: 's[Dlwc'
      },
      {
        id: 'UZO',
        provinceCode: 'X@(m',
        provinceName: 'nv7',
        cityCode: 'I@l4',
        cityName: '$ko6g',
        countyCode: 'YtvT',
        countyName: 'Nv6l',
        address: 'Az9'
      },
      {
        id: '(EIC',
        provinceCode: 'SMm]9Zc',
        provinceName: '6V4e',
        cityCode: 'U&JL',
        cityName: 'PKV^Uz',
        countyCode: 'CyDe',
        countyName: 'agZ#FT',
        address: 'MCc9jji'
      }
    ]
  }
}

export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/user/v1/user/work/address' + '.*'), 'get', () => {
    return workAddress
  })

  Mock.mock(new RegExp('/user/v1/user/list' + '.*'), 'get', () => {
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

  Mock.mock(new RegExp('/user/v1/user/status/stat' + '.*'), 'get', () => {
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
          statusNum: 15646123
        },
        {
          status: 'Leaved',
          statusNum: 1352465
        },
        {
          status: 'WaitLeave',
          statusNum: 156489464165
        }
      ]
    }
  })
}
