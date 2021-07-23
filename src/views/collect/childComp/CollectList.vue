<template>
  <van-swipe-cell class="list-item" v-for="item in list" :key="item.id">
    <van-card :title="item.goods.title" 
      :thumb="item.goods.cover_url" :lazy-loa="true" 
      @click="detailOnClick(item.goods_id)"></van-card>
    <template #right>
      <van-button square type="danger" text="取消收藏" class="delete-button" @click="cancelOnClick(item.goods_id)" />
    </template>
  </van-swipe-cell>
</template>

<script>
  export default {
    name: 'CollectList',
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    emits: [
      'detailOnClick',
      'cancelOnClick'
    ],
    setup(props, { emit }) {
      // 跳转到详情
      const detailOnClick = (id) => {
        emit('detailOnClick', id)
      }
      // 取消收藏
      const cancelOnClick = (id) => {
        emit('cancelOnClick', id);
      }

      return {
        detailOnClick,
        cancelOnClick,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-item {
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .delete-button {
    height: 100%;
  }
</style>