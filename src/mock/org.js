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
      success: true,
      response: {
        data: [
          {
            userId: '1258244944030916609',
            workNo: '0001',
            name: 'Zeus',
            orgId: '1252523599903072258',
            orgName: '集团总部',
            jobId: '1252190741156134914',
            jobName: 'CEO',
            positionId: '1262993255747080193',
            positionName: '总裁',
            phonenum: '13726042239',
            status: 'Formal'
          },
          {
            userId: '1262998215033409537',
            workNo: '0002',
            name: '游荣昌',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '1262997363212210177',
            positionName: 'Java开发工程师',
            phonenum: '15915874288',
            status: 'Formal'
          },
          {
            userId: '1263037430240694273',
            workNo: '0003',
            name: '伍伟雁',
            orgId: '1252523599903072257',
            orgName: '百利宏',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '1262997402550587393',
            positionName: '前端开发工程师',
            phonenum: '18826138292',
            status: 'Formal'
          },
          {
            userId: '1263038146921418753',
            workNo: '0004',
            name: '徐国烨',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '1262997363212210177',
            positionName: 'Java开发工程师',
            phonenum: '15915742688',
            status: 'Formal'
          },
          {
            userId: '1263038423980363778',
            workNo: '0005',
            name: '曾庆荣',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '1262997363212210177',
            positionName: 'Java开发工程师',
            phonenum: '15815912344',
            status: 'Formal'
          },
          {
            userId: '1263038746618810370',
            workNo: '0006',
            name: '陈柳明',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262997100938186753',
            jobName: '测试工程师',
            positionId: '1262997437786935298',
            positionName: '测试工程师',
            phonenum: '16516821455',
            status: 'Try'
          },
          {
            userId: '1263039892955648002',
            workNo: '0007',
            name: '关芬达',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '1262997402550587393',
            positionName: '前端开发工程师',
            phonenum: '15915875266',
            status: 'Formal'
          },
          {
            userId: '1263040438093533185',
            workNo: '0008',
            name: '王木宗',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996279848652801',
            jobName: '项目经理',
            positionId: '',
            positionName: '',
            phonenum: '16515789244',
            status: 'Formal'
          },
          {
            userId: '1263040873252573186',
            workNo: '0009',
            name: '张金桦',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '',
            positionName: '',
            phonenum: '13516578266',
            status: 'Formal'
          },
          {
            userId: '1263041216476663809',
            workNo: '0010',
            name: '刘康奇',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '1262997402550587393',
            positionName: '前端开发工程师',
            phonenum: '13816423142',
            status: 'Formal'
          }
        ],
        totalNum: 12,
        totalPage: 2
      },
      resMsg: '操作成功'
    }
  })
}
