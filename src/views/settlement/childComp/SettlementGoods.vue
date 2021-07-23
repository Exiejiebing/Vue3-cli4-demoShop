<template>
  <div class="goods" v-if="goods">
    <van-card v-for="item in goods" :key="item.id"
      :num="item.num"
      :price="item.goods.price"
      :title="item.goods.title"
      :thumb="item.goods.cover_url"
      lazy-load></van-card>
  </div>
  
</template>

<script>
  export default {
    name: 'SettlementGoods',
    props: {
      goods: {
        tppe: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .goods {
    margin: 10px;
    ::v-deep .van-card {
      border-radius: 8px;
    }
  }
</style>