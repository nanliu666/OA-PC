/* eslint-disable no-console */

const totalNum = _.random(11, 99)
const totalPage = Math.ceil(totalNum / 10)

// 解析查询字符串
const urlDecode = (url) =>
  _.fromPairs(
    _.replace(url, /^[^?]*\?/, '')
      .split('&')
      .map((p) => p.split('=').map((p) => decodeURIComponent(p)))
  )

import Mock from 'mockjs'
const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}
const processListData = {
  ...normalData,
  response: [
    {
      id: 0,
      name: '人事审批',
      sort: 1,
      processes: [
        {
          processId: '1',
          processName: '入职申请',
          sort: 1,
          icon: 'approval-invitation-bicolor',
          remark: '这里是入职申请的简介这里是入职申请的简介这里是入职申请的简介',
          visibleRange: 'all'
        },
        {
          processId: '2',
          processName: '转正申请',
          sort: 1,
          icon: 'approval-checkin-bicolor',
          remark: '',
          visibleRange: 'all'
        },
        {
          processId: '3',
          processName: '离职申请',
          sort: 1,
          icon: 'approval-leaveoffice-bicolor',
          remark: '这里是离职申请的简介',
          visibleRange: 'all'
        }
      ]
    },
    {
      id: 1,
      name: '业务审批',
      sort: 1,
      processes: [
        {
          processId: '1',
          processName: '入职申请',
          sort: 1,
          icon: 'approval-invitation-bicolor',
          remark: '这里是入职申请的简介这里是入职申请的简介这里是入职申请的简介',
          visibleRange: 'all'
        }
      ]
    },
    {
      id: 2,
      name: '行政审批',
      sort: 1,
      processes: [
        {
          processId: '1',
          processName: '入职申请',
          sort: 1,
          icon: 'approval-invitation-bicolor',
          remark: '这里是入职申请的简介这里是入职申请的简介这里是入职申请的简介',
          visibleRange: 'all'
        }
      ]
    },
    {
      id: 3,
      name: '财务审批',
      sort: 1,
      processes: [
        {
          processId: '1',
          processName: '入职申请',
          sort: 1,
          icon: 'approval-invitation-bicolor',
          remark: '这里是入职申请的简介这里是入职申请的简介这里是入职申请的简介',
          visibleRange: 'all'
        }
      ]
    },
    {
      id: 30,
      name: '考勤审批',
      sort: 1,
      processes: [
        // {
        //   processId: '1',
        //   processName: '入职申请',
        //   sort: 1,
        //   icon: 1,
        //   remark: '这里是入职申请的简介',
        //   visibleRange: 'all'
        // }
      ]
    }
  ]
}
const categoryData = {
  ...normalData
}
const draftData = {
  ...normalData,
  response: [
    {
      id: 30,
      name: '未启用',
      sort: 1,
      processes: [
        {
          processId: '1',
          processName: '用印申请',
          status: 0,
          icon: 'approval-Seal-bicolor',
          remark: '这里是入职申请的简介',
          visibleRange: 'all'
        },
        {
          processId: '1',
          processName: '调岗申请',
          status: 1,
          icon: 'approval-Seal-bicolor',
          remark: '这里是入职申请的简介',
          visibleRange: 'all'
        }
      ]
    }
  ]
}
const groupData = {
  ...normalData,
  response: [
    {
      id: 1,
      name: '人事审批',
      sort: 1
    },
    {
      id: 30,
      name: '考勤审批',
      sort: 1
    }
  ]
}
export default ({ mock }) => {
  if (!mock) return
  // v2版本接口
  // 审批列表查询，调用接口：审批流程列表查询接口【GET /appr/v2/appr/process/list】
  Mock.mock(new RegExp('/api/appr/v2/appr/process/list' + '.*'), 'get', () => {
    return processListData
  })
  // 审批分组新建接口
  Mock.mock(new RegExp('/api/appr/v2/appr/category' + '.*'), 'post', () => {
    return categoryData
  })
  // 审批分组修改接口
  Mock.mock(new RegExp('/api/appr/v2/appr/category' + '.*'), 'put', () => {
    return categoryData
  })
  // 审批分组删除接口
  Mock.mock(new RegExp('/api/appr/v2/appr/category' + '.*'), 'delete', () => {
    return categoryData
  })
  // 审批流程删除接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/del' + '.*'), 'delete', () => {
    return categoryData
  })
  // 审批流程停用接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/stop' + '.*'), 'post', () => {
    return categoryData
  })
  // 未启用审批流程列表查询接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/draft/list' + '.*'), 'get', () => {
    return draftData
  })
  // 审批分组查询接口
  Mock.mock(new RegExp('/api/appr/v2/appr/category' + '.*'), 'get', () => {
    return groupData
  })
  // 审批流程移动接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/move' + '.*'), 'post', () => {
    return categoryData
  })
  // 审批流程启用接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/start' + '.*'), 'post', () => {
    return categoryData
  })
  // 审批流程启用接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/release' + '.*'), 'post', () => {
    return categoryData
  })
  // 审批分组排序接口
  Mock.mock(new RegExp('/api/appr/v2/appr/category/sort' + '.*'), 'post', () => {
    return categoryData
  })
  // 审批流程排序接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/sort' + '.*'), 'post', () => {
    return categoryData
  })
  Mock.mock(new RegExp('/api/appr/v2/appr/process' + '.*'), 'get', () => {
    return {
      ...normalData,
      response: Mock.mock({
        processId: '123',
        processName: '用印申请',
        baseJson: `{
          "basicSetting":{
              "flowName":"入职",
              "flowImg":0,
              "flowGroup":2,
              "flowRemark":"简单入职背景填写"
          },
          "processData":{
              "type":"start",
              "content":"所有人",
              "properties":{
                  "title":"发起人",
                  "initiator":"ALL"
              },
              "nodeId":"Gb2",
              "childNode":{
                  "type":"approver",
                  "content":"张三",
                  "properties":{
                      "title":"审批人",
                      "approvers":[
                          {
                              "nodeId":20,
                              "userId":"1252523599903072258_1262998215033409537",
                              "userName":"游荣昌"
                          }],
                      "assigneeType":"user",
                      "counterSign":true,
                      "optionalMultiUser":true,
                      "optionalRange":"ALL"
                  },
                  "nodeId":"Wb2",
                  "prevId":"Gb2",
                  "childNode":{
                      "type":"copy",
                      "content":"xxx研发部",
                      "properties":{
                          "title":"抄送人",
                          "optionalMultiUser":true,
                          "menbers":[],
                          "userOptional":true
                      },
                      "nodeId":"Yb2",
                      "prevId":"Wb2",
                      "childNode":{
                          "type":"approver",
                          "content":"发起人自选",
                          "properties":{
                              "title":"审批人",
                              "assigneeType":"optional",
                              "counterSign":true,
                              "optionalMultiUser":false,
                              "optionalRange":"ALL"
                          },
                          "nodeId":"Nb2",
                          "prevId":"Yb2"
                      }
                  }
              }
          },
          "formData":{
              "fields":[
                  {
                      "__config__":{
                          "name":"单行文本",
                          "label":"姓名",
                          "type":"input",
                          "layout":"colFormItem",
                          "icon":"icon-basics-textfield-outlined",
                          "shouldPrint":true,
                          "required":true,
                          "formId":1,
                          "renderKey":1594631430990,
                          "defaultValue":""
                      },
                      "__slot__":{
                      },
                      "__pc__":{
                          "span":24,
                          "tag":"el-input",
                          "props":{
                          }
                      },
                      "__mobile__":{
                          "tag":"van-field",
                          "renderType":"input",
                          "props":{
                          }
                      },
                      "placeholder":"请输入",
                      "maxlength":20,
                      "__vModel__":"field1"
                  },
                  {
                      "__config__":{
                          "name":"多行文本",
                          "label":"备注",
                          "type":"textarea",
                          "layout":"colFormItem",
                          "icon":"icon-basics-mtext-outlined",
                          "shouldPrint":true,
                          "required":true,
                          "formId":2,
                          "renderKey":1594631431915
                      },
                      "__slot__":{
                      },
                      "__pc__":{
                          "span":24,
                          "tag":"el-input",
                          "props":{
                              "type":"textarea",
                              "rows":"2"
                          }
                      },
                      "__mobile__":{
                          "renderType":"textarea",
                          "tag":"van-field",
                          "props":{
                              "autosize":true,
                              "type":"textarea"
                          }
                      },
                      "placeholder":"请输入",
                      "maxlength":200,
                      "__vModel__":"field2"
                  },
                  {
                      "__config__":{
                          "name":"说明",
                          "type":"desc",
                          "layout":"colFormItem",
                          "icon":"icon-basics-explain-outlined",
                          "shouldPrint":true,
                          "formId":3,
                          "renderKey":1594631432943
                      },
                      "__slot__":{
                      },
                      "__pc__":{
                          "span":24,
                          "tag":"div",
                          "props":{
                          }
                      },
                      "__mobile__":{
                          "renderType":"desc",
                          "tag":"tips",
                          "props":{
                          }
                      },
                      "placeholder":"hello"
                  },
                  {
                      "__config__":{
                          "name":"数字",
                          "label":"年龄",
                          "type":"number",
                          "layout":"colFormItem",
                          "icon":"icon-basics-digit-outlined",
                          "shouldPrint":true,
                          "required":true,
                          "formId":4,
                          "renderKey":1594631433763
                      },
                      "__slot__":{
                      },
                      "__pc__":{
                          "span":12,
                          "tag":"el-input-number",
                          "props":{
                              "controls-position":"right"
                          }
                      },
                      "__mobile__":{
                          "renderType":"input",
                          "tag":"van-field",
                          "props":{
                              "type":"number"
                          }
                      },
                      "placeholder":"请输入",
                      "__vModel__":"field4"
                  },
                  {
                      "__config__":{
                          "name":"单选",
                          "label":"单选",
                          "type":"radio",
                          "icon":"icon-basics-radio-outlined",
                          "defaultValue":2,
                          "layout":"colFormItem",
                          "required":true,
                          "shouldPrint":true,
                          "formId":5,
                          "renderKey":1594631434747
                      },
                      "__slot__":{
                          "options":[
                              {
                                  "label":"选项一",
                                  "value":1
                              },
                              {
                                  "label":"选项二",
                                  "value":2
                              }]
                      },
                      "__pc__":{
                          "span":12,
                          "tag":"el-radio-group",
                          "props":{
                              "size":"medium"
                          },
                          "style":{
                              "width":"100%"
                          }
                      },
                      "__mobile__":{
                          "renderType":"select",
                          "tag":"van-field-select-picker",
                          "props":{
                          }
                      },
                      "placeholder":"请选择",
                      "__vModel__":"field5"
                  },
                  {
                      "__config__":{
                          "name":"多选",
                          "label":"多选",
                          "type":"checkbox",
                          "icon":"icon-basics-checkbox-outlined",
                          "defaultValue":[
                          ],
                          "layout":"colFormItem",
                          "shouldPrint":true,
                          "required":true,
                          "formId":6,
                          "renderKey":1594631435830
                      },
                      "__slot__":{
                          "options":[
                              {
                                  "label":"选项一",
                                  "value":1
                              },
                              {
                                  "label":"选项二",
                                  "value":2
                              },
                              {
                                  "label":"选项三",
                                  "value":"选项三"
                              }]
                      },
                      "__pc__":{
                          "span":12,
                          "tag":"el-checkbox-group",
                          "style":{
                              "width":"100%"
                          },
                          "props":{
                          }
                      },
                      "__mobile__":{
                          "renderType":"select",
                          "tag":"multi-picker",
                          "props":{
                          }
                      },
                      "placeholder":"请选择",
                      "__vModel__":"field6"
                  },
                  {
                      "__config__":{
                          "name":"日期",
                          "label":"日期",
                          "type":"date",
                          "icon":"icon-basics-date-outlined",
                          "defaultValue":null,
                          "span":24,
                          "layout":"colFormItem",
                          "shouldPrint":true,
                          "required":true,
                          "formId":7,
                          "renderKey":1594631437841
                      },
                      "__slot__":{
                      },
                      "__pc__":{
                          "span":12,
                          "tag":"el-date-picker",
                          "props":{
                              "type":"date",
                              "format":"yyyy-MM-dd",
                              "value-format":"yyyy-MM-dd"
                          },
                          "style":{
                              "width":"100%"
                          }
                      },
                      "__mobile__":{
                          "renderType":"select",
                          "tag":"van-field-datetime-picker",
                          "props":{
                              "pickerType":"date",
                              "props":{
                              }
                          }
                      },
                      "placeholder":"请选择",
                      "__vModel__":"field7"
                  },
                  {
                      "__config__":{
                          "name":"日期区间",
                          "label":"日期区间",
                          "type":"daterange",
                          "icon":"icon-basics-daterange-outlined",
                          "layout":"colFormItem",
                          "defaultValue":[
                          ],
                          "shouldPrint":true,
                          "required":true,
                          "formId":8,
                          "renderKey":1594631438922
                      },
                      "__slot__":{
                      },
                      "__pc__":{
                          "span":12,
                          "tag":"el-date-picker",
                          "props":{
                              "type":"daterange",
                              "range-separator":"至",
                              "start-placeholder":"开始日期",
                              "end-placeholder":"结束日期",
                              "format":"yyyy-MM-dd",
                              "value-format":"yyyy-MM-dd"
                          },
                          "style":{
                              "width":"100%"
                          }
                      },
                      "__mobile__":{
                          "renderType":"daterange",
                          "noLabel":true,
                          "tag":"date-range-picker",
                          "props":{
                              "pickerType":"date",
                              "startLabel":"开始时间",
                              "endLabel":"结束时间",
                              "placeholder":"请选择",
                              "autoCalc":true
                          }
                      },
                      "__vModel__":"field8"
                  }]
          },
          "advancedSetting":{
              "autoRepeat":true,
              "myAuditAutoPass":true,
              "remarkTip":"这里是填写提示",
              "remarkRequired":true,
              "notVisibleForSponsor":true
          }
      }`
      })
    }
  })

  // 审批记录列表
  Mock.mock(new RegExp('/appr/v2/appr/approve/record/list' + '.*'), 'get', (req) => {
    const { pageNo } = urlDecode(req.url)

    const response = {
      totalNum,
      totalPage,
      data: _.times(pageNo < totalPage ? 10 : totalNum % 10, () =>
        Mock.mock({
          apprNo: '@id()',
          title: '@ctitle()',
          formKey: '@id()',
          formId: '@id()',
          orgId: '@id()',
          orgName: '@cword(4)',
          userId: '@id()',
          userName: '@cname()',
          jobId: '@id()',
          jobName: '@cword()岗',
          processId: '@id()',
          processName: '@cword(2)流程',
          'status|1': ['Approve', 'Pass', 'Reject', 'Cancel'],
          applyTime: '@datetime()',
          completeTime: '@datetime()',
          approveUser: _.times(_.random(3), () => ({
            userId: '@id()',
            userName: '@cname()'
          }))
        })
      )
    }
    const res = {
      resCode: 200,
      resMsg: '成功',
      response
    }
    window.console.debug(`${req.type} ${req.url}`, { req, res })
    return res
  })
}
