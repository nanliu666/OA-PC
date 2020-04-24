<template>
  <basic-container>
    <el-page-header
      content="添加员工"
      @back="goBack"
    />
    <el-row
      type="flex"
      justify="center"
    >
      <el-col :span="14">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          label-position="top"
          :rules="rules"
          inline
        >
          <el-col :span="24">
            <h4>基本信息</h4>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="姓名"
              prop="name"
            >
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio
                  label="男"
                  value="1"
                />
                <el-radio
                  label="女"
                  value="0"
                />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="手机号"
              prop="phonenum"
            >
              <el-input v-model.number="form.phonenum" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="邮箱"
              prop="email"
            >
              <el-input v-model="form.email" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <h4>入职信息</h4>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="入职日期"
              class="entryDate"
              prop="entryDate"
            >
              <el-date-picker
                v-model="form.entryDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="试用期">
              <el-select
                v-model="form.probation"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in [1, 2, 3, 4, 5, 6]"
                  :key="item"
                  :label="item + '个月'"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="合同公司"
              prop="contractName"
            >
              <el-select
                v-model="form.contractName"
                placeholder="请选择"
              >
                <el-option
                  label="1个月"
                  value="1"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="工号"
              prop="userId"
            >
              <el-input v-model="form.userId">
                <template slot="append">
                  <div @click="autoUserId">
                    自动生成
                  </div>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="部门"
              prop="orgId"
            >
              <el-select
                v-model="form.orgId"
                placeholder="请选择"
              >
                <el-option
                  label="1个月"
                  value="1"
                />
              </el-select>
              <div style="height: 0px">
                <i class="el-icon-plus" />添加附属部门及职位
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="职位"
              prop="jobId"
            >
              <el-select
                v-model="form.jobId"
                placeholder="请选择"
              >
                <el-option
                  label="1个月"
                  value="1"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位">
              <el-select
                v-model="form.positionId"
                placeholder="请选择"
              >
                <el-option
                  label="1个月"
                  value="1"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="工作性质"
              prop="workProperty"
            >
              <el-select
                v-model="form.workProperty"
                placeholder="请选择"
              >
                <el-option
                  label="全职"
                  value="1"
                />
                <el-option
                  label="实习生"
                  value="2"
                />
                <el-option
                  label="兼职"
                  value="3"
                />
                <el-option
                  label="劳务派遣"
                  value="4"
                />
                <el-option
                  label="退休返聘"
                  value="5"
                />
                <el-option
                  label="劳务外包"
                  value="6"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="员工状态"
              prop="status"
            >
              <el-select
                v-model="form.status"
                placeholder="请选择"
              >
                <el-option
                  label="试用期"
                  value="Try"
                />
                <el-option
                  label="正式"
                  value="Formal"
                />
                <el-option
                  label="已离职"
                  value="Leaved"
                />
                <el-option
                  label="待离职"
                  value="WaitLeave"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作地址">
              <el-select
                ref="workAddressId"
                v-model="form.workAddressId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in workAddress"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="workOption"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span class="optionRight">
                    <i class="el-icon-error" />
                  </span>
                  <span class="optionRight">
                    <i class="el-icon-edit-outline" />
                  </span>
                </el-option>
                <div
                  class="newAddress"
                  @click="createAddress"
                >
                  <i class="el-icon-plus" /> 新建工作地址
                </div>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="工作城市">
              <el-cascader
                v-model="form.workProvinceCode"
                :options="options"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button size="medium">
                保存并继续添加
              </el-button>
              <el-button
                type="primary"
                size="medium"
                @click="onSubmit"
              >
                保存
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog
      title="新建工作地址"
      :visible.sync="dialogTableVisible"
      :modal-append-to-body="false"
      custom-class="dialogClass"
    >
      <el-form
        :model="workAddressForm"
        label-width="80px"
        label-position="top"
        class="dialogForm"
        :rules="workAddressRules"
      >
        <el-form-item
          label="工作地址"
          prop="address"
        >
          <el-cascader
            v-model="workAddressForm.address"
            :options="options"
          />
        </el-form-item>
        <el-form-item
          label="工作地址"
          prop="detail"
        >
          <el-input
            v-model="workAddressForm.detail"
            type="textarea"
            :rows="2"
            placeholder="请输入详细地址，例如街道名称、门牌号码、楼层和房间号等详细地址"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="medium"
          @click="dialogTableVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          size="medium"
          @click="dialogTableVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
export default {
  name: 'AddRoster',
  data() {
    var checkUserId = () => {}
    return {
      form: {
        name: '',
        sex: '',
        email: ''
      },
      workAddressForm: {},
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        entryDate: [{ required: true, message: '请输入入职日期', trigger: 'blur' }],
        contractName: [{ required: true, message: '请选择合同公司', trigger: 'change' }],
        phonenum: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' },
          { min: 11, max: 11, message: '长度必须为11位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        userId: [
          { required: true, message: '请输入工号', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' },
          { min: 4, max: 4, message: '长度必须为11位', trigger: 'blur' },
          { validator: checkUserId, trigger: 'change' }
        ],
        orgId: [{ required: true, message: '请选择部门', trigger: 'change' }],
        jobId: [{ required: true, message: '请选择职位', trigger: 'change' }],
        workProperty: [{ required: true, message: '请选择工作性质', trigger: 'change' }],
        status: [{ required: true, message: '请选择员工状态', trigger: 'change' }]
      },
      workAddressRules: {
        address: [{ required: true, message: '请选择地址', trigger: 'change' }]
      },
      options: [],
      workAddress: [],
      dialogTableVisible: false
    }
  },
  methods: {
    goBack() {
      this.$router.push({ path: '/personnel/roster' })
    },
    onSubmit() {},
    createAddress() {
      this.$refs.workAddressId.blur()
      this.dialogTableVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select-dropdown__list > .newAddress {
  text-align: center;
}
.el-col-12 {
  min-width: 250px;
}
.newAddress {
  font-size: 12px;
  margin-top: 10px;
  height: 30px;
  line-height: 30px;
  border-top: 1px solid rgb(242, 242, 242);
  cursor: pointer;
}
.workOption {
  .optionRight {
    float: right;
    padding: 0 10px 0 0 !important;
    // display: none;
  }
  &:hover {
    .optionRight {
      display: inline-block;
    }
  }
}
/deep/ .el-col {
  .el-form-item {
    .el-form-item__content {
      width: 250px;
      .el-select {
        width: 250px;
      }
      .el-cascader {
        width: 250px;
      }
      .el-input-group--append {
        .el-input__inner {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
        .el-input-group__append {
          background-color: #fff;
          border: 0;
          padding: 0 10px;
          color: cornflowerblue;
          cursor: pointer;
        }
      }
    }
  }
}
.dialogForm {
  .el-form-item {
    .el-form-item__content {
      .el-cascader {
        width: 100%;
      }
    }
  }
}
</style>
