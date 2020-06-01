<template>
  <div>
    <slot name="nav" />
    <div style="margin-top: 20px">
      <common-table
        style="width: 100%"
        :data="tableData"
        :page="page"
        :config="tableConfig"
        :columns="columns"
        :loading="loading"
        @page-size-change="sizeChange"
        @current-page-change="currentChange"
      >
        <template slot="topMenu">
          <div class="topmenu lex-flow flex flex-justify-between flex-items">
            <div class="flex-flow flex flex-items">
              <!--                <el-input-->
              <!--                  v-model="form.name"-->
              <!--                  placeholder="姓名/工号"-->
              <!--                  size="medium"-->
              <!--                  class="input-with-select"-->
              <!--                >-->
              <!--                  <el-button-->
              <!--                    slot="append"-->
              <!--                    icon="el-icon-search"-->
              <!--                    @click="search"-->
              <!--                  />-->
              <!--                </el-input>-->
              <slot name="screen" />
            </div>
            <div>
              <slot name="refresh" />
            </div>
          </div>
        </template>
        <template
          slot="name"
          slot-scope="scope"
        >
          <el-link
            type="primary"
            @click="handleJumpDetail(scope.row)"
          >
            {{ scope.row.name }}
          </el-link>
        </template>
        <template
          slot="contractStatus"
          slot-scope="scope"
        >
          {{ scope.row.contractStatus | contractStatus }}
        </template>
        <template
          slot="status"
          slot-scope="scope"
        >
          {{ scope.row.status | status }}
        </template>
        <template
          slot="workProperty"
          slot-scope="scope"
        >
          {{ workProperty(scope.row.workProperty) }}
        </template>
        <template
          slot="contractType"
          slot-scope="scope"
        >
          {{ contractType(scope.row.contractType) }}
        </template>

        <template
          slot="handler"
          slot-scope="scope"
        >
          <slot
            name="operation"
            :row="scope.row"
          />
        </template>
      </common-table>
    </div>
  </div>
</template>

<script>
import mixin from '@/views/personnel/contract/components/mixin'
export default {
  name: 'Signed',
  filters: {
    contractStatus(data) {
      let status = {
        UnExecute: '未执行',
        InExecute: '执行中',
        Expired: '已到期',
        UnSign: '未签订',
        Relieve: '已解除'
      }
      return status[data] || ''
    },
    status(data) {
      // Try-试用期，Formal-正式，Leaved-已离职，WaitLeave-待离职
      let status = {
        Try: '试用期',
        Formal: '正式',
        Leaved: '已离职',
        WaitLeave: '待离职'
      }
      return status[data] || ''
    }
  },
  mixins: [mixin],
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    },
    pages: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      data: [],
      WorkProperty: [],
      ContractType: []
    }
  },
  watch: {
    pages: {
      handler: function(val) {
        this.page = val
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
      this.WorkProperty = res
    })
    this.$store.dispatch('CommonDict', 'ContractType').then((res) => {
      this.ContractType = res
    })
  },
  methods: {
    handleJumpDetail(row) {
      this.$router.push('/personnel/detail/' + row.userId)
    },
    contractType(data) {
      let value = ''
      this.ContractType.map((it) => {
        if (it.dictKey === data) {
          value = it.dictValue
        }
      })
      return value
    },
    workProperty(data) {
      let value = ''
      this.WorkProperty.map((it) => {
        if (it.dictKey === data) {
          value = it.dictValue
        }
      })
      return value
    },
    sizeChange(size) {
      this.$emit('sizeChange', size)
    },
    currentChange(current) {
      this.$emit('currentChange', current)
    },
    handleRenewal() {},
    handleEdit() {}
  }
}
</script>

<style lang="scss" scoped>
.nav {
  /*height: 36px;*/
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  line-height: 16px;
  padding: 0px 20px;
  margin-top: 8px;
  background: #edf8ff;
  border: 1px solid #73b9ff;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  /*span {*/
  /*  line-height: 20px;*/
  /*}*/
}
.topmenu {
  position: relative;
  width: 100%;
}
</style>
