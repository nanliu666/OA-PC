<template>
    <div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        width="30%"
      >
        <span>
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
          >
            <el-form-item label="公司名称">
              <el-input
                v-model="form.name"
                placeholder="placeholder"
              />
            </el-form-item>
            <el-form-item label="说明">
              <el-input
                v-model="form.userName"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="placeholder"
              />
            </el-form-item>
          </el-form>
        </span>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handleModity"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "orgDialog"
    }
</script>

<style scoped>

</style>
