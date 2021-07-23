<template>
  <van-collapse class="nav" v-model="activeName" accordion v-if="list.length">
    <van-collapse-item v-for="item in list" :key="item.id" :name="item.id" :title="item.name" :disabled="!item.children.length">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="cItem in item.children" 
          :key="cItem.id" 
          :title="cItem.name"
          @click="onClick(cItem.id)" />
      </van-sidebar>
    </van-collapse-item>
  </van-collapse>
</template>

<script>
  import { ref } from 'vue';

  export default {
    name: 'CatLeftMenu',
    props: {
      list:{
        type: Array,
        default() {
          return []
        }
      }
    },
    setup(props, { emit }) {
      // van-collapse参数
      let activeName = ref('0');
      // van-sidebar参数
      let activeKey = ref(0);

      const onClick = (category_id) => {
        emit('onClick', category_id)
      }

      return {
        activeName,
        activeKey,
        onClick,
      }
    }
  }
</script>