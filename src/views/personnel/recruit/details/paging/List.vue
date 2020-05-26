<template>
  <div>
    <div class="roster-header">
      <el-row
        style="width:100%; height:50px"
        type="flex"
        justify="center"
        :gutter="24"
      >
        <el-col :span="6" />
        <el-col :span="6" /><el-col :span="6" /><el-col :span="6" />
      </el-row>
    </div>

    <basic-container />
  </div>
</template>
<script>
export default {
  name: 'RecruitList',
  data() {
    return {}
  },
  methods: {
    opnDetails() {
      this.$router.push('./recruitmentNeeds')
    }
  }
}
</script>
