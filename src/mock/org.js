import Mock from 'mockjs'

export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/api/org/v1/organization' + '.*'), 'get', () => {
    return {
      resCode: 0,
      resMsg: '',
      response: [
        {
          orgId: '0',
          orgName: '@Qy4DZc',
          orgType: 'Enterprise',
          orgCode: '*uN',
          userId: 'Fn0aVl',
          workNo: 'IBp#',
          userName: 'oC[zy6',
          jobNum: 4237337732629548,
          userNum: 4547723361446352,
          workNum: 1290345470029376,
          sort: -4517858002511464,
          remark: '[t8Q',
          children: [
            {
              orgId: '8J&3',
              orgName: '2g8$&*',
              orgType: 'Company',
              orgCode: '8i9',
              userId: 'kjEfR%',
              workNo: 'l3c',
              userName: 'JCb',
              jobNum: 6084527069731168,
              userNum: -1500627762592768,
              workNum: -7208203571586412,
              sort: 1706497708785724,
              remark: 'KbEVi',
              children: [
                {
                  orgId: 'f[q5',
                  orgName: 'y4DZc',
                  orgType: 'Department',
                  orgCode: '*uN',
                  userId: 'Fn0aVl',
                  workNo: 'IBp#',
                  userName: 'oC[zy6',
                  jobNum: 4237337732629548,
                  userNum: 4547723361446352,
                  workNum: 1290345470029376,
                  sort: -4517858002511464,
                  remark: '[t8Q',
                  children: [
                    {
                      orgId: 'J&3',
                      orgName: '2g8$&*',
                      orgType: 'Group',
                      orgCode: '8i9',
                      userId: 'kjEfR%',
                      workNo: 'l3c',
                      userName: 'JCb',
                      jobNum: 6084527069731168,
                      userNum: -1500627762592768,
                      workNum: -7208203571586412,
                      sort: 1706497708785724,
                      remark: 'KbEVi',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  })

  Mock.mock(new RegExp('/api/org/v1/organization/sort' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {}
    }
  })

  Mock.mock(new RegExp('/api/org/v1/organization' + '.*'), 'delete', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {}
    }
  })
  Mock.mock(new RegExp('/api/org/v1/organization' + '.*'), 'put', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {}
    }
  })
  Mock.mock(new RegExp('/api/org/v1/organization' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {}
    }
  })
  Mock.mock(new RegExp('/api/user/v1/user/work/list' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        totalNum: 4650048417434880,
        totalPage: -852333107438548,
        data: [
          {
            userId: 'mP*xgm',
            workNo: 'GUT&Fw',
            name: 'ztswwff',
            orgId: 'fH1TjHN',
            orgName: 'yM@',
            jobId: 'HS*!h[',
            jobName: 'J&mqrd',
            positionId: '4ij8W@',
            positionName: 'ZS4#',
            phonenum: '&WGcZOU',
            status: '5TyQ6'
          }
        ]
      }
    }
  })
}
