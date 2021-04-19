<template>
  <div class="page-wrap">
    <div class="flex-between-center table-title-wrap">
      <h4 class="table-title">商品数据</h4>
    </div>
    <el-table :data="tableData"
              class="cutomer-table">
      <el-table-column label="商品名称"
                       width="700"
                       :show-overflow-tooltip="true"
                       prop="productName">
      </el-table-column>
      <el-table-column label="品牌"
                       prop="brandName">
        <template slot="header"
                  slot-scope="scope">
          <div class="check-column">
            <span class="status"
                  @click="toggleIcon">品牌<i class="arrow-down-icon"></i></span>
            <transition name="el-zoom-in-top">
              <div v-show="isShowTransition"
                   class="transition">
                <div class="checkbox-wrap checkbox-wrap-brand"
                     @mouseenter="checkGroupEnter"
                     @mouseleave.prevent="checkGroupLeave">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox v-for="item in checkListArr"
                                 :key="item.value"
                                 :label="item.value">
                      {{item.label}}
                    </el-checkbox>
                  </el-checkbox-group>
                  <p class="filter-btn"><span @click="resetFilter">重置</span><span @click="filterData">筛选</span></p>
                </div>
              </div>
              {{scope.row}}
            </transition>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="220px"
                       prop="operate">
        <template slot-scope="scope">
          <div class="operate-btn-group">
            <span @click="edit(scope.row)">编辑</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="configLink(scope.row)">配置链接</span>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm @confirm="deleteHandle(scope.row)"
                           placement="top"
                           title="确定删除吗？">
              <span slot="reference">删除</span>
            </el-popconfirm>
          </div>
        </template>
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
    <Edit :editDialogShow="editDialogShow"
          v-if="editDialogShow"
          :editForm="editForm"
          @editDialogClose="editDialogClose" />
    <ConfigLink :classifyList="classifyList"
                :allLinkData="allLinkData"
                :configForm="configForm"
                v-if="configDialogShow"
                :configDialogShow="configDialogShow"
                @configDialogClose="configDialogClose" />
  </div>
</template>
<script>
import linkMixin from '@/mixins/link'
import { commodityData } from './data'
import Edit from '../component/commodityDialog/edit'
import ConfigLink from '../component/commodityDialog/configLink'
export default {
  components: {
    Edit,
    ConfigLink
  },
  mixins: [linkMixin],
  data () {
    return {
      tableData: commodityData,
      isShowTransition: false,
      editDialogShow: false,
      configDialogShow: false,
      editForm: {},
      checkList: [],
      classifyList: [],
      allLinkData: [],
      configForm: {},
      checkListArr: []
    }
  },
  created () {
    this._getSelectData(0).then(res => {
      this.checkListArr = res
      this.getTableData()
    })
  },
  methods: {
    getTableData () {
      const submitParams = {
        brandList: this.checkList.join(','),
        ...this.PAGING
      }
      delete submitParams.total
      this.$request.post('/productpage', submitParams).then(res => {
        if (res.data) {
          this.tableData = res.data.result || []
          this.PAGING.total = res.data.total
        }
      })
    },
    edit (product) {
      this.editForm = { ...product }
      this.editDialogShow = true
    },
    configLink (row) {
      this.$request.post('/productsetwindow', { productId: row.productId }).then(res => {
        if (res) {
          this.configDialogShow = true
          this.configForm = { ...row }
          // this.productId = row.productId
          this.allLinkData = res.data.unclassifyList
          this.classifyList = res.data.classifyList
        }
      })
    },
    deleteHandle (row) {
      this.$request.post('/productdelete', { productId: row.productId }).then(res => {
        if (res) {
          this.$message.success('删除成功')
          this._isLastPage()
          this.getTableData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    editDialogClose (flag) {
      this.editDialogShow = false
      if (flag) {
        this.getTableData()
      }
    },
    configDialogClose () {
      this.configDialogShow = false
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
    },
    checkGroupEnter () {
      this.isShowTransition = true
    },
    checkGroupLeave () {
      this.isShowTransition = false
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
