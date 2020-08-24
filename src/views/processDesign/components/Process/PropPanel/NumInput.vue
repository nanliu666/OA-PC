<template>
  <el-row :gutter="12">
    <el-col :span="isRange ? 24 : 12">
      <el-select
        v-model="cloneData.type"
        size="small"
        placeholder="请选择"
        style="width:100%;"
        @change="onTypeChange"
      >
        <el-option
          label="小于"
          value="lt"
        />
        <el-option
          label="小于等于"
          value="lte"
        />
        <el-option
          label="大于"
          value="gt"
        />
        <el-option
          label="大于等于"
          value="gte"
        />
        <el-option
          label="等于"
          value="eq"
        />
        <el-option
          label="介于两数之间"
          value="bet"
        />
      </el-select>
    </el-col>
    <el-col :span="isRange ? 24 : 12">
      <el-input-number
        v-if="!isRange"
        v-model="cloneData.value"
        size="small"
        style="width:100%;"
        controls-position="right"
        @change="update"
      />
      <div
        v-else
        style="width:100%;overflow:hidden;margin-top:10px;"
      >
        <el-col
          :span="7"
          style="padding-left:0;padding-right: 0"
        >
          <el-input-number
            v-model="cloneData.value[0]"
            size="small"
            controls-position="right"
            style="width:100%;"
            @change="update"
          />
        </el-col>
        <el-col
          :span="3"
          style="padding-left:0;padding-right: 0;position:relative; left: -5px"
        >
          <el-select
            v-model="cloneData.value[1]"
            size="small"
            placeholder="请选择"
            @change="update"
          >
            <el-option
              label="<"
              value="lt"
            />
            <el-option
              label="≤"
              value="lte"
            />
          </el-select>
        </el-col>
        <el-col
          :span="4"
          class="range-title"
          :title="title"
        >
          {{ title }}
        </el-col>
        <el-col :span="3">
          <el-select
            v-model="cloneData.value[2]"
            size="small"
            placeholder="请选择"
            @change="update"
          >
            <el-option
              label="<"
              value="lt"
            />
            <el-option
              label="≤"
              value="lte"
            />
          </el-select>
        </el-col>
        <el-col
          :span="7"
          style="padding-left:0;padding-right: 0"
        >
          <el-input-number
            v-model="cloneData.value[3]"
            size="small"
            controls-position="right"
            style="width:100%;"
            @change="update"
          />
        </el-col>
      </div>
    </el-col>
  </el-row>
</template>
<script>
// import RowWrapper from './RowWrapper'
export default {
  name: '',
  components: {
    // RowWrapper
  },
  model: {
    prop: 'value',
    event: 'update'
  },
  props: ['value', 'title'],
  data() {
    let cloneData = JSON.parse(JSON.stringify(this.value || {}))
    cloneData = Object.assign({ type: 'gt', value: null }, cloneData)
    return {
      cloneData
    }
  },
  computed: {
    isRange() {
      return this.cloneData.type === 'bet'
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    onTypeChange(newVal) {
      if (newVal === 'bet') {
        this.cloneData.value = [1, 'lt', 'lt', 2]
      } else {
        Array.isArray(this.cloneData.value) && (this.cloneData.value = 0)
      }
      this.update()
    },
    update() {
      this.$emit('update', this.cloneData)
    }
  }
}
</script>
<style lang="stylus" scoped>
// 三点省略 支持单行多行
// Mixin { n:Number } n：省略行数限制
ellipsis(n) {
  overflow: hidden;
  text-overflow: ellipsis;

  if (n > 1) {
    display: -webkit-box;
    -webkit-line-clamp: n;
    -webkit-box-orient: vertical;
  } else {
    white-space: nowrap;
  }
}

.cmp-container {
  line-height: 30px;
  padding: 10px;

  >>> .el-input--small .el-input__inner {
    padding-left: 10px;
    padding-right: 15px;
  }

  >>> .el-input-number.is-controls-right .el-input__inner {
    padding-left: 15px;
    padding-right: 0;
    text-align: left;
  }

  >>> .el-input:hover .el-input__inner {
    border-color: #529eff;
  }
}

.label {
  font-size: 12px;
  padding-right: 16px !important;
  ellipsis(2);
}

.range-title {
  font-size: 12px;
  text-align: center;
  ellipsis(1);
}

.icon-wrapper {
  i {
    cursor: pointer;
    color: #c5c5c5;

    &:hover {
      color: #333;
    }
  }
}
  /deep/ .el-input--suffix .el-input__inner{
    padding-right: 15px;
  }
</style>
