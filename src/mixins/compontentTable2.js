
const compontentTable = {
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    _setFixed (key, columnLength) {
      const clientHeight = document.documentElement.clientWidth || document.body.clientWidth
      if (clientHeight < 1920) {
        // return columnLength > 7 ? key === 'group_name' ? 'left' : '' : ''
        return columnLength > 7 ? key === 'brand' ? 'left' : '' : ''
      } else {
        // return columnLength > 11 ? key === 'group_name' ? 'left' : '' : ''
        return columnLength > 11 ? key === 'brand' ? 'left' : '' : ''
      }
    },
    _setWidth (key, columnLength) {
      const clientHeight = document.documentElement.clientWidth || document.body.clientWidth
      let width = ''
      // if (key === 'group_name') {
      //   width = '140'
      //   return width
      // }
      if (key === 'brand') {
        width = '140'
        return width
      }
      if (key === 'level3') {
        width = '190'
        return width
      }
      // if (key === 'level3name') {
      //   width = '190'
      //   return width
      // }
      if (clientHeight < 1920) {
        width = columnLength > 7 ? '160' : ''
      } else {
        width = columnLength > 11 ? '160' : ''
      }
      // debugger
      return width
    }
  }
}

export default compontentTable
