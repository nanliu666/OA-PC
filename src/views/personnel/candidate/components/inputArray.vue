<template>
  <div>
    <el-form
      ref="attrsForm"
      :model="form"
      label-width="130px"
      label-position="top"
      size="medium"
    >
      <el-row :gutter="elRowGutter || 100">
        <el-col :span="24">
          <el-row :gutter="elRowGutter || 100">
            <el-col
              v-for="basic in infoForm.basicAttrs"
              :key="basic.attrId"
              :span="basic.span ? basic.span : 12"
            >
              <el-form-item
                :label="basic.attrName"
                :rules="basicAttrsRules(basic)"
                :prop="basic.props"
              >
                <template v-if="basic.inType == 1">
                  <el-input
                    v-model="form[basic.props]"
                    :minlength="basic.minLen"
                    :maxlength="basic.maxLen"
                    class="widthSet"
                    :class="[basic.attrId === '1' ? '' : '']"
                    :disabled="basic.disabled || disabled"
                    :placeholder="basic.message"
                    @input="(value) => inputPhonenum(value, basic.props, basic.dataType)"
                    @blur="blur(basic, basic.attrId === '1' ? true : false)"
                  />
                </template>
                <template v-if="basic.inType == 2">
                  <el-select
                    v-model="form[basic.props]"
                    :placeholder="basic.message"
                    class="widthSet select"
                    :disabled="basic.disabled || disabled"
                    @change="blur(basic)"
                  >
                    <el-option
                      v-for="item in basic.value || ''"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </template>
                <template v-if="basic.inType == 3">
                  <el-select
                    v-model="form[basic.props]"
                    multiple
                    :placeholder="basic.message"
                    clearable
                    class="widthSet select"
                    :disabled="basic.disabled || disabled"
                  >
                    <el-option
                      v-for="item in basic.value || ''"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </template>
                <template v-if="basic.inType == 4">
                  <el-date-picker
                    v-model="form[basic.props]"
                    type="date"
                    class="widthSet select"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :disabled="basic.disabled || disabled"
                    @change="blur(basic)"
                  />
                </template>
                <template v-if="basic.inType == 5">
                  <el-link type="primary">
                    {{ basic.attrValue }}
                  </el-link>
                </template>
                <template v-if="basic.inType == 6">
                  <span class="zhezhao">
                    <b />
                    <el-input
                      v-model="form[basic.props]"
                      :placeholder="basic.message"
                      :minlength="basic.minLen"
                      :maxlength="basic.maxLen"
                      class="widthSet"
                      :disabled="basic.disabled || disabled"
                    >
                      <i
                        slot="suffix"
                        class="el-icon-edit el-input__icon"
                      />
                    </el-input>
                  </span>
                </template>
                <template v-if="basic.inType == 7">
                  <el-radio-group
                    v-model="form[basic.props]"
                    :disabled="basic.disabled || disabled"
                    @change="blur(basic)"
                  >
                    <el-radio
                      v-for="item in basic.value"
                      :key="item.value"
                      :label="item.value"
                    >
                      {{ item.label }}
                    </el-radio>
                  </el-radio-group>
                </template>
                <template v-if="basic.inType == 8">
                  <el-cascader
                    ref="cascader"
                    v-model="form[basic.props]"
                    :placeholder="basic.message"
                    :disabled="basic.disabled || disabled"
                    clearable
                    size="medium"
                    :options="options"
                    class="widthSet select"
                    @change="change"
                  />
                </template>
                <template v-if="basic.inType == 9">
                  <el-checkbox-group v-model="form[basic.props]">
                    <el-checkbox
                      v-for="item in basic.value"
                      :key="item.value"
                      :label="item.value"
                    >
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </template>
                <template v-if="basic.inType == 10">
                  <el-input
                    v-model="form[basic.props]"
                    type="textarea"
                    :minlength="basic.minLen"
                    :maxlength="basic.maxLen"
                    class="widthSet"
                    show-word-limit
                    :disabled="basic.disabled || disabled"
                    :placeholder="basic.message"
                    @blur="blur(basic, basic.attrId === '1' ? true : false)"
                  />
                </template>
                <template v-if="basic.inType == 11">
                  <el-tree-select
                    ref="orgTree"
                    v-model="form[basic.props]"
                    style="width: 100%"
                    :styles="orgOptions.styles"
                    :disabled="basic.disabled"
                    :select-params="orgOptions.config.selectParams"
                    :tree-params="orgOptions.config.treeParams"
                  />
                </template>
                <template v-if="basic.inType == 12">
                  <div class="flex flex-flow flex-items ">
                    <el-input
                      v-model.number="form[basic.props]"
                      :minlength="basic.minLen"
                      :maxlength="basic.maxLen"
                      class="widthSet"
                      :placeholder="basic.message"
                      :disabled="basic.disabled || disabled"
                      @input="(value) => inputPhonenum(value, basic.props, basic.dataType)"
                      @blur="blur(basic, basic.attrId === '1' ? true : false)"
                    /><span style="margin: 0 12px">至</span>
                    <el-input
                      v-model.number="form[basic.propscomplex]"
                      :minlength="basic.minLen"
                      :maxlength="basic.maxLen"
                      class="widthSet"
                      :placeholder="basic.message"
                      :disabled="basic.disabled || disabled"
                      @blur="blur(basic, basic.attrId === '1' ? true : false)"
                      @input="(value) => inputPhonenum(value, basic.propscomplex, basic.dataType)"
                    />
                  </div>
                </template>
                <template v-if="basic.inType == 13">
                  <div class="flex flex-flow flex-items ">
                    <el-input
                      v-model.number="form[basic.props]"
                      :minlength="basic.minLen"
                      :maxlength="basic.maxLen"
                      class="widthSet"
                      :disabled="basic.disabled || disabled"
                      @blur="blur(basic, basic.attrId === '1' ? true : false)"
                    />
                  </div>
                </template>
                <template v-if="basic.inType == 14">
                  <el-radio-group
                    v-model="form[basic.props]"
                    :disabled="basic.disabled || disabled"
                    @change="blur(basic.value)"
                  >
                    <el-radio
                      v-for="item in basic.value"
                      :key="item.value"
                      :label="item.value"
                    >
                      {{ item.label }}
                    </el-radio>
                  </el-radio-group>
                  <el-form-item
                    v-show="explainshow"
                    :label="basic.explainName"
                  >
                    <el-input
                      v-model="form[basic.explain]"
                      type="textarea"
                      :minlength="basic.minLen"
                      :maxlength="basic.maxLen"
                      class="widthSet"
                      show-word-limit
                      :placeholder="basic.message"
                      @blur="blur(basic, basic.attrId === '1' ? true : false)"
                    />
                  </el-form-item>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import ElTreeSelect from '@/components/elTreeSelect/elTreeSelect'
import { provinceAndCityData } from 'element-china-area-data'
import { getOrgTreeSimple } from '@/api/org/org'
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  name: 'InputArray',
  components: {
    ElTreeSelect
  },
  props: {
    form: {
      type: Object
    },
    infoForm: {
      type: Object
    },
    disabled: {
      type: Boolean
    },
    ispass: {
      type: Boolean
    },
    elRowGutter: {
      type: Boolean
    }
  },
  data() {
    return {
      explainshow: false,
      orgOptions: {
        props: {
          label: 'orgName',
          value: 'orgId'
        },
        placeholder: '请选择部门',
        dicData: [],
        styles: {
          width: '100%'
        },
        config: {
          selectParams: {
            placeholder: '请输入内容',
            multiple: false,
            disabled: true
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
      checkedCities: [],
      cities: cityOptions,
      options: provinceAndCityData,
      pass: this.ispass,
      userId: {
        val: true,
        messges: ''
      },
      phonenum: null
    }
  },

  watch: {
    infoForm: {
      handler(data) {
        // if(data.inType == 11){
        data.basicAttrs.map((it) => {
          if (it.inType === 11) {
            this.$nextTick(() => {
              this.orgOptions.config.treeParams.data = it.value
              this.$refs['orgTree'] && this.$refs['orgTree'][0].treeDataUpdateFun(it.value)
            })
          }
          if (it.newlybuild) {
            getOrgTreeSimple({ parentOrgId: '0' }).then((res) => {
              this.orgOptions.config.treeParams.data = res
              this.$refs['orgTree'] && this.$refs['orgTree'][0].treeDataUpdateFun(res)
            })
          }
        })

        // }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {},
  methods: {
    refsform() {},
    async check(data) {
      const obj = await this.getInfoCheck(data)
      return obj
    },
    getInfoCheck() {},
    change() {
      let arr = this.$refs.cascader && this.$refs.cascader[0].getCheckedNodes()
      this.form.pathLabels = arr[0].pathLabels
    },
    blur(data) {
      if (data.attrValue === data.attrvalue) {
        return
      }

      // this.$emit('changeInfo', data)
    },

    submitForm() {
      return Promise.all(
        ['attrsForm'].map((it) => {
          return new Promise((resolve, reject) => {
            this.$refs[it].validate((valid) => {
              if (valid) {
                resolve(it)
              } else {
                reject(it)
              }
            })
          })
        })
      )
        .then(() => {
          // console.log('it_____',it)
          this.$emit('update:form', this.form)
          return true
        })
        .catch((err) => {
          this.$nextTick(() => {
            this.$refs[err] &&
              this.$refs[err].$el &&
              this.$refs[err].$el.scrollIntoView &&
              this.$refs[err].$el.scrollIntoView({
                behavior: 'auto',
                block: 'end'
              })
          })
          return false
        })
    },
    validate() {
      return new Promise((resolve) => {
        this.$refs['attrsForm'].validate((pass) => {
          this.$emit('update:infoForm', this.infoForm)
          if (pass) {
            resolve(pass)
            return
          }
        })
      })
    },
    /**
     *  author guanfenda
     *  给每个input 框 赋已验证规则事件
     * */
    basicAttrsRules(basic) {
      if (basic.rules) {
        let rules = [...basic.rules]
        return rules
      }
    },
    loadings() {},
    inputPhonenum(value, index, dataType) {
      if (dataType == 1) {
        value = value.replace(/[^\d]/g, '')
        this.form[index] = value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
}
/deep/ .el-form-item {
  margin-bottom: 5px;
}
/deep/ .el-form--label-top .el-form-item__label {
  padding: 10px 0;
}
</style>
