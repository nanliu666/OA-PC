import Mock from 'mockjs'

const normalData = {
  resCode: 200,
  success: true,
  resMsg: ''
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
}
