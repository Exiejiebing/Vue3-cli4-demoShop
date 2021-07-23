<template>
  <div class="info" v-if="Object.keys(user).length">
    <img v-lazy="user.avatar_url">
    <div class="user">
      <p><strong>{{user.name}}</strong></p>
      <p>邮箱:{{user.email}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProfileInfo',
    props: {
      user: {
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
    height: 100px;
    padding: 10px 20px;
    background: var(--color-tint);
    border-bottom-left-radius: 10%;
    border-bottom-right-radius: 10%;
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .user {
      font-size: 14px;
      color: #FFFFFF;
      margin-left: 10px;
      line-height: 1.5;
    }
  }
</style>