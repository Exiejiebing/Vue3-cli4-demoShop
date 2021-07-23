<template>
  <van-tabbar v-model="active" active-color="#e93b3d" route border>
    <!-- 首页 -->
    <van-tabbar-item to="/">
      <span>首页</span>
      <template #icon="props">
        <i class="iconfont" :class="props.active ? 'icon-Home' : 'icon-home'"></i>
      </template>
    </van-tabbar-item>

    <!-- 分类 -->
    <van-tabbar-item to="/category">
      <span>分类</span>
      <template #icon="props">
        <i class="iconfont" :class="props.active ? 'icon-category_fill' : 'icon-category'"></i>
      </template>
    </van-tabbar-item>

    <!-- 购物车 -->
    <van-tabbar-item to="/cart" icon="shopping-cart" :badge="$store.state.cartCount">购物车</van-tabbar-item>

    <!-- 我的 -->
    <van-tabbar-item to="/profile">
      <span>我的</span>
      <template #icon="props">
        <i class="iconfont" :class="props.active ? 'icon-user1' : 'icon-user'"></i>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  import { onMounted, ref } from 'vue';
  import { useStore } from 'vuex';


  export default {
    name: 'TabControl',
    setup() {
      const store = useStore();
      // van-tabbar参数
      let active = ref('0');
    
      onMounted(() => {
        // 页面刷新执行更改购物车数量
        store.dispatch('updateCartCount');
      })

      return {
        active,
      }
    }
  }
</script>

<style scoped lang="scss">

</style>