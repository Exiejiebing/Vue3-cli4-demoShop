<template>
  <!-- 导航栏 -->
  <van-nav-bar
    title="个人信息"
    left-arrow
    @click-left="infoLeftOnClick">
  </van-nav-bar>
  <!-- 个人信息 -->
  <van-cell title="头像" is-link>
    <template #right-icon>
      <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead">
        <div style="display: flex; align-items: center;">
          <img v-lazy="info.avatar_url">
          <van-icon class="van-badge__wrapper van-icon van-icon-arrow van-cell__right-icon" 
            name="arrow">
          </van-icon>
        </div>
      </van-uploader>
    </template>
  </van-cell>
  <van-cell title="邮箱" :value="info.email"></van-cell>
  <van-cell title="昵称" :value="username" is-link @click="nameOnClick"></van-cell>
  <!-- 昵称修改 -->
  <van-popup v-model:show="nameShow" position="bottom" :style="{ height: '100%', width: '100%' }">
    <setting-name :name="info.name" 
      @cancelNameOnClick="cancelNameOnClick"
      @nameOnSubmit="nameOnSubmit">
    </setting-name>
  </van-popup>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import { useStore } from 'vuex';
  import { Toast } from 'vant';
  // childComp
  import SettingName from './SettingName';


  export default {
    name: 'SettingInfo',
    props: {
      info: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      // childComp
      SettingName
    },
    emits: [
      'infoLeftOnClick',
      'nameOnSubmit',
      'avatarAfterRead'
    ],
    setup(props, { emit }) {
      const store = useStore();
      // 数据模型
      const state = reactive({
        nameShow: false,
        username: props.info.name,
        fileList: []
      })

      // 返回按钮
      const infoLeftOnClick = () => {
        state.fileList = [];
        emit('infoLeftOnClick');
      }

      // 跳转到昵称修改页面
      const nameOnClick = () => {
        state.nameShow = true;
      }
      
      // 修改昵称页面关闭
      const cancelNameOnClick = () => {
        state.nameShow = false;
      }

      // 修改昵称
      const nameOnSubmit = (values) => {
        store.dispatch('updataName', values.name)
          .then(result => {
            if (result && result.status == 204) {
              Toast({ message: '修改成功' });
              // 隐藏右侧弹窗
              state.nameShow = false;
              // 改变昵称
              state.username = store.state.user.name;
            }
        })
      }
      
      // 修改头像
      const afterRead = (file) => {
        emit('avatarAfterRead', file)
      }

      return {
        ...toRefs(state),
        infoLeftOnClick,
        nameOnClick,
        cancelNameOnClick,
        nameOnSubmit,
        afterRead
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .van-nav-bar__title {
    color: #FFFFFF;
  }
  ::v-deep .van-nav-bar__arrow {
    font-size: 20px;
    color: #FFFFFF;
  }
  ::v-deep .van-nav-bar__left {
    padding-left: 8px;
  }
  .van-cell {
    align-items: center;
  }
  ::v-deep .van-uploader__preview {
    margin: 0;
  }
  ::v-deep .van-uploader__preview-image, img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
</style>