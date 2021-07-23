<template>
  <div class="btn">
    <van-button block round color="#e93b3d" @click="logoutOnClick">退出登录</van-button>
  </div>
</template>

<script>
  export default {
    name: 'ProfileLogout',
    setup(props, { emit }) {
      // 退出登录
      const logoutOnClick = () => {
        emit('logoutOnClick')
      }

      return {
        logoutOnClick
      }
    }
  }
</script>

<style scoped>
  .btn {
    padding: 30px;
  }
</style>