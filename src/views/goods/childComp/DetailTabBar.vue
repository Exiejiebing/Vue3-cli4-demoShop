<template>
  <van-tabs
    v-if="Object.keys(goods).length"
    class="tab-bar"
    v-model:active="active" 
    offset-top="46" 
    color="#e93b3d"  
    scrollspy sticky>
    <van-tab v-for="(item, index) in title" :key="index" :title="item">
      <!-- 概述 -->
      <div v-if="index == 0" class="goods" v-html="goods.details"></div>
      <!-- 评价 -->
      <div v-else-if="index == 1" class="comments">
        <detail-comment :list="goods"></detail-comment>
      </div>
      <!-- 推荐 -->
      <div v-else>
        <van-divider :style="{color: '#e93b3d', borderColor: '#e93b3d', padding: '0 30px'}">看了又看</van-divider>
        <goods-list-item :list="recommends"></goods-list-item>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script>
  import { ref } from 'vue';
  // childComp
  import DetailComment from './DetailComment';
  // components
  import GoodsListItem from 'components/content/goods/GoodsListItem';

  export default {
    name: 'DetailTabBar',
    props: {
      title: {
        type: Array,
        default() {
          return []
        }
      },
      goods: {
        type: Object,
        default() {
          return {}
        }
      },
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      // childComp
      DetailComment,
      // components
      GoodsListItem
    },
    setup() {
      // van-tabs参数
      let active = ref('0');

      return {
        active
      }
    }
  }
</script>

<style scoped lang="scss">
  .tab-bar {
    padding-bottom: 60px;
    .goods {
      background: var(--color-background);
      ::v-deep img {
        width: 100%;
        height: 100%;
      }
    }
    .comments {
      padding: 20px 10px 0 10px;
    }
  }
</style>