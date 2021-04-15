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
    <div class="content">
      <!-- <Link /> -->
      <Brand />
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Link from './component/link'
import Brand from './component/brand'
export default {
  components: {
    // Link,
    Brand
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
