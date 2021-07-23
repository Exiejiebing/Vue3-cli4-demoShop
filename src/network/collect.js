import request from './request';

// 加入/取消收藏
export function setCollectStatus (goods) {
  return request({
    url: `/api/collects/goods/${goods}`,
    method: 'post'
  })
}

// 收藏列表
export function getCollectList (page) {
  return request({
    url: '/api/collects',
    params: {
      page
    }
  })
}