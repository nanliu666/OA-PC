<template>
  <div style="height: 100%">
    <div class="header">
      <div>职位类别</div>
      <div>
        <el-button
          type="primary"
          size="medium"
          @click="handlerAdd"
        >
          新建职位类别
        </el-button>
      </div>
    </div>
    <div class="person">
      <div>
        张琪
      </div>
      <div>
        <div>
          <div>
            ucd部门
          </div>
          <div>ue设计师</div>
          <div>
            面试中
          </div>
        </div>
        <div>
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
.dander {
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
</style>
