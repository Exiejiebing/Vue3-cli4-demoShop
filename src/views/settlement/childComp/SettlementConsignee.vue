<template>
  <div class="consignee" @click="goAddress">
    <div class="arrow">
      <van-icon name="location-o"></van-icon>
    </div>
    <div class="center" v-if="Object.keys(address).length">
      <p>
        <van-tag type="primary" color="#e93b3d" v-if="address.is_default">默认</van-tag>
        {{address.province}}{{address.city}}{{address.county}}
      </p>
      <p class="address"><strong>{{address.address}}</strong></p>
      <p>
        <span>{{address.name}}</span>
        <span style="margin-left: 20px">{{address.phone}}</span>
      </p>
    </div>
    <div class="center" v-else>
      <p class="address"><strong>你还没有添加收货人地址</strong></p>
      <p class="address"><strong>请先添加收货人信息</strong></p>
    </div>
    <div class="arrow">
      <van-icon name="arrow"></van-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SettlementConsignee',
    props: {
      address: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    setup(props, { emit }) {

      // 跳转到地址管理
      const goAddress = () => {
        emit('goAddressOnClick');
      }

      return {
        goAddress
      }
    }
  }
</script>

<style scoped lang="scss">
  .consignee {
    position: relative;
    margin-top: var(--van-nav-bar-height);
    font-size: 12px;
    line-height: 1.5;
    color: #8a8888;
    background: #FFFFFF;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .center {
      flex-grow: 2;
      margin-left:10px
    }
    .address {
      font-size: 14px;
      color: #000000;
    }
    .arrow {
      font-size: 16px;
    }
  }
  .consignee::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: repeating-linear-gradient(-45deg,#ff6c6c 0,#ff6c6c 20%,transparent 0,transparent 25%,var(--van-primary-color) 0,var(--van-primary-color) 45%,transparent 0,transparent 50%);
    background-size: 80px;
    content: '';
  }
</style>