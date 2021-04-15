<template>
  <div class="page-wrap">
    <h4 class="table-title">链接数据</h4>
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
                <div class="checkbox-wrap">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox v-for="item in checkListArr"
                                 :key="item.value"
                                 :label="item.label">
                    </el-checkbox>
                  </el-checkbox-group>
                  <p class="filter-btn"><span @click="resetFilter">重置</span><span>筛选</span></p>
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
import { linkData } from './data'
export default {
  mixins: [linkMixin],
  data () {
    return {
      tableData: linkData,
      isShowTransition: false,
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
  methods: {
    resetFilter () {
      this.checkList = []
      this.isShowTransition = false
    },
    toggleIcon () {
      this.isShowTransition = !this.isShowTransition
    },
    handleSizeChange (pageSize) {
      this.PAGING.pageSize = pageSize
      // 页数大小发生变化时，手动将当前页设置为1
      this.PAGING.pageNum = 1
    },
    handleCurrentChange (pageNum) {
      this.PAGING.pageNum = pageNum
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index";
</style>
