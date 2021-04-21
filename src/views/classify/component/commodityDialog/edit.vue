<template>
  <div class="commdity-edit">
    <el-dialog title="编辑商品"
               custom-class="edit-pwd"
               :visible.sync="editDialogShow"
               :close-on-click-modal="false"
               :destroy-on-close="true"
               :before-close="editDialogClose"
               width="452px">
      <el-form :model="editForm"
               label-width="82px"
               ref="dynamicForm">
        <el-form-item label="商品名称："
                      prop="productName"
                      :rules="[{required: true, message: '商品名称不能为空', trigger: 'blur'},
                      { pattern: /^\S(.*\S)?$/, message: '请输入正确的商品名称', trigger: 'blur' }]"
                      class="form-item">
          <el-input placeholder="请输入商品名称"
                    v-model="editForm.productName"
                    resize="none"
                    :autosize="{ minRows: 4, maxRows: 4}"
                    type="textarea"
                    show-word-limit
                    maxlength="50">
          </el-input>
        </el-form-item>
        <el-form-item label="所属品牌："
                      prop="brandName"
                      :rules="{required: true, message: '请选择所属品牌', trigger: 'change'}"
                      class="form-item">
          <el-select placeholder="请选择所属品牌"
                     popper-class="dialog-select"
                     v-model="editForm.brandId">
            <el-option v-for="item in brandOption"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer user-edit">
        <el-button @click="editDialogClose">取 消</el-button>
        <el-button type="primary"
                   @click="confirmHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import linkMixin from '@/mixins/link'
export default {
  mixins: [linkMixin],
  props: {
    editDialogShow: {
      type: Boolean,
      required: true,
      default: false
    },
    editForm: {
      type: Object,
      required: true,
      default: () => { }
    }
  },
  data () {
    return {
      brandOption: []
    }
  },
  created () {
    this.getBrandData()
  },
  methods: {
    getBrandData () {
      this._getSelectData(0).then(res => {
        if (res) {
          this.brandOption = res
          if (this.editForm.brandId === -1) {
            this.editForm.brandId = this.brandOption[0].value
          }
        }
      })
    },
    editDialogClose (flag) {
      this.$emit('editDialogClose', flag)
    },
    confirmHandle () {
      this.$refs.dynamicForm.validate((valid, object) => {
        if (valid) {
          this.submitHandle()
        } else {
          return false
        }
      })
    },
    submitHandle () {
      this.$request.post('/productupdate', {
        productId: this.editForm.productId,
        brandId: this.editForm.brandId,
        newName: this.editForm.productName
      }).then(res => {
        if (res) {
          this.$message.success('保存成功')
          this.editDialogClose('1')
        } else {
          this.$message.error('保存失败')
          this.editDialogClose(false)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../dialog";
</style>
