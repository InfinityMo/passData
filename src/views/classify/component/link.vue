<template>
  <div>
    <standard-table :dataSource="tableData"
                    :columns="columns"
                    :pagination="PAGING"
                    :paginationLayout="['total', 'prev', 'pager', 'next']" />
  </div>
</template>
<script>
import tableMixin from '@/mixins/dealTable'
import { linkColumns } from './data'
export default {
  mixins: [tableMixin],
  data () {
    return {
      columns: linkColumns(this.$createElement, this),
      // columnAllShop: columnsSingleShopsData(this.$createElement, this),
      tableData: [],
      iconClass: true,
      transitionShow: false
    }
  },
  methods: {
    toggleIcon () {
      this.iconClass = !this.iconClass
      this.transitionShow = true
    }
  }
}
</script>
