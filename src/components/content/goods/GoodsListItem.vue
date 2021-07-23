<template>
  <van-grid class="content" 
    :column-num="2" 
    :border="false" 
    gutter="10">
    <van-grid-item v-for="item in list" :key="item.id">
      <template #icon><img v-lazy="item.cover_url" @click="onClick(item.id)" /></template>
      <template #text>
        <p class="title">{{item.title}}</p>
        <div class="other" @click="onCollect(item.id)">
          <span class="price"><small>￥</small><strong>{{item.price}}</strong></span>
          <van-icon name="star-o" />
          <span>{{item.collects_count}}</span>
        </div>
      </template>
    </van-grid-item>
  </van-grid>
</template>

<script>
  import { useRouter } from 'vue-router';

  export default {
    name: 'DetailRecommend',
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    emits: [
      'collectOnClick'
    ],
    setup(props, { emit }) {
      const router = useRouter();

      // 路由跳转页面
      const onClick = (id) => {
        router.push({
          path: '/goodsDetail',
          query: {
            id
          }
        })
      }

      const onCollect = (id) => {
        emit('collectOnClick', id);
      }

      return {
        onClick,
        onCollect
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    font-size: 12px;
    ::v-deep .van-grid-item__content {
      border-radius: 8px;
    }
    img {
      width: 100%;
    }
    .title {
      margin-top: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
    }
    .other {
      padding-top: 10px;
      .price {
        color: var(--color-high-text);
        padding-right: 10px;
      }
      .van-icon:before {
        padding-right: 5px;
      }
    }
    .van-grid-item {
      width: 50%;
    }
  }
</style>