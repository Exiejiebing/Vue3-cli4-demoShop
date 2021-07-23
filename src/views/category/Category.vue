<template>
  <div id="category">
    <!-- 导航栏 -->
    <nav-bar title="图书兄弟" :isShowLeft="true"></nav-bar>
    <div v-if="isShow">
      <!-- 标签栏 -->
      <van-row class="tab-top" type="flex" justify="end">
        <van-col span="16">
          <tab-bar :title="title" @onClick="tabOnClick"/>
        </van-col>
      </van-row>
      <!-- 分类导航 -->
      <van-row class="content">
        <!-- 左侧导航栏 -->
        <van-col span="8" class="con-left">
          <cat-left-menu :list="categories" @onClick="menuOnClick"></cat-left-menu>
        </van-col>
        <!-- 右侧商品信息 -->
        <van-col span="16" class="con-right">
          <van-list class="list" v-model="loading" 
            :finished="finished"
            :offset="offset"
            :immediate-check="false"
            @load="onLoad">
            <!-- 商品内容 -->
            <cat-goods-list-item :list="showGoodsList"/>
          </van-list>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import { reactive, computed, onMounted, watch, nextTick, onActivated, onDeactivated, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import { Toast } from 'vant';
  import { getCategoryData, getGoodsData } from 'network/category';

  // childComp
  import CatGoodsListItem from './childComp/CatGoodsListItem';
  import CatLeftMenu from './childComp/CatLeftMenu';
  // components
  import TabBar from 'components/content/tabBar/TabBar';
  import NavBar from 'components/content/navBar/NavBar';

  export default {
    name: 'Category',
    components: {
      // childComp
      CatGoodsListItem,
      CatLeftMenu,
      // components
      TabBar,
      NavBar
    },
    setup() {
      //  路由定义
      const router = useRouter();
      const state = reactive({
        //  标签栏标题
        title: {
          sales: '销量排序',
          price: '价格排序',
          comments_count: '评论排序'
        },
        // 分类数据
        categories: [],
        // 当前标签类型
        currentType: 'sales',
         // 当前分类id
        currentCateId: 0,
        // 商品数据模型
        goods: {
          sales: { page: 0, list: []},
          price: { page: 0, list: []},
          comments_count: { page: 0, list: []}
        },
        // van-list参数
        loading: false,
        finished: false,
        offset: 0,
        isShow: false,
        leftScrollTop: 0,
        rightScrollTop: 0
      })
      // 当前商品信息
      let showGoodsList = computed(() => {
        return state.goods[state.currentType].list;
      });

      // 初始化网络请求数据
      const init = () => {
        Toast.loading({
          forbidClick: true,
          loadingType: 'spinner',
        })
        getCategoryData().then(result => {
          state.categories = result.categories;
          Toast.clear();
        })
        _getGoodsData('sales', state.currentCateId);
        _getGoodsData('price', state.currentCateId);
        _getGoodsData('comments_count', state.currentCateId);
      }

      // 初始化网络请求商品数据
      const _getGoodsData = (type, category_id = '', load = false, title = '') => {
        if (load) {
          // 清空列表数据
          state.finished = true;
        }
        const page = state.goods[type].page + 1;
        getGoodsData(type, page, category_id, title).then(result => {
          state.goods[type].list.push(...result.goods.data);
          state.goods[type].page += 1;
          if (load) {
            // 设置为非加载中
            state.loading = false;
            // 如果网络请求的数据为空，则设置加载完成
            if (result.goods.data.length) {
              state.finished = false;
            } else {
              Toast('没有更多数据');
              state.finished = true;
            }
          }
        })
      }

      // 挂载
      onMounted(() => {
        init();
      })
      // 激活组件
      onActivated(() => {
        // 激活组件时，固定滚动条位置
        nextTick(() =>{
          if (document.querySelector('.con-right') && document.querySelector('.con-left')) {
            document.querySelector('.con-right').scrollTop = state.rightScrollTop;
            document.querySelector('.con-left').scrollTop = state.leftScrollTop;
          }
        })
      })

      // 销毁组件
      onDeactivated(() => {
        state.rightScrollTop = document.querySelector('.con-right').scrollTop;
        state.leftScrollTop = document.querySelector('.con-left').scrollTop;  
      })
      
      // 监听数据变化，goods加载完成显示页面
      watch(state.goods, () => {
        nextTick(() => {
          // 数据加载完成显示页面
          state.isShow = true;
        })
      })

      // 切换标签栏
      const tabOnClick = (name) => {
        // 把滚动条跳转到顶部
        document.querySelector('.con-right').scrollTop = 0
        // 切换时，设置不可以关闭
        state.finished = true;
        state.currentType = name;
        if (state.goods[name].page == 0) {
          _getGoodsData(name, state.currentCateId);
        }
        // 2秒之后设置可以重新滚动
        setTimeout(() => {
          state.finished = false;
        }, 2000);
      }

      // 切换左侧导航
      const menuOnClick = (category_id) => {
        state.currentCateId = category_id
        for (let item in state.goods) {
          state.goods[item].page = 0;
          state.goods[item].list = [];
        }
        _getGoodsData(state.currentType, category_id);
      }

      // 加载更多
      const onLoad = () => {
        _getGoodsData(state.currentType, state.currentCateId, true);
      }

      // 返回上一页
      const onClickLeft = () => {
        router.go(-1);
      }

      return {
        ...toRefs(state),
        showGoodsList,
        tabOnClick,
        menuOnClick,
        onLoad,
        onClickLeft
      }
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .van-nav-bar__title, ::v-deep .van-nav-bar .van-icon {
    color: #FFFFFF;
  }
  ::v-deep .van-nav-bar__arrow {
    font-size: 20px;
  }
  ::v-deep .van-nav-bar__left {
    padding-left: 8px;
  }
  .tab-top {
    margin-top: 46px;
  }
  ::v-deep .van-sidebar {
    width: 100%;
  }
  .content {
    padding-bottom: 50px;
    .con-left, .con-right {
      height: calc(100vh - 140px);
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
  
</style>