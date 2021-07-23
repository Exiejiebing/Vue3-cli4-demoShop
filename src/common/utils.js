import areaList from './area';

// 防抖函数
export function debounce (func, delay = 500) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
}

// 获取省市区的value
export function getAreaValue (province, city, county) {
  const province_list = areaList.province_list;
  const city_list = areaList.city_list;
  const county_list = areaList.county_list;

  let result= '';
  // 查找省
  Object.keys(province_list).forEach(item => {
    if (province_list[item] == province) {
      result = item.substring(0, 2);
    }
  })
  // 查找市
  Object.keys(city_list).forEach(item => {
    if (city_list[item] == city && item.substring(0, 2) == result) {
      result = item.substring(0, 4);
    }
  })
  // 查找区
  Object.keys(county_list).forEach(item => {
    if (county_list[item] == county && item.substring(0, 4) == result) {
      result = item;
    }
  })

  return result;
}

// 隐藏手机号码中间4位
export function getTel (str) {
  const reg = /^(\d{3})\d{4}(\d{4})$/;
  return str.replace(reg, "$1****$2");
}