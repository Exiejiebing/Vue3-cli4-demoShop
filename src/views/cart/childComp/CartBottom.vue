<template>
  <van-submit-bar :price="totalPrice" button-text="结算" @submit="onSubmit">
    <van-checkbox v-model="checkedAll" checked-color="#e93b3d" @toggle="allCheckedOnClick">全选</van-checkbox>
  </van-submit-bar>
</template>

<script>
export default {
  name: 'CartBottom',
  props: {
    totalPrice: {
      type: Number,
      default() {
        return 0
      }
    },
    checkedAll: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  setup(props, { emit }) {
    // 全选
    const allCheckedOnClick = () => {
      emit('allCheckedOnClick')
    }

    // 结算
    const onSubmit = () => {
      emit('onSubmit')
    }

    return {
      allCheckedOnClick,
      onSubmit
    }
  }
}
</script>

<style scoped lang="scss">

</style>