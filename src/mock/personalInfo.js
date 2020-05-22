import Mock from 'mockjs'

const normalData = {
  resCode: 200,
  resMsg: '操作成功'
}
export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/common/v1/sms/send' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        code: '0000'
      }
    }
  })

  //在职信息员工合同信息查询
  Mock.mock(new RegExp('/user/v1/user/contract/info' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          id: 'eeefhjh',
          code: '0394875457',
          name: '百利宏',
          type: '固定期限劳动合同',
          beginDate: '2018-01-31',
          endDate: '2020-12-31',
          signDate: '2018-01-31',
          relieveDate: '2020-12-31',
          period: '3年',
          remark: '2次'
        },
        {
          id: 'asds',
          code: 'jhyuui00u77',
          name: '百利宏',
          type: '固定期限劳动合同',
          beginDate: '2018-01-31',
          endDate: '2020-12-31',
          signDate: '2018-01-31',
          relieveDate: '2020-12-31',
          period: '3年',
          remark: '2次'
        }
      ]
    }
  })

  //在职员工职位查询
  Mock.mock(new RegExp('/org/v1/job/list' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          jobId: 'eeefhjh',
          jobName: '财务专员'
        },
        {
          jobId: 'eeefhjddh',
          jobName: '财务总监'
        }
      ]
    }
  })

  //在职信息岗位查询
  Mock.mock(new RegExp('/org/v1/position/define' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          id: 'errtr',
          name: '经理级'
        },
        {
          id: 'eeefhjddh',
          name: '总经理级'
        }
      ]
    }
  })

  //在职信息部门查询
  Mock.mock(new RegExp('/org/v1/organization/tree' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          id: 'errtr',
          name: '经理级'
        },
        {
          id: 'eeefhjddh',
          name: '总经理级'
        }
      ]
    }
  })
  //查询员工任职记录
  Mock.mock(new RegExp('/user/v1/user/office/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          companyName: '百利宏控股',
          beginDate: '2018-01-31',
          endDate: '2020-12-31',
          orgName: '产品部门/设计小组',
          jobName: '产品经理',
          positionName: '经理岗位',
          address: '广东省深圳市宝能科技园',
          remark: '晋升'
        },
        {
          companyName: '百利宏控股',
          beginDate: '2018-01-31',
          endDate: '2020-12-31',
          orgName: '产品部门/设计小组',
          jobName: '产品经理',
          positionName: '经理岗位',
          address: '广东省深圳市宝能科技园',
          remark: '晋升'
        }
      ]
    }
  })
  // 员工基本信息查询
  Mock.mock(new RegExp('/user/v1/user/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        userId: '20200426',
        name: '张三',
        sex: '1', //	性别，1：男；0：女
        email: 'zahngsan5@epro.com.cn',
        phonenum: '13456347890',
        idType: '身份证',
        idNo: '610144198802145643',
        birthDate: '1980-02-14',
        marriage: '1', //婚姻状态，1：已婚，0：未婚
        politicalStatus: '共产党员',
        firstWorkDate: '2014-06',
        householdType: '城镇户口',
        health: '健康',
        nation: '汉族',
        idAddress: '广东省深圳市龙岗区龙岗派出所',
        userAddress: '广东省深圳市龙岗区龙岗派出所12号',
        nativeProvinceName: '江苏',
        nativeProvinceCode: '',
        nativeCityName: '南京',
        nativeCityCode: 'nativeCityCode--02',
        status: 'Try',
        orgName: 'UCD中心',
        jobName: '产品经理',
        leaderName: '程小刚',
        workNo: 'XA667',
        bankName: '建设银行',
        bankNo: '6228374768997669',
        isFirstSs: '1', //	是否本地首次缴纳社保，1：是，0：否
        ssNo: '897668999',
        isFirstEpf: '1', //是否本地首次缴纳公积金，1：是，0：否
        epfNo: '897668999',
        tags: [
          {
            tagId: 'qq',
            tagName: '正式PM；储备PM；正式PM；储备PM'
          }
        ],
        userRemark: '这是在职信息的备注',
        recruitment: 'BOSS直聘',
        workProvinceName: '陕西省',
        workProvinceCode: '610000',
        workCityCode: '610100',
        workCityName: '西安市',
        provinceCode: '610000',
        provinceName: '陕西省',
        cityName: '西安市',
        cityCode: '610100',
        countyCode: '610113',
        countyName: '雁塔区',
        address: 'xxx软件园', //工作的详细地址
        subOrg: [
          {
            subOrgId: '1257943561580855298',
            subOrgName: '1257943561580855298',
            subJobId: '1257966733176881154',
            subJobName: '财务'
          }
        ],
        positionName: '岗位名称',
        companyName: '入职公司',
        workProperty: '全职',
        probation: '3个月',
        formalDate: '2019-3-20',
        entryDate: '2018-12-20'
      }
    }
  })
  //员工基本信息编辑
  Mock.mock(new RegExp('/user/v1/user/info' + '.*'), 'put', () => {
    return {
      ...normalData
    }
  })

  //员工紧急联系人查询接口
  Mock.mock(new RegExp('/api/user/v1/user/emer/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          id: '1',
          name: 'bb',
          phone: '18769023456',
          relationship: '父亲'
        },
        {
          id: '2',
          name: 'mm',
          phone: '18769023456',
          relationship: '母亲'
        }
      ]
    }
  })
  //员工紧急联系人编辑接口
  Mock.mock(new RegExp('/user/v1/user/emer/info' + '.*'), 'put', () => {
    return {
      ...normalData
    }
  })
  //员工紧急联系人添加接口
  Mock.mock(new RegExp('/user/v1/user/emer/info' + '.*'), 'post', () => {
    return {
      ...normalData
    }
  })
  //员工紧急联系人删除接口
  Mock.mock(new RegExp('/user/v1/user/emer/info' + '.*'), 'delete', () => {
    return {
      ...normalData
    }
  })

  //员工教育经历查询接口
  Mock.mock(new RegExp('/user/v1/user/education/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          id: 'dddfdf',
          beginDate: '2010-09',
          endDate: '2014-06',
          educationalLevel: '本科',
          educationalType: '全日制',
          schoolName: '广州大学',
          majorName: '工业设计工程'
        },
        {
          id: 'adesaf',
          beginDate: '2010-09',
          endDate: '2014-06',
          educationalLevel: '本科',
          educationalType: '全日制',
          schoolName: '广州大学',
          majorName: '工业设计工程'
        }
      ]
    }
  })
  //员工教育经编辑接口
  Mock.mock(new RegExp('/user/v1/user/education/info' + '.*'), 'put', () => {
    return {
      ...normalData
    }
  })
  //员工教育经历删除接口
  Mock.mock(new RegExp('/user/v1/user/education/info' + '.*'), 'delete', () => {
    return {
      ...normalData
    }
  })
  //员工教育经历增加接口
  Mock.mock(new RegExp('/user/v1/user/education/info' + '.*'), 'post', () => {
    return {
      ...normalData
    }
  })

  //员工工作经历增加接口
  Mock.mock(new RegExp('/user/v1/user/work/info' + '.*'), 'post', () => {
    return {
      ...normalData
    }
  })
  //员工工作经历删除接口
  Mock.mock(new RegExp('/user/v1/user/work/info' + '.*'), 'delete', () => {
    return {
      ...normalData
    }
  })
  //员工工作经历修改接口
  Mock.mock(new RegExp('/user/v1/user/work/info' + '.*'), 'put', () => {
    return {
      ...normalData
    }
  })
  //员工工作经历查询接口
  Mock.mock(new RegExp('/user/v1/user/work/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          id: 'SSDD',
          beginWorkDate: '2016-03',
          endWorkDate: '2017-03',
          companyName: '上海易宝',
          jobName: 'Java工程师',
          salary: '28k',
          witnessName: 'lisi',
          witnessPhone: '18765390234',
          isSecret: '0',
          beginSecretDate: '',
          endSecretDate: '',
          content: 'aaaa'
        },
        {
          id: '2334',
          beginWorkDate: '2013-03',
          endWorkDate: '2014-03',
          companyName: '上海易宝',
          jobName: 'Java工程师',
          salary: '28k',
          witnessName: 'lisi',
          witnessPhone: '18765390234',
          isSecret: '1',
          beginSecretDate: '',
          endSecretDate: '',
          content: 'aaaa'
        }
      ]
    }
  })

  //员工培训经历增加接口
  Mock.mock(new RegExp('/user/v1/user/train/info' + '.*'), 'post', () => {
    return {
      ...normalData
    }
  })
  //员工培训经历删除接口
  Mock.mock(new RegExp('/user/v1/user/train/info' + '.*'), 'delete', () => {
    return {
      ...normalData
    }
  })
  //员工培训经历修改接口
  Mock.mock(new RegExp('/user/v1/user/train/info' + '.*'), 'put', () => {
    return {
      ...normalData
    }
  })
  //员工培训经历查询接口
  Mock.mock(new RegExp('/user/v1/user/train/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          id: '445',
          beginDate: '2015-03',
          endDate: '2016-05',
          companyName: '程序v',
          name: 'ssad'
        }
      ]
    }
  })

  //员工家庭信息增加接口
  Mock.mock(new RegExp('/user/v1/user/family/info' + '.*'), 'post', () => {
    return {
      ...normalData
    }
  })
  //员工家庭信息删除接口
  Mock.mock(new RegExp('/user/v1/user/family/info' + '.*'), 'delete', () => {
    return {
      ...normalData
    }
  })
  //员工家庭信息修改接口
  Mock.mock(new RegExp('/user/v1/user/family/info' + '.*'), 'put', () => {
    return {
      ...normalData
    }
  })
  //员工家庭信息查询接口
  Mock.mock(new RegExp('/user/v1/user/family/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          id: '3434435',
          relationship: '父亲',
          age: '56',
          companyName: '中国移动',
          name: '陈树含',
          jobName: '主任',
          phone: '1589768987'
        }
      ]
    }
  })

  //员工资格证书增加接口
  Mock.mock(new RegExp('/user/v1/user/certificate/info' + '.*'), 'post', () => {
    return {
      ...normalData
    }
  })
  //员工资格证书删除接口
  Mock.mock(new RegExp('/user/v1/user/certificate/info' + '.*'), 'delete', () => {
    return {
      ...normalData
    }
  })
  //员工资格证书修改接口
  Mock.mock(new RegExp('/user/v1/user/certificate/info' + '.*'), 'put', () => {
    return {
      ...normalData
    }
  })
  //员工资格证书查询接口
  Mock.mock(new RegExp('/user/v1/user/certificate/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          id: '45667',
          issueDate: '2012-03-12',
          code: 'sdf678902',
          companyName: 'mm-cc-hhh',
          name: 'aaaaaa'
        },
        {
          id: '4566ww7',
          issueDate: '2012-03-12',
          code: 'sdf678902',
          companyName: 'mm-cc-hhh',
          name: 'aaaaaa'
        }
      ]
    }
  })
}
