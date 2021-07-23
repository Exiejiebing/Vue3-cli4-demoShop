<template>
  <div v-if="isShow" class="cart-empty">
    <img src="~assets/images/cart.png">
    <div v-if="$store.state.user.isLogin">
      <p>购物车空空如也，快去挑选中意好货吧</p>
      <van-button van-button round block color="#e93b3d" @click="homeOnClick">马上抢购</van-button>
    </div>
    <div v-else>
      <p>您还没有登录，快去登录吧</p>
      <van-button round block color="#e93b3d" @click="loginOnClick">去登录</van-button>
    </div>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router';

  export default {
    name: 'CartEmpty',
    props: {
      isShow: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    setup() {
      const router = useRouter();

      // 马上抢购--跳转到首页
      const homeOnClick = () => {
        router.push({
          path: '/'
        })
      }

      // 去登录--跳转登录页面
      const loginOnClick = () => {
        router.push({
          path: '/login'
        })
      }

      return {
        homeOnClick,
        loginOnClick
      }
    }
  }
</script>

<style scoped lang="scss">
  .cart-empty {
    margin-top: 100px;
    text-align: center;
    padding: 0 20px;
    img {
      width: 120px;
      height: 120px;
    }
    p {
      font-size: 14px;
      margin: 20px 0;
    }
  }
</style>

