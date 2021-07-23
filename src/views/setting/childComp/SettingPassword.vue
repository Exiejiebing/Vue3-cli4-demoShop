<template>
  <van-form @submit="onSubmit">
    <!-- 导航栏 -->
    <van-nav-bar>
      <template #left>
        <van-button type="default" color="#e93b3d" @click="cancelPasswordOnClick">取消</van-button>
      </template>
      <template #right>
        <van-button type="default" native-type="submit" color="#e93b3d">确定</van-button>
      </template>
    </van-nav-bar>
    <van-field
      v-model="old_password"
      type="password"
      name="old_password"
      label="旧密码"
      placeholder="旧密码"
      :rules="[{ required: true, message: '请填写旧密码' }]"
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
      :rules="[{ required: true, message: '请填写确认密码' }]"
    />
  </van-form>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import { Notify } from 'vant';

  export default {
    name: 'SettingPassword',
    emits: [
      'cancelPasswordOnClick',
      'passwordOnSubmit'
    ],
    setup(props, { emit }) {
      // 数据模型
      const state = reactive({
        old_password: '',
        password: '',
        password_confirmation: ''
      })

      // 取消
      const cancelPasswordOnClick = () => {
        state.password = '';
        state.old_password = '';
        state.password_confirmation = '';
        emit('cancelPasswordOnClick')
      }

      // 确定修改密码
      const onSubmit = (values) =>{
        if (state.password != state.password_confirmation) {
          Notify('密码不一致');
        }
        emit('passwordOnSubmit', values);
        state.password = '';
        state.old_password = '';
        state.password_confirmation = '';
      }

      return {
        ...toRefs(state),
        cancelPasswordOnClick,
        onSubmit
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .van-nav-bar__left {
    padding-left: 0;
  }
  ::v-deep .van-nav-bar__right {
    padding-right: 0;
  }
</style>