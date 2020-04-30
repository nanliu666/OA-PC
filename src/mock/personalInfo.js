import Mock from 'mockjs'

const normalData = {
  resCode: 200,
  success: true,
  resMsg: '保存成功'
}
export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/user/wxmini/v1/user/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData,
        response: {
          info: {
            id: '1123598821738675201',
            circleUrl: '',
            createUser: '1123598821738675201',
            createDept: '1123598813738675201',
            createTime: '2018-08-08 00:00:00',
            updateUser: '1123598821738675201',
            updateTime: '2018-08-08 00:00:00',
            status: 1,
            isDeleted: 0,
            tenantId: '000000',
            code: '',
            account: 'admin',
            password: '90b9aa7e25f80cf4f64e990b78a9fc5ebd6cecad',
            name: '����',
            realName: 'aaaa',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            email: 'admin@bladex.vip',
            phone: '123333333333',
            birthday: '2018-08-08 00:00:00',
            sex: 1,
            roleId: '1123598816738675201',
            deptId: '1123598813738675201',
            postId: '',
            tenantName: 'wewrewrfe',
            roleName: 'sddf',
            deptName: 'tfretrgt',
            postName: '',
            sexName: ''
          }
        }
      }
    }
  })
  Mock.mock(new RegExp('/user/wxmini/v1/user/info' + '.*'), 'put', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData,
        response: {
          ...normalData
        }
      }
    }
  })

  Mock.mock(new RegExp('/user/wxmini/v1/user/info' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '�޸ĳɹ�',
      response: {
        ...normalData,
        response: {
          ...normalData
        }
      }
    }
  })

  Mock.mock(new RegExp('/common/v1/sms/send' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData,
        response: {
          code: '0000'
        }
      }
    }
  })

  // 员工基本信息查询
  Mock.mock(new RegExp('/user/v1/user/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData,
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
          tags: {
            tagId: '',
            tagName: '正式PM；储备PM；正式PM；储备PM'
          }
        }
      }
    }
  })
  //员工基本信息编辑
  Mock.mock(new RegExp('/user/v1/user/info' + '.*'), 'put', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })

  //员工紧急联系人查询接口
  Mock.mock(new RegExp('/user/v1/user/emer/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData,
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
    }
  })
  //员工紧急联系人编辑接口
  Mock.mock(new RegExp('/user/v1/user/emer/info' + '.*'), 'put', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工紧急联系人添加接口
  Mock.mock(new RegExp('/user/v1/user/emer/info' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工紧急联系人删除接口
  Mock.mock(new RegExp('/user/v1/user/emer/info' + '.*'), 'delete', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })

  //员工教育经历查询接口
  Mock.mock(new RegExp('/user/v1/user/education/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData,
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
    }
  })
  //员工教育经编辑接口
  Mock.mock(new RegExp('/user/v1/user/education/info' + '.*'), 'put', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工教育经历删除接口
  Mock.mock(new RegExp('/user/v1/user/education/info' + '.*'), 'delete', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工教育经历增加接口
  Mock.mock(new RegExp('/user/v1/user/education/info' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })

  //员工工作经历增加接口
  Mock.mock(new RegExp('/user/v1/user/work/info' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工工作经历删除接口
  Mock.mock(new RegExp('/user/v1/user/work/info' + '.*'), 'delete', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工工作经历修改接口
  Mock.mock(new RegExp('/user/v1/user/work/info' + '.*'), 'put', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工工作经历查询接口
  Mock.mock(new RegExp('/user/v1/user/work/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData,
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
    }
  })

  //员工培训经历增加接口
  Mock.mock(new RegExp('/user/v1/user/train/info' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工培训经历删除接口
  Mock.mock(new RegExp('/user/v1/user/train/info' + '.*'), 'delete', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工培训经历修改接口
  Mock.mock(new RegExp('/user/v1/user/train/info' + '.*'), 'put', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工培训经历查询接口
  Mock.mock(new RegExp('/user/v1/user/train/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData,
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
    }
  })

  //员工家庭信息增加接口
  Mock.mock(new RegExp('/user/v1/user/family/info' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工家庭信息删除接口
  Mock.mock(new RegExp('/user/v1/user/family/info' + '.*'), 'delete', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工家庭信息修改接口
  Mock.mock(new RegExp('/user/v1/user/family/info' + '.*'), 'put', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工家庭信息查询接口
  Mock.mock(new RegExp('/user/v1/user/family/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData,
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
    }
  })

  //员工资格证书增加接口
  Mock.mock(new RegExp('/user/v1/user/certificate/info' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工资格证书删除接口
  Mock.mock(new RegExp('/user/v1/user/certificate/info' + '.*'), 'delete', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工资格证书修改接口
  Mock.mock(new RegExp('/user/v1/user/certificate/info' + '.*'), 'put', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData
      }
    }
  })
  //员工资格证书查询接口
  Mock.mock(new RegExp('/user/v1/user/certificate/info' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        ...normalData,
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
    }
  })
}
