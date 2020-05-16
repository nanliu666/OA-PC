<template>
  <div style="height: 100%">
    <div class="header">
      <div>登记表详情</div>
    </div>
    <div class="person">
      <div class="name">
        张琪
      </div>
      <div class="flex flex-flow flex-justify-between">
        <div class="person_position flex flex-items flex-flow">
          <div>
            ucd部门
          </div>
          <div>ue设计师</div>
          <div>
            面试中
          </div>
        </div>
        <div class="icon">
          <span> <i class="el-icon-download" />下载</span>
          <span><i class="el-icon-printer" />打印</span>
        </div>
      </div>
    </div>
    <div />
    <div />
  </div>
</template>

<script>
export default {
  name: 'RegistrationForm'
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #202940;
  line-height: 28px;
  font-weight: bold;
  margin-top: 14px;
}
.person {
  background: #ffffff;
  border-radius: 4px;
  border-radius: 4px;
  height: 102px;
  padding: 24px;
  box-sizing: border-box;
  .name {
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #333333;
    line-height: 30px;
  }
  .person_position {
    font-size: 14px;
    color: #757c85;
    line-height: 20px;
    div:nth-child(2) {
      margin: 0 16px 0 12px;
    }
    div:nth-child(3) {
      background: rgba(113, 129, 153, 0.1);
      border-radius: 4px;
      padding: 3px 10px;
    }
  }
  .icon {
    span:nth-child(1) {
      margin-right: 24px;
      font-size: 14px;
      color: #757c85;
    }
    span:nth-child(2) {
      font-size: 14px;
      color: #757c85;
    }
    i {
      color: #757c85;
      font-weight: 800;
      margin-right: 4px;
    }
  }
}
</style>
