<template>
  <van-popup
    v-model:show="info.show"
    closeable
    position="bottom"
    :style="{ height: '40%' }"
    @close="payOnClose">
    <template #default>
      <div class="content">
        <div>
          <p>支付宝</p>
          <img :src="info.alipay">
        </div>
        <div>
          <p>微信</p>
          <img :src="info.wechat">
        </div>
      </div>
    </template>
  </van-popup>
</template>

<script>
  import { useRouter } from 'vue-router';

  export default {
    name: 'SettlementPay',
    props: {
      info: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    setup(props) {
      const router = useRouter();

      // 关闭窗口直接跳转到订单详情页
      const payOnClose = () => {
        router.push({
          path: '/orderDetail',
          query: {
            id: props.info.order_id
          }
        })
      }

      return {
        payOnClose
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    display: flex;
    justify-content: space-between;
    padding: 50px 30px 0;
    text-align: center;
    line-height: 1.5;
    img {
      width: 100px;
      height: 100px;
    }
  }
</style>