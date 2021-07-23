<template>
  <div class="info" v-if="Object.keys(info).length">
    <p>订单编号：<span>{{info.order_no}}</span></p>
    <p>下单时间：<span>{{info.updated_at}}</span></p>
    <p v-if="info.pay_type">支付方式：<span>{{info.pay_type}}</span></p>
    <p v-if="info.pay_time">支付时间：<span>{{info.pay_time}}</span></p>
    <p v-if="info.express_type">配送方式：<span>{{info.express_type}}</span></p>
    <p v-if="info.express_no">配送单号：<span>{{info.express_no}}</span></p>
    <p class="money">实付款：<span><small>￥</small>{{info.amount}}</span></p>
  </div>
</template>

<script>
  export default {
    name: 'OrderDetailInfo',
    props:{
      info: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .info {
    background: #FFFFFF;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 10px;
    p {
      font-size: 12px;
      margin-bottom: 10px;
    }
    span {
      margin-left: 10px;
    }
    .money {
      color: #e93b3d; 
      font-size: 14px;
      display: inherit;
      text-align: right;
      margin-bottom: 0;
    }
  }
</style>