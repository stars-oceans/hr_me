// 导入路由文件 resetRouter 重置路由对象方法
// 导入 3 个控制 token 方法
import { getUserInfo, loginAPI } from '@/api';
import { getToken, removeToken, setToken } from '@/utils/auth';
// 导入 API 接口
const getDefaultState = () => {
  return {
    token: getToken(), // token 字符串(默认值通过 getToken 的方法 去取)
    userinfo: '',
    avatar: ''
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
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 删除 token的方法
  REMOVE_TOKEN: (state) => {
    state.token = ''
    removeToken()  // 给本地存一份
  },
}

const actions = {
  // 登录存入 token
   async loginAction ({commit} , data){
    const {data : res} = await  loginAPI(data)
    commit('SET_TOKEN', res.data)
    return res
  },

  // 获取用户信息的 actions
    async getUserInfoActions ({commit}) {
      const { data : res } =  await  getUserInfo()
      console.log(res);
      commit('SET_NAME',res.data)
   }
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

