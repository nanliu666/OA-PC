<template>
  <div class="material">
    <basic-container>
      <el-row
        v-for="(item, index) in listData"
        :key="index"
      >
        <el-col class="title-type">
          <el-divider direction="vertical" />
          <div class="name">
            {{ getTypeName(item.name) }}
          </div>
        </el-col>
        <el-col class="employee-files">
          <upload
            v-for="(i, idx) in item.list"
            :id="Number(i.id)"
            :key="idx"
            :type-name="i.name"
            :type-icon="i.iconUrl"
            :limit="Number(i.maxLimit)"
          />
        </el-col>
      </el-row>
      <div v-if="AttachmentType.length == 0">
        <avue-empty />
      </div>
    </basic-container>
  </div>
</template>
<script>
import upload from './upload'
import { getAttachmentCategory } from '@/api/personnel/attach'
export default {
  name: 'UploadData',
  components: {
    upload
  },
  data() {
    return {
      listData: [],
      typeDataList: [],
      AttachmentType: []
    }
  },
  mounted() {
    this.$store.dispatch('CommonDict', 'AttachmentType').then((res) => {
      this.AttachmentType = res
    })
    this.initData()
  },
  methods: {
    getTypeName(type) {
      let name
      this.AttachmentType.forEach((item) => {
        if (item.dictKey == type) {
          name = item.dictValue
        }
      })
      return name
    },
    initData() {
      getAttachmentCategory().then((res) => {
        const getData = res
        function unique(arr) {
          return Array.from(new Set(arr))
        }
        function group(arr, k) {
          let allGroupName = arr.map((item) => {
            return item[k]
          })
          let typeList = unique(allGroupName)
          let list = []
          typeList.forEach((ele) => {
            let obj = {}
            obj.list = []
            obj.list = arr.filter((sele) => ele == sele[k])
            obj.name = ele
            list.push(obj)
          })
          return list
        }
        this.listData = group(getData, 'type')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.material .el-col {
  display: flex;
  line-height: 15px;
}
.title-type {
  position: relative;
  > div {
    z-index: 10;
    padding-right: 10px;
    background-color: #fff;
  }
  .name {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #202940;
    line-height: 24px;
  }
}
.employee-files {
  display: flex;
  float: left;
  flex-wrap: wrap;
}
</style>
