<template>
  <div class="appr-type-picker">
    <div
      class="appr-type-picker__input"
      @click="handlePick"
    >
      <div
        v-if="value.length === 0"
        class="appr-type-picker__placeholder"
      >
        请选择
      </div>
      <ul>
        <li
          v-for="item in value"
          :key="item.id"
        >
          <el-tag>{{ item.name }}</el-tag>
        </li>
      </ul>

      <i class="icon-arrow-right-outlined" />
    </div>
    <div class="appr-type-picker__tips">
      不选择则默认所有类型的审批单
    </div>
    <el-dialog
      title="请选择"
      append-to-body
      :visible="visible"
      custom-class="appr-type-picker-dialog"
      @close="handleCancel"
    >
      <div class="appr-type-picker-dialog__content">
        <div class="appr-type-picker-dialog__left">
          <div class="appr-type-picker-dialog__label">
            未选：
          </div>
          <el-input
            v-model="search"
            clearable
            placeholder="搜索审批名称"
            style="margin-bottom: 10px"
          />
          <el-tree
            ref="tree"
            :filter-node-method="filterNode"
            :data="processData"
            show-checkbox
            check-on-click-node
            node-key="id"
            :props="treeProps"
            @check="handleCheck"
          />
        </div>
        <div class="appr-type-picker-dialog__right">
          <div class="appr-type-picker-dialog__label">
            已选：
          </div>
          <ul>
            <li
              v-for="item in selected"
              :key="item.processId"
            >
              <span>{{ item.name }}</span>
              <i
                class="icon-tips-close-outlined"
                @click="handleUnSelect(item)"
              />
            </li>
          </ul>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="handleCancel"
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleSubmit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getProcessList } from '@/api/apprProcess/apprProcess'
export default {
  name: 'ApprTypePicker',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      selected: [],
      treeProps: {
        label: 'name',
        children: 'processes'
      },
      search: '',
      processData: []
    }
  },
  watch: {
    search(val) {
      this.$refs.tree.filter(val)
    },
    visible(val) {
      if (val === true) {
        this.init(this.value)
      }
    }
  },
  mounted() {
    this.getProcessList()
  },
  methods: {
    init(val) {
      this.selected = val
      setTimeout(() => {
        this.$refs.tree.setCheckedKeys(val.map((i) => i.id))
      })
    },
    getProcessList() {
      getProcessList().then((res) => {
        this.resolveTree(res)
        this.processData = res
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handleCheck(data, checked) {
      this.selected = checked.checkedNodes.filter((i) => !i.processes)
    },
    handleUnSelect(item) {
      this.selected = this.selected.filter((i) => i.id != item.id)
      this.$refs.tree.setCheckedKeys(this.selected.map((i) => i.id))
    },
    handleCancel() {
      this.$refs.tree.setCheckedKeys([])
      this.selected = []
      this.visible = false
    },
    handlePick() {
      this.visible = true
    },
    handleSubmit() {
      this.$emit('input', this.selected)
      this.visible = false
    },
    resolveTree(tree) {
      if (tree.length > 0) {
        tree.forEach((group) => {
          group.processes.forEach((item) => {
            item.name = item.processName
            item.id = item.processId
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.appr-type-picker {
  &__placeholder {
    padding-left: 15px;
    color: #a0a8ae;
  }
  &__tips {
    font-size: 12px;
  }
  &__input {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    display: flex;
    background-color: #fff;
    cursor: pointer;
    align-items: center;

    ul {
      flex: 1;
      padding: 2px 4px;
      max-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      li {
        display: inline-block;
        margin-right: 4px;
        margin-bottom: 2px;
        &:last-of-type {
          margin-right: 0px;
        }
      }
    }
    i {
      color: #757c85;
      padding-right: 4px;
    }
  }
}
</style>

<style lang="scss">
.appr-type-picker-dialog {
  .el-dialog__body {
    padding: 24px;
  }
  &__content {
    display: flex;
    max-height: 450px;
  }
  &__left {
    width: 55%;
    overflow: auto;
    padding-right: 10px;
  }
  &__right {
    width: 45%;
    padding-left: 10px;
    padding-right: 10px;
    overflow: auto;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        line-height: 32px;
        margin-bottom: 4px;
        &:last-of-type {
          margin-bottom: 0;
        }
        i {
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
