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
              <el-form-item label="通道等级："
                            prop="level">
                <el-select placeholder="请选择通道等级"
                           popper-class="reset-select"
                           @change="levelChange"
                           v-model="searchForm.level">
                  <el-option v-for="item in passageWayOption"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="通道选择："
                            prop="channelList">
                <el-cascader class="over-cascader"
                             placeholder="请选择通道"
                             v-model="searchForm.channelList"
                             :options="channelOptions"
                             :props="{ multiple: true }"
                             collapse-tags
                             clearable>
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期选择：">
                <el-date-picker v-model="searchForm.dateTime"
                                :editable="false"
                                :clearable="false"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                type="daterange"
                                align="right"
                                range-separator="~"
                                :picker-options="pickerOptions"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="品牌选择："
                            prop="brandList">
                <el-select placeholder="请选择品牌"
                           multiple
                           collapse-tags
                           popper-class="reset-select"
                           v-model="searchForm.brandList">
                  <el-option v-for="item in brandOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品选择："
                            prop="itemList">
                <el-select class="over-select"
                           placeholder="请选择商品"
                           multiple
                           collapse-tags
                           popper-class="reset-select"
                           v-model="searchForm.itemList">
                  <el-option v-for="item in productOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="数据类型："
                            prop="dataType">
                <el-select placeholder="请选择数据类型"
                           popper-class="reset-select"
                           v-model="searchForm.dataType">
                  <el-option v-for="item in dataTypeOption"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="链接名称/Id："
                            prop="linkList">
                <el-select v-model="searchForm.linkList"
                           filterable
                           remote
                           placeholder="请输入链接名称或Id"
                           :remote-method="remoteMethod">
                  <el-option v-for="item in linkSearchOption"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8"
                    class="search-btn">
              <el-form-item>
                <el-button @click="_resetForm('searchForm')">重置</el-button>
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
              <h4>通道分析</h4>
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
import { getLastSevenDay } from '@/common/utils/timeCalc'
import { scrollTo, createUUID } from '@/common/utils/funcStore'
import watermark from '@/common/utils/watermark'
import Vtable from '@/components/Vtable'
import { searchForm, passageWayOption, dataTypeOption } from './formData'

export default {
  name: 'passageWay',
  mixins: [tableMixin],
  components: {
    // Table
    Vtable
  },
  data () {
    return {
      searchForm: JSON.parse(JSON.stringify(searchForm)),
      submitForm: {
        level: '3', // 通道等级
        channelList: [], // 通道
        start: '',
        end: '',
        dateTime: getLastSevenDay(), // 日期
        brandList: [], // 品牌
        itemList: [], // 单品
        dataType: '1', // 数据类型
        linkList: '' // 商品
      },
      downForm: {},
      // 通道
      passageWayOption: passageWayOption,
      dataTypeOption: dataTypeOption,
      channelOptions: [],
      brandOptions: [],
      productOptions: [],
      linkSearchOption: [],
      restaurants: [],
      tableKey: createUUID()
    }
  },
  computed: {
    ...mapGetters({
      userData: 'getUserData'
    })
  },
  created () {
    this.getSelectData()
    this.searchForm.dateTime = getLastSevenDay()
    this.downForm = { ...this.searchForm }
  },

  mounted () {
    // 创建水印
    this.$nextTick(() => {
      watermark.set(`${this.userData.staffId}`)
    })
  },
  activated () {
    // 监听进入了链接分类菜单
    this.$bus.$on('classifyLeave', () => {
      this.getSelectData()
      this.tableKey = createUUID()
    })
  },
  deactiveted () {

  },
  methods: {
    getSelectData () {
      // 0品牌 1单品 2链接
      // , this._getCascader(this.searchForm.level, 3)
      Promise.all([this._getSelectData(0), this._getSelectData(1), this._getSelectData(2), this._getCascader(this.searchForm.level, 3)]).then(res => {
        this.brandOptions = res[0]
        this.productOptions = res[1]
        this.restaurants = res[2]
        this.channelOptions = res[3]
      })
    },
    searchHandle () {
      this.submitForm = { ...this.searchForm }
      this.downForm = {}
      this.downForm = { ...this.searchForm }
    },
    tableRender (flag) {
      this.$nextTick(() => {
        this.$store.commit('SETSPINNING', false)
        if (flag) {
          setTimeout(() => {
            // const top = document.body.scrollTop || document.documentElement.scrollTop
            scrollTo(screen.height < 1080 ? 125 : 90)
          }, 500)
        }
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.linkSearchOption = this.restaurants.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0) || item.value.toLowerCase().indexOf(query.toLowerCase()) >= 0
        })
      } else {
        this.linkSearchOption = []
      }
    },
    levelChange (value) {
      this._getCascader(value, 3).then(res => {
        this.searchForm.channelList = []
        this.channelOptions = []
        this.channelOptions = res
      })
    },
    // 下载报表
    downTable () {
      const downForm = Object.assign({}, {
        ...this.downForm,
        brandList: this.downForm.brandList ? this.downForm.brandList.join(',') : '',
        channelList: this.downForm.channelList ? this.downForm.channelList.join(',') : '',
        itemList: this.downForm.itemList ? this.downForm.itemList.join(',') : '',
        start: this.downForm.dateTime[0],
        end: this.downForm.dateTime[1]
      })
      const src = `${process.env.VUE_APP_API}/channeldownload?level=${downForm.level}&start=${downForm.start}&end=${downForm.end}&brandList=${downForm.brandList}&channelList=${downForm.channelList}&dataType=${downForm.dataType}&itemList=${downForm.itemList}&linkList=${downForm.linkList}&trackId=${this.$store.state.trackId || ''}&permissionsCode=${this.$store.state.permissionsCode || ''}&user=${this.userData.staffId || ''}`
      location.href = src
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/styles/page-table";
@import "~@/common/styles/common-page";
</style>
