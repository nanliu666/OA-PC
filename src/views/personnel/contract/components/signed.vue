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
        @pageSizeChange="sizeChange"
        @currentPageChange="currentChange"
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
              <el-button
                type="primary"
                size="medium"
              >
                <i class="el-icon-refresh" />
              </el-button>
            </div>
          </div>
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
  mixins: [mixin],
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      data: []
    }
  },
  methods: {
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
