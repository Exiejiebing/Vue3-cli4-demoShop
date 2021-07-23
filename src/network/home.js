import request  from "./request";

// 首页全部数据
export function getHomeAllData () { 
  return request({
    url: '/api/index'
  })
}

// 首页标签栏数据（热销、推荐、新款）
export function getTabGoodsData (type, page) {
  return request({
    url: `/api/index?${type}=1`,
    params: {
      page
    }
  })

}