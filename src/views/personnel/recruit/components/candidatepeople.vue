<template>
  <div>
    <basic-container>
      <common-table
        :data="data"
        :columns="columns"
      >
        <template
          slot="name"
          slot-scope="{ row }"
        >
          <el-button
            type="text"
            size="medium"
            @click="jumpToDetail(row)"
          >
            {{ row.name }}
          </el-button>
        </template>
        <template
          slot="sex"
          slot-scope="{ row }"
        >
          {{ row.sex === 1 ? '男' : '女' }}
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
      row: {},
      data: [],
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
      EducationalLevel: []
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
    calcEducation(educationalLevel) {
      let typeLevel
      this.EducationalLevel.forEach((item) => {
        if (item.dictKey === educationalLevel) {
          typeLevel = item.dictValue
        }
      })
      return typeLevel
    },
    jumpToDetail(row) {
      this.$router.push('/personnel/detail/' + row.personId)
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
