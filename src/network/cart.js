import request from "./request";

// 购物车列表
export function getCartList () {
  return request({
    url: '/api/carts',
    method: 'get',
    params: {
      include: 'goods'
    }
  })
}

// 加入购物车
export function addCart (goods_id, num = 1) {
  return request({
    url: '/api/carts',
    method: 'post',
    data: {
      goods_id,
      num
    }
  })
}

// 购物车数量改变
export function motifyNumCart (cart, num) {
  return request({
    url: `/api/carts/${cart}`,
    method: 'put',
    data: {
      num,
    }
  })
}

// 改变选择状态
export function changeCheckedStatus (cart_ids) {
  return request({
    url: '/api/carts/checked',
    method: 'patch',
    data: {
      cart_ids
    }
  })
}

// 删除购物车
export function delCart (cart) {
  return request({
    url: `/api/carts/${cart}`,
    method: 'delete'
  })
}