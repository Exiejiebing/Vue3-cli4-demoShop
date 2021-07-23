import request from './request';

// 订单预览
export function getSettlementData () {
  return request({
    url: '/api/orders/preview'
  })
}

// 提交订单
export function submitOrder (address_id) {
  return request({
    url: '/api/orders',
    method: 'post',
    data: {
      address_id
    }
  })
}

// 获取支付二维码
export function getPayCode (order, type) { 
  return request({
    url: `/api/orders/${order}/pay`,
    params: {
      type,
    }
  })
}

// 查询支付状态
export function getPayStatus (order) {
  return request({
    url: `/api/orders/${order}/status`
  })
}

// 订单列表
export function getOrderList (status = 0, page = 1) {
  return request({
    url: '/api/orders',
    params: {
      include: 'orderDetails.goods',
      status,
      page
    }
  })
}

// 订单详情
export function orderDetail (order) {
  return request({
    url: `/api/orders/${order}`,
    params: {
      include: 'orderDetails.goods'
    }
  })
}