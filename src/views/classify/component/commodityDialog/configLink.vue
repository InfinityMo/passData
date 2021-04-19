<template>
  <div class="commdity-edit">
    <el-dialog title="配置链接"
               custom-class="edit-pwd"
               :visible.sync="configDialogShow"
               :close-on-click-modal="false"
               :destroy-on-close="true"
               :before-close="configDialogClose"
               width="880px">
      <el-transfer filterable
                   :titles="transferTitles"
                   class="transfer-wrap"
                   filter-placeholder="请输入链接名称"
                   v-model="classifyListCopy"
                   :data="allLinkData">
      </el-transfer>
      <span slot="footer"
            class="dialog-footer user-edit">
        <el-button @click="configDialogClose">取 消</el-button>
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
    configDialogShow: {
      type: Boolean,
      required: true,
      default: false
    },
    configForm: {
      type: Object,
      required: true,
      default: () => { }
    },
    allLinkData: {
      type: Array,
      default: () => []
    },
    classifyList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      classifyListCopy: [],
      transferTitles: ['未分类链接']
    }
  },
  created () {
    this.classifyListCopy = JSON.parse(JSON.stringify(this.classifyList))
    this.transferTitles.push(this.configForm.productName || '已分类链接')
  },
  methods: {
    filterMethod (query, item) {

    },
    configDialogClose () {
      this.$emit('configDialogClose', true)
    },
    confirmHandle () {
      const submitParams = {
        productId: this.configForm.productId,
        classifyList: this.classifyListCopy.join(',')
      }
      this.$request.post('/productset', submitParams).then(res => {
        if (res) {
          this.$message.success('保存成功')
          this.configDialogClose()
          //  this.$message.error('')
        } else {
          this.$message.error('保存失败')
          this.configDialogClose()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../dialog";
</style>
