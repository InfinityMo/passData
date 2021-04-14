<template>
  <div>
    <standard-table :dataSource="tableData"
                    :columns="columns"
                    :pagination="PAGING"
                    :paginationLayout="['total', 'prev', 'pager', 'next']">
      <!-- <div slot="brand">
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for="item in checkListArr"
                       :key="item.value"
                       :label="item.label"></el-checkbox>
        </el-checkbox-group>
      </div> -->
    </standard-table>
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
      isShowTransition: false,
      checkList: ['0'],
      checkListArr: [{
        value: '0',
        label: '未分类'
      }, {
        value: '1',
        label: '已分类'
      }]
    }
  },
  methods: {
    handleCheckedCitiesChange (value) {
      // debugger
    },
    toggleIcon () {
      // debugger
      this.iconClass = !this.iconClass
      this.isShowTransition = !this.isShowTransition
    }
  }
}
</script>
