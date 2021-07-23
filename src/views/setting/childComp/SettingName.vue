<template>
  <van-form class="name" @submit="onSubmit">
    <!-- 导航栏 -->
    <van-nav-bar>
      <template #left>
        <van-button type="default" color="#e93b3d" @click="cancelNameOnClick">取消</van-button>
      </template>
      <template #right>
        <van-button type="default" native-type="submit" color="#e93b3d">确定</van-button>
      </template>
    </van-nav-bar>
    <van-field
      v-model="name"
      name="name"
      placeholder="昵称"
      clearable
      :rules="[{ required: true, message: '请填写昵称' }]"
    />
  </van-form>
</template>

<script>
  import { reactive, toRefs } from 'vue';

  export default {
    name: 'SettingName',
    props: {
      name: {
        type: String,
        default() {
          return ''
        }
      }
    },
    emits: [
      'cancelNameOnClick',
      'nameOnSubmit'
    ],
    setup(props, { emit }) {
      // 数据模型
      const state = reactive({
        name: props.name,
      })

      // 取消
      const cancelNameOnClick = () => {
        state.name = '';
        emit('cancelNameOnClick')
      }

      // 确定修改昵称
      const onSubmit = (values) =>{
        emit('nameOnSubmit', values);
        state.name = '';
      }

      return {
        ...toRefs(state),
        cancelNameOnClick,
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
  .name {
    background: #eeeeee;
    height: 100vh;
  }
</style>