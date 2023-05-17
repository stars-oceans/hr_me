import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings, // 暂无用处
  fixedHeader: fixedHeader, // 头部导航是固定定位
  sidebarLogo: sidebarLogo // 侧边栏头部是否有 logo 组件
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // 比如外部传参 { key : 'sidebarLogo', value : false }
    if (state.hasOwnProperty(key)) {  // state 对象是否有 'sidebarLogo' 这个 key
      // (有就 true)
      // state 里面这个属性, 才赋值
      // 不想给 state 新增, 而是只想改 (所以加了 if 判断)
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

