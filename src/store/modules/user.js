// 导入路由文件 resetRouter 重置路由对象方法
// 导入 3 个控制 token 方法
import { getUserAvatar, getUserInfo, loginAPI } from '@/api';
import { getToken, removeToken, setToken } from '@/utils/auth';
// 导入 API 接口
const getDefaultState = () => {
  return {
    token: getToken(), // token 字符串(默认值通过 getToken 的方法 去取)
    userinfo: '',
    avater: ''
  }
}
// state 对象来自于上面方法返回,还是定义state 对象
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)  // 给本地存一份
  },
  SET_NAME: (state, userinfo) => {
    state.userinfo = userinfo
  },

  // 删除 token的方法
  REMOVE_TOKEN: (state) => {
    state.token = ''
    removeToken()  //删除本地的
  },
  REMOVE_USER(state) {
    state.userinfo = ''
  },
  // 上传头像的方法
  UPLOAD_AVATAR: (state, avater) => {
    // console.log('vuex');
    // console.log(avater);
    state.avater = avater
  }
}

const actions = {
  // 登录存入 token
  async loginAction({ commit }, data) {
    const { data: res } = await loginAPI(data)
    commit('SET_TOKEN', res.data)
    return res
  },

  // 获取用户信息的 actions
  async getUserInfoActions({ commit }) {
    const { data: res } = await getUserInfo()
    console.log(res.data.userId);
    // TODO: 因为上面的 id 获取的图片不行  先写 固定
    const { data: res2 } = await getUserAvatar('604f764971f93f3ac8f365d1')
    commit('SET_NAME', { ...res.data, ...res2.data })
  },
  // 退出登录
  logOutActions({ commit }) {
    commit('REMOVE_TOKEN')
    commit('REMOVE_USER')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

