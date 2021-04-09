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
               keep-source
               show-footer
               @cell-dblclick="cellDbClick"
               :edit-config="{trigger: 'dblclick', mode: 'cell', showStatus: true,showIcon:false}"
               ref="xTable"
               height="600">
      <vxe-table-column v-for="col in columns"
                        :key="col.fieldName"
                        :field="col.fieldName"
                        :title="col.title"
                        :fixed="col.fixed"
                        :edit-render="{ autofocus: '.vxe-input--inner' }"
                        :width="col.width">
        <template v-slot:edit="{ row }">
          <el-input v-if="col.edit"
                    placeholder="请输入"
                    v-focus
                    maxlength='13'
                    @input="tableCellInput($event,row)"
                    @blur="tableCellBlur(row)"
                    v-model="tableCellEditVal">
          </el-input>
          <div v-else>
            {{row[col.fieldName]}}
          </div>
        </template>
      </vxe-table-column>
      <!-- <vxe-table-column v-for="col in columns"
                        :key="col.fieldName"
                        :field="col.fieldName"
                        :title="col.title"
                        :fixed="col.fixed"
                        :width="col.width">
        <template slot-scope="scope">
          <div v-if="col.fieldName===currentEditCellKey&&col.edit&&scope.row.cellEdit"
               class="has-input">
            <vxe-input placeholder="请输入"
                       maxlength='13'
                       @input="tableCellInput($event,scope.row)"
                       @blur="tableCellBlur(scope.row)"
                       v-model="tableCellEditVal">
            </vxe-input>
          </div>
          <div v-else
               class="normal-cell">
            <div>{{scope.row[col.fieldName]}}</div>
          </div>
        </template>
      </vxe-table-column> -->
    </vxe-table>
  </div>
</template>
<script>
import {
  column, table,
  formatRowspanAndColspan
} from './data'
export default {
  data () {
    return {
      columns: [],
      tableData: [],
      mergeCells: [],
      tableCellOrginVal: '',
      tableCellEditVal: '',
      cellInputWatch: '',
      currentEditCellKey: '',
      validRules: {
        name: [
          { required: true, message: 'app.body.valid.rName' },
          { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
        ],
        sex: [
          { required: true, message: '性别必须填写' }
        ]
      }
    }
  },
  created () {
    this.setColumn()
    this.setTableData()
  },
  methods: {
    setColumn () {
      column.forEach(item => {
        this.columns.push({
          fieldName: item.key,
          title: item.value,
          fixed: item.key === 'brand' ? 'left' : '',
          edit: item.edit,
          width: '155'
        })
      })
    },
    setTableData () {
      table.forEach(item => {
        this.tableData.push(item)
      })

      const formatRow = formatRowspanAndColspan(this.tableData, 'brandId')
      this.formatMerge(formatRow, 0, 1)
      this.$nextTick(() => {
        this.$refs.xTable.reloadData(this.tableData)
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
    },
    tableSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property].replace(/,/g, '')))
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
