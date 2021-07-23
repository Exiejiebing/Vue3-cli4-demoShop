<template>
  <!-- 购物车列表 -->
  <div class="list" v-if="list.length">
    <van-checkbox-group v-model="cart_ids" @change="isCheckedOnChange">
      <van-swipe-cell v-for="item in list" :key="item.id">
        <div class="list-item">
          <van-checkbox :name="item.id"
            label-disabled 
            checked-color="#e93b3d"></van-checkbox>
          <van-card class="item-cell"
            :price="item.goods.price"
            :title="item.goods.title"
            :thumb="item.goods.cover_url"
            lazy-load>
            <template #num>
              <van-stepper v-model="item.num"
                :value="item.num"
                :name="item.id"
                :max="item.goods.stock"
                disable-input
                @change="countOnChange"></van-stepper>
            </template>
          </van-card>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="delOnClick(item.id)" />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: 'CartList',
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      cart_ids: {
        type: Array,
        default() {
          return []
        }
      }
    },
    setup(props, { emit }) {
      // 数量改变
      const countOnChange = (value, detail) => {
        emit('countOnChange', value, detail);
      }

      // 选中状态--单选
      const isCheckedOnChange = (values) => {
        emit('isCheckedOnChange', values);
      }

      // 全选
      const allCheckedOnClick = () => {
        emit('allCheckedOnClick');
      }

      // 删除
      const delOnClick = (id) => {
        emit('delOnClick', id);
      }

      return {
        countOnChange,
        isCheckedOnChange,
        allCheckedOnClick,
        delOnClick
      }
    }
  }
</script>

<style scoped lang="scss">
  .list {
    margin-top: var(--van-nav-bar-height);
    margin-bottom: var(--van-submit-bar-height);
  }
  .list-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 3px solid #eee;
    padding-left: 10px;
    background: var(--van-card-background-color);
    .item-cell {
      flex-grow: 2;
    }
  }
  ::v-deep .van-card__price {
    color: #e93b3d;
  }
  .delete-button {
    height: 100%;
  }
</style>