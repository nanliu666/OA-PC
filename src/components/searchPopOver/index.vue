<template>
  <div>
    <el-form
      :inline="true"
      class="demo-form-inline"
    >
      <el-form-item
        v-for="item in requireOptions"
        :key="item.field"
        :label="item.label"
        :class="[item.type === 'treeSelect' ? 'treeSelect' : '', 'require-form-item']"
      >
        <el-input
          v-if="item.type === 'input'"
          v-model="item.data"
          :type="item.config && item.config.type ? item.config.type : 'text'"
          :placeholder="item.config.placeholder || '请输入' + item.label"
          :suffix-icon="item.config && item.config['suffix-icon']"
          class="elInput"
          @change="change"
        />
        <el-select
          v-if="item.type === 'select'"
          v-model="item.data"
          v-loadmore="() => item.loadMoreFun && item.loadMoreFun(item)"
          :placeholder="'请输入' + item.label"
          :multiple="item.config && item.config.multiple"
          :collapse-tags="item.config && item.config.multiple"
          @visible-change="item.firstLoad && item.firstLoad($event, item)"
          @change="change"
        >
          <template v-if="item.config && item.config.group">
            <el-option-group
              v-for="group in item.options"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="it in group.options"
                :key="it.value"
                :label="it[item.config.optionLabel || 'label']"
                :value="it[item.config.optionValue || 'value']"
              />
            </el-option-group>
          </template>
          <template v-else>
            <el-option
              v-for="it in item.options"
              :key="it[item.config.optionValue || 'value']"
              :label="it[item.config.optionLabel || 'label']"
              :value="it[item.config.optionValue || 'value']"
            />
          </template>
          <div
            v-show="item.loadMoreFun ? item.loading : false"
            class="addressLoading"
            style="text-align: center"
          >
            <i class="el-icon-loading" />
          </div>
          <div
            v-show="item.noMore"
            style="text-align: center; font-size:14px;color: #606266;"
          >
            没有更多了
          </div>
        </el-select>
        <el-time-select
          v-if="item.type === 'timeSelect'"
          v-model="item.data"
          placeholder="选择时间"
          @change="change"
        />
        <el-time-picker
          v-if="item.type === 'timePicker'"
          v-model="item.data"
          placeholder="选择时间"
          @change="change"
        />
        <el-cascader
          v-if="item.type === 'cascader'"
          v-model="item.data"
          :options="item.options"
        />
        <el-date-picker
          v-if="item.type === 'dataPicker'"
          v-model="item.data"
          :type="item.config && item.config.type ? item.config.type : 'date'"
          :value-format="
            item.config && item.config['value-format'] ? item.config['value-format'] : 'yyyy-MM-dd'
          "
          :default-time="item.config && item.config['default-time']"
          placeholder="结束时间"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          style="width:198px"
          :unlink-panels="true"
          @change="change"
        />
        <num-interval
          v-if="item.type === 'numInterval'"
          v-model="item.data"
        />
        <el-tree-select
          v-if="item.type === 'treeSelect'"
          :ref="item.field"
          v-model="item.data"
          :popover-class="item.config.fas"
          :styles="item.styles"
          :select-params="item.config.selectParams"
          :tree-params="item.config.treeParams"
          @change="change"
        />
        <!-- <tree-select
          v-if="item.type === 'treeSelect'"
          v-model="item.data"
          :option="item.options"
          :is-search="false"
          :is-single="item.isSingle || false"
          @change="change"
        />-->
      </el-form-item>
      <el-form-item
        v-if="popoverOptions.length === 0"
        class="require-form-item"
      >
        <el-button
          type="primary"
          size="medium"
          @click="submitSearch"
        >
          搜索
        </el-button>
      </el-form-item>
      <el-form-item
        v-else
        class="require-form-item"
      >
        <el-popover
          v-model="popoverShow"
          placement="bottom"
          trigger="click"
          popper-class="popover-class"
        >
          <div>
            <el-form
              size="small"
              class="demo-form-inline"
              label-position="top"
            >
              <el-row justify="start">
                <el-col
                  v-for="item in popoverOptions"
                  :key="item.field"
                  :span="8"
                >
                  <el-form-item :label="item.label">
                    <el-input
                      v-if="item.type === 'input'"
                      v-model="item.data"
                      :type="item.config && item.config.type ? item.config.type : 'text'"
                      :placeholder="
                        (item.config && item.config.placeholder) || '请输入' + item.label
                      "
                      :suffix-icon="item.config && item.config['suffix-icon']"
                      class="elInput"
                    />
                    <el-select
                      v-if="item.type === 'select'"
                      v-model="item.data"
                      v-loadmore="() => item.loadMoreFun && item.loadMoreFun(item)"
                      :placeholder="'请输入' + item.label"
                      :multiple="item.config && item.config.multiple"
                      :collapse-tags="item.config && item.config.multiple"
                      @visible-change="item.firstLoad && item.firstLoad($event, item)"
                    >
                      <template v-if="item.config && item.config.group">
                        <el-option-group
                          v-for="group in item.options"
                          :key="group.label"
                          :label="group.label"
                        >
                          <el-option
                            v-for="it in group.options"
                            :key="it.value"
                            :label="it[item.config.optionLabel || 'label']"
                            :value="it[item.config.optionValue || 'value']"
                          />
                        </el-option-group>
                      </template>
                      <template v-else>
                        <el-option
                          v-for="it in item.options"
                          :key="it[item.config.optionValue || 'value']"
                          :label="it[item.config.optionLabel || 'label']"
                          :value="it[item.config.optionValue || 'value']"
                        />
                      </template>
                      <div
                        v-show="item.loadMoreFun ? item.loading : false"
                        class="addressLoading"
                        style="text-align: center"
                      >
                        <i class="el-icon-loading" />
                      </div>
                      <div
                        v-show="item.noMore"
                        style="text-align: center; font-size:14px;color: #606266;"
                      >
                        没有更多了
                      </div>
                    </el-select>
                    <el-time-select
                      v-if="item.type === 'timeSelect'"
                      v-model="item.data"
                      placeholder="选择时间"
                    />
                    <el-time-picker
                      v-if="item.type === 'timePicker'"
                      v-model="item.data"
                      placeholder="选择时间"
                    />
                    <el-cascader
                      v-if="item.type === 'cascader'"
                      v-model="item.data"
                      :options="item.options"
                    />
                    <el-date-picker
                      v-if="item.type === 'dataPicker'"
                      v-model="item.data"
                      :value-format="
                        item.config && item.config['value-format']
                          ? item.config['value-format']
                          : 'yyyy-MM-dd'
                      "
                      :default-time="item.config && item.config['default-time']"
                      :type="item.config && item.config.type ? item.config.type : 'date'"
                      placeholder="结束时间"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      :unlink-panels="true"
                    />
                    <num-interval
                      v-if="item.type === 'numInterval'"
                      v-model="item.data"
                    />
                    <el-tree-select
                      v-if="item.type === 'treeSelect'"
                      :ref="item.field"
                      v-model="item.data"
                      :popover-class="item.config.fas"
                      :styles="item.styles"
                      :select-params="item.config.selectParams"
                      :tree-params="item.config.treeParams"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-col :span="24">
              <div class="popOver-footer">
                <el-button
                  type="primary"
                  size="medium"
                  @click="submitSearch"
                >
                  搜索
                </el-button>
                <el-button
                  size="medium"
                  @click="resetForm"
                >
                  重置
                </el-button>
              </div>
            </el-col>
          </div>
          <el-button
            slot="reference"
            type="primary"
            size="medium"
          >
            筛选
          </el-button>
        </el-popover>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import NumInterval from '../numInterval/numInterval'
// import TreeSelect from '../treeSelect/treeSelect'
import ElTreeSelect from '../elTreeSelect/elTreeSelect'

export default {
  name: 'SearchPopOver',
  components: { NumInterval, ElTreeSelect },
  props: {
    // 筛选弹窗外部
    requireOptions: {
      type: Array,
      default: () => {
        return [
          // {
          //   // 搜索组件
          //   type: 'input',
          //   data: '',
          //   // 搜索字段
          //   field: 'input',
          //   // 组件label
          //   label: '输入框',
          //   // 若有下属选择数据, 由此传入
          //   options: {},
          //   // 组件属性，请自行添加，注意筛选内外部一起添加，必须设置默认值
          //   config: {}
          // }
        ]
      }
    },
    // 筛选内部
    popoverOptions: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      tags: [],
      popoverShow: false
    }
  },
  watch: {
    requireOptions: {
      handler(newVal) {
        newVal.forEach((item) => {
          // items.forEach((item, idx) => {
          if (item.type === 'treeSelect') {
            this.$refs[item.field] &&
              this.$refs[item.field][0].treeDataUpdateFun(item.config.treeParams.data)
          }
          // })
        })
      },
      deep: true
    },
    popoverOptions: {
      handler(newVal) {
        newVal.forEach((item) => {
          // items.forEach((item, idx) => {
          if (item.type === 'treeSelect') {
            this.$refs[item.field] &&
              this.$refs[item.field][0].treeDataUpdateFun(item.config.treeParams.data)
          }
          // })
        })
      },
      deep: true
    },
    $route() {
      this.popoverShow = false
    }
  },
  methods: {
    // 筛选已有值的options
    screenValueArr(arr) {
      this.requireOptions.forEach((item) => {
        // items.forEach((item, idx) => {
        if (item.data) {
          if (Array.isArray(item.data) && item.data.length === 0) return
          if (item.type === 'numInterval') {
            if (!(item.data.min && item.data.max)) return
            arr.push(item)
          } else {
            arr.push(item)
          }
        }
        // })
      })
      this.popoverOptions.forEach((item) => {
        // items.forEach((item, idx) => {
        if (item.data) {
          if (Array.isArray(item.data) && item.data.length === 0) return
          if (item.type === 'numInterval') {
            if (!(item.data.min && item.data.max)) return
            arr.push(item)
          } else {
            arr.push(item)
          }
        }
        // })
      })
    },
    treeDataUpdateFun(data, refKey) {
      this.$refs[refKey][0].treeDataUpdateFun(data)
    },
    // 触发搜索，往外提交已选参数
    submitSearch() {
      this.$emit('submit', this.produceSearchParams())
      this.popoverShow = false
    },
    change() {
      this.submitSearch()
    },
    // 生成搜索参数
    produceSearchParams() {
      let params = {}
      let tagsArr = []
      // 筛选出有值的选项
      this.screenValueArr(tagsArr)
      tagsArr.forEach((item) => {
        if (item.data) {
          if (item.type === 'input' || item.type === 'timeSelect' || item.type === 'timePicker') {
            params[item.field] = item.data
          } else if (item.type === 'numInterval') {
            params[item.field.split(',')[0]] = item.data.min
            params[item.field.split(',')[1]] = item.data.max
          } else if (item.type === 'treeSelect' || item.type === 'select') {
            if (
              (item.type === 'select' && item.config && item.config.multiple) ||
              (item.type === 'treeSelect' && item.config.selectParams.multiple)
            ) {
              params[item.field] = item.data
            } else {
              params[item.field] = item.data
            }
          } else if (item.type === 'cascader') {
            // params[item.field] = item.data[item.data.length - 1]
            item.field.split(',').forEach((it, idx) => {
              params[it] = item.data[idx]
            })
          } else if (
            item.type === 'dataPicker' &&
            item.config &&
            item.config.type.indexOf('range') > -1
          ) {
            item.field.split(',').forEach((it, idx) => {
              params[it] = item.data[idx]
            })
          } else {
            params[item.field] = item.data
          }
        }
      })
      return params
    },
    resetForm() {
      this.popoverOptions.forEach((item) => {
        if (item.type === 'numInterval') {
          item.data = { min: '', max: '' }
        } else if (
          (item.type === 'treeSelect' && item.config.selectParams.multiple) ||
          (item.config && item.config.type && item.config.type.indexOf('range') > -1)
        ) {
          item.data = []
        } else {
          item.data = ''
        }
      })
    }
  }
}
</script>

<style lang="scss">
@media screen and (max-width: 990px) {
  .popover-class {
    left: 30px !important;
    right: 30px;
  }
}
@media screen and (min-width: 991px) {
  .popover-class {
    left: 270px !important;
    right: 30px;
  }
}
</style>

<style lang="scss" scoped>
/deep/ .require-form-item {
  margin-bottom: 0;
}
.popOver-footer {
  margin: 0 auto;
  text-align: right;
}
.el-form-item {
  padding-right: 24px;
}

/deep/ .el-form-item__label {
  line-height: 30px;
}
/deep/ .treeSelect {
  .el-form-item__content {
    min-width: 198px;
  }
}

/deep/ .el-form-item__content {
  .el-select,
  .el-date-editor,
  .el-cascader {
    width: 100%;
  }
}
/deep/ .el-form-item__label {
  font-family: 'PingFangSC-Medium';
  font-size: 14px;
  color: #202940;
}
.el-col-8 {
  min-width: 280px;
  margin-bottom: 16px;
  height: 72px;
}
</style>
