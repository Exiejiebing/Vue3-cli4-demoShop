<template>
  <div id="order">
    <!-- 导航栏 -->
    <nav-bar title="订单列表" :isShowLeft="true"></nav-bar>
    <!-- 标签栏 -->
    <tab-bar :title="title" @onClick="tabClick"></tab-bar>
    <!-- 订单列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        @load="onLoad">
        <order-list :list="order_list.list" @detailOnClick="detailOnClick"></order-list>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import { onMounted, reactive, toRefs } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Toast } from 'vant';
  import { getOrderList } from 'network/order';

  // childComp
  import OrderList from './childComp/order/OrderList';
  // components
  import NavBar from 'components/content/navBar/NavBar';
  import TabBar from 'components/content/tabBar/TabBar';

  export default {
    name: 'Order',
    components: {
      // childComp
      OrderList,
      // components
      NavBar,
      TabBar
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      // 数据模型
      const state = reactive({
        title: [
          '全部',
          '待付款',
          '待发货',
          '待收货',
          '待评价',
          '已过期'
        ],
        order_list: {
          list: [],
          page: 0
        },
        loading: false,
        refreshing: false,
        finished: false,
        status: route.query.status ?  route.query.status : 0,
      })

      // 初始化网络数据
      const init = () => {
        _getOrderList()
      }

      // 网络请求订单列表数据
      const _getOrderList = (type = '') => {
        if (type == 'load') {
          state.finished = true;
        }
        const page = state.order_list.page + 1;
        getOrderList(state.status, page).then(result =>{
          result.data.forEach(item => {
            item.status_txt = state.title[item.status]
          });
          // state.order_list.list = state.order_list.list.concat(result.data)
          state.order_list.list.push(...result.data);
          state.order_list.page += 1;
          if (type == 'load') {
            // 设置为非加载中
            state.loading = false;
            state.refreshing = false;
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
      onMounted(() =>{
        init();
      })

      // 标签点击事件
      const tabClick = (name) => {
        /** 切换不跳转页面时数据处理
         * state.status = name;
         * state.order_list.list = [];
         * state.order_list.page = 0;
         * init();
         * onRefresh();
         */
        router.push({
          path: '/order',
          query: {
            status: name
          }
        })
      }

      // 下拉刷新
      const onRefresh = () => {
        // 是否处于加载状态，加载过程不触发load事件
        state.refreshing = true;
        // 清空列表数据
        state.finished = false;
        // 重新加载数据
        state.loading = true;
        onLoad();
      }

      // 上拉加载更多
      const onLoad = () => {
        _getOrderList('load')
      }

      // 点击跳转详情页
      const detailOnClick = (id) => {
        router.push({
          path: '/orderDetail',
          query: {
            id
          }
        })
      }

      return {
        ...toRefs(state),
        tabClick,
        onRefresh,
        onLoad,
        detailOnClick
      }
    }
  }
</script>

<style lang="scss" scoped>
  #order {
    margin-top: var(--van-nav-bar-height);
    background: #eeeeee;
    height: 100%;
  }
</style>