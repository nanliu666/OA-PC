<template>
  <basic-container>
    <avue-crud :option="option"
               :data="data"
               ref="crud"
               v-model="form"
               :page="page"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @on-load="onLoad">
      <template slot-scope="scope" slot="menu">
        <el-button type="text"
                   size="small"
                   v-if="permission.work_start_flow"
                   plain
                   class="none-border"
                   @click.stop="handleStart(scope.row)">发起
        </el-button>
        <el-button type="text"
                   size="small"
                   v-if="permission.work_start_image"
                   plain
                   class="none-border"
                   @click.stop="handleImage(scope.row,scope.index)">流程图
        </el-button>
      </template>
      <template slot-scope="{row}"
                slot="version">
        <el-tag>v{{row.version}}</el-tag>
      </template>
      <template slot-scope="{row}"
                slot="suspensionState">
        <el-tag>{{row.suspensionState===1?'激活':'挂起'}}</el-tag>
      </template>
      <template slot-scope="{row}"
                slot="category">
        <el-tag>{{row.categoryName}}</el-tag>
      </template>
    </avue-crud>
    <el-dialog title="流程图"
               :visible.sync="flowBox"
               fullscreen=true>
      <iframe
        :src=flowUrl
        width="100%"
        height="700"
        title="流程图"
        frameBorder="no"
        border="0"
        marginWidth="0"
        marginHeight="0"
        scrolling="no"
        allowTransparency="yes">
      </iframe>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="flowBox = false">关 闭</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {startList} from "@/api/work/work";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        routes: {
          flow_1: 'leave',
          flow_2: 'expense',
        },
        form: {},
        selectionId: '',
        selectionList: [],
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        flowBox: false,
        flowUrl: '',
        workBox: false,
        option: {
          tip: false,
          border: true,
          index: true,
          selection: true,
          editBtn: false,
          addBtn: false,
          viewBtn: false,
          delBtn: false,
          dialogWidth: 300,
          dialogHeight: 400,
          column: [
            {
              label: "流程分类",
              type: "select",
              row: true,
              dicUrl: "/api/blade-system/dict/dictionary?code=flow",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              slot: true,
              prop: "category",
              search: true,
            },
            {
              label: '流程标识',
              prop: 'key',
            },
            {
              label: '流程名称',
              prop: 'name',
            },
            {
              label: '流程版本',
              prop: 'version',
              slot: true,
            },
            {
              label: '状态',
              prop: 'suspensionState',
              slot: true,
            },
            {
              label: '部署时间',
              prop: 'deploymentTime',
            },
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      },
    },
    methods: {
      searchReset() {
        this.onLoad(this.page);
      },
      searchChange(params) {
        this.onLoad(this.page, params);
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      handleStart(row) {
        this.$router.push({ path: `/work/process/${this.routes[row.category]}/form?id=${row.id}` });
      },
      handleImage(row) {
        this.flowUrl = `/api/blade-flow/process/resource-view?processDefinitionId=${row.id}`;
        this.flowBox = true;
      },
      onLoad(page, params = {}) {
        const values = {
          ...params,
          category: (params.category) ? `flow_${params.category}` : null
        }
        startList(page.currentPage, page.pageSize, values).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
        });
      }
    }
  };
</script>

<style>
  .none-border {
    border: 0;
    background-color: transparent !important;
  }
</style>
