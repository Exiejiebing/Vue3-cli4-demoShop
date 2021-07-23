<template>
  <van-swipe class="home-recommend" :loop="false" :width="80" :show-indicators="false" v-if="goods.length">
    <van-swipe-item v-for="(item, index) in goods" :key="index" @click="onClick(item.id)">
      <img v-lazy="item.cover_url">
      <div class="title">{{item.title}}</div>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
  import { useRouter } from 'vue-router';

  export default {
    name: 'HomeRecommend',
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    setup() {
      const router = useRouter();

      const onClick = (id) => {
        router.push({
          path: '/goodsDetail',
          query:{
            id
          }
        })
      }

      return {
        onClick
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-recommend {
    text-align: center;
    padding: 10px 0 20px 0;
    border-bottom: 5px solid #e4e0e0;
    img {
      width: 90%;
    }
    .title {
      font-size: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
</style>