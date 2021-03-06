<template>
  <el-dialog
    title="添加交接事项"
    :visible="visible"
    width="600px"
    append-to-body
    :before-close="close"
    custom-class="category-edit-dialog"
  >
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      :rules="rules"
      size="medium"
    >
      <el-form-item
        label="交接事项分类"
        prop="categoryName"
      >
        <el-input v-model="form.categoryName" />
      </el-form-item>
      <el-form-item
        label="事项分组"
        prop="groupId"
      >
        <el-select
          v-model="form.groupId"
          v-loading="groupLoading"
          placeholder="请选择"
        >
          <el-option
            v-for="item in groupList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <i
          v-if="!groupLoading && groupList.length === 0"
          class="el-icon-circle-plus-outline"
          @click="addGroup"
        />
      </el-form-item>
      <el-form-item
        label="交接事项明细"
        prop="details"
      >
        <div
          v-for="item in form.details"
          :key="item.detailId"
          class="detail-row"
        >
          <el-input
            v-model="item.detailName"
            class="detail-input"
          />
          <i
            class="el-icon-delete"
            @click="deleteDetail(item)"
          />
        </div>
        <el-button
          type="text"
          size="medium"
          @click="addDetail()"
        >
          添加明细
        </el-button>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="medium"
        @click="close"
      >取 消</el-button>
      <el-button
        :loading="loading"
        size="medium"
        type="primary"
        @click="handleSubmit"
      >
        确 定
      </el-button>
    </span>
    <group-edit-dialog
      ref="groupEditDialog"
      :visible.sync="groupEditVisible"
      @submit="handleSubmitGroup"
    />
  </el-dialog>
</template>
<script>
import { createResignCategory, modifyResignCategory } from '@/api/personnel/settings'
import { createUniqueID } from '@/util/util'
import { mapGetters } from 'vuex'

export default {
  name: 'CategoryEditDialog',
  components: {
    groupEditDialog: () => import('./groupEditDialog')
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    groupList: {
      type: Array,
      default: () => []
    },
    groupLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        categoryId: null,
        categoryName: '',
        groupId: null,
        details: [
          { detailName: '', detailId: createUniqueID() },
          { detailName: '', detailId: createUniqueID() },
          { detailName: '', detailId: createUniqueID() }
        ]
      },
      rules: {
        categoryName: [{ required: true, message: '请输入分类名称', trigger: 'input' }],
        groupId: [{ required: true, message: '请输入分组', trigger: 'change' }],
        details: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.filterEmptyDetail(value).length === 0) {
                callback(new Error('请至少输入一条交接事项明细'))
              } else {
                callback()
              }
            },
            trigger: 'input'
          }
        ]
      },
      oldDetails: [],
      loading: false,
      groupEditVisible: false
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  methods: {
    addGroup() {
      this.groupEditVisible = true
    },
    close() {
      this.clear()
      this.$emit('update:visible', false)
    },
    clear() {
      this.form = this.$options.data().form
      this.$refs['form'].clearValidate()
    },
    init(data) {
      Object.assign(this.form, data)
      data.details && (this.oldDetails = data.details.slice())
      this.$emit('update:visible', true)
    },
    handleSubmitGroup(id) {
      if (id) {
        this.form.groupId = id
      }
      this.$emit('refresh-group')
    },
    handleSubmit() {
      let submitFunc,
        params,
        form = this.form
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        if (form.categoryId) {
          submitFunc = modifyResignCategory
          params = {
            categoryName: form.categoryName,
            categoryId: form.categoryId,
            groupId: form.groupId,
            details: this.diff(
              this.filterEmptyDetail(form.details),
              this.filterEmptyDetail(this.oldDetails)
            )
          }
        } else {
          submitFunc = createResignCategory
          params = {
            name: form.categoryName,
            groupId: form.groupId,
            details: this.filterEmptyDetail(form.details).map((detail) => detail.detailName)
          }
        }
        this.loading = true
        submitFunc(params)
          .then(() => {
            this.$message.success('提交成功')
            this.$emit('submit', this.form.groupId)
            this.close()
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    filterEmptyDetail(details = []) {
      return details.filter((item) => item.detailName !== '')
    },
    /**
     * 比较新旧list，新增,减少的数据分别添加标识
     * @param {Object} newDetilList
     * @param {Object} oldDetailList
     */
    diff(newDetailList, oldDetailList) {
      // 要添加的
      const addList = this._.differenceBy(newDetailList, oldDetailList, 'detailId')
      // 要删除的
      const removeList = this._.differenceBy(oldDetailList, newDetailList, 'detailId')

      const result = addList
        .map((item) => ({
          detailName: item.detailName,
          operatorType: 'Add'
        }))
        .concat(
          removeList.map((item) => ({
            detailId: item.detailId,
            detailName: item.detailName,
            operatorType: 'Del'
          }))
        )
      return result
    },
    deleteDetail(item) {
      this.form.details = this.form.details.filter((i) => i.detailId !== item.detailId)
    },
    addDetail() {
      this.form.details.push({ detailName: '', detailId: createUniqueID() })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.category-edit-dialog {
  .el-dialog__body {
    padding: 24px;
  }
  .el-dialog__footer {
    padding: 0 24px 24px;
  }
  .el-dialog__header {
    padding: 24px 24px 10px;
  }
  .el-input {
    width: calc(100% - 28px);
    margin-right: 14px;
  }
  .el-select {
    width: calc(100% - 28px);
    margin-right: 14px;
    .el-input {
      width: 100%;
      margin-right: 0;
    }
  }
  i {
    cursor: pointer;
  }
  .detail-row {
    margin-bottom: 14px;
  }
}
</style>
