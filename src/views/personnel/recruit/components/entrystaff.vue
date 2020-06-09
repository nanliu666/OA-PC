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
import { getEntryDetails, getRecruitmentDetail } from '@/api/personnel/recruitment'
export default {
  name: 'Entrystaff',
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
      EducationalLevel: [],
      progress: 'Approved'
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  activated() {
    if (typeof this.$route.query.id !== 'undefined') {
      this.ReplicationCache(this.$route.query.id)
    }
  },
  mounted() {
    if (typeof this.$route.query.id !== 'undefined') {
      this.getData()
      this.ReplicationCache(this.$route.query.id)
    }
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      this.EducationalLevel = res
    })
  },
  methods: {
    jumpToDetail() {},
    ReplicationCache(id) {
      getEntryDetails({ userId: this.userId, recruitmentId: id }).then((res) => {
        this.data = res.data
      })
    },
    getData() {
      getRecruitmentDetail({ recruitmentId: this.$route.query.id }).then((res) => {
        this.user = res
        this.childData = res
      })
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
    ChangeContent() {
      this.$router.push({
        path: '/personnel/recruit/components/chang'
      })
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
