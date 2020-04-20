<template>
  <div>
    <el-dialog
      title="新建职位"
      :visible.sync="dialogVisible"
      width="550px"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <div>
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          label-position="top"
          size="small"
        >
          <el-form-item label="职位名称">
            <el-input
              v-model="form.name"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="请输入职位名称"
            />
          </el-form-item>
          <el-form-item label="职位类别">
            <el-select
              v-model="form.positionType"
              style="width: 100%"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属组织">
            <el-input
              v-model="filterText"
              placeholder="输入关键字进行过滤"
            />
            <el-tree
              ref="tree"
              :data="datas"
              :props="props"
              show-checkbox
              check-strictly
              node-key="orgId"
              :filter-node-method="filterNode"
              :default-checked-keys="treechecked"
            />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.exprot"   type="textarea"
                      :autosize="{ minRows: 2, maxRows: 5 }" placeholder="描述"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="medium"
          @click="dialogVisible = false"
        >确 定</el-button>
        <el-button
          size="medium"
          @click="dialogVisible = false"
        >取 消</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script>
  const options =  [{
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶'
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }]
    export default {
        name: "PositionDialog",
      props: {

        dialogVisible:{
          type: Boolean,
        },
        visible: {
          type: Boolean,
          default: false
        },
        treechecked: {
          type: Array,
          default: function () {
              return []
          }
        }
      },
      data(){
          return {
            filterText: '',
            datas: [{
              id: 1,
              label: '一级 2',
              children: [{
                id: 3,
                label: '二级 2-1',
                children: [{
                  id: 4,
                  label: '三级 3-1-1'
                }, {
                  id: 5,
                  label: '三级 3-1-2',
                }]
              }, {
                id: 2,
                label: '二级 2-2',
                children: [{
                  id: 6,
                  label: '三级 3-2-1'
                }, {
                  id: 7,
                  label: '三级 3-2-2',
                }]
              }]
            }],
            props: {
              children: 'children',
              label: 'label'
            },
            dialog: '',
            form: {},
            options
          }
      },
      watch:{
        dialogVisible:{
          handler:function(){
            this.$emit('update:dialogVisible', this.dialogVisible)

          },
          deep:true//对象内部的属性监听，也叫深度监听
        },
        filterText(val) {
          this.$refs.tree.filter(val)
        }
      },
      methods:{
        filterNode(value, data) {
          if (!value) return true
          return data.label.indexOf(value) !== -1
        },
        handleClose(){
          this.dialogVisible = false

        }
      }
    }
</script>

<style scoped>
  /deep/ .el-dialog__header{
    padding: 16px 0;
    margin: 0 24px;
     border-bottom: 1px solid rgba(208,211,214,0.44);
    font-size: 18px;
    color: #202940;
    line-height: 24px;
  }
  /deep/ .el-dialog__body{
    padding:24px;
  }
  /deep/.el-dialog__footer{
    padding: 0px 24px 24px
  }
  /deep/.el-form-item__label{
    line-height: 20px;
    font-size: 14px;
    color: #0F0000;
    }
  /deep/ .el-form-item{
    margin-bottom: 24px;
  }
</style>
