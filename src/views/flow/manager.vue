<template>
  <basic-container>
    <avue-crud :option="option"
               :data="data"
               ref="crud"
               v-model="form"
               :page="page"
               :permission="permissionList"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   v-if="permission.flow_manager_remove"
                   plain
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text"
                   size="small"
                   v-if="permission.flow_manager_state"
                   plain
                   class="none-border"
                   @click.stop="handleState(scope.row,scope.index)">变更状态
        </el-button>
        <el-button type="text"
                   size="small"
                   v-if="permission.flow_manager_image"
                   plain
                   class="none-border"
                   @click.stop="handleImage(scope.row,scope.index)">流程图
        </el-button>
        <el-button type="text"
                   size="small"
                   v-if="permission.flow_manager_remove"
                   plain
                   class="none-border"
                   @click.stop="handleSlotDelete(scope.row,scope.index)">删除
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
    <el-dialog title="流程变更"
               :visible.sync="stateBox"
               width="20%">
      <el-form :model="form"
               ref="form"
               label-width="80px">
        <el-form-item label="流程状态">
          <el-select v-model="flowState" placeholder="请选择" value="">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="stateBox = false">关 闭</el-button>
        <el-button type="primary"
                   @click="handleDoState">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {managerList, changeState, deleteDeployment} from "@/api/flow/flow";
  import {mapGetters} from "vuex";

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
        stateBox: false,
        flowState: '',
        stateOptions: [{
          value: 'active',
          label: '激活'
        }, {
          value: 'suspend',
          label: '挂起'
        }],
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
              label: '流程主键',
              prop: 'id',
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
      permissionList() {
        return {
          delBtn: this.vaildData(this.permission.flow_manager_remove, false),
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      },
      deploymentIds() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.deploymentId);
        });
        return ids.join(",");
      }
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
      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return deleteDeployment(this.deploymentIds);
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
            this.onLoad(this.page);
          });
      },
      handleSlotDelete(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return deleteDeployment(row.deploymentId);
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
            this.onLoad(this.page);
          });
      },
      handleState(row) {
        this.stateBox = true;
        this.selectionId = row.id;
      },
      handleDoState() {
        if (!this.flowState) {
          this.$message({
            type: "warn",
            message: "请先选择流程状态!"
          });
          return;
        }
        changeState({processId: this.selectionId, state: this.flowState}).then(res => {
          const data = res.data;
          if (data.success) {
            this.$message({
              type: "success",
              message: data.msg
            });
            this.stateBox = false;
            this.onLoad(this.page);
          } else {
            this.$message({
              type: "warn",
              message: data.msg
            });
          }
        })
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
        managerList(page.currentPage, page.pageSize, values).then(res => {
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
