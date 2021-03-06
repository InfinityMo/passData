import Vue from 'vue'
import Vuex from 'vuex'
import { createUUID } from '@/common/utils/funcStore'
import axios from '@/common/network/request'
import { Message } from 'element-ui'
import createVuexAlong from 'vuex-along'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spinning: false, // 加载loading的状态
    cacheData: [], // 当前页面剩余的数据
    userData: {},
    trackId: '',
    permissionsCode: '',
    enterClassifyFlag: false
    // tableDataAll: []
  },
  getters: {
    getCacheData: state => state.cacheData,
    getUserData (state) {
      const userData = state.userData || {}
      if (Object.keys(userData).length <= 0) {
        state.userData = JSON.parse(sessionStorage.getItem('userData'))
      }
      return state.userData || {}
    },
    getEnterClassifyFlag: state => state.enterClassifyFlag
    // getTableAllData: state => state.tableDataAll
  },
  mutations: {
    // 突变配置加载loading的状态
    SETSPINNING (state, payload) {
      state.spinning = payload
    },
    SAVECACHEDATA (state, payload) {
      state.cacheData = []
      state.cacheData = payload
    },
    SAVEUSERINFO (state, payload) {
      state.userData = payload
    },
    SAVEPERMISSIONSCODE (state, payload) {
      state.permissionsCode = payload
    },
    SAVETRACKID (state, payload) {
      state.trackId = payload
    },
    SETENTERCLASSIFYFLAG (state, payload) {
      state.enterClassifyFlag = payload
    },
    RESETHEADERDATA (state) {
      state.trackId = ''
      state.permissionsCode = ''
      state.userData = {}
      state.permissionsCode = ''
    }
  },
  // 配置异步提交状态
  actions: {
    getUserInfo ({ commit }, form) {
      sessionStorage.removeItem('userData')
      commit('RESETHEADERDATA')
      commit('SAVETRACKID', createUUID())
      return new Promise((resolve, reject) => {
        axios.post('/login', form).then(res => {
          const { data } = res
          if (res.errorCode === 1) {
            // 将用户信息保存在session中
            sessionStorage.setItem('userData', JSON.stringify({
              staffId: data.userName
            }))
            commit('SAVEPERMISSIONSCODE', data.permissionsCode)
            resolve(true)
          } else if (res.errorCode === 1000) {
            Message.warning('用户名或密码有误，请核对用户名或密码')
          } else if (res.errorCode === 1001) {
            Message.error('当前账号无访问权限，请联系管理员')
          }
        })
      })
    },
    // 重置vuex
    resetUSerInfo ({ commit }) {
      commit('RESETHEADERDATA')
    }
  },
  // 配置store模块
  modules: {
    // menu
  },
  plugins: [
    createVuexAlong({
      name: 'promot',
      local: false,
      session: {
        list: ['trackId', 'permissionsCode']
      }
    })
  ]
})
