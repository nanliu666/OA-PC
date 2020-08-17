<template>
  <el-dialog
    :title="dialogOptions.dialogTitle"
    :visible="dialogOptions.dialogVisible"
    width="500px"
    append-to-body
    :before-close="close"
  >
    <el-form
      ref="ruleForm"
      class="login-form"
      status-icon
      :rules="rules"
      :model="form"
      label-width="0"
    >
      <el-form-item
        v-if="dialogOptions.dialogType === 'move' || dialogOptions.dialogType === 'enable'"
        prop="moveGroup"
      >
        <el-select
          v-model="form.moveValue"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in groupNameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-else
        prop="groupName"
      >
        <el-input
          v-model.trim="form.groupName"
          placeholder="请输入分组名称"
        />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="close"
      >
        取 消
      </el-button>
      <el-button
        v-loading="loading"
        size="medium"
        type="primary"
        @click="handleSubmit"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  addProcessCategory,
  renameProcessCategory,
  getCategoryList,
  moveProcess,
  startProcess
} from '@/api/apprProcess/apprProcess'

export default {
  name: 'ProcessDialog',
  props: {
    dialogOptions: {
      type: Object,
      default: function() {
        return {}
      }
    },
    subGroup: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      groupNameOptions: [],
      loading: false,
      messageText: '',
      form: {
        groupName: '',
        moveValue: ''
      },
      rules: {
        groupName: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
          { max: 20, message: '分组名称长度不能超过20', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initSetting()
  },
  methods: {
    /**
     * 初始化配置
     */
    initSetting() {
      // window.console.log('subGroup==', this.subGroup)
      if (JSON.stringify(this.subGroup) !== '{}') {
        this.form.groupName = this.subGroup.name
      }
      if (this.dialogOptions.dialogType === 'move' || this.dialogOptions.dialogType === 'enable') {
        this.getGroupList()
      }
    },
    /**
     * 获取审批分组列表
     */
    getGroupList() {
      getCategoryList().then((res) => {
        // window.console.log('审批分组数据==', res)
        res.map((item) => {
          this.groupNameOptions.push({
            value: item.id,
            label: item.name
          })
        })
      })
    },
    close() {
      this.dialogOptions.dialogVisible = false
      this.$emit('update:dialogOptions', this.dialogOptions)
    },
    /**
     * 新增操作
     */
    addNewGroup() {
      let parmas = { name: this.form.groupName }
      // window.console.log('parmas==', parmas)
      addProcessCategory(parmas).then(() => {
        this.messageText = `"${this.form.groupName}"分组创建成功`
        this.handleDataBack()
      })
    },
    /**
     * 重命名操作
     */
    renameGroup() {
      let parmas = {
        id: this.subGroup.id,
        name: this.form.groupName
      }
      // window.console.log('重命名parmas==', parmas)
      renameProcessCategory(parmas).then(() => {
        this.messageText = `重命名成功`
        this.handleDataBack()
      })
    },
    /**
     * 启用流程
     */
    enableGroup() {
      let tragetArray = this.groupNameOptions.filter((item) => {
        return this.form.moveValue === item.value
      })
      let parmas = {
        processId: this.subGroup.processes.processId,
        categoryId: tragetArray[0].value
      }
      // window.console.log('启用parmas==', parmas)
      startProcess(parmas).then(() => {
        // window.console.log('启用到==', res)
        this.messageText = `启用成功`
        this.handleDataBack()
      })
    },
    /**
     * 移动分组
     */
    moveGroup() {
      let tragetArray = this.groupNameOptions.filter((item) => {
        return this.form.moveValue === item.value
      })
      let parmas = {
        processId: this.subGroup.processes.processId,
        categoryId: tragetArray[0].value
      }
      moveProcess(parmas).then(() => {
        // window.console.log('移动到==', res)
        this.messageText = `移动分组成功`
        this.handleDataBack()
      })
    },
    /**
     * 接口返回后的相同处理步骤提取
     */
    handleDataBack() {
      this.$message.success(this.messageText)
      this.close()
      this.$emit('reloadData')
    },
    /**
     * 处理确认按钮
     */
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return
        switch (this.dialogOptions.dialogType) {
          case 'add':
            this.addNewGroup()
            break
          case 'rename':
            this.renameGroup()
            break
          case 'move':
            this.moveGroup()
            break
          case 'enable':
            this.enableGroup()
            break
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
