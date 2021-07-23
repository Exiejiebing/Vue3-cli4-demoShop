<template>
  <van-swipe v-if="list.length" 
    class="swiper" 
    :autoplay="3000" 
    indicator-color="#e93b3d">
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <img v-lazy="item.img_url" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
  export default {
    name: 'Swiper',
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .swiper {
    width: 100%;
    img {
      width: 100%;
    }
  }
</style>