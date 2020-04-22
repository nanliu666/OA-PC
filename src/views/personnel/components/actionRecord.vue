<template>
  <div class="steps-bos">
    <basic-container>
      <el-steps direction="vertical" :active="1" space="80px">
        <el-step
          :title="item.title"
          :description="item.date"
          v-for="(item, index) in stepsData"
          :key="index"
        ></el-step>
      </el-steps>
    </basic-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stepsData: [
        {
          title: '04-08 09:12:23',
          date: '李光洙  修改了张亮的合同信'
        },
        {
          title: '04-08 09:12:23',
          date: '李光洙  修改了张亮的合同信'
        },
        {
          title: '04-08 09:12:23',
          date: '李光洙  修改了张亮的合同信'
        },
        {
          title: '04-08 09:12:23',
          date: '李光洙  修改了张亮的合同信'
        },
        {
          title: '04-08 09:12:23',
          date: '李光洙  修改了张亮的合同信'
        },
        {
          title: '04-08 09:12:23',
          date: '李光洙  修改了张亮的合同信'
        },
        {
          title: '04-08 09:12:23',
          date: '李光洙  修改了张亮的合同信'
        },
        {
          title: '04-08 09:12:23',
          date: '李光洙  修改了张亮的合同信'
        }
      ]
    }
  },
  mounted() {
    ;[...document.querySelectorAll('.el-steps .el-step__icon div')].forEach((el, index, arr) => {
      console.log(el, arr.length - index) // 3,2,1
      el.innerHTML = arr.length - index
    })
  }
}
</script>
<style lang="scss" scoped>
.steps-bos {
  min-height: 300px;
}
// /deep/ .el-step__main {
//   display: flex;
//   width: 100%;
// }

// /deep/ .el-step__description {
//   line-height: 32px;
//   margin-left: 20px;
// }
</style>
