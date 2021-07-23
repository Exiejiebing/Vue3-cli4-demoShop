<template>
  <div id="cart">
    <!-- 导航栏 -->
    <nav-bar title="购物车"></nav-bar>
    <!-- 存在购物车数据 -->
    <div v-if="list.length">
      <cart-list :list="list" 
        :cart_ids="cart_ids" 
        @countOnChange="countOnChange"
        @isCheckedOnChange="isCheckedOnChange"
        @allCheckedOnClick="allCheckedOnClick"
        @delOnClick="delOnClick"></cart-list>
      <!-- 底部结算栏 -->
      <cart-bottom :totalPrice="totalPrice" 
        :checkedAll="checkedAll" 
        @onSubmit="onSubmit"
        @allCheckedOnClick="allCheckedOnClick"></cart-bottom>
    </div>
    <!-- 不存在购物车数据 -->
    <cart-empty :isShow="isShowEmpty"></cart-empty>
  </div>
</template>

<script>
  import { onMounted, computed, reactive, toRefs, onActivated } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { Toast } from 'vant';
  import { getCartList, changeCheckedStatus, motifyNumCart, delCart } from 'network/cart';

  // childComp
  import CartEmpty from './childComp/CartEmpty';
  import CartList from './childComp/CartList';
  import CartBottom from './childComp/CartBottom';
  // components
  import NavBar from 'components/content/navBar/NavBar';

  export default {
    name: 'Cart',
    components: {
      // childComp
      CartEmpty,
      CartList,
      CartBottom,
      // components
      NavBar
    },
    setup() {
      const router = useRouter()
      const store = useStore();
      // 数据模型
      let state = reactive({
        list: [],
        cart_ids: [],
        checkedAll: false,
        isShowEmpty: false
      })
      // 合计总价
      let totalPrice = computed(() => {
        const sum = state.list.filter(item => state.cart_ids.includes(item.id))
          .reduce((total, item) => {
            return total + parseFloat(item.goods.price) * parseInt(item.num);
          }, 0);
        return sum * 100;
        /*let sum = 0;
          state.list.filter(item => state.cart_ids.includes(item.id))
            .forEach(item => {
              sum += parseInt(item.num) * parseFloat(item.goods.price)
            })
          return sum * 100;
        */
      })

      // 初始化网络请求数据
      const init = () => {
        if (store.state.user.isLogin) {
          // 轻提示
          Toast.loading({ forbidClick: true, loadingType: 'spinner' });
          getCartList().then(result => {
            state.list = result.data;
            state.cart_ids = result.data.filter(n => n.is_checked == 1).map(item => item.id);
            state.checkedAll = result.data.length && state.list.length == state.cart_ids.length ? true : false;
            state.isShowEmpty = result.data.length ? false : true;
            // 清除轻提示
            Toast.clear();
          })
        } else {
          state.isShowEmpty = true;
        }
      }

      // 封装修改数量方法
      const _motifyNumCart = (id, num) => {
         motifyNumCart(id, num).then(result => {
          // 修改本地存储列表的数量
          state.list.forEach(item => {
            if (item.id == id) {
              item.num = num;
            }
          })
        })
      }

      // 挂载
      onMounted(() => {
        init();
      })

      // 激活组件时，判断购物车数量与列表中数据数量是否相等
      onActivated(() => {
        // 滚动条置顶
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        if (state.list.length != store.state.cartCount || store.state.isClickAddCart) {
          init();
        }
        if (store.state.user.isLogin && state.isShowEmpty) {
          state.isShowEmpty = false;
          init();
        }
      })

      // 数量改变
      const countOnChange = (value, detail) => {
        Toast.loading({ forbidClick: true, loadingType: 'spinner' });
        _motifyNumCart(detail.name, value);
        Toast.clear();
      }

      // 选中状态--单选
      const isCheckedOnChange = (values) => {
        // 修改全选状态
        state.checkedAll = values.length == state.list.length ? true : false;
        // 双向绑定
        state.cart_ids = values;
        // 网络请求
        changeCheckedStatus(values);
      }

      // 全选
      const allCheckedOnClick = () => {
        if (!state.checkedAll) {
          state.cart_ids = state.list.map(item => item.id);
          state.checkedAll = true;
        } else {
          state.cart_ids = [];
          state.checkedAll = false;
        }
        isCheckedOnChange(state.cart_ids);
      }

      // 删除
      const delOnClick = (id) => {
        Toast.loading({ forbidClick: true });
        delCart(id).then(result => {
          // 重新初始化数据
          init();
          // 设置状态管理中的购物车数量
          store.dispatch('updateCartCount');
          Toast.clear();
        });
      }

      // 结算
      const onSubmit = () => {
        router.push({
          path: '/settlement'
        })
      }

      return {
        ...toRefs(state),
        totalPrice,
        countOnChange,
        isCheckedOnChange,
        allCheckedOnClick,
        delOnClick,
        onSubmit
      }
    }
  }
</script>

<style scoped lang="scss">
  #cart {
    padding-bottom: 50px;
    ::v-deep .van-nav-bar__title {
      color: #FFFFFF;
    }
    ::v-deep .van-submit-bar {
      bottom: 50px;
    }
  }
</style>