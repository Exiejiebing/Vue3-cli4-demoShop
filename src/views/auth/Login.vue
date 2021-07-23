<template>
  <div id="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" fixed border></van-nav-bar>
    <van-form @submit="onSubmit" class="form">
      <img src="https://img01.yzcdn.cn/vant/logo.png">
      <van-field
        v-model="email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="auth" @click="onClick">已有账号？立即注册</div>
      <div style="margin: 16px;">
        <van-button round block native-type="submit" color="#e93b3d">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { Toast, Notify } from 'vant';
  import { login } from 'network/auth';

  export default {
    name: 'Login',
    setup() {
      const router = useRouter();
      const store = useStore();
      // 注册信息
      const info = reactive({
        email: '',
        password: '',
      })

      // 提交登录
      const onSubmit = (values) => {
        // 网络请求
        login(values).then((result) => {
          // 使用window.localStorage保存token在本地----setItem(key,value), getItem(key)
          window.localStorage.setItem('token', result.access_token);
          // 临时判断token是否存在，利用vuex--isLogin保存
          store.commit('setLogin', true);
          // 登录成功提示
          Toast.success('登录成功');
          // 清除form表单数据
          info.email = '';
          info.password = '';
          // 返回上一页
          setTimeout(() => {
            router.back();
          }, 500);
        });
      }

      // 跳转注册页面
      const onClick = () => {
        router.push({
          path: '/register'
        })
      }

      return {
        ...toRefs(info),
        onSubmit,
        onClick
      }
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .van-nav-bar__title {
    color: #FFFFFF;
  }
  .form {
    margin: 80px 10px;
    text-align: center;
    .auth {
      font-size: 12px;
      color: #e93b3d;
      text-align: left;
      margin-top: 15px;
    }
    img {
      width: 60px;
      height: 60px;
    }
  }
</style>