<template>
  <div id="register">
    <!-- 导航栏 -->
    <van-nav-bar title="注册" fixed border></van-nav-bar>
    <van-form @submit="onSubmit" class="form">
      <img src="https://img01.yzcdn.cn/vant/logo.png">
      <van-field
        v-model="name"
        name="name"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
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
      <van-field
        v-model="password_confirmation"
        type="password"
        name="password_confirmation"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请确认密码' }]"
      />
      <div class="auth" @click="onClick">已有账号？立即登录</div>
      <div style="margin: 16px;">
        <van-button round block native-type="submit" color="#e93b3d">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import { Toast, Notify } from 'vant';
  import { useRouter } from 'vue-router';
  import { register } from 'network/auth';

  export default {
    name: 'Register',
    setup() {
      const router = useRouter();
      // 注册信息
      const info = reactive({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      })

      // 提交注册
      const onSubmit = (values) => {
        // 验证信息
        if (info.password != info.password_confirmation) {
          Notify('密码不一致');
        }
        // 网络请求
        register(values).then((result) => {
          // 注册成功提示
          Toast.success('注册成功');
          // 清除form表单数据
          info.name = '';
          info.email = '';
          info.password = '';
          info.password_confirmation = '';
          // 返回登录页面
          setTimeout(() => {
            router.push({
              path: '/login'
            })
          }, 500);
        });
      }

      // 跳转登录页面
      const onClick = () => {
        router.push({
          path: '/login'
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