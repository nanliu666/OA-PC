<template>
  <div class="NewsCenter wrapper">
    <page-header
      title="新闻中心"
      show-back
    />
    <basic-container
      v-loading="loading"
      block
    >
      <el-row
        class="container"
        :gutter="8"
      >
        <el-col
          v-show="topCount"
          class="container__grid--top"
          :span="24"
        >
          <NewsCenterHeadLine :data="paneData | topLineFilter" />
        </el-col>

        <el-col class="container__grid--aside">
          <NewsCenterSidebar
            ref="sidebar"
            v-model="searchParams.categoryId"
            @hook:mounted="() => refresh()"
          />
        </el-col>
        <el-col class="container__grid--main">
          <NewsCenterList :data="paneData | topLineFilter(true)" />
        </el-col>
      </el-row>

      <Pagination
        :page="page"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentPageChange"
      />
    </basic-container>
  </div>
</template>

<script>
import { getNewsCenter } from '@/api/newsCenter/newCenter'
import NewsCenterHeadLine from './components/NewsCenterHeadLine'
import NewsCenterSidebar from './components/NewsCenterSidebar'
import Pagination from '@/components/Pagination/Pagination'
import NewsCenterList from './components/NewsCenterList'

export default {
  name: 'NewsCenter',
  components: {
    NewsCenterHeadLine,
    NewsCenterList,
    NewsCenterSidebar,
    Pagination
  },
  filters: {
    // 过滤头条数据/过滤掉头条数据
    topLineFilter: (data, isReject = false) => _[isReject ? 'reject' : 'filter'](data, 'isTop')
  },
  data() {
    return {
      loading: false,
      paneData: null,
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      searchParams: {}
    }
  },
  computed: {
    topCount() {
      return _.sumBy(this.paneData, 'isTop')
    }
  },

  watch: {
    'searchParams.categoryId'() {
      this.handleSearch(this.searchParams)
    }
  },

  methods: {
    handlePageSizeChange(val) {
      this.page.size = val
      this.loadPaneData()
    },
    handleCurrentPageChange(val) {
      this.page.currentPage = val
      this.loadPaneData()
    },

    handleSearch(searchParams) {
      // 查询的时候重置页码为1
      this.page.currentPage = 1
      this.searchParams = _.pickBy(searchParams)
      this.loadPaneData()
    },
    refresh() {
      this.$refs.sidebar.refresh().then(() => {
        // 被watch.heandler执行了 (但是会被loading return 无所谓,可以写也可以不写)
        this.loadPaneData()
      })
    },
    async loadPaneData(params) {
      if (this.loading) {
        return
      }
      try {
        this.loading = true
        const page = {
          pageNo: this.page.currentPage,
          pageSize: this.page.size
        }
        const searchParams = this.searchParams
        const { data, totalNum } = await getNewsCenter(
          _.pickBy({
            ...page,
            ...searchParams,
            ...params
          })
        )
        this.paneData = data
        this.page.total = totalNum
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>

.wrapper
  height: 100%
  position: relative
  .basic-container--block
    min-height: calc( 100% - 92px )
    height: 0
  .container
    min-height: 500px
    &__grid
      &--top
      &--aside
        width: 250px
      &--main
        width: calc(100% - 250px)
</style>
