<template>
  <div
    id="staff-status"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">员工状态</span>
    </div>
    <div class="info-content no-back-color">
      <el-form
        :model="staffInfo"
        label-width="150px"
        class="info-form"
        size="small"
      >
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="工作性质:">
              <span class="info-item-value">{{ getWorkProperty(staffInfo.workProperty) }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="员工状态:">
              <span class="info-item-value">{{ getStatus() }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="入职日期:">
              <span class="info-item-value">{{ staffInfo.entryDate }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="试用期:">
              <span class="info-item-value">{{ staffInfo.probation }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :justify="'center'">
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item label="转正日期:">
              <span class="info-item-value">{{ staffInfo.formalDate }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item label="司龄:">
              <span class="info-item-value">{{ getWorkTime() }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      WorkProperty: [],
      staffInfo: {}
    }
  },

  watch: {
    info: {
      handler(val) {
        this.staffInfo = val
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      this.WorkProperty = res
    })
  },
  methods: {
    getWorkProperty(type) {
      let typeWord
      this.WorkProperty.forEach((item) => {
        if (item.dictKey === type) {
          typeWord = item.dictValue
        }
      })
      return typeWord
    },
    getWorkTime() {
      let workAge = ''
      if (this.staffInfo.entryDate) {
        //计算司龄
        let fomatToMS = new Date().getTime() - new Date(this.staffInfo.entryDate).getTime()
        let dayToMS = 1000 * 60 * 60 * 24
        let totalDay = fomatToMS / dayToMS
        let year = Math.floor(totalDay / 365)
        let month = Math.floor((totalDay % 365) / 30)
        // let day = Math.floor(totalDay % 365 % 30)
        workAge = '' + year + '年' + month + '月'
        workAge = workAge.replace(/-/g, '')
      }
      return workAge
    },
    getStatus() {
      if (this.staffInfo.status == 'Try') {
        return '试用期'
      } else if (this.staffInfo.status == 'Formal') {
        return '正式'
      } else if (this.staffInfo.status == 'Leaved') {
        return '已离职'
      } else {
        return '待离职'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
