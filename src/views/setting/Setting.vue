<template>
  <div id="setting" v-if="Object.keys(user).length">
    <!-- 导航栏 -->
    <nav-bar title="账号设置" :isShowLeft="true"></nav-bar>
    <!-- 账户设置 -->
    <van-cell is-link @click="infoOnClick">
      <template #title>
        <div class="info">
          <img v-lazy="user.avatar_url">
          <div class="info-user">
            <p><strong>{{user.name}}</strong></p>
            <p style="color: #c5bbbb;">用户名：{{user.email}}</p>
          </div>
        </div>
      </template>
    </van-cell>
    <van-cell title="修改登录密码" is-link @click="passwordOnClick"></van-cell>
    <!-- 点击用户名，右侧弹出内容 -->
    <van-popup v-model:show="infoShow" position="right" :style="{ height: '100%', width: '100%' }">
      <!-- 个人信息 -->
      <setting-info :info="user" @infoLeftOnClick="infoLeftOnClick" @avatarAfterRead="avatarAfterRead"></setting-info>
    </van-popup>
    <!-- 点击修改密码，底部弹出内容 -->
    <van-popup v-model:show="passwordShow" position="bottom" :style="{ height: '100%', width: '100%' }">
      <!-- 修改密码 -->
      <setting-password @cancelPasswordOnClick="cancelPasswordOnClick" 
        @passwordOnSubmit="passwordOnSubmit">
      </setting-password>
    </van-popup>
  </div>
</template>

<script>
  import { onMounted, reactive, toRefs } from 'vue';
  import { Toast } from 'vant';
  import { getUserInfo, motifyUserAvatar, modifyPassword } from 'network/profile';
  // childComp
  import SettingInfo from './childComp/SettingInfo';
  import SettingPassword from './childComp/SettingPassword';
  // componets
  import NavBar from 'components/content/navBar/NavBar';

  export default {
    name: 'Setting',
    components: {
      // childComp
      SettingInfo,
      SettingPassword,
      // components
      NavBar
    },
    setup() {
      // 数据模型
      const state = reactive({
        user: {},
        infoShow: false,
        passwordShow: false,
      })
      // 初始化网络请求
      const init = () => {
        getUserInfo().then(result => {
          state.user = result
        })
      }

      // 挂载
      onMounted(() =>{
        init();
      })

      // 点击用户信息，右侧弹出个人信息界面
      const infoOnClick = () => {
        state.infoShow = true;
      }

      // 个人信息界面关闭
      const infoLeftOnClick = () => {
        state.infoShow = false;
        init();
      }

      // 点击修改密码，底部弹出修改密码界面
      const passwordOnClick = () => {
        state.passwordShow = true;
      }

      // 修改密码界面关闭
      const cancelPasswordOnClick = () => {
        state.passwordShow = false;
      }

      // 确认修改密码
      const passwordOnSubmit = (values) =>{
        modifyPassword(values).then(result => {
          // 修改成功
          if (result && result.status == '204') {
            Toast({ message: '修改成功' });
            setTimeout(() => {
              state.passwordShow = false;
            }, 1000);
          }
        })
      } 

      // 修改头像
      const avatarAfterRead = (file) => {
        motifyUserAvatar(file.content).then(result => {
          // 修改成功
          if (result && result.status == '204') {
            Toast({ message: '修改成功' });
            setTimeout(() => {
              state.infoShow = false;
              init();
            }, 1000);
          }
        })
      }

      return {
        ...toRefs(state),
        infoOnClick,
        infoLeftOnClick,
        passwordOnClick,
        cancelPasswordOnClick,
        passwordOnSubmit,
        avatarAfterRead
      }
    }
  }
</script>

<style lang="scss" scoped>
  #setting {
    margin-top: var(--van-nav-bar-height);
     .van-cell {
      align-items: center;
    }
    .info {
      display: flex;
      align-items: center;
      .info-user {
        margin-left: 10px;
        font-size: 14px;
        line-height: 1.5;
      }
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  
</style>