<template>
  <div class="address" v-if="Object.keys(address).length">
    <van-icon name="location-o"></van-icon>
    <div class="address-info">
      <p style="margin-bottom: 5px;">
        <span><strong>{{address.name}}</strong></span>
        <span><strong>{{address.phone}}</strong></span>
      </p>
      <p>地址：{{address.province}}{{address.city}}{{address.county}}{{address.address}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OrderDetailAddress',
    props: {
      address: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .address {
    background: #FFFFFF;
    border-radius: 10px;
    margin-bottom: 10px;
    display: flex;
    padding: 20px;
    .address-info {
      font-size: 12px;
      line-height: 1.5;
      margin-left: 10px;
      span {
        margin-right: 20px;
      }
    }
  }
</style>