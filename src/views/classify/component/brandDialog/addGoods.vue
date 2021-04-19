<template>
  <div>
    <el-dialog title="添加商品"
               custom-class="edit-pwd"
               :visible.sync="addGoodsDialogShow"
               :close-on-click-modal="false"
               :destroy-on-close="true"
               :before-close="addGoodsDialogClose"
               width="980px">
      <el-form :model="form"
               label-width="82px"
               ref="dynamicForm">
        <el-row class="row-item"
                v-for="(dynamicItem, index) in form.dynamicForm"
                :key="dynamicItem.itemId">
          <el-form-item label="商品名称："
                        :ref="'dynamicForm.' + index + '.productName'"
                        :prop="'dynamicForm.' + index + '.productName'"
                        :rules="{required: true, message: '商品不能为空', trigger: 'blur'}"
                        class="form-item">
            <el-input placeholder="请输入商品名称"
                      v-model="dynamicItem.productName"
                      maxlength="50"
                      show-word-limit>
            </el-input>
          </el-form-item>
          <i class="delete-icon delete-ico"
             @click="deleteDynamicItem(dynamicItem.itemId)"></i>
        </el-row>
        <el-form-item>
          <div class="add-wrap flex-item-center flex-center"
               v-if="form.dynamicForm.length<30"
               @click="addHandle"><i class="add-icon"></i><span>添加商品</span></div>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer user-edit">
        <el-button @click="addGoodsDialogClose">取 消</el-button>
        <el-button type="primary"
                   @click="confirmHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { createUUID } from '@/common/utils/funcStore'
export default {
  props: {
    addGoodsDialogShow: {
      type: Boolean,
      required: true,
      default: false
    },
    goodsId: {
      type: [String, Number],
      required: true,
      default: ''
    }
  },
  data () {
    return {
      form: {
        dynamicForm: [{
          itemId: createUUID(),
          productName: ''
        }
        ]
      }
    }
  },
  methods: {
    addHandle () {
      this.form.dynamicForm.push({
        itemId: createUUID(),
        productName: ''
      })
    },
    addGoodsDialogClose () {
      this.$emit('addGoodsDialogClose', true)
    },
    deleteDynamicItem (itemId) {
      if (this.form.dynamicForm.length < 2) {
        return false
      }
      const deleteIndex = this.form.dynamicForm.findIndex(item => item.itemId === itemId)
      this.form.dynamicForm.splice(deleteIndex, 1)
    },
    confirmHandle () {
      this.$refs.dynamicForm.validate((valid, object) => {
        if (valid) {
          this.submitHandle()
        } else {
          this.scrollView(object)
          return false
        }
      })
    },
    submitHandle () {
      const nameArr = []
      this.form.dynamicForm.forEach(item => {
        nameArr.push(item.productName)
      })
      const submitParams = {
        brandId: this.goodsId,
        productList: nameArr.join(',')
      }
      this.$request.post('/productcreate', submitParams).then(res => {
        if (res.errorCode === 1) {
          this.$message.success('保存成功')
          this.addGoodsDialogClose()
          //  this.$message.error('')
        } else {
          this.$message.error('保存失败')
          this.addGoodsDialogClose()
        }
      })
    },
    scrollView (object) {
      for (const i in object) {
        let dom = this.$refs[i]
        if (Object.prototype.toString.call(dom) !== '[object Object]') {
          dom = dom[0]
        }
        dom.$el.scrollIntoView({ // 滚动到指定节点
          // 值有start,center,end，nearest，当前显示在视图区域中间
          block: 'center',
          behavior: 'smooth'
        })
        break
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "../dialog";
</style>
