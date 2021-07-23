<template>
  <!-- 导航栏 -->
  <nav-bar :title="title" :isShowLeft="true"></nav-bar>
  <div v-if="Object.keys(address).length" class="address-modify">
    <van-form @submit="onSubmit">
      <van-field
        v-model="address.name"
        name="name"
        label="收货人"
        placeholder="请填写收货人姓名"/>
      <van-field
        v-model="address.phone"
        name="phone"
        label="手机号码"
        placeholder="请填写收货人手机号"/>
      <van-field
        v-model="areaValues"
        is-link
        readonly
        label="所在地区"
        placeholder="省市区县、乡镇等"
        @click="showArea = true">
      </van-field>
      <van-popup v-model:show="showArea" round position="bottom">
        <van-area
          :area-list="areaList"
          :value="areaValue"
          :columns-placeholder="['请选择', '请选择', '请选择']"
          @confirm="onConfirm"
          @cancel="showArea = false"/>
      </van-popup>
      <van-field
        v-model="address.address"
        name="address"
        label="详细地址"
        placeholder="街道、楼牌号等">
      </van-field>
      <van-field class="switch" name="is_default" label="设置默认地址">
        <template #input>
          <van-switch v-model="switchChecked" size="24px" @change="switchOnChange" />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block native-type="submit" color="#e93b3d">保存</van-button>
        <van-button v-if="$route.query.type == 'edit'" style="margin-top: 10px;" round block @click="delOnClick">删除</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import { onMounted, reactive, ref, toRefs } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Notify, Toast, Dialog  } from 'vant';
  import areaList from 'common/area';
  import { getAreaValue } from 'common/utils';
  import { addAddress, getAddressDetail, motifyAddress, delAddress } from 'network/address';
  // components
  import NavBar from 'components/content/navBar/NavBar';

  export default {
    name: 'AddressMotify',
    components: {
      // components
      NavBar
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      // 导航名称
      let title = ref('');
      // 数据模型
      const state = reactive({
        address: {
          name: '',
          phone: '',
          province: '',
          city: '',
          county: '',
          address: '',
          is_default: 0,
        },
        showArea: false,
        areaValues: '',
        switchChecked: false,
        areaList,
        areaValue: '',
      })

      // 初始化网络请求数据
      const init = () => {
        // 给页面加入地址详情信息
        if (route.query.type == 'edit') {
          getAddressDetail(route.query.address_id).then(result => {
            state.address.name = result.name;
            state.address.phone = result.phone;
            state.address.province = result.province;
            state.address.city = result.city;
            state.address.county = result.county;
            state.address.address = result.address;
            state.address.is_default = result.is_default;
            state.areaValues = result.province + '/' + result.city + '/' + result.county;
            state.switchChecked = result.is_default ? true : false;
            state.areaValue = getAreaValue(result.province, result.city, result.county);
          })
          
        }
      }

      // 网络请求
      const _Address = (type, data, id = '') => {
        // 新增
        if (type == 'add') {
          addAddress(data).then(result => {
            if (result && result.status == '201') {
              Toast.success('保存成功');
              // 返回上一页
              setTimeout(() => {
                router.back();
              }, 500);
            }
          })
        } else {
          // 编辑
          motifyAddress(id, data).then(result => {
            if (result && result.status == '204') {
              Toast.success('保存成功');
              // 返回上一页
              setTimeout(() => {
                router.back();
              }, 500);
            }
          })
        }
      }

      // 挂载
      onMounted(() => {
        init();
        // 设置导航名称
        title.value = route.query.type == 'add' ? '新增地址' : '编辑地址';
      })

      // 省市区联动选择器确认事件
      const onConfirm = (values) => {
        state.showArea = false;
        // 需要满足三级联动选择器全部选完才会加入数据
        if (values.filter(item => !!item && item.name).map(item => item.name).length == 3) {
          state.areaValues = values.filter(item => !!item).map(item => item.name).join('/');
          state.address.province = values[0].name;
          state.address.city = values[1].name;
          state.address.county = values[2].name
        }
      }

      // 设置默认地址
      const switchOnChange = (value) => {
        state.address.is_default = value ? 1 : 0;
      }

      // 保存
      const onSubmit = () => {
        // 验证信息
        if (!state.address.name) {
          Notify({ type: 'danger', message: '请填写收货人姓名' });
        }else if (!state.address.phone) {
          Notify({ type: 'danger', message: '请填写收货人手机号' });
        }else if (!state.address.province || !state.address.city || !state.address.county) {
          Notify({ type: 'danger', message: '请选择所在地区' });
        }else if (!state.address.address) {
          Notify({ type: 'danger', message: '请填写详细地址' });
        }
        // 网络请求
        const address_id = route.query.type == 'edit' ? route.query.address_id : '';
        _Address(route.query.type, state.address, address_id);
      }

      // 删除
      const delOnClick = () => {
        if (route.query.type == 'edit') {
          // 弹出确认消息框
          Dialog.confirm({
            message: '确定要删除此地址？',
          }).then(() => {
            delAddress(route.query.address_id).then(result => {
              Toast.success('删除成功');
              // 返回地址管理页面
              setTimeout(() => {
                router.push({
                  path: '/address'
                })
              }, 500);
            })
          }).catch(() => {});
          
        }
      }

      return {
        title,
        ...toRefs(state),
        onConfirm,
        switchOnChange,
        onSubmit,
        delOnClick
      }
    }
  }
</script>

<style scoped lang="scss">
 .address-modify {
   margin-top: var(--van-nav-bar-height);
   ::v-deep .van-switch--on {
     background-color: #e93b3d;
   }
   .switch ::v-deep .van-field__body {
     float: right;
   }
 }
</style>