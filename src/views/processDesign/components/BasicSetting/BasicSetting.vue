<template>
  <div class="setting-container">
    <commonForm
      ref="elForm"
      :model="formData"
      :columns="info"
    >
      <div slot="initiator">
        <fc-org-select
          ref="org-select"
          v-model="formData.initiator"
          title="发起人"
          :all="all"
          :org="org"
          @change="emitInitiator"
        />
      </div>
      <div slot="icon">
        <img
          :src="activeIconSrc"
          style="width: 28px;height: 28px;vertical-align: middle;"
        >
        <el-button
          plain
          size="mini"
          style="margin-left: 10px;"
          @click="dialogVisible = true"
        >
          选择图标
        </el-button>
      </div>
    </commonForm>
    <el-dialog
      title="选择图标"
      :visible.sync="dialogVisible"
      width="612px"
    >
      <img
        v-for="(icon, index) in iconList"
        :key="index"
        :src="icon.src"
        class="icon-item"
        :class="{ active: selectedIcon === icon.id }"
        @click="selectedIcon = icon.id"
      >
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click=";(dialogVisible = false), (selectedIcon = activeIcon)"
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click=";(dialogVisible = false), (activeIcon = selectedIcon)"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { info } from './config'
import { getApprCategory, getConfigAdmin } from '@/api/processDesign/basicSetting'

export default {
  components: {},
  props: ['tabName', 'initiator', 'conf'],
  data() {
    const req = require.context('@/assets/approverIcon', false, /\.png$/)
    const iconList = req.keys().map((t, idx) => ({ src: req(t), id: idx }))
    return {
      info,
      all: true, //显示所有人
      org: true, //可以选择部门
      infoForm: {},
      dialogVisible: false,
      activeIcon: iconList[0].id,
      selectedIcon: iconList[0].id,
      formData: {
        icon: '',
        processName: '',
        categoryId: '',
        processAdmin: [],
        remark: '',
        initiator: []
      },
      rules: {
        flowName: [
          {
            required: true,
            message: '请输入审批名称',
            trigger: 'blur'
          }
        ],
        flowGroup: [
          {
            required: true,
            message: '请选择选择分组',
            trigger: 'change'
          }
        ]
      },
      iconList,
      flowGroupOptions: [
        {
          label: '假勤管理',
          value: 1
        },
        {
          label: '人事管理',
          value: 2
        },
        {
          label: '财务管理',
          value: 3
        },
        {
          label: '业务管理',
          value: 4
        },
        {
          label: '行政管理',
          value: 5
        },
        {
          label: '法务管理',
          value: 6
        },
        {
          label: '其他',
          value: 7
        }
      ]
    }
  },
  computed: {
    activeIconSrc() {
      const icon = this.iconList.find((t) => t.id === this.activeIcon)
      return icon ? icon.src : ''
    }
  },
  watch: {
    initiator: {
      handler(val) {
        this.formData.initiator = val || []
      },
      immediate: true
    },
    activeIcon: {
      handler() {
        this.formData.icon = this.activeIconSrc
      },
      immediate: true
    },
    formData: {
      handler() {},
      immediate: true
    },
    conf: {
      handler() {
        if (typeof this.conf === 'object' && this.conf !== null) {
          Object.assign(this.formData, this.conf)
          !Array.isArray(this.formData.processAdmin) &&
            (this.formData.processAdmin = [this.formData.processAdmin])
        }
      },
      deep: true
    }
  },
  created() {
    if (typeof this.conf === 'object' && this.conf !== null) {
      Object.assign(this.formData, this.conf)
    }
  },
  mounted() {
    this.getCategory()
    this.getAdmin()
  },
  methods: {
    /**
     *  author guanfenda
     *  @desc 获取管理员列表
     * */
    getAdmin() {
      let params = {}
      getConfigAdmin(params).then((res) => {
        this.info.find((it) => it.prop === 'processAdmin').options = res
      })
    },
    /**
     *  author fuanfenda
     *  @desc 获取分类列表
     * */
    getCategory() {
      let params = {
        name: ''
      }
      getApprCategory(params).then((res) => {
        this.info.find((it) => it.prop === 'categoryId').options = res
      })
    },
    emitInitiator(data) {
      this.$nextTick(() => {
        this.formData.initiator = data
        this.$emit(
          'initiatorChange',
          this.formData.initiator,
          this.$refs['org-select'].selectedLabels
        )
      })
    },
    // 给父级页面提供得获取本页数据得方法
    getData() {
      return new Promise((resolve, reject) => {
        this.$refs['elForm']
          .validate()
          .then((valid) => {
            if (!valid) {
              reject({ target: this.tabName })
              return
            }
            // this.formData.icon = this.activeIcon
            resolve({ formData: this.formData, target: this.tabName }) // TODO 提交表单
          })
          .catch(() => {
            this.$emit('jump', 'basicSetting')
          })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.icon-item{
  width 40px
  height 40px
  margin: 6px;
  position relative
  cursor pointer
  opacity .5

  &.active{
    opacity 1
  }
  &:hover{
    opacity 1
  }
}

.setting-container{
  width: 600px;
  height: 100%;
  margin: auto;
  background: white;
  padding: 16px;

  >>>.el-form--label-top .el-form-item__label{
    padding-bottom: 0;
  }
}
</style>
