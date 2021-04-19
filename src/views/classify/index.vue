<template>
  <div class="page-wrap page">
    <div class="title-select">
      <el-tabs v-model="tabActive"
               class="tabs-wrap">
        <el-tab-pane label="链接"
                     name="Link">
          <span slot="label">链接</span>
        </el-tab-pane>
        <el-tab-pane label="品牌"
                     name="Brand">
          <span slot="label">品牌</span>
        </el-tab-pane>
        <el-tab-pane label="商品"
                     name="Commodity">
          <span slot="label">商品</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="content">
      <component v-bind:is="tabActive"></component>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Link from './component/link'
import Brand from './component/brand'
import Commodity from './component/commodity'
export default {
  components: {
    Link,
    Brand,
    Commodity
  },
  data () {
    return {
      // currentTab: '',
      tabActive: 'Link'
    }
  },
  methods: {
  },
  beforeDestroy () {
    this.$bus.$emit('classifyLeave')
  }
}
</script>
<style lang="less" scoped>
@import "./index";
</style>
