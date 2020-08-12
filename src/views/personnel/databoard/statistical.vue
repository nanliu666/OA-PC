<template>
  <div class="Statistical">
    <Layout :tab.sync="tabPane">
      <template #search>
        <el-form
          ref="form"
          inline
          :model="searchParams"
        >
          <el-form-item v-show="tabPane !== 'recruitment'">
            <i
              slot="label"
              class="icon-basics-organization-outlined"
            />
            <ElTreeSelect
              ref="orgTree"
              v-model="searchParams_orgId"
              :select-params="treeSelectConfig.selectParams"
              :tree-params="treeSelectConfig.treeParams"
            />
          </el-form-item>
          <el-form-item v-show="tabPane !== 'staff'">
            <i class="icon-basics-date-outlined bold" />
            <el-date-picker
              v-model="searchParams_qryMonth"
              type="month"
              placeholder="选择月"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              size="medium"
              type="primary"
              @click="() => handleSearch(searchParams)"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </template>
      <template
        v-if="loaded"
        #main
      >
        <StatisticalPane
          v-show="tabPane === 'statistical'"
          ref="statistical"
        />
        <RecruitmentPane
          v-show="tabPane === 'recruitment'"
          ref="recruitment"
        />
        <StaffPane
          v-show="tabPane === 'staff'"
          ref="staff"
        />
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from './components/Layout'
import moment from 'moment'
import StatisticalPane from './components/StatisticalPane' // 统计概况
import RecruitmentPane from './components/RecruitmentPane' // 招聘概况
import StaffPane from './components/StaffPane' // 员工概况
import ElTreeSelect from '@/components/elTreeSelect/elTreeSelect'
import { getOrgTreeSimple } from '@/api/org/org'

// pane 枚举类型
const TAB_PANE_ENUMS = {
  statistical: 'statistical',
  staff: 'staff',
  recruitment: 'recruitment'
}
const TAB_ACTIVE_DEFAULT = TAB_PANE_ENUMS.staff

const TREE_SELECT_CONFIG = {
  selectParams: {
    placeholder: '请选择部门',
    multiple: false
  },
  treeParams: {
    data: [],
    'check-strictly': true,
    'default-expand-all': false,
    'expand-on-click-node': false,
    clickParent: true,
    filterable: false,
    props: {
      children: 'children',
      label: 'orgName',
      disabled: 'disabled',
      value: 'orgId'
    }
  }
}

export default {
  name: 'Statistical',
  components: {
    StatisticalPane,
    RecruitmentPane,
    StaffPane,
    ElTreeSelect,
    Layout
  },
  data() {
    return {
      loaded: false, // 没有参数的时候不能进行查询，用一个变量进行标记
      loading: false,
      tabPane: TAB_ACTIVE_DEFAULT,
      searchParams: {},
      treeSelectConfig: _.cloneDeep(TREE_SELECT_CONFIG)
    }
  },
  provide() {
    return {
      searchParams: this.searchParams
    }
  },
  computed: {
    searchParams_orgId: {
      get() {
        return this.searchParams.orgId || null
      },
      set(val) {
        this.$set(this.searchParams, 'orgId', val)
      }
    },
    searchParams_qryMonth: {
      get() {
        return this.searchParams.qryMonth || null
      },
      set(val) {
        this.$set(this.searchParams, 'qryMonth', val)
      }
    }
  },
  watch: {
    tabPane() {
      this.refresh()
    }
  },
  created() {
    getOrgTreeSimple({ parentOrgId: '0' }).then((res) => {
      this.treeSelectConfig.treeParams.data = res
      // 默认选中第一个(百利宏)
      this.searchParams_orgId = _.get(res, '[0].orgId', null)
      // 将日期设置为当前月
      this.searchParams_qryMonth = moment().format('YYYY-MM')
      this.loaded = true
      this.$nextTick(() => this.refresh())
    })
  },
  methods: {
    handleSearch(searchParams) {
      this.searchParams = _.pickBy(searchParams)
      this.loaded = false
      // TODO: hack, refresh
      this.$nextTick(() => (this.loaded = true))
    },

    refresh() {
      this.refreshByPane(this.tabPane)
    },

    refreshByPane(pane) {
      if (_.isNil(this.$refs[pane])) {
        return
      }
      // 用于控制pane的数据更新事件
      this.$refs[pane].refresh()
    }
  }
}
</script>

<style lang="sass">
.Statistical
  i.bold
    font-weight: bold
  .icon-basics-date-outlined
    margin-left: 3rem
    margin-right: 1rem
  .container__charts
    margin-top: 2rem
</style>
