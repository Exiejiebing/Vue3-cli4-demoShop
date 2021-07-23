<template>
  <div id="collect">
    <!-- 导航栏 -->
    <nav-bar title="我的收藏" :isShowLeft="true"></nav-bar>
    <!-- 收藏列表 -->
    <div class="list" v-if="list.length">
      <van-list v-model="loading" :finished="finished" :immediate-check="false" @load="onLoad">
        <collect-list :list="list" @detailOnClick="detailOnClick" @cancelOnClick="cancelOnClick"></collect-list>
      </van-list>
    </div>
  </div>
</template>

<script>
  import { onMounted, reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import { Toast } from 'vant';
  import { getCollectList, setCollectStatus } from 'network/collect';
  // childComp
  import CollectList from './childComp/CollectList';
  // components
  import NavBar from 'components/content/navBar/NavBar';

  export default {
    name: 'Collect',
    components: {
      // childComp
      CollectList,
      // components
      NavBar
    },
    setup() {
      const router = useRouter();
      // 数据模型
      const state = reactive({
        list: [],
        page: 0,
        loading: false,
        finished: false
      })

      // 初始化网络请求数据
      const init = () => {
        _getCollectList()
      }

      // 封装网络请求列表数据
      const _getCollectList = (type = '') => {
        if (type == 'load') {
          // 清空列表数据
          state.finished = true;
        }
        const page = state.page + 1;
        getCollectList(page).then(result => {
          state.list = state.list.concat(result.data);
          state.page += 1;
          if (type == 'load') {
            // 设置为非加载中
            state.loading = false;
            // 是否获取到数据
            if (result.data.length) {
              state.finished = false;
            } else {
              state.finished = true;
              Toast({ message: '没有更多数据' });
            }
          }
        })
      }

      // 挂载
      onMounted(() => {
        init();
      })

      // 加载更多
      const onLoad = () => {
        _getCollectList('load')
      }

      // 跳转详情页
      const detailOnClick = (id) => {
        router.push({
          path: '/goodsDetail',
          query: {
            id
          }
        })
      }

      // 取消收藏
      const cancelOnClick = (id) =>{
        setCollectStatus(id).then(result => {
          if (result.status == 204) {
            Toast('取消成功');
            state.list = [];
            state.page = 0;
            init();
          }
        })
      }

      return {
        ...toRefs(state),
        onLoad,
        detailOnClick,
        cancelOnClick
      }
    }
  }
</script>

<style lang="scss" scoped>
  #collect {
    background: #eeeeee;
    min-height: 100vh;
    margin-top: var(--van-nav-bar-height);
    .list {
      padding: 10px;
    }
  }
</style>