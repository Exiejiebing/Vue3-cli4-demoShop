import request from './request';

// 地区数据
export function getAreaList (pid = 0) {
  return request({
    url: '/api/city',
    params: {
      pid,
    }
  })
}

// 地址列表
export function getAddressList () {
  return request({
    url: '/api/address'
  })
}

// 地址详情
export function getAddressDetail (address) {
  return request({
    url: `/api/address/${address}`
  })
}

// 新增地址
export function addAddress (data) {
  return request({
    url: '/api/address',
    method: 'post',
    data
  })
}

// 更新地址
export function motifyAddress (address, data) {
  return request({
    url: `/api/address/${address}`,
    method: 'put',
    data
  })
}

// 删除地址
export function delAddress (address) {
  return request({
    url: `/api/address/${address}`,
    method: 'delete'
  })
}

// 设置默认地址
export function setDefaultAddress (address) {
  return request({
    url: `/api/address/${address}/default`,
    method: 'patch',
  })
}