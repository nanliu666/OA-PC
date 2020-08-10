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
              v-model="searchParams.orgId"
              :select-params="treeSelectConfig.selectParams"
              :tree-params="treeSelectConfig.treeParams"
            />
          </el-form-item>
          <el-form-item v-show="tabPane !== 'staff'">
            <i class="icon-basics-date-outlined bold" />
            <el-date-picker
              v-model="searchParams.qryMonth"
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
      <template #main>
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
import StatisticalPane from './components/StatisticalPane'
import RecruitmentPane from './components/RecruitmentPane'
import StaffPane from './components/StaffPane'
import ElTreeSelect from '@/components/elTreeSelect/elTreeSelect'
import { getOrgTreeSimple } from '@/api/org/org'

const TAB_PANE_ENUMS = {
  statistical: 'statistical',
  staff: 'staff',
  recruitment: 'recruitment'
}
// DEBUG: 当前页面置于员工概况
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
  filters: {
    labelFormatter(arr) {
      const sum = _.sumBy(arr, 'value')
      return _.map(arr, ({ name, value }) => ({
        value,
        name: `${name}:  ${value}人  ${_.round((100 * value) / sum, 2)}%`
      }))
    }
  },
  data() {
    return {
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
  computed: {},
  watch: {
    tabPane(tab) {
      this.$refs[tab].refresh()
    }
  },
  created() {
    getOrgTreeSimple({ parentOrgId: '0' }).then((res) => {
      this.treeSelectConfig.treeParams.data = res
      // 默认选中第一个(百利宏)
      this.$set(this.searchParams, 'orgId', _.get(res, '[0].orgId', null))
      // 将日期设置为当前月
      this.$set(this.searchParams, 'qryMonth', new Date(moment().format('YYYY-MM')))
      this.refresh()
    })
  },
  methods: {
    handleSearch(searchParams) {
      // TODO:
      this.searchParams = _.pickBy(searchParams)
      this.loadPaneData()
    },

    refresh() {
      this.refreshByPane(this.tabPane)
    },

    refreshByPane(pane) {
      if (_.isEmpty(this.$refs)) {
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
