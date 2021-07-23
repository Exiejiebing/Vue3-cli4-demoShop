<template>
  <van-nav-bar v-if="isShowLeft" :title="title" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>
  <van-nav-bar v-else :title="title" fixed></van-nav-bar>
</template>

<script>
  import { useRouter } from 'vue-router';

  export default {
    name: 'NabBar',
    props: {
      title: {
        type: String,
        default() {
          return ""
        }
      },
      isShowLeft: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    setup() {
      const router = useRouter();
      // 返回上一页
      const onClickLeft = () => {
        router.back()
      }

      return {
        onClickLeft
      }
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .van-nav-bar__title {
    color: #FFFFFF;
  }
  ::v-deep .van-nav-bar__arrow {
    font-size: 20px;
    color: #FFFFFF;
  }
  ::v-deep .van-nav-bar__left {
    padding-left: 8px;
  }
</style>