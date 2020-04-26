<template>
  <div class="material">
    <basic-container>
      <el-row v-for="(item, index) in listData" :key="index">
        <el-col class="title-type">
          <el-divider direction="vertical"></el-divider>
          <div>{{ item.name }}</div>
        </el-col>
        <el-col class="employee-files">
          <upload
            v-for="(i, index) in item.list"
            :key="index"
            :typeName="i.name"
            :typeIcon="i.iconUrl"
            :limit="Number(i.maxLimit)"
            :id="Number(i.id)"
          />
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import upload from './upload'
import { getUploadData } from '@/api/personnel/uploaddata'
export default {
  data() {
    return {
      listData: [],
      typeDataList: []
    }
  },
  components: {
    upload
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getUploadData().then((res) => {
        const getData = res.data
        function unique(arr) {
          const res = new Map()
          return arr.filter((a) => !res.has(a) && res.set(a, 1))
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
        console.log('处理好数据', group(getData, 'type'), this.listData)
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
  &:after {
    content: '';
    width: calc(100% - 50px);

    display: block;
    border-bottom: 1px dashed #000;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(50px, -50%);
    z-index: 1;
  }
}
.employee-files {
  display: flex;
  float: left;
  flex-wrap: wrap;
}
</style>
