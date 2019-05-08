<template>
  <basic-container>
    <avue-crud :option="option"
               :data="data"
               ref="crud"
               v-model="form"
               :page="page"
               :permission="permissionList"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @on-load="onLoad">
    </avue-crud>
    <el-dialog title="流程删除"
               :visible.sync="followBox"
               width="20%">
      <el-form :model="form"
               ref="form"
               label-width="20px">
        <el-form-item label="删除理由">
          <el-input v-model="deleteReason"
                    placeholder="请输入删除理由"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="followBox = false">关 闭</el-button>
        <el-button type="primary"
                   @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {followList, deleteProcessInstance} from "@/api/flow/flow";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        form: {},
        selectionId: '',
        processInstanceId: '',
        selectionList: [],
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        followBox: false,
        deleteReason: '',
        option: {
          tip: false,
          border: true,
          index: true,
          selection: true,
          editBtn: false,
          addBtn: false,
          viewBtn: false,
          dialogWidth: 300,
          dialogHeight: 400,
          column: [
            {
              label: "执行id",
              prop: "executionId",
              search: true,
            },
            {
              label: "流程key",
              prop: "processDefinitionKey",
              search: true,
            },
            {
              label: "流程实例id",
              prop: "processInstanceId",
              search: true,
            },
            {
              label: "状态",
              prop: "suspensionState",
            },
            {
              label: "发起人",
              prop: "startUser",
            },
            {
              label: '开始时间',
              prop: 'startTime',
            },
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          delBtn: this.vaildData(this.permission.flow_follow_delete, false),
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    methods: {
      rowDel(row) {
        this.followBox = true;
        this.selectionId = row.id;
        this.processInstanceId = row.processInstanceId;
      },
      handleDelete() {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return deleteProcessInstance({deleteReason: this.deleteReason, processInstanceId: this.processInstanceId});
          })
          .then(() => {
            this.onLoad(this.page);
            this.followBox = false;
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      searchReset() {
        this.onLoad(this.page);
      },
      searchChange(params) {
        this.onLoad(this.page, params);
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      onLoad(page, params = {}) {
        followList(page.currentPage, page.pageSize, params).then(res => {
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
    background-color: transparent!important;
  }
</style>
