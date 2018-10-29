import {
  baseUrl,
  basicAuthorization
} from './const.js'
/**
 *  认证token处理类
 * */
class TokenHandler {
  //构造函数
  constructor() {
    //初始化基础的认证常量
    this.basicAuthorization = basicAuthorization,
      this.baseUrl = baseUrl;
  }
  /**
   * 获取商户编号
   */
  getMerchantNumber() {
    return wx.getStorageSync('merchantNumber');
  }

  /**
   * 获取用户id
   */
  getUserId() {
    return wx.getStorageSync('userId');
  }

  /**
   * 普通认证
   */
  loginByUser(userName, password) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + '/oauth/token',
        data: {
          'grant_type': 'password',
          'username': userName,
          'password': password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': this.basicAuthorization
        },
        method: 'POST',
        success: (res => {
          if (res.statusCode === 200) {
            this.saveTokenInfo(res.data);
          } else if (res.statusCode === 400 || res.statusCode === 401) {
            wx.showToast({
              title: '用户名或密码错误',
              icon: 'none'
            });
          } else {
            wx.showToast({
              title: '认证异常',
              icon: 'none'
            });
          }
          resolve(res.data);
        })
      })
    });
  }


  /**
   * 手机号验证码认证
   */
  loginByMobile(mobile, smsCode) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + '/oauth/mobile/token',
        data: {
          'grant_type': 'password',
          'mobile': mobile,
          'smsCode': smsCode
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': this.basicAuthorization
        },
        method: 'POST',
        success: (res => {
          if (res.statusCode === 200) {
            this.saveTokenInfo(res.data);
          } else if (res.statusCode === 400) {
            wx.showToast({
              title: '验证码错误',
              icon: 'none'
            });
          } else {
            wx.showToast({
              title: '认证异常',
              icon: 'none'
            });
          }
          resolve(res.data);
        })
      })
    });
  }


  /**
   * 获取token，如果token过期做强制刷新
   */
  getTokenOrRefresh() {
    return new Promise((resolve, reject) => {
      let expiresIn = wx.getStorageSync('expires_in');
      if (!expiresIn) {
        resolve(null);
        return;
      }
      let timestamp = Date.parse(new Date);
      let isExpire = (expiresIn < timestamp);
      let accessToken;
      //如果token过期
      if (isExpire) {
        //强制刷新token
        this.forceRefreshToken().then(() => {
          let accessToken = wx.getStorageSync('token_type') + " " + wx.getStorageSync('access_token');
          resolve(accessToken);
        });

      } else {
        if (wx.getStorageSync('access_token')) {
          accessToken = wx.getStorageSync('token_type') + " " + wx.getStorageSync('access_token');
        }
        resolve(accessToken);
      }
    });
  }




  /**
   * 强制刷新token
   */
  forceRefreshToken() {
    let refreshToken = wx.getStorageSync('refresh_token');
    return new Promise((resolve, reject) => {
      if (!refreshToken) {
        resolve()
        return
      }
      //移除refreshToken
      wx.removeStorageSync('refresh_token');

      wx.request({
        url: this.baseUrl + '/oauth/token',
        data: {
          'grant_type': 'refresh_token',
          'refresh_token': refreshToken
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': this.basicAuthorization
        },
        method: 'POST',
        success: (res => {
          if (res.statusCode === 200) {
            this.saveTokenInfo(res.data);
          }
          else {
            //强制刷新失败，清除本地的token信息，token返回为空
            let newRefreshToken = wx.getStorageSync('refresh_token');
            if (refreshToken == newRefreshToken) {
              this.flushTokenInfo();
            }
          }
          resolve();
        })
      })
    })
  }

  //保存token信息
  saveTokenInfo(tokenInfo) {
    //设置access_token信息
    wx.setStorageSync('access_token', tokenInfo.access_token);

    //设置token过期时间
    let timestamp = Date.parse(new Date);
    let expires_in = timestamp + parseInt(tokenInfo.expires_in) * 1000 - 7200000;
    wx.setStorageSync('expires_in', expires_in);

    //设置token type类型
    wx.setStorageSync('token_type', tokenInfo.token_type);
    //设置刷新token
    wx.setStorageSync('refresh_token', tokenInfo.refresh_token);
    //设置token作用范围
    wx.setStorageSync('scope', tokenInfo.scope);
    //设置license
    wx.setStorageSync('license', tokenInfo.license);
    //设置用户编号
    wx.setStorageSync('userId', tokenInfo.userId);
    //设置商户编号
    wx.setStorageSync('merchantNumber', tokenInfo.merchantNumber);
  }

  /**
   * 清除token信息
   * */
  flushTokenInfo() {
    try {
      wx.removeStorageSync('access_token');
      wx.removeStorageSync('expires_in');
      wx.removeStorageSync('token_type');
      wx.removeStorageSync('refresh_token');
      wx.removeStorageSync('scope');
      wx.removeStorageSync('license');
      wx.removeStorageSync('userId');
      wx.removeStorageSync('merchantNumber');
    } catch (e) {
      console.error(e);
    }
  }


  /**
   * 判断用户是否登录
   */
  static isLogin() {
    let token = wx.getStorageSync('access_token')
    return token != null && token != undefined && token != "";
  }

  /**
   * 设置缓存信息
   */
  setStorage(key, value) {
    wx.setStorage({
      key: key,
      data: value,
    })
  }

}

export default TokenHandler