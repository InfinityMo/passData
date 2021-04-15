<template>
  <div class="page-wrap">
    <div class="flex-between-center">
      <h4 class="table-title">品牌数据</h4>
      <el-button type="primary"
                 @click="addBrand">新增品牌</el-button>
    </div>
    <el-table :data="tableData"
              class="cutomer-table">
      <el-table-column label="品牌"
                       prop="brandName">
      </el-table-column>
      <el-table-column label="操作"
                       prop="operate">
        <template slot-scope="scope">
          <div class="operate-btn-group">
            <span @click="editBrand(scope.row)">编辑</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="addGoods(scope.row)">添加商品</span>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm @Confirm="deleteHandle"
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
         @addDialogClose="addDialogClose" />
    <AddGoods :addGoodsDialogShow="addGoodsDialogShow"
              :goodsId="goodsId"
              @addGoodsDialogClose="addGoodsDialogClose" />
    <Edit :editDialogShow="editDialogShow"
          :editForm="editForm"
          @editDialogClose="editDialogClose" />
  </div>
</template>
<script>
import tableMixin from '@/mixins/dealTable'
import { brandData } from './data'
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
      tableData: brandData,
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
  methods: {
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
    addDialogClose () {
      this.addDialogShow = false
    },
    addGoodsDialogClose () {
      this.addGoodsDialogShow = false
    },
    editDialogClose () {
      this.editDialogShow = false
    },
    resetFilter () {
      this.checkList = []
      this.isShowTransition = false
    },
    deleteHandle () {

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
