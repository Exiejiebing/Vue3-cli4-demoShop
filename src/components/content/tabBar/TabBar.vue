<template>
  <van-sticky :offset-top="46" v-if="title">
    <van-tabs v-model:active="active" color="#e93b3d" @click="onClick">
      <van-tab v-for="(item, key) in title" :title="item" :name="key"></van-tab>
    </van-tabs>
  </van-sticky>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import { useRoute } from 'vue-router';

  export default {
    name: 'TabBar',
    props: {
      title: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    setup(props, { emit }) {
      const route = useRoute()
      // van-tabs参数
      const state = reactive({
        // 需要设置为Number类型，才会生效
        active: Number(route.query.status) ? Number(route.query.status) : 0
      });

      const onClick = (name) => {
        emit('onClick', name)
      }

      return {
        ...toRefs(state),
        onClick
      }
    }
  }
</script>