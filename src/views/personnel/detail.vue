<template>
  <basic-container>
    <el-page-header
      content="员工信息详情"
      @back="goBack"
    />
    <el-row
      class="el-name"
      :gutter="20"
    >
      <el-col :span="2">
        <div class="detail-box">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar
                :size="120"
                src
              />
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="22">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            刘德华(GZ878)
            <el-button
              type="primary"
              size="small"
              plain
            >
              正式
            </el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button
              type
              size="medium"
              plain
            >
              晋升
            </el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button
              type
              size="medium"
              plain
            >
              调岗
            </el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button
              type
              size="medium"
              plain
            >
              办理离职
            </el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            手机号码：13978955852
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            部门：设计小组
            <el-button
              type
              size="small"
              plain
            >
              主
            </el-button>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            职位：产品经理
            <el-button
              type
              size="small"
              plain
            >
              主
            </el-button>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            上级领导：陈晓晓
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            标签： 储备PM；正式PM
          </div>
        </el-col>
      </el-col>
    </el-row>
    <!--  -->
    <el-tabs
      v-model="activeName"
      :stretch="stretch"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="在职信息"
        name="first"
      >
        在职信息
      </el-tab-pane>
      <el-tab-pane
        label="个人信息"
        name="second"
      >
        个人信息
      </el-tab-pane>
      <el-tab-pane
        label="材料附件"
        name="third"
      >
        <upload-Data v-if="showTabUpload" />
      </el-tab-pane>
      <el-tab-pane
        label="操作记录"
        name="fourth"
      >
        <action-record v-if="showTabAction" />
      </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>
<script>
import actionRecord from './components/actionRecord'
import uploadData from './components/uploadData'
export default {
  components: {
    actionRecord,
    uploadData
  },
  data() {
    return {
      activeName: 'first',
      stretch: true,
      showTabUpload: false,
      showTabAction: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    handleClick(tab) {
      if (tab.name == 'third') {
        this.showTabUpload = true
        this.showTabAction = false
      } else if (tab.name == 'fourth') {
        this.showTabUpload = false
        this.showTabAction = true
      }
      // console.log(tab, event, 'tab')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-name {
  margin-top: 25px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
