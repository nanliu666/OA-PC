export default {
  start: {
    type: 'start',
    content: '所有人',
    properties: { title: '发起人', initiator: 'ALL' }
  },
  approver: {
    type: 'approver',
    content: '请设置审批人',
    properties: { title: '审批人' }
  },
  copy: {
    type: 'copy',
    content: '请设置抄送人',
    properties: {
      title: '抄送人',
      members: [],
      userOptional: true
    }
  },
  condition: {
    type: 'condition',
    content: '请设置条件',
    properties: { title: '条件', conditions: [], initiator: null }
  },
  parallel: {
    type: 'parallel',
    type2: 'parallel',
    content: '请设置审批人',
    properties: { title: '审批人' }
  },
  branch: { type: 'branch', content: '', properties: {} },
  empty: { type: 'empty', content: '', properties: {} }
}
