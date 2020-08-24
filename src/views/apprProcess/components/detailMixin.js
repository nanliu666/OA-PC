export default {
  data() {
    return {
      commonDict: {}
    }
  },
  methods: {
    // 获取相关字典组
    getCommonDict(key) {
      let dict = {}
      this.$store.dispatch('CommonDict', key).then((res) => {
        res.forEach((el) => {
          dict[el.dictKey] = el.dictValue
        })
        this.$set(this.commonDict, key, dict)
      })
    },
    CommonDictType(value, key) {
      return (this.commonDict[key] || {})[value] || '-'
    }
  }
}
