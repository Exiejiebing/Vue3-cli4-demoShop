<template>
  <!-- 内容 -->
  <router-view v-slot="{ Component }">
    <transition name="component-fade" mode="out-in">
      <keep-alive :include="$store.state.keepAliveList">
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>
  <tab-control v-if="$route.meta.isShowFooter"/>
</template>

<script>
  // components
  import TabControl from 'components/content/tabcontrol/TabControl';

  export default {
    name: 'App',
    components: {
      // components
      TabControl
    }
  }
</script>

<style>
  @import 'assets/css/base.css';
  .van-nav-bar {
    background: var(--color-tint);
  }
</style>
