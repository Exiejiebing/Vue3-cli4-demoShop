import request from './request';

// 商品所有分类
export function getCategoryData () {
  return request({
    url: '/api/goods'
  })
}

//  商品数据
export function getGoodsData (type, page = 1, category_id = '', title = '') {
  return request({
    url: `/api/goods/?${type}=1`,
    params: {
      category_id,
      title,
      page
    }
  })

}