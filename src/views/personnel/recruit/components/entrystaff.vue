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

        <!-- <template
          slot="tags"
          slot-scope="{ row }"
        >
          <el-tag :color="row.tagsColor">
            {{ row.tagsName }}
          </el-tag>
        </template> -->
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
        // {
        //   label: '标签',
        //   prop: 'tags',
        //   slot: true
        // },
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
    if (this.$route.query.id !== undefined && this.$route.query.id !== null) {
      this.ReplicationCache(this.$route.query.id)
    }
  },
  mounted() {
    if (this.$route.query.id !== undefined && this.$route.query.id !== null) {
      this.getData()
      this.ReplicationCache(this.$route.query.id)
    }
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      this.EducationalLevel = res
    })
  },
  methods: {
    jumpToDetail(row) {
      this.$router.push('/personnel/detail/' + row.userId)
      // this.$router.push('/personnel/detail/' + row.personId)
    },
    getData() {
      getRecruitmentDetail({ recruitmentId: this.$route.query.id }).then((res) => {
        this.user = res
        this.childData = res
      })
    },
    ReplicationCache(id) {
      getEntryDetails({ userId: this.userId, recruitmentId: id }).then((res) => {
        this.data = res.map((item) => ({
          ...item
          // tagsName: this.employeeName(...item.tags),
          // tagsColor: this.employeeColor(...item.tags)
        }))
      })
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
    // employeeColor(tags) {
    //   return tags['color']
    // },
    // employeeName(tags) {
    //   return tags['name']
    // }
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
