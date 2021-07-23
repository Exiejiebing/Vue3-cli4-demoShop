export default {
  // 设置登录状态
  setLogin(state, payload) {
    state.user.isLogin = payload
  },
  // 设置购物车数量
  setCartCount(state, payload) {
    state.cartCount = payload;
  },
  // 设置是否点击加入购物车
  setIsClickAddCart(state, payload) {
    state.isClickAddCart = payload;
  },
  // 设置结算地址id
  setSettlementAddressId(state, payload) {
    state.settlementAddressId = payload;
  },
  // 设置用户昵称
  setName(state, payload) {
    state.user.name = payload;
  },
  // 设置keep-alive组件
  setKeepAliveList(state, payload) {
    if (!state.keepAliveList.includes(payload)) {
      state.keepAliveList = state.keepAliveList.concat(payload)
    }
  }
}