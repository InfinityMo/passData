
const mixins = {
  data () {
    return {
      PAGING: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  computed: {
  },

  methods: {
    _getSelectData (type) {
      const option = []
      return new Promise((resolve, reject) => {
        this.$request.post('/dropdownlist', { type: type }).then(res => {
          if (res) {
            const dropData = res.data || []
            dropData.map((i) => {
              option.push({
                value: i.value,
                label: i.name
              })
            })
            resolve(option)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    _isLastPage () {
      const lastPage = Math.ceil(this.PAGING.total / this.PAGING.pageSize)
      // 最后一页的条数
      const lastPageLength = this.PAGING.total % this.PAGING.pageSize
      // 判断当前页是否是最后一页
      if (this.PAGING.pageNum === lastPage) {
        if (this.PAGING.pageNum !== 1) {
          if (lastPageLength === 1) {
            this.PAGING.pageNum--
          }
        }
      }
    }
  }
}

export default mixins
