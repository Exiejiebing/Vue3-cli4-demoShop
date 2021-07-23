import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const Home = () => import('views/home/Home');
const Category = () => import('views/category/Category');
const Cart = () => import('views/cart/Cart');
const Profile = () => import('views/profile/Profile');
const GoodsDetail= () => import('views/goods/Detail');
const Register = () => import('views/auth/Register');
const Login = () => import('views/auth/Login');
const Address = () => import('views/address/Address');
const AddressMotify = () => import ('views/address/childComp/AddressMotify');
const Settlement = () => import('views/settlement/Settlement');
const Order = () => import('views/order/Order');
const OrderDetail = () => import('views/order/OrderDetail');
const Collect = () => import('views/collect/Collect');
const Setting = () => import('views/setting/Setting');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "首页",
      isShowFooter: true,
      keepAlive: true,
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      title: "分类",
      isShowFooter: true,
      keepAlive: true,
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      title: "购物车",
      isShowFooter: true,
      keepAlive: true,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: "个人中心",
      isShowFooter: true,
      isAuth: true,
      keepAlive: true,
    }
  },
  {
    path: '/goodsDetail',
    name: 'GoodsDetail',
    component: GoodsDetail,
    meta: {
      title: "商品详情",
      isShowFooter: false,
      keepAlive: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: "注册",
      isShowFooter: false,
      keepAlive: false,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "登录",
      isShowFooter: false,
      keepAlive: false,
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    meta: {
      title: "地址管理",
      isShowFooter: false,
      isAuth: true,
      keepAlive: false,
    }
  },
  {
    path: '/addressMotify',
    name: 'AddressAdd',
    component: AddressMotify,
    meta: {
      title: '地址管理-修改地址',
      isShowFooter: false,
      isAuth: true,
      keepAlive: false,
    }
  },
  {
    path: '/settlement',
    name: 'Settlement',
    component: Settlement,
    meta: {
      title: "结算订单",
      isShowFooter: false,
      isAuth: true,
      keepAlive: false,
    }
  },
  {
    path: '/order',
    name: Order,
    component: Order,
    meta: {
      title: '订单列表',
      isShowFooter: false,
      isAuth: true,
      keepAlive: false,
    }
  },
  {
    path: '/orderDetail',
    name: OrderDetail,
    component: OrderDetail,
    meta: {
      title: '订单详情',
      isShowFooter: false,
      isAuth: true,
      keepAlive: false,
    }
  },
  {
    path: '/collect',
    name: Collect,
    component: Collect,
    meta: {
      title: '我的收藏',
      isShowFooter: false,
      isAuth: true,
      keepAlive: false,
    }
  },
  {
    path: '/setting',
    name: Setting,
    component: Setting,
    meta: {
      title: '个人信息',
      isShowFooter: false,
      isAuth: true,
      keepAlive: false,
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
  }
})


// 后置钩子
router.beforeEach((to, from, next) => {
  // 判断当前路由是否需要e登录认证才能访问，如果不是则返回登录页面
  if (to.meta.isAuth && store.state.user.isLogin === false) {
    next('/login');
  } else if (to.path == '/settlement' && (from.path == '/orderDetail' || from.path == '/order')) { 
    // 如果页面的返回上一页是结算页面，则直接跳转到个人中心
    next('/profile');
  } else {
    next();
  }
  // 设置缓存组件
  if (to.meta.keepAlive) {
    store.commit('setKeepAliveList', to.name)
  }
  // 设置页面标题
  document.title = to.meta.title;
})

export default router
