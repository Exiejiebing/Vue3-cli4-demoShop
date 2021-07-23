<template>
  <div id="profile" v-if="Object.keys(user).length">
    <!-- 用户信息 -->
    <profile-info :user="user"></profile-info>
    <!-- 订单管理 -->
    <profile-order></profile-order>
    <!-- 其他配置 -->
    <profile-setting></profile-setting>
    <!-- 退出登录 -->
    <profile-logout @logoutOnClick="logoutOnClick"></profile-logout>
  </div>
</template>

<script>
  import { onActivated, onMounted, reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { Toast } from 'vant';

  import { getUserInfo } from 'network/profile';
  import { logout } from 'network/auth';

  import ProfileInfo from './childComp/ProfileInfo';
  import ProfileSetting from './childComp/ProfileSetting';
  import ProfileLogout from './childComp/ProfileLogout';
  import ProfileOrder from './childComp/ProfileOrder';

  export default {
    name: 'Profile',
    components: {
      // childComp
      ProfileInfo,
      ProfileSetting,
      ProfileLogout,
      ProfileOrder
    },
    setup() {
      const router = useRouter();
      const store = useStore();
      // 数据模型
      const state = reactive({
        user: {},
        scrollTop: 0,
      })
      
      // 初始化网络请求数据
      const init = () => {
        Toast.loading({ forbidClick: true, loadingType: 'spinner' });
        getUserInfo().then((result) => {
          state.user = result;
          Toast.clear();
        });
      }

      // 挂载
      onMounted(() => {
        init();
      })

      // 激活组件
      onActivated(() => {
        if (store.state.user.name && state.user.name != store.state.user.name) {
          init();
        }
      })

      // 退出登录
      const logoutOnClick = () => {
        Toast.loading({ forbidClick: true, loadingType: 'spinner' })
        logout().then(result => {
          // 清除储存在本地的token
          window.localStorage.setItem('token', '');
          // 清除储存在vuex中的状态
          store.commit('setLogin', false);
          // 直接跳转到登录页面
          router.push({
            path: '/login'
          })
        })
      }

      return {
        ...toRefs(state),
        logoutOnClick
      }
    }
  }
</script>

<style scoped lang="scss">
  #profile {
    background: #eeeeee;
    height: 100vh;
  }
</style>l