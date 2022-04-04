<template>
  <div class="page-content">
    <el-pagination
      :background="background"
      :page-sizes="pageSizes"
      :layout="layout"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    background: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    total: {
      required: true,
      type: Number,
      default: 0
    },
    pageNum: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.pageNum
      },
      set(val) {
        this.$emit('update:pageNum', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.currentPage = 1;
      this.$emit('pagination', { pageNum: this.currentPage, limit: val })
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { pageNum: val, limit: this.pageSize })
    }
  }
}
</script>

<style scoped>
.page-content{
  text-align: right;
  margin: 10px 10px 0 0;
}
</style>
