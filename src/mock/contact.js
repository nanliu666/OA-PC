import Mock from 'mockjs'

const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}
const json = {
  ...normalData,
  response: {
    totalNum: 1,
    totalPage: 1,
    data: [
      {
        userId: '用户ID',
        workNo: '工号',
        name: '真实姓名',
        status: '员工状态，Try-试用期，Formal-正式，Leaved-已离职，WaitLeave-待离职',
        phonenum: '手机号码',
        companyId: '入职公司ID',
        companyName: '入职公司名称',
        orgId: '主部门ID',
        orgName: '主部门名称',
        jobId: '主职位Id',
        jobName: '主职位名称',
        positionId: '岗位ID',
        positionName: '岗位名称',
        entryDate: '入职日期，YYYY-MM-DD',
        workProperty: '工作性质，字典组：WorkProperty',
        contractId: '合同ID',
        contractName: '合同公司',
        contractCode: '合同编码',
        contractType: '合同类型，字典组：ContractType',
        contractPeriod: '合同期限，单位：年',
        contractStatus: '合同状态，UnExecute-未执行，InExecute-执行中',
        beginContractDate: '合同开始日期',
        endContractDate: '合同结束日期',
        signDate: '签订合同日期',
        signNum: '签订次数',
        relieveDate: '解除合同日期'
      }
    ]
  }
}
const success = {
  ...normalData,
  response: {}
}
export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/user/v1/user/contract/signed' + '.*'), 'post', () => {
    return json
  })
  Mock.mock(new RegExp('/user/v1/user/contract/info' + '.*'), 'post', () => {
    return success
  })
}
