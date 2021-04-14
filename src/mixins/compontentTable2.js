
const compontentTable = {
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    _setFixed (key, columnLength) {
      // const clientHeight = document.documentElement.clientWidth || document.body.clientWidth
      return columnLength > 7 ? key === 'groupName' ? 'left' : '' : ''
    },
    _setWidth (key, columnLength, type) {
      // const clientHeight = document.documentElement.clientWidth || document.body.clientWidth
      let width = ''
      if (key === 'groupName') {
        // type&&type==='product'
        width = '140'
        return width
      }
      if (key === 'level1name') {
        width = '70'
        return width
      }
      if (key === 'level2name' || key === 'level3name') {
        width = '200'
        return width
      }
      if (key === 'IPVUV') {
        width = '160'
        return width
      }
      width = '130'
      return width
    },
    _setAlign (item) {
      const leftKey = ['groupName', 'level1name', 'level2name', 'level3name']
      if (item.children) {
        return 'center'
      }
      return leftKey.includes(item.key) ? 'left' : 'right'
    }
  }
}

export default compontentTable
