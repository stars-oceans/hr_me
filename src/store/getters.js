const getters = {
  // 计算属性名: state => 返回计算属性值
  // 注意: 因为 getters 在根 store 里配置的, 所以这个 state 全局
  // ( 相当于 $store.state )
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
// 逻辑页面, 可以直接使用这些 geters, 而不必自己 store.state去找模块里 state 变量
// 少写代码
