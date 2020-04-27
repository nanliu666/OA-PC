<template>
  <div>
    <el-form
      :inline="true"
      class="demo-form-inline"
    >
      <el-form-item>
        <el-input
          v-model="fuzzySearch"
          placeholder="姓名/手机号码/工号"
          @blur="handleSearch"
          @keyup.enter.native="handleSearch"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
          />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="medium"
          @click="showCollapse = !showCollapse"
        >
          筛选
        </el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button
          type="primary"
          icon="el-icon-refresh-right"
          size="medium"
          @click="handleRefresh"
        />
      </el-form-item>
      <el-form-item style="float: right">
        <el-button
          type="primary"
          icon="el-icon-upload2"
          size="medium"
          @click="handleExport"
        >
          导出
        </el-button>
      </el-form-item>
    </el-form>
    <div :class="showCollapse ? 'collapse-box' : ''">
      <el-collapse-transition>
        <div
          v-show="showCollapse"
          class="collapse"
        >
          <el-form label-width="80px">
            <el-form-item label="已选条件">
              <el-tag
                v-for="tag in tags"
                :key="tag.field"
                closable
                type="info"
                @close="closeTag(tag)"
              >
                {{ jointTagName(tag) }}
              </el-tag>
            </el-form-item>
            <el-form-item
              v-for="items in searchArray"
              :key="items.label"
              :label="items.label"
              class="itemForm"
            >
              <el-form
                inline
                class="item-form-form"
                label-width="70px"
                label-position="left"
              >
                <el-row justify="start">
                  <el-col
                    v-for="(item, index) in items.questions"
                    v-show="items.showMore ? true : index < 3"
                    :key="item.field"
                    :span="8"
                    class="el-col el-col-8"
                  >
                    <el-form-item
                      :label="item.label"
                      :class="item.type === 'treeSelect' ? 'treeSelect' : ''"
                    >
                      <el-input
                        v-if="item.type === 'input'"
                        v-model="item.data"
                        :type="item.config && item.config.type ? item.config.type : 'text'"
                        :placeholder="'请输入' + item.label"
                        class="elInput"
                      />
                      <el-select
                        v-if="item.type === 'select'"
                        v-model="item.data"
                        v-loadmore="() => item.loadMoreFun && item.loadMoreFun(item)"
                        :placeholder="'请输入' + item.label"
                        :multiple="item.config && item.config.multiple"
                        :collapse-tags="item.config && item.config.multiple"
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
                          v-show="item.loadMoreFun ? item.loadmore : false"
                          class="addressLoading"
                          style="text-align: center"
                        >
                          <i class="el-icon-loading" />
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
                        :type="item.config && item.config.type ? item.config.type : 'data'"
                        placeholder="结束时间"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        style="width:198px"
                      />
                      <num-interval
                        v-if="item.type === 'numInterval'"
                        v-model="item.data"
                      />
                      <tree-select
                        v-if="item.type === 'treeSelect'"
                        v-model="item.data"
                        :option="item.options"
                        :is-search="false"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div class="show-more-btn">
                <el-button
                  type="text"
                  @click="items.showMore = !items.showMore"
                >
                  {{ items.showMore ? '收起' : '更多' }}
                  <i :class="items.showMore ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
                </el-button>
              </div>
            </el-form-item>
          </el-form>
          <div class="collapse-footer">
            <el-button
              type="primary"
              size="medium"
              @click="handleSearch"
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
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import NumInterval from '../numInterval/numInterval'
import TreeSelect from '../treeSelect/treeSelect'
import genSearchArray from './searchArray'

export default {
  name: 'ScreenComponent',
  components: { NumInterval, TreeSelect },
  props: {
    showStatus: {
      type: Boolean
    }
  },
  data() {
    return {
      tags: [],
      showCollapse: false,
      // 模糊搜索
      fuzzySearch: '',
      searchArray: []
    }
  },
  watch: {
    showStatus: {
      // 员工状态 显示切换
      handler(newVal) {
        if (newVal) {
          this.searchArray[0].questions.splice(5, 0, this.statusItem)
        } else {
          this.searchArray[0].questions = this.searchArray[0].questions.filter((item) => {
            if (item.field === 'statuses') {
              this.statusItem = item
              return false
            } else {
              return true
            }
          })
        }
      }
    },
    searchArray: {
      handler(newVal) {
        let tagsArr = []
        newVal.forEach((items, index) => {
          items.questions.forEach((item, idx) => {
            if (item.data) {
              if (Array.isArray(item.data) && item.data.length === 0) return
              if (item.type === 'numInterval') {
                if (!(item.data.min && item.data.max)) return
                item.site = [index, idx]
                tagsArr.push(item)
              } else {
                item.site = [index, idx]
                tagsArr.push(item)
              }
            }
          })
        })
        this.$set(this, 'tags', tagsArr)
      },
      deep: true
    }
  },
  async created() {
    this.searchArray = await genSearchArray()
  },
  methods: {
    handleRefresh() {
      this.$emit('seacrh', this.searchParams())
    },
    handleSearch() {
      this.$emit('seacrh', this.searchParams())
    },
    handleExport() {
      this.$emit('export')
    },
    // 拼接搜索参数
    searchParams() {
      let params = {}
      this.tags.forEach((item) => {
        if (item.type === 'input' || item.type === 'timeSelect' || item.type === 'timePicker') {
          params[item.field] = item.data
        } else if (item.type === 'numInterval') {
          params[item.field.split(',')[0]] = item.data.min
          params[item.field.split(',')[1]] = item.data.max
        } else if (item.type === 'treeSelect' || item.type === 'select') {
          if ((item.type === 'select' && item.config && item.config.multiple) || item.type === 'treeSelect') {
            params[item.field] = item.data.map((it) => {
              return { [item.arrField]: it }
            })
          } else {
            params[item.field] = item.data
          }
        } else if (item.type === 'cascader') {
          params[item.field] = item.data[item.data.length - 1]
        } else if (item.type === 'dataPicker') {
          item.field.split(',').forEach((it, idx) => {
            params[it] = item.data[idx]
          })
        }
      })
      // 预留模糊搜索参数
      params['search'] = this.fuzzySearch
      return params
    },
    // 重置筛选
    resetForm() {
      this.searchArray.forEach((items) => {
        items.questions.forEach((item) => {
          if (item.type === 'numInterval') {
            item.data = { min: '', max: '' }
          } else {
            item.data = ''
          }
        })
      })
    },
    // 关闭tag
    closeTag(tag) {
      let item = this.searchArray[tag.site[0]].questions[tag.site[1]]
      if (item.type === 'numInterval') {
        item.data = { min: '', max: '' }
      } else {
        item.data = ''
      }
    },
    // 选择器data为数组时tag展示数据处理
    findTagLabel(tag) {
      let arr
      if (!tag.config.group) {
        arr = tag.data.map((item) => {
          for (let i = 0; i < tag.options.length; i++) {
            if (tag.options[i][tag.config.optionValue || 'value'] === item) {
              return tag.options[i][tag.config.optionLabel || 'label']
            }
          }
        })
        return arr
      } else {
        arr = tag.data.map((item) => {
          if (item.indexOf('A') > -1) {
            for (let i = 0; i < tag.options[0].options.length; i++) {
              if (tag.options[0].options[i][tag.config.optionValue || 'value'] === item) {
                return tag.options[0].options[i][tag.config.optionLabel || 'label']
              }
            }
          } else {
            for (let i = 0; i < tag.options[1].options.length; i++) {
              if (tag.options[1].options[i][tag.config.optionValue || 'value'] === item) {
                return tag.options[1].options[i][tag.config.optionLabel || 'label']
              }
            }
          }
        })
        return arr
      }
    },
    // 处理tag字段
    jointTagName(tag) {
      if (Array.isArray(tag.data)) {
        if (tag.type === 'cascader') {
          return tag.label + ': ' + tag.data[tag.data.length - 1]
        } else {
          let range = tag.config && tag.config['range-separator'] ? tag.config['range-separator'] : '、'
          return tag.label + ': ' + (tag.type === 'select' ? this.findTagLabel(tag).join(range) : tag.data.join(range))
        }
      } else if (Object.prototype.toString.call(tag.data) === '[object Object]') {
        return tag.label + ': ' + tag.data.min + '-' + tag.data.max
      } else {
        return tag.label + ': ' + tag.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse {
  background-color: #fff;
  padding: 20px;
}
.collapse-footer {
  text-align: right;
  padding-right: 20px;
}
.collapse-box {
  border-radius: 4px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04), 0 8px 8px 0 rgba(0, 0, 0, 0.08), 0 10px 20px 8px rgba(0, 0, 0, 0.04);
}
.elInput {
  width: 200px;
}
/deep/ .treeSelect {
  .el-form-item__content {
    width: 198px;
  }
}
/deep/.itemForm {
  .el-form-item__content {
    .item-form-form {
      width: calc(100% - 70px);
      .el-form-item {
        .el-form-item__label {
          text-align: right;
          line-height: 20px;
        }
      }
      .el-col-8 {
        min-width: 280px;
        height: 40px;
        margin-bottom: 20px;
      }
      .numinterval-com {
        > .el-form-item__content {
          width: calc(100% - 70px);
        }
      }
    }
    .show-more-btn {
      position: absolute;
      width: 40px;
      right: 20px;
      top: 0;
    }
  }
}

/deep/ .el-tag {
  margin-right: 10px;
}
</style>
