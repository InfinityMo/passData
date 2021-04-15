<template>
  <div>
    <el-dialog title="编辑品牌"
               custom-class="edit-pwd"
               :visible.sync="editDialogShow"
               :close-on-click-modal="false"
               :destroy-on-close="true"
               :before-close="editDialogClose"
               width="452px">
      <el-form :model="editForm"
               label-width="82px"
               ref="dynamicForm">
        <el-form-item label="品牌名称："
                      prop="brandName"
                      :rules="{required: true, message: '品牌名称不能为空', trigger: 'blur'}"
                      class="form-item">
          <el-input placeholder="请输入品牌名称"
                    v-model="editForm.brandName"
                    maxlength="20"
                    show-word-limit>
          </el-input>
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

export default {
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

    }
  },
  methods: {

    editDialogClose () {
      this.$emit('editDialogClose', true)
    },
    confirmHandle () {
      this.$refs.dynamicForm.validate((valid, object) => {
        if (valid) {
          debugger
        } else {
          return false
        }
      })
    }

  }
}
</script>
<style lang="less" scoped>
@import "../dialog";
</style>
