<template>
  <div class="list" v-if="list.length">
    <van-swipe-cell v-for="item in list" :key="item.id">
      <div class="list-item" @click="selectAddressOnClick(item.id)">
        <div class="info">
          <p>
            <van-tag type="primary" color="#e93b3d" v-if="item.is_default">默认</van-tag>
            {{item.province}}{{item.city}}{{item.county}}
          </p>
          <p class="info-address"><strong>{{item.address}}</strong></p>
          <p>
            <span>{{item.name}}</span>
            <span style="margin-left: 20px">{{item.phone}}</span>
          </p>
        </div>
        <div class="info-edit" @click="editOnClick(item.id)">
          <van-icon name="edit"/>
        </div>
      </div>
      <template #right>
        <van-button v-show="!item.is_default" square text="设为默认" class="delete-button" @click="defaultOnClick(item.id)" />
        <van-button square text="删除" type="danger" class="delete-button" @click="delOnClick(item.id)" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';

  export default {
    name: 'AddressList',
    props: {
      list:{
        type: Array,
        default() {
          return []
        }
      }
    },
    setup(props, { emit }) {
      const router = useRouter();
      const store = useStore();

      // 如果vuex-settlementAddressId状态为true，点击地址返回结算页面，并且把地址传过去
      const selectAddressOnClick = (address_id) => {
        if (store.state.settlementAddressId) {
          router.push({
            path: '/settlement',
            query: {
              address_id
            }
          })
        }
      }

      // 编辑
      const editOnClick = (id) => {
        router.push({
          path: '/addressMotify',
          query: {
            type: 'edit',
            address_id: id
          }
        })
      }

      // 设为默认
      const defaultOnClick = (id) => {
        emit('defaultOnClick', id);
      }

      // 删除
      const delOnClick = (id) => {
        emit('delOnClick', id);
      }

      return {
        selectAddressOnClick,
        editOnClick,
        defaultOnClick,
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
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #fafafa;
    .info {
      font-size: 12px;
      line-height: 1.5;
      margin-left: 10px;
      color: #8a8888;
      flex-grow: 2;
      .info-address {
        font-size: 14px;
        color: #000000;
      }
    }
    .info-edit {
      font-size: 20px;
    }
  }
  .delete-button {
    height: 100%;
  }
</style>