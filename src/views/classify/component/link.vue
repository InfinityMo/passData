<template>
  <div class="page-wrap">
    <div class="flex-between-center table-title-wrap">
      <h4 class="table-title">链接数据</h4>
    </div>
    <el-table :data="tableData"
              class="cutomer-table">
      <el-table-column label="链接名称"
                       width="400"
                       :show-overflow-tooltip="true"
                       prop="linkName">
      </el-table-column>
      <el-table-column label="状态"
                       prop="isClassify">
        <template slot="header"
                  slot-scope="scope">
          <div class="check-column">
            <span class="status"
                  @click="toggleIcon">状态<i class="el-icon-arrow-down"></i></span>
            <transition name="el-zoom-in-top">
              <div v-show="isShowTransition"
                   class="transition">
                <div class="checkbox-wrap"
                     tabindex="0"
                     ref="transitionDiv"
                     @blur="divBlur">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox v-for="item in checkListArr"
                                 :key="item.value"
                                 :label="item.value">
                      {{item.label}}
                    </el-checkbox>
                  </el-checkbox-group>
                  <p class="filter-btn">
                    <span @click="resetFilter">重置</span>
                    <span @click="filterData">筛选</span>
                  </p>
                </div>
              </div>
              {{scope.row}}
            </transition>
          </div>
        </template>
        <template slot-scope="scope">
          <div>
            <span v-if="scope.row.isClassify==='0'"><i class="status-icon red"></i>未分类</span>
            <span v-else><i class="status-icon green"></i>已分类</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="品牌"
                       prop="brandName">
      </el-table-column>
      <el-table-column label="商品"
                       prop="productName"
                       width="490"
                       :show-overflow-tooltip="true">
      </el-table-column>
    </el-table>
    <el-pagination class="pagination"
                   background
                   layout="total,prev,pager,next,sizes,jumper"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="PAGING.pageNum"
                   :page-size="PAGING.pageSize"
                   :total="PAGING.total">
    </el-pagination>
  </div>
</template>
<script>
import linkMixin from '@/mixins/link'
// import { linkData } from './data'
export default {
  mixins: [linkMixin],
  data () {
    return {
      tableData: [],
      isShowTransition: false,
      checkChange: false,
      checkList: [],
      checkListArr: [{
        value: '0',
        label: '未分类'
      }, {
        value: '1',
        label: '已分类'
      }]
    }
  },
  watch: {
    checkList: {
      handler: function (newValue, oldValue) {
        this.checkChange = true
        this.isShowTransition = true
      },
      deep: true
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      const submitParams = {
        isClassify: this.checkList.join(','),
        ...this.PAGING
      }
      delete submitParams.total
      this.$request.post('/linklist', submitParams).then(res => {
        if (res.data) {
          this.tableData = res.data.result || []
          this.PAGING.total = res.data.total
        }
      })
    },
    filterData () {
      this.getTableData()
      this.isShowTransition = false
    },
    resetFilter () {
      this.checkList = []
      this.getTableData()
      this.isShowTransition = false
    },
    toggleIcon () {
      this.isShowTransition = !this.isShowTransition
      if (this.isShowTransition) {
        this.$nextTick(() => {
          this.$refs.transitionDiv.focus()
        })
      }
    },
    handleSizeChange (pageSize) {
      this.PAGING.pageSize = pageSize
      // 页数大小发生变化时，手动将当前页设置为1
      this.PAGING.pageNum = 1
      this.getTableData()
    },
    handleCurrentChange (pageNum) {
      this.PAGING.pageNum = pageNum
      this.getTableData()
    },
    divBlur () {
      this.$refs.transitionDiv.blur()
      setTimeout(() => {
        if (!this.checkChange) {
          this.isShowTransition = false
        }
      })
      // if (!this.isShowTransition) {
      //   setTimeout(() => {
      //     this.isShowTransition = false
      //   })
      // }
      this.checkChange = false
    }
    // divFocus () {
    //   this.isShowTransition = !this.isShowTransition
    //   if (this.isShowTransition) {
    //     this.$refs.transitionDiv.focus()
    //   }
    // }
  }
}
</script>
<style lang="less" scoped>
@import "./index";
</style>
