<template>
  <div class="bottom" v-if="info.status != 2 && info.status != 5">
    <van-button v-if="info.status == 1" 
      round 
      size="small" 
      color="#e93b3d" 
      :loading="info.loading" 
      @click="goPayOnClick">去支付</van-button>
    <van-button v-else-if="info.status == 3 || info.status == 4" 
      round 
      size="small" 
      color="#e93b3d" 
      :loading="info.loading" 
      @click="goPayOnClick">去支付</van-button>
  </div>
</template>

<script>
  export default {
    name: 'OrderDetailBottom',
    props: {
      info: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    setup(props, { emit }) {
      const goPayOnClick = () => {
        emit('goPayOnClick')
      }

      return {
        goPayOnClick
      }
    }
  }
</script>

<style scoped lang="scss">
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    width: 100%;
    padding-right: 10px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>