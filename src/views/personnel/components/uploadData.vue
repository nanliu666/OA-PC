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
            {{ item.name }}
          </div>
        </el-col>
        <el-col class="employee-files">
          <upload
            v-for="(i, index) in item.list"
            :id="Number(i.id)"
            :key="index"
            :type-name="i.name"
            :type-icon="i.iconUrl"
            :limit="Number(i.maxLimit)"
          />
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import upload from './upload'
import { getAttachmentCategory } from '@/api/personnel/attach'
export default {
  components: {
    upload
  },
  data() {
    return {
      listData: [],
      typeDataList: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getAttachmentCategory().then((res) => {
        const getData = res.data
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
