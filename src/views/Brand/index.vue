<template>
  <div class="page">
    <div class="main-wrap">
      <div class="main-content">
        <div class="search-wrap">
          <el-form class="search-form-inline"
                   :model="searchForm"
                   id="form"
                   ref="searchForm"
                   label-width="90px">
            <el-col :span="8">
              <el-form-item label="品牌选择："
                            prop="groupList">
                <el-select placeholder="请选择品牌"
                           multiple
                           collapse-tags
                           popper-class="reset-select"
                           v-model="searchForm.groupList">
                  <el-option v-for="item in brandOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="月度选择："
                            prop="dataType">
                <el-date-picker v-model="searchForm.dateTime"
                                :editable="false"
                                :clearable="false"
                                value-format="yyyy-MM"
                                format="yyyy-MM"
                                type="monthrange"
                                range-separator="~"
                                :picker-options="threeMonthRangePickerOptions"
                                start-placeholder="开始月份"
                                end-placeholder="结束月份">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8"
                    class="search-btn">
              <el-form-item>
                <el-button @click="_resetForm('searchForm','1')">重置</el-button>
                <el-button type="primary"
                           @click="searchHandle">查询</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="table-wrap"
             ref="table">
          <div class="flex-between-center table-info">
            <div class="flex-item-center">
              <h4>品牌分析</h4>
            </div>
            <div class="btn-gather">
              <el-button type="primary"
                         @click="downTable"><i class="export-icon"></i>下载报表</el-button>
            </div>
          </div>
          <Vtable @tableRender="tableRender"
                  :form="submitForm"
                  :key="tableKey" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import tableMixin from '@/mixins/dealTable'
import { monthSpliceDay, prevThreeMonth } from '@/common/utils/timeCalc'
import { scrollTo, createUUID } from '@/common/utils/funcStore'
import watermark from '@/common/utils/watermark'
import Vtable from '@/components/Vxtable'
import { searchForm } from './formData'
export default {
  name: 'brand',
  mixins: [tableMixin],
  components: {
    // Table
    Vtable
  },
  data () {
    return {
      searchForm: JSON.parse(JSON.stringify(searchForm)),
      submitForm: {
        start: '',
        end: '',
        dateTime: [], // 日期
        groupList: [] // 品牌
      },
      downForm: {},
      // 品牌
      brandOptions: [],
      tableKey: createUUID(),
      classifyEnter: false
    }
  },
  computed: {
    ...mapGetters({
      userData: 'getUserData'
    })
  },
  created () {
    this.getSelectData()
    this.setMonthTime()
    // this.timeTypeChange(1)
  },
  activated () {
    // 监听进入了链接分类菜单
    this.$bus.$on('classifyLeave', () => {
      this.getSelectData()
      this.classifyEnter = true
    })
    if (this.classifyEnter) {
      this.tableKey = createUUID()
      this.classifyEnter = false
    }
  },
  deactiveted () {

  },
  mounted () {
    // 创建水印
    this.$nextTick(() => {
      watermark.set(`${this.userData.staffId}`)
    })
  },
  methods: {
    getSelectData () {
      Promise.all([this._getSelectData(0)]).then(res => {
        this.brandOptions = res[0]
      })
    },
    searchHandle () {
      this.submitForm = { ...this.searchForm }
      this.submitForm.start = monthSpliceDay(this.searchForm.dateTime[0])[0]
      this.submitForm.end = monthSpliceDay(this.searchForm.dateTime[1])[1]
      this.downForm = { ...this.searchForm }
      this.tableKey = createUUID()
    },
    tableRender (flag) {
      this.$nextTick(() => {
        this.$store.commit('SETSPINNING', false)
        if (flag) {
          setTimeout(() => {
            scrollTo(60)
          }, 500)
        }
      })
    },
    setMonthTime () {
      this.searchForm.dateTime = prevThreeMonth()
      this.submitForm.start = this.searchForm.dateTime[0]
      this.submitForm.end = this.searchForm.dateTime[1]
      this.downForm = { ...this.searchForm }
    },
    // 下载报表
    downTable () {
      const downForm = Object.assign({}, {
        ...this.downForm,
        groupList: this.downForm.groupList ? this.downForm.groupList.join(',') : '',
        start: monthSpliceDay(this.downForm.dateTime[0])[0],
        end: monthSpliceDay(this.downForm.dateTime[1])[1]
      })
      const src = `${process.env.VUE_APP_API}/groupdownload?groupList=${downForm.groupList}&start=${downForm.start}&end=${downForm.end}&type=0&trackId=${this.$store.state.trackId || ''}&permissionsCode=${this.$store.state.permissionsCode || ''}&user=${this.userData.staffId || ''}`
      location.href = src
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/styles/page-table";
@import "~@/common/styles/common-page";
</style>
