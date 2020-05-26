<template>
  <div style="height:100%;width: 100% ">
    <div class="header">
      <div>合同管理</div>
      <!--      <div>-->
      <!--        <el-button-->
      <!--          type="primary"-->
      <!--          size="medium"-->
      <!--        >-->
      <!--          批量导入-->
      <!--        </el-button>-->
      <!--      </div>-->
    </div>

    <div class="cntract">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="已签订合同"
          name="1"
        >
          <signed :table-data="signedData">
            <template slot="nav">
              <nav
                v-if="show"
                class="nav"
              >
                <span
                  class="flex flex-flow justify-content"
                  style="padding: 10px 0"
                >
                  <span><i
                    class="el-icon-warning"
                    style="font-size:16px;color:#EED30B;"
                  />到期提醒
                  </span>
                  <span class="flex flex-flow-column flex-items">
                    <span
                      class="flex flex-flow flex-items"
                    >：近2个月内共有 8 名员工合同即将到期
                      <el-link
                        style="margin:0 10px;"
                        type="primary"
                      >查看</el-link></span>
                  </span>
                </span>
                <!--        <span-->
                <!--          class="el-icon-close"-->
                <!--          style="color:#207EFA;font-size: 20px"-->
                <!--          @click="close"-->
                <!--        />-->
              </nav>
            </template>
            <template v-slot:screen>
              <SearchPopover
                ref="searchPopover"
                :require-options="searchConfig.requireOptions"
                :popover-options="searchConfig.popoverOptions"
                @submit="handleSubmit"
              />
            </template>
            <template
              slot="operation"
              slot-scope="scope"
            >
              <el-button
                type="text"
                size="medium"
                @click.stop="handleRenewal(scope.row, scope.index)"
              >
                续签
              </el-button>
              <el-button
                type="text"
                size="medium"
                @click.stop="handleEdit(scope.row, scope.index)"
              >
                编辑
              </el-button>
            </template>
          </signed>
        </el-tab-pane>
        <el-tab-pane
          label="待处理合同"
          name="2"
        >
          <signed :table-data="signedData">
            <template slot="nav">
              <nav
                v-if="show"
                class="nav"
              >
                <span
                  class="flex flex-flow justify-content"
                  style="padding: 10px 0"
                >
                  <span><i
                    class="el-icon-warning"
                    style="font-size:16px;color:#EED30B;"
                  />未续签提醒
                  </span>
                  <span class="flex flex-flow-column flex-items">
                    <span
                      class="flex flex-flow flex-items"
                    >：近2个月内共有 8 名员工合同即将到期
                      <el-link
                        style="margin:0 10px;"
                        type="primary"
                        @click="handleLook"
                      >查看</el-link></span>
                  </span>
                </span>
              </nav>
            </template>
            <template v-slot:screen>
              <SearchPopover
                ref="searchPopover"
                :require-options="searchConfig.requireOptions"
                :popover-options="searchConfig.popoverOptions"
                @submit="handleSubmit"
              />
            </template>
            <template
              slot="operation"
              slot-scope="scope"
            >
              <el-button
                type="text"
                size="medium"
                @click.stop="handleRenewal(scope.row, scope.index)"
              >
                续签
              </el-button>
              <el-button
                type="text"
                size="medium"
                @click.stop="handleEdit(scope.row, scope.index)"
              >
                编辑
              </el-button>
            </template>
          </signed>
        </el-tab-pane>
        <el-tab-pane
          label="合同签订记录"
          name="3"
        >
          <signed :table-data="signedData">
            <template v-slot:screen>
              <SearchPopover
                ref="searchPopover"
                :require-options="searchConfig.requireOptions"
                :popover-options="searchConfig.popoverOptions"
                @submit="handleSubmit"
              />
            </template>
          </signed>
        </el-tab-pane>
      </el-tabs>
      <div />
    </div>
  </div>
</template>

<script>
import mixin from './components/mixin'
import signed from '@/views/personnel/contract/components/signed'
import { postSigned } from '@/api/personnel/contart'
import SearchPopover from '@/components/searchPopOver/index'
export default {
  name: 'Cantract',
  components: {
    signed,
    SearchPopover
  },
  mixins: [mixin],
  data() {
    return {
      activeName: '1',
      form: {
        name: ''
      },
      searchConfig: {
        requireOptions: [
          {
            type: 'input',
            field: 'search',
            label: '',
            data: '',
            options: [],
            config: { placeholder: '姓名/邮箱/', 'suffix-icon': 'el-icon-search' }
          }
        ],
        popoverOptions: [
          {
            type: 'input',
            field: 'phonenum',
            label: '手机号码',
            data: '',
            options: [],
            config: { optionLabel: 'jobName', placeholder: '请输入手机号码' }
          },
          {
            type: 'treeSelect',
            field: 'orgId',
            label: '部门',
            data: '',
            config: {
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
          },
          {
            type: 'select',
            field: 'jobId',
            label: '职位',
            data: '',
            options: [],
            config: { optionLabel: 'jobName', optionValue: 'jobId' }
          },
          {
            type: 'select',
            field: 'workProperty',
            label: '工作性质',
            data: '',
            options: [],
            config: { optionLabel: 'jobName', optionValue: 'jobId' }
          },
          {
            type: 'select',
            field: 'status',
            label: '员工状态',
            data: '',
            options: [],
            config: { optionLabel: 'jobName', optionValue: 'jobId' }
          },
          {
            type: 'dataPicker',
            field: 'entryDate',
            label: '入职日期',
            data: '',
            options: [],
            config: { type: 'date' }
          },
          {
            type: 'input',
            field: 'contractCode',
            label: '合同编号',
            data: '',
            options: [],
            config: { optionLabel: 'jobName', placeholder: '请输入合同编号' }
          },
          {
            type: 'select',
            field: 'contractType',
            label: '合同类型',
            data: '',
            options: [],
            config: { optionLabel: 'jobName', optionValue: 'jobId' }
          },
          {
            type: 'dataPicker',
            field: 'beginContractDate',
            label: '合同开始日期',
            data: '',
            options: [],
            config: { type: 'date' }
          },
          {
            type: 'dataPicker',
            field: 'endContractDate',
            label: '合同结束日期',
            data: '',
            options: [],
            config: { type: 'date' }
          },
          {
            type: 'input',
            field: 'signNum',
            label: '合同签订次数',
            data: '',
            options: [],
            config: { optionLabel: 'jobName', placeholder: '请输入合同签订次数' }
          }
        ]
      },
      signedData: [],
      selectionList: [],
      loading: false,
      isEdit: false,
      isShow: false,
      title: '',
      stationDialog: false,
      dialogVisible: false,
      isBatch: false,
      show: true,
      number: 0,
      row: {},
      data: [],
      params: {
        pageNo: 1,
        pageSize: 100,
        name: ''
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    /***
     * @author 关芬达
     * @desc 差看最近两个月过期合同
     *
     */
    handleLook() {},
    handleSreen() {
      this.isShow = !this.isShow
    },
    getData() {
      let params = {
        pageNo: 1,
        pageSize: 10,
        search: '',
        phonenum: '',
        orgs: [
          {
            orgId: ''
          }
        ],
        jobs: [
          {
            jobId: ''
          }
        ],
        workProperties: [
          {
            workProperty: ''
          }
        ],
        statuses: [
          {
            status: ''
          }
        ],
        beginEntryDate: '',
        endEntryDate: '',
        contractCode: '',
        contracTypes: [
          {
            contracType: ''
          }
        ],
        beginBeginDate: '',
        endBeginDate: '',
        beginEndDate: '',
        endEndDate: '',
        signNum: ''
      }
      postSigned(params).then((res) => {
        // console.log(res)
        this.signedData = res.data
      })
    },
    search() {},
    handleClick() {},
    handleSubmit() {},
    handleRenewal() {},
    handleEdit() {}
  }
}
</script>

<style lang="scss" scoped>
.avue-view {
  height: auto;
}
.cntract {
  position: relative;
  margin-top: 16px;
  background: #ffffff;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 24px !important;
  min-height: calc(100% - 204px);
  .form_ {
    padding-top: 40px;
    width: 400px;
    margin: 0 auto;
    font-size: 14px;
    .label_ {
      /*display: inline-block;*/
      /*margin-top:24px;*/
      /*margin-bottom:8px;*/
    }
    .tip {
      font-size: 12px;
      line-height: 14px;
      color: #a0a8ae;
    }
    .bt {
      /*margin-top: 40px;*/
    }
  }
}
.aside {
  width: 200px;
  border-right: 1px solid #efefef;
  height: 100%;
  box-sizing: border-box;
  margin-right: 20px;
  margin-top: 20px;
  ul {
    list-style: none;
    padding: 0 10px;
    margin-top: 10px;
    line-height: 34px;
    li {
      cursor: pointer;
    }
    li:not(.selection) {
      line-height: 34px;
      font-size: 14px;
      padding-left: 30px;
    }
    .selection {
      .icon {
        display: inline-block;
        margin: 0 6px 0 6px;
        font-size: 18px;
      }
    }
    .actives {
      border-right: 4px solid #1e9fff;
      background: #efefef;
    }
  }
}
.header {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #202940;
  line-height: 28px;
  font-weight: bold;
  margin-top: 14px;
}
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
.aside_header {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin: 0 10px 0px 10px;
  padding-bottom: 10px;
  font-size: 18px;
  border-bottom: 1px solid #efefef;
  /*line-height: 40px;*/
}
.flex {
  display: flex;
  display: -ms-flex;
  display: -moz-box;
  display: -webkit-flex;
}
.flex-flow {
  flex-flow: row nowrap;
}
.flex-flow-column {
  flex-flow: column nowrap;
}

.justify-content {
  justify-content: space-between;
}
.align-items {
  align-items: center;
}

.input-with-select {
  width: 250px;
}
.condition {
  margin: 20px 0 10px 0;
}

.all {
  /*border: 1px solid #efefef;*/
  cursor: pointer;
  padding: 10px;
  span:first-child {
    border-right: 1px solid #999;
    padding-right: 15px;
  }
  span {
    margin-right: 20px;
  }
}

/deep/ .el-card__body {
  padding-bottom: 0 !important;
}

/deep/ .avue-crud__menu {
  min-height: 0;
}
</style>
