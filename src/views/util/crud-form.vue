<template>
  <basic-container>
    <h3>点击新增或编辑跳转到新的页面</h3>
    <avue-crud
      :option="option"
      :data="data"
    >
      <template slot="menuLeft">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleForm()"
        >
          add
        </el-button>
      </template>
      <template
        slot="menu"
        slot-scope="{ row }"
      >
        <el-button
          size="small"
          type="text"
          icon="el-icon-edit"
          @click="handleForm(row.id)"
        >
          edit
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
export default {
  data() {
    return {
      option: {
        addBtn: false,
        editBtn: false,
        column: [
          {
            label: '姓名',
            prop: 'name'
          }
        ]
      },
      data: [
        {
          id: 1,
          name: 'small'
        }
      ]
    }
  },
  methods: {
    handleForm(id) {
      this.$router.push({
        path: '/form-detail/index',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style></style>
