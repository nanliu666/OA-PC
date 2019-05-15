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
                   v-if="permission.work_todo_handle"
                   plain
                   class="none-border"
                   @click.stop="handleWork(scope.row)">处理
        </el-button>
        <el-button type="text"
                   size="small"
                   v-if="permission.work_todo_detail"
                   plain
                   class="none-border"
                   @click.stop="handleDetail(scope.row)">详情
        </el-button>
        <el-button type="text"
                   size="small"
                   v-if="permission.work_todo_follow"
                   plain
                   class="none-border"
                   @click.stop="handleImage(scope.row,scope.index)">跟踪
        </el-button>
      </template>
      <template slot-scope="{row}"
                slot="processDefinitionVersion">
        <el-tag>v{{row.processDefinitionVersion}}</el-tag>
      </template>
    </avue-crud>
    <el-dialog title="流程图"
               :visible.sync="flowBox"
               :fullscreen="true">
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
  import {mapGetters} from "vuex";
  import {todoList} from "@/api/work/work";
  import {flowCategory,flowRoute} from "@/util/flow";

  export default {
    data() {
      return {
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
              hide: true,
            },
            {
              label: '流程名称',
              prop: 'processDefinitionName',
            },
            {
              label: '当前步骤',
              prop: 'taskName',
            },
            {
              label: '流程版本',
              prop: 'processDefinitionVersion',
              slot: true,
            },
            {
              label: '申请时间',
              prop: 'createTime',
            },
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission", "flowRoutes"]),
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
      handleWork(row) {
        this.$router.push({ path: `/work/process/${flowRoute(this.flowRoutes, row.category)}/handle/${row.taskId}/${row.processInstanceId}/${row.businessId}` });
      },
      handleDetail(row) {
        this.$router.push({ path: `/work/process/${flowRoute(this.flowRoutes, row.category)}/detail/${row.processInstanceId}/${row.businessId}` });
      },
      handleImage(row) {
        this.flowUrl = `/api/blade-flow/process/diagram-view?processInstanceId=${row.processInstanceId}`;
        this.flowBox = true;
      },
      onLoad(page, params = {}) {
        const values = {
          ...params,
          category: (params.category) ? flowCategory(params.category) : null
        }
        todoList(page.currentPage, page.pageSize, values).then(res => {
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
