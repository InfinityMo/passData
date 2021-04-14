<template>
  <div class="page-wrap">
    <div class="title-select">
      <el-tabs v-model="tabActive"
               class="tabs-wrap"
               @tab-click="tabClick">
        <el-tab-pane label="链接"
                     name="link">
          <span slot="label">链接</span>
        </el-tab-pane>
        <el-tab-pane label="品牌"
                     name="brand">
          <span slot="label">品牌</span>
        </el-tab-pane>
        <el-tab-pane label="商品"
                     name="commodity">
          <span slot="label">商品</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Link />
  </div>
</template>
<script>
import Link from './component/link'
export default {
  components: {
    Link
  },
  data () {
    return {
      tabActive: ''
    }
  },
  methods: {
    tabClick (tab, event) {
      // this.$router.push(`/${tab.name}`)
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index";
</style>
