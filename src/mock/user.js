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
          orgName: '@word(3, 5)',
          orgType: 'Enterprise',
          orgCode: '@string( 2, 10)',
          userId: '@string( 2, 10)',
          workNo: '@string( 2, 10)',
          userName: '@name',
          jobNum: 1,
          userNum: 2,
          workNum: 3,
          sort: 1,
          remark: '@sentence(3, 5)',
          children: [
            {
              orgId: '8J&3',
              orgName: '@word(3, 5)',
              orgType: 'Company',
              orgCode: '8i9',
              userId: '@string( 2, 10)',
              workNo: '@string( 2, 10)',
              userName: '@name',
              jobNum: 1,
              userNum: 1,
              workNum: 1,
              sort: 2,
              remark: '@sentence(3, 5)',
              children: [
                {
                  orgId: '@string( 2, 10)',
                  orgName: '@word(3, 5)',
                  orgType: 'Department',
                  orgCode: '@string( 2, 10)',
                  userId: '@string( 2, 10)',
                  workNo: '@string( 2, 10)',
                  userName: '@name',
                  jobNum: 1,
                  userNum: 2,
                  workNum: 3,
                  sort: 3,
                  remark: '@sentence(3, 5)',
                  children: [
                    {
                      orgId: '@string( 2, 10)',
                      orgName: '@string(3, 5)',
                      orgType: 'Group',
                      orgCode: '@string( 2, 10)',
                      userId: '@string( 2, 10)',
                      workNo: '@string( 2, 10)',
                      userName: '@name',
                      jobNum: 1,
                      userNum: 2,
                      workNum: 3,
                      sort: 4,
                      remark: '@sentence(3, 5)',
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

  Mock.mock(new RegExp('/api/org/v1/org/user/tree' + '.*'), 'get', () => {
    return {
      resCode: 200,
      success: true,
      response: [
        {
          orgId: '1252523599903072257',
          orgName: '百利宏',
          parentId: 0,
          users: [
            { workNo: 'GD003', name: 'A', userId: '1253210544507457537' },
            { workNo: 'GD004', name: 'B', userId: '1253210544507457538' },
            { workNo: '0002', name: 's1mple', userId: '1258304216295026690' },
            { workNo: '0003', name: 'ces', userId: '1258305249104637954' }
          ],
          children: [
            {
              orgId: '1252523599903072258',
              orgName: '董事长办公室',
              parentId: '1252523599903072257',
              users: [
                { workNo: 'GD006', name: 'E', userId: '1253210544507457540' },
                { workNo: 'GD007', name: 'F', userId: '1253210544507457541' }
              ],
              id: '1252523599903072258',
              hasChildren: false
            },
            {
              orgId: '1252523599903072259',
              orgName: '广州易宝分公司',
              parentId: '1252523599903072257',
              users: [{ workNo: 'GD008', name: 'G', userId: '1253210544507457542' }],
              children: [
                {
                  orgId: '1252523599903072260',
                  orgName: '软件部',
                  parentId: '1252523599903072259',
                  users: [],
                  id: '1252523599903072260',
                  hasChildren: false
                },
                {
                  orgId: '1258213117681528834',
                  orgName: '事业部',
                  parentId: '1252523599903072259',
                  users: [{ workNo: '0001', name: 'Zeus', userId: '1258244944030916609' }],
                  children: [
                    {
                      orgId: '1252523599903072261',
                      orgName: '软件部OA项目组',
                      parentId: '1258213117681528834',
                      users: [{ workNo: 'GD009', name: 'M', userId: '1253210544507457543' }],
                      children: [
                        {
                          orgId: '1257922456241659905',
                          orgName: '前端组',
                          parentId: '1252523599903072261',
                          users: [],
                          id: '1257922456241659905',
                          hasChildren: false
                        },
                        {
                          orgId: '1257943561580855298',
                          orgName: '后端组',
                          parentId: '1252523599903072261',
                          users: [],
                          id: '1257943561580855298',
                          hasChildren: false
                        },
                        {
                          orgId: '1257948555810025473',
                          orgName: '测试部',
                          parentId: 1252523599903072261,
                          users: [],
                          id: '1257948555810025473',
                          hasChildren: false
                        }
                      ],
                      id: '1252523599903072261',
                      hasChildren: false
                    }
                  ],
                  id: '1258213117681528834',
                  hasChildren: false
                },
                {
                  orgId: '1258213837629616129',
                  orgName: '华为事业部',
                  parentId: '1252523599903072259',
                  users: [{ workNo: '0004', name: 'ce1231', userId: '1258306363451518977' }],
                  children: [
                    {
                      orgId: '1258332067669024769',
                      orgName: 'GTS软件',
                      parentId: 1258213837629616129,
                      users: [],
                      id: '1258332067669024769',
                      hasChildren: false
                    }
                  ],
                  id: '1258213837629616129',
                  hasChildren: false
                }
              ],
              id: '1252523599903072259',
              hasChildren: false
            }
          ],
          id: '1252523599903072257',
          hasChildren: false
        }
      ],
      resMsg: '操作成功'
    }
  })
  //获取用户标签
  Mock.mock(new RegExp('/api/user/v1/user/tag/define' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 5; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          name: '@cname',
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
        totalNum: 5,
        totalPage: 5,
        data: list
      }
    }
  })
}
