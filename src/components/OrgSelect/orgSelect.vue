<template>
  <div class="fc-org-select">
    <div class="tags">
      <el-button
        v-if="buttonType === 'button'"
        size="medium"
        type="primary"
        icon="el-icon-plus"
        style="margin-bottom: 6px;"
        @click="show = true"
      >
        添加{{ title }}
      </el-button>
      <div
        class="input-box"
        :class="{ 'as-input': buttonType === 'input' }"
        @click="show = true"
      >
        <el-tag
          v-for="item in selectedData"
          :key="item.key"
          v-bind="tagConfig"
          class="org-tag"
          size="medium"
          @close="onClose(item)"
        >
          {{ item.name }}
        </el-tag>
        <div v-if="all && selectedData && selectedData.length < 1">
          所有人
        </div>
      </div>
    </div>
    <userSelect
      v-if="show"
      :org="org"
      :visible.sync="show"
      :users="selectOldData"
      @addUser="adduser"
    />
  </div>
</template>
<script>
/* eslint-disable vue/require-prop-type-constructor */
import userSelect from './userSelect'
export default {
  name: 'FcOrgSelect',
  components: {
    userSelect
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    all: {
      type: Boolean,
      default: false
    },
    org: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object | Array,
      default: function() {
        return {}
      },
      required: true
    },
    tabList: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: '组织机构'
    },
    buttonType: {
      type: String,
      default: 'input'
    }, // or input
    searchable: {
      type: Boolean,
      default: true
    },
    maxNum: {
      type: Number,
      default: 99
    },
    tagConfig: {
      type: Object,
      default: () => ({
        type: 'info',
        closable: true,
        'disable-transitions': false,
        hit: false,
        color: undefined,
        size: 'small',
        effect: 'light'
      })
    }
  },
  data() {
    return {
      tabKeys: [],
      show: false,
      innerValue: null,
      selectedData: [],
      selectOldData: []
    }
  },
  computed: {
    selectedLabels() {
      if (this.selectedData) {
        return this.selectedData.map((t) => t.name).join(',')
      } else {
        return ''
      }
    }
  },
  watch: {
    value: {
      handler: function(val) {
        if (!val) return
        if (this.tabList.length > 0) {
          this.selectedData = val[this.tabList[0]]
          this.selectOldData = JSON.parse(JSON.stringify(val[this.tabList[0]] || []))
        } else {
          if (val.constructor === Array) {
            this.selectedData = val
            this.selectOldData = JSON.parse(JSON.stringify(val))
          } else {
            this.selectedData = []
            this.selectOldData = []
          }
        }

        // console.log(val)
        // this.reloadCmpData()
      },
      immediate: true,
      deep: true
    },
    tabList: {
      handler: function() {
        // this.tabKeys = []
        // val.forEach(t => this.tabKeys.push(typeof t === 'string' ? t : t.key) )
        // this.reloadCmpData()
      },
      immediate: true
    },
    selectedData: {
      handler() {},
      deep: true,
      immediate: true
    }
  },
  methods: {
    adduser(data) {
      this.selectedData = data
      // this.$emit('change', this.selectedData)
      if (this.tabList.length > 0) {
        let orgCollection = {
          dep: [],
          role: [],
          user: [],
          position: []
        }
        orgCollection[this.tabList[0]] = data
        for (let key in orgCollection) {
          if (key !== key) {
            delete orgCollection[key]
          }
        }

        orgCollection = Object.assign(this.value, orgCollection)
        this.$emit('change', orgCollection)
      } else {
        // this.selectedData = data
        this.selectOldData = data
        this.$emit('change', data)
      }
    },
    reloadCmpData() {
      this.innerValue = {}
      this.tabKeys.forEach((key) => {
        this.innerValue[key] = this.value && this.value[key] ? this.value[key] : []
      })
      // transfer 可能还未加载成功
      this.$nextTick(() => {
        this.initSelectedData()
      })
    },

    initSelectedData() {
      this.selectedData = this.tabKeys.reduce((res, key) => {
        return res.concat(
          this.innerValue[key].map((t) => ({
            tabKey: key,
            key: this.getKey(t, key),
            label: this.getLabel(t, key)
          }))
        )
      }, [])
    },

    getPropByKey(data, tabKey, key) {
      const transfer = this.$refs['transfer']
      if (transfer) {
        return transfer.getNodeProp(data, key, tabKey)
      } else {
        return ''
      }
    },

    getKey(data, tabKey) {
      return this.getPropByKey(data, tabKey, 'nodeId')
    },

    getLabel(data, tabKey) {
      return this.getPropByKey(data, tabKey, 'label')
    },

    onClose(item, i) {
      this.selectedData.splice(i, 1)
      this.adduser(this.selectedData)
    }
  }
}
</script>
<style lang="stylus" scoped>
.tags {
  .input-box.as-input{
    border: 1px solid #DCDFE6;
    padding-left: 6px;
    font-size: 12px;
    min-height: 36px;
    line-height: 36px;
    border-radius: 4px;
    background: white;
    color #606266;
    cursor pointer
  }
  .org-tag{
    margin-right: 6px;
    max-width: 6rem;
    overflow hidden;
    text-overflow ellipsis;
    position relative;
    padding-right 22px;
    vertical-align middle;

    >>> .el-tag__close{
      position: absolute;
      right: 2px;
      top: 50%;
      margin-top: -7px;
    }
  }
}
</style>
