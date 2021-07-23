<template>
  <div id="address">
    <!-- 导航栏 -->
    <nav-bar title="地址管理" :isShowLeft="true"></nav-bar>
    <!-- 地址列表 -->
    <address-list :list="list" @delOnClick="delOnClick" @defaultOnClick="defaultOnClick"></address-list>
    <div class="add">
      <van-button round block color="#e93b3d" @click="addOnClick">新增地址</van-button>
    </div>
  </div>
</template>

<script>
  import { onMounted, reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import { Toast } from 'vant';
  import { getAddressList, delAddress, setDefaultAddress } from 'network/address';

  // childComp
  import AddressList from './childComp/AddressList';
  // components
  import NavBar from 'components/content/navBar/NavBar';

  export default {
    name: 'Address',
    components: {
      // childComp
      AddressList,
      // components
      NavBar
    },
    setup() {
      const router = useRouter();
      // 数据模型
      const state = reactive({
        list: []
      })

      // 初始化网络请求数据
      const init = () => {
        getAddressList().then(result => {
          state.list = result.data;
        })
      }

      // 挂载
      onMounted(() => {
        init();
      })

      // 新增
      const addOnClick = () => {
        router.push({
          path: '/addressMotify',
          query: {
            type: 'add'
          }
        })
      }

      // 设为默认
      const defaultOnClick = (id) => {
        Toast.loading({ forbidClick: true });
        setDefaultAddress(id).then(result => {
          // 重新初始化数据
          init();
          Toast.clear();
        })
      }

      // 删除
      const delOnClick = (id) => {
        Toast.loading({ forbidClick: true });
        delAddress(id).then(result => {
          // 重新初始化数据
          init();
          Toast.clear();
        })
      }

      return {
        ...toRefs(state),
        addOnClick,
        defaultOnClick,
        delOnClick
      }
    }
  }
</script>

<style scoped lang="scss">
  .add {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>