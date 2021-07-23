<template>
  <div class="order">
    <van-grid :column-num="5">
      <van-grid-item class="tobepaid" icon="bill-o" text="待付款" :to="{path: '/order', query: {status: 1}}" />
      <van-grid-item icon="send-gift-o" text="待发货" :to="{path: '/order', query: {status: 2}}" />
      <van-grid-item icon="send-gift-o" text="待收货" :to="{path: '/order', query: {status: 3}}" />
      <van-grid-item icon="chat-o" text="已过期" :to="{path: '/order', query: {status: 5}}" />
      <van-grid-item class="myorder" icon="orders-o" text="我的订单" to="/order" />
    </van-grid>
  </div>
</template>

<script>
  export default {
    name: 'ProfileOrder'
  }
</script>

<style scoped lang="scss">
  .order {
    margin: 10px;
    ::v-deep .van-grid-item__text, ::v-deep .van-grid-item__content {
      color: #000000;
    }
    .tobepaid ::v-deep .van-grid-item__content {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
    .myorder ::v-deep .van-grid-item__content {
      color: #e93b3d;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
</style>