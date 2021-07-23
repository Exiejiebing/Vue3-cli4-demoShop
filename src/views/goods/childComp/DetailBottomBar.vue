<template>
  <van-action-bar>
    <van-action-bar-icon icon="chat-o" text="客服" color="#e93b3d" />
    <van-action-bar-icon icon="cart-o" text="购物车" :badge="$store.state.cartCount" @click="toCartOnClick"/>
    <van-action-bar-icon v-if="!info.is_collect" icon="star-o" text="收藏" @click="collectOnClick(info.id)"/>
    <van-action-bar-icon v-else icon="star" color="#e93b3d" text="收藏" @click="collectOnClick(info.id)" />
    <van-action-bar-button type="warning" text="加入购物车" @click="addCartOnClick(info.id)" />
    <van-action-bar-button type="danger" text="立即购买" @click="buyOnClick(info.id)" />
  </van-action-bar>
</template>

<script>
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { Toast } from 'vant';
  import { addCart } from 'network/cart';

  export default {
    name: 'DetailBottomBar',
    props: {
      info: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    emits: [
      'collectOnClick'
    ],
    setup(props, { emit }) {
      const router = useRouter();
      const store = useStore();

      // 封装网络请求方法
      const _addCart = (id, num = 1) => {
        addCart(id, num).then(result => {
          Toast('加入购物车成功');
          // 设置状态管理中的购物车数量
          store.dispatch('updateCartCount');
          // 设置状态管理中的点击购物车状态
          store.commit('setIsClickAddCart', true);
        })
      }


      // 点击加入购物车事件
      const addCartOnClick = (id) => {
        _addCart(id);
      }

      // 立即购买
      const buyOnClick = (id) => {
        _addCart(id);
        setTimeout(() => {
          router.push({
            path: '/settlement'
          })
        }, 2000);
      }

      // 跳转到购物车页面
      const toCartOnClick = () => {
        router.push({
          path: '/cart'
        })
      }

      // 加入/取消收藏
      const collectOnClick = (id) => {
        emit('collectOnClick', id)
      }

      return {
        addCartOnClick,
        buyOnClick,
        toCartOnClick,
        collectOnClick
      }
    }
  }
</script>

<style scoped lang="scss">

</style>