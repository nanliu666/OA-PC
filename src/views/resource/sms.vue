<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.sms_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text"
                   icon="el-icon-check"
                   size="small"
                   v-if="permission.sms_enable"
                   @click.stop="handleEnable(scope.row)">启用
        </el-button>
      </template>
      <template slot-scope="{row}"
                slot="status">
        <el-tag>{{row.statusName}}</el-tag>
      </template>
      <template slot-scope="{row}"
                slot="category">
        <el-tag>{{row.categoryName}}</el-tag>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove, enable} from "@/api/resource/sms";
  import {mapGetters} from "vuex";
  import func from "@/util/func";

  export default {
    data() {
      return {
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          height: 'auto',
          calcHeight: 30,
          tip: false,
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          labelWidth: 100,
          dialogWidth: 880,
          column: [
            {
              label: "分类",
              type: "radio",
              value: 1,
              span: 24,
              width: 100,
              searchLabelWidth: 50,
              row: true,
              dicUrl: "/api/blade-system/dict/dictionary?code=sms",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              dataType: "number",
              slot: true,
              prop: "category",
              search: true,
              rules: [{
                required: true,
                message: "请选择分类",
                trigger: "blur"
              }]
            },
            {
              label: "资源编号",
              prop: "smsCode",
              span: 24,
              width: 200,
              search: true,
              rules: [{
                required: true,
                message: "请输入资源编号",
                trigger: "blur"
              }]
            },
            {
              label: "模版ID",
              prop: "templateId",
              span: 24,
              width: 200,
              search: true,
              rules: [{
                required: true,
                message: "请输入模版ID",
                trigger: "blur"
              }]
            },
            {
              label: "accessKey",
              prop: "accessKey",
              span: 24,
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入accessKey",
                trigger: "blur"
              }],
            },
            {
              label: "secretKey",
              prop: "secretKey",
              span: 24,
              overHidden: true,
              display: true,
              rules: [{
                required: true,
                message: "请输入secretKey",
                trigger: "blur"
              }],
            },
            {
              label: "regionId",
              prop: "regionId",
              span: 24,
              hide: true,
              display: false
            },
            {
              label: "短信签名",
              prop: "signName",
              span: 24,
              rules: [{
                required: true,
                message: "请输入短信签名",
                trigger: "blur"
              }],
            },
            {
              label: "是否启用",
              prop: "status",
              span: 24,
              width: 80,
              slot: true,
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
            },
            {
              label: "备注",
              prop: "remark",
              span: 24,
              hide: true
            },
          ]
        },
        data: []
      };
    },
    watch: {
      'form.category'() {
        const category = func.toInt(this.form.category);
        this.$refs.crud.option.column.filter(item => {
          if (item.prop === "templateId") {
            if (category === 1) {
              item.label = "模版内容";
            } else {
              item.label = "模版ID";
            }
          }
          if (item.prop === "accessKey") {
            if (category === 1) {
              item.label = "apiKey";
            } else if (category === 4) {
              item.label = "appId";
            } else {
              item.label = "accessKey";
            }
          }
          if (item.prop === "secretKey") {
            item.display = category !== 1;
            if (category === 4) {
              item.label = "appKey";
            } else {
              item.label = "secretKey";
            }
          }
          if (item.prop === "regionId") {
            item.display = category === 3;
          }
        });
      }
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.sms_add, false),
          viewBtn: this.vaildData(this.permission.sms_view, false),
          delBtn: this.vaildData(this.permission.sms_delete, false),
          editBtn: this.vaildData(this.permission.sms_edit, false)
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
      rowSave(row, loading, done) {
        add(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowUpdate(row, index, loading, done) {
        update(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      handleEnable(row) {
        this.$confirm("是否确定启用这条配置?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return enable(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
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
            return remove(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        done();
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.page.currentPage = 1;
        this.onLoad(this.page, params);
        done();
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      currentChange(currentPage) {
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }
    }
  };
</script>

