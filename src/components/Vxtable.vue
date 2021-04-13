<template>
  <div>
    <!--  -->
    <vxe-table border
               show-overflow
               row-key
               show-header-overflow
               highlight-hover-row
               highlight-current-row
               :merge-cells="mergeCells"
               :footer-method="tableSummaries"
               show-footer
               :scroll-x="{enabled: false}"
               ref="xTable"
               :max-height="calcHeight">
      <template v-for="col in columns">
        <vxe-table-column v-if="!col.children"
                          :key="col.fieldName"
                          :field="col.fieldName"
                          :title="col.title"
                          :align="col.align"
                          :fixed="col.fixed"
                          :width="col.width">
        </vxe-table-column>
        <vxe-table-colgroup v-else
                            :key="col.fieldName"
                            :title="col.title">
          <vxe-table-column v-for="colChild in col.children"
                            :key="colChild.fieldName"
                            :field="colChild.fieldName"
                            :title="colChild.title"
                            :align="col.align"
                            :width="colChild.width">
          </vxe-table-column>
        </vxe-table-colgroup>
      </template>
    </vxe-table>
  </div>
</template>
<script>
import { formatRowspanAndColspan } from './data'
import compontentTable from '@/mixins/compontentTable2'
export default {
  mixins: [compontentTable],
  props: {
    form: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      columns: [],
      tableData: [],
      mergeCells: [],
      tableCellOrginVal: '',
      tableCellEditVal: '',
      cellInputWatch: '',
      currentEditCellKey: ''
    }
  },
  computed: {
    calcHeight () {
      let height = 0
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      height = clientHeight - 197
      return height
    }
  },
  created () {
    // this.setColumn()
    // this.setTableData()
    this.getColumns().then(res => {
      if (res) {
        this.getTableData()
      }
    })
  },
  methods: {
    getColumns () {
      this.columns = []
      return new Promise((resolve, reject) => {
        this.$store.commit('SETSPINNING', true)
        const submitform = {
          ...this.form,
          groupList: this.form.groupList ? this.form.groupList.join(',') : ''
        }
        delete submitform.dateTime
        this.$request.post('/brandColumn', submitform, true).then(res => {
          if (res) {
            const resData = res.data || []
            this.setColumn(resData)
            this.$store.commit('SETSPINNING', false)
            resolve(true)
          }
        })
      })
    },
    setColumn (column) {
      const leftKey = ['group_name', 'level1name', 'level2name', 'level3name']
      column.forEach(item => {
        this.columns.push({
          fieldName: item.key,
          title: item.value,
          fixed: this._setFixed(item.key, column.length),
          align: leftKey.includes(item.key) ? 'left' : 'right',
          width: this._setWidth(item.key, column.length),
          children: item.children ? this.dealChild(item.children, column) : null
        })
      })
    },
    dealChild (item, column) {
      const arr = []
      item.forEach(item => {
        arr.push({
          fieldName: item.key,
          title: item.value,
          fixed: '',
          width: this._setWidth(item.key, column.length)
        })
      })
      return arr
    },
    getTableData () {
      this.tableData = []
      this.$store.commit('SETSPINNING', true)
      const submitform = {
        ...this.form,
        groupList: this.form.groupList ? this.form.groupList.join(',') : ''
      }
      delete submitform.dateTime
      this.$request.post('/brandList', submitform, true).then(res => {
        const resultData = res.data || []
        this.setTableData(resultData)
      })
    },
    async setTableData (resultData) {
      const arr = []
      resultData.forEach(item => {
        arr.push(item.level1id)
        this.tableData.push(item)
      })
      const fromatIdArr = ['groupId', 'level1id']
      // fromatIdArr.forEach(item => {
      //   this.tableData.sort((item) => {

      //   })
      // })

      fromatIdArr.forEach((item, index) => {
        const formatRow = formatRowspanAndColspan(this.tableData, item)
        this.formatMerge(formatRow, index, 1)
      })
      this.$nextTick(() => {
        this.$refs.xTable.reloadData(this.tableData)
        this.$emit('tableRender', true)
      })
      //
    },
    // 合并当前第1列，合并1列
    formatMerge (formatRow, col = 0, colspan = 1) {
      const rowArr = []
      formatRow.forEach(item => {
        if (item.num) {
          rowArr.push(item.num)
        }
      })
      rowArr.reduce((prev, cur) => {
        this.mergeCells.push(
          { row: prev, col: col, rowspan: cur, colspan: colspan }
        )
        return cur + prev
      }, 0)
      // console.log(this.mergeCells)
    },
    tableSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map((item, index) => {
          Number(item[column.property] ? item[column.property].replace(/,/g, '') : '-')
        })
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return Number(Number(prev) + Number(curr)).toFixed(2)
            } else {
              return Number(prev).toFixed(2)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      return [sums]
    },
    cellDbClick (row) {
      // this.tableData.forEach(item => {
      //   item.cellEdit = 0
      // })
      row.data[row.$rowIndex].cellEdit = 1
      const cellVal = row.data[row.$rowIndex][row.column.property].replace(/,/g, '')
      if (Number(cellVal)) {
        this.tableCellEditVal = Number(cellVal)
        this.tableCellOrginVal = Number(cellVal)
      } else {
        this.tableCellEditVal = ''
        this.tableCellOrginVal = ''
      }
      this.currentEditCellKey = row.column.property
    },
    tableCellBlur (row) {
      // debugger
      // console.log(1)
      // row.cellEdit = 0
    },
    tableCellInput (val, row) {
      // const reg = /^\d+(\.\d{0,2})?$/
      this.tableCellEditVal = this.tableCellEditVal.replace(/[^\d|.]/g, '')
      const cellSplit = this.tableCellEditVal.split('.')
      if (cellSplit.length > 2) {
        this.tableCellEditVal = String(this.tableCellEditVal).replace('.', '')
        return
      }
      if (cellSplit.length === 2) {
        if (cellSplit[1].length > 2) {
          if (this.cellInputWatch > this.tableCellEditVal) {
            this.tableCellEditVal = String(this.tableCellEditVal).replace('.', '')
          } else {
            this.tableCellEditVal = this.tableCellEditVal.toString().substr(0, this.tableCellEditVal.toString().length - 1)
          }
        }
      }
    }
  },
  directives: {
    focus: {
      inserted (el, binding, vnode) {
        el.querySelector('input').focus()
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
