<template>
  <div class="page-wrap">
    <div class="flex-between-center table-title-wrap">
      <h4 class="table-title">品牌数据</h4>
      <el-button type="primary"
                 @click="addBrand"><i class="addbtn-icon"></i><span class="add-btn">新增品牌</span></el-button>
    </div>
    <el-table :data="tableData"
              class="cutomer-table auto-cus-table">
      <el-table-column label="品牌"
                       prop="brandName">
      </el-table-column>
      <el-table-column label="操作"
                       width="220px"
                       prop="operate">
        <template slot-scope="scope">
          <div class="operate-btn-group">
            <span @click="editBrand(scope.row)">编辑</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="addGoods(scope.row)">添加商品</span>
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
                   layout="total,prev,pager,next"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="PAGING.pageNum"
                   :page-size="PAGING.pageSize"
                   :total="PAGING.total">
    </el-pagination>
    <Add :addDialogShow="addDialogShow"
         v-if="addDialogShow"
         @addDialogClose="addDialogClose" />
    <AddGoods :addGoodsDialogShow="addGoodsDialogShow"
              v-if="addGoodsDialogShow"
              :goodsId="goodsId"
              @addGoodsDialogClose="addGoodsDialogClose" />
    <Edit :editDialogShow="editDialogShow"
          :editForm="editForm"
          v-if="editDialogShow"
          @editDialogClose="editDialogClose" />
  </div>
</template>
<script>
import tableMixin from '@/mixins/dealTable'
// import { brandData } from './data'
import Add from '../component/brandDialog/add'
import AddGoods from '../component/brandDialog/addGoods'
import Edit from '../component/brandDialog/edit'
export default {
  mixins: [tableMixin],
  components: {
    Add,
    Edit,
    AddGoods
  },
  data () {
    return {
      tableData: [],
      addDialogShow: false,
      editDialogShow: false,
      addGoodsDialogShow: false,
      isShowTransition: false,
      goodsId: '',
      checkList: [],
      editForm: {},
      checkListArr: [{
        value: '0',
        label: '未分类'
      }, {
        value: '1',
        label: '已分类'
      }]
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      const submitParams = {
        ...this.PAGING
      }
      delete submitParams.total
      this.$request.post('/brandpage', submitParams).then(res => {
        if (res.data) {
          this.tableData = res.data.result || []
          this.PAGING.total = res.data.total
        }
      })
    },
    addBrand () {
      this.addDialogShow = true
    },
    addGoods (brand) {
      this.goodsId = brand.brandId
      this.addGoodsDialogShow = true
    },
    editBrand (brand) {
      this.editForm = { ...brand }
      this.editDialogShow = true
    },
    addDialogClose (flag) {
      this.addDialogShow = false
      if (flag === '1') {
        this.PAGING.pageNum = 1
        this.getTableData()
      }
    },
    addGoodsDialogClose () {
      this.addGoodsDialogShow = false
    },
    editDialogClose (flag) {
      this.editDialogShow = false
      if (flag === '1') {
        this.getTableData()
      }
    },
    resetFilter () {
      this.checkList = []
      this.isShowTransition = false
    },
    deleteHandle (row) {
      this.$request.post('/branddelete', { brandId: row.brandId }).then(res => {
        if (res) {
          this.$message.success('删除成功')
          this._isLastPage()
          this.getTableData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    toggleIcon () {
      this.isShowTransition = !this.isShowTransition
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
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index";
</style>
