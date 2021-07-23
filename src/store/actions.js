import { getCartList } from "network/cart";
import { motifyUserName } from "network/profile";

export default {
  // 更新购物车数量
  updateCartCount({ state, commit }) {
    // 登录之后才可以获取
    if (state.user.isLogin) {
      getCartList().then((result) => {
        const count = result.data.length || 0;
        commit('setCartCount', count);
      });
    }
  },
  // 更新昵称
  updataName({ commit }, payload) {
    return new Promise((resolve, reject) => {
      motifyUserName(payload).then(result => {
        commit('setName', payload); 
        // 把结果返回
        resolve(result)
      })
    })
  }
}