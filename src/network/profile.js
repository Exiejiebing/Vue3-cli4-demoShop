import request from './request';

// 用户信息
export function getUserInfo () {
  return request({
    url: '/api/user'
  })
}

// 修改用户昵称
export function motifyUserName (name) {
  return request({
    url: '/api/user',
    method: 'put',
    data: {
      name,
    }
  })
}

// 修改用户头像
export function motifyUserAvatar (avatar) {
  return request({
    url: '/api/user/avatar',
    method: 'patch',
    data: {
      avatar
    }
  })
}

// 修改密码
export function modifyPassword (data) {
  return request({
    url: '/api/auth/password/update',
    method: 'post',
    data
  })
}