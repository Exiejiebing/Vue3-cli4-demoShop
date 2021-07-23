<template>
  <div v-if="Object.keys(info).length" class="info">
    <div class="price"><small>￥</small><strong>{{info.price}}</strong></div>
    <div class="title">
      <van-tag color="#e93b3d" size="medium" round>{{ tag }}</van-tag>
      <strong>{{info.title}}</strong>
    </div>
    <div class="desc">{{info.description}}</div>
    <div class="icon">
      <span>
        <van-icon name="like-o"></van-icon>
        推荐
      </span>
      <span>
        <van-icon name="friends-o"></van-icon>
        帮我选
      </span>
      <span>
        <van-icon name="share-o"></van-icon>
        分享
      </span>
    </div>
  </div>
</template>

<script>
  import { computed } from 'vue';

  export default {
    name: 'DetailInfo',
    props: {
      info: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    setup(props) {
      // 标签字样
      let tag = computed(() => {
        return props.info.is_recommend == 1 ? '推荐' : '热门';
      })

      return {
        tag
      }
    }
  }
</script>

<style scoped lang="scss">
  .info {
    margin: 10px;
    padding: 10px;
    background: #FFFFFF;
    border-radius: 5px;
    div {
      margin-bottom: 10px;
    }
    .price {
      color: var(--color-high-text);
    }
    .title {
      font-size: var(--font-size);
      color: #000000;
    }
    .desc, .icon {
      font-size: 12px;
    }
    .icon {
      display: flex;
      text-align: center;
      padding-top: 10px;
      font-size: var(--font-size);
    }
    .icon span {
      flex: 1;
    }
  }
</style>