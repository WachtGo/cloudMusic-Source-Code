import Cookies from 'js-cookie'

const TokenKey = 'csrd_token'//方便后面设置token,网易云音乐token请求

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 999 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
