<template>
  <div>
    <el-dialog title="新增品牌"
               custom-class="edit-pwd"
               :visible.sync="addDialogShow"
               :close-on-click-modal="false"
               :destroy-on-close="true"
               :before-close="addDialogClose"
               width="452px">
      <el-form :model="form"
               label-width="82px"
               ref="dynamicForm">
        <el-form-item label="品牌名称："
                      v-for="(dynamicItem, index) in form.dynamicForm"
                      :key="dynamicItem.itemId"
                      :ref="'dynamicForm.' + index + '.brandName'"
                      :prop="'dynamicForm.' + index + '.brandName'"
                      :rules="{required: true, message: '品牌名称不能为空', trigger: 'blur'}"
                      class="form-item">
          <el-input placeholder="请输入品牌名称"
                    v-model="dynamicItem.brandName"
                    maxlength="20"
                    show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="add-wrap"
               v-if="form.dynamicForm.length<30"
               @click="addHandle">添加品牌</div>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer user-edit">
        <el-button @click="addDialogClose">取 消</el-button>
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
    addDialogShow: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      form: {
        dynamicForm: [{
          itemId: createUUID(),
          brandName: ''
        }
        ]
      }
    }
  },
  methods: {
    addHandle () {
      this.form.dynamicForm.push({
        itemId: createUUID(),
        brandName: ''
      })
    },
    addDialogClose () {
      this.$emit('addDialogClose', true)
    },
    confirmHandle () {
      this.$refs.dynamicForm.validate((valid, object) => {
        if (valid) {
          debugger
        } else {
          this.scrollView(object)
          return false
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
