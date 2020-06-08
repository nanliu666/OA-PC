<template>
  <div>
    <basic-container>
      <common-table
        :data="data"
        :page="page"
        :columns="columns"
        :page-config="pageConfig"
        :config="tableConfig"
        @page-size-change="sizeChange"
        @expand-change="recruitmentSituation"
      >
        <template
          slot="name"
          slot-scope="{ row }"
        >
          <el-button
            type="text"
            size="medium"
            @click="jumpToDetail(row.personId)"
          >
            {{ row.name }}
          </el-button>
        </template>
        <template
          slot="sex"
          slot-scope="{ row }"
        >
          {{ calcSex(row.sex) }}
        </template>
        <template
          slot="educationalLevel"
          slot-scope="{ row }"
        >
          {{ calcEducation(row.educationalLevel) }}
        </template>
      </common-table>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getRelationDemand } from '@/api/personnel/recruitment'
export default {
  name: 'Candidatepeople',
  props: [],
  data() {
    return {
      childData: [],
      user: {
        joinDate: null,
        userName: null,
        id: null
      },
      status: '招聘中',
      activeName: 'inrecruitment',
      row: {},
      data: [],
      tableConfig: {
        showIndexColumn: false,
        enableMultiSelect: false,
        enablePagination: true
      },
      columns: [
        {
          label: '姓名',
          prop: 'name',
          slot: true
        },
        {
          label: '性别',
          prop: 'sex',
          slot: true
        },
        {
          label: '手机号码',
          prop: 'phonenum'
        },
        {
          label: '个人邮箱',
          prop: 'email'
        },

        {
          label: '毕业学校',
          prop: 'university'
        },
        {
          label: '工作年限',
          prop: 'workAge'
        },
        {
          label: '学历要求',
          prop: 'educationalLevel',
          slot: true
        }
      ],
      params: {
        pageNo: 1,
        pageSize: 10
      },
      page: {
        pageSize: 100,
        pagerCount: 1,
        total: 10
      },
      pageConfig: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      EducationalLevel: [],
      progress: 'Approved'
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  watch: {
    childData: function(newval) {
      this.status = newval
    }
  },
  mounted() {
    this.getDemand()
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      this.EducationalLevel = res
    })
  },
  methods: {
    handleEdit() {
      this.$refs.Again.init(this.status)
    },
    getDemand() {
      getRelationDemand({ recruitmentId: this.$route.query.id, userId: this.userId }).then(
        (res) => {
          this.data = res
        }
      )
    },
    calcSex(sex) {
      let typeWord
      let whoSex = [
        { sex: 1, result: '男' },
        { sex: 0, result: '女' }
      ]
      whoSex.forEach((item) => {
        if (item.sex === sex) {
          typeWord = item.result
        }
      })
      return typeWord
    },
    calcEducation(educationalLevel) {
      let typeLevel
      this.EducationalLevel.forEach((item) => {
        if (item.dictKey === educationalLevel) {
          typeLevel = item.dictValue
        }
      })
      return typeLevel
    },
    currentChange(val) {
      this.params.pageNo = val
      this.page.pagerCount = val
      this.getData()
    },
    sizeChange(val) {
      this.params.pageSize = val
      this.params.pageNo = 1
      this.page.pagerCount = 1
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .top-menu {
  height: 0px;
  margin-bottom: 0px;
}

/deep/ .basic-container {
  margin: 10px 0;
}
</style>
