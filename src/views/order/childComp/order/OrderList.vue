<template>
  <div class="list" v-for="item in list" :key="item.id" @click="onClick(item.id)">
    <div class="list-top">
      <span><strong>{{item.order_no}}</strong></span>
      <span>{{item.status_txt}}</span>
    </div>
    <div class="list-center" v-for="(goods, index) in item.orderDetails.data" :key="index">
      <div class="center-img">
        <img v-lazy="goods.goods.cover_url">
      </div>
      <div class="center-title">
        <strong>{{goods.goods.title}}</strong>
      </div>
      <div class="center-price">
        <p><small>￥</small>{{goods.goods.price}}</p>
        <p><small>×</small>{{goods.num}}</p>
      </div>
    </div>
    <div class="list-bottom">
      <strong>实付款：<small>￥</small>{{item.amount}}</strong>
    </div>
  </div>
</template>

<script>
  import { reactive, toRefs } from 'vue';

  export default {
    name: 'OrderList',
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    emits: [
      'detailOnClick'
    ],
    setup(props, { emit }) {
      const onClick = (id) => {
        emit('detailOnClick', id);
      }
      return {
        onClick
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    border-radius: 10px;
    background: #FFFFFF;
    padding: 10px;
    margin: 10px 0;
    font-size: 12px;
    .list-top {
      display: flex;
      justify-content: space-between;
      color: #000000;
      font-size: 12px;
      margin-bottom: 10px;
    }
    .list-center {
      display: flex;
      justify-content: space-between;
      .center-img {
        width: 30%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .center-title {
        flex-grow: 2;
        margin-top: 10px;
        color: #000000;
      }
      .center-price {
        margin-top: 10px;
        text-align: right;
        p {
          padding-bottom: 5px;
        }
      }
    }
    .list-bottom {
      margin-top: 10px;
      text-align: right;
      color: #000000;
    }
  }
</style>