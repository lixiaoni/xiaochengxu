import Api from './api.js'
import authHandler from './authHandler.js';
const app = getApp();

class IsStoreOwner {
  /**
   * 判断身份
   */
  enterIdentity(options) {
    return new Promise((resolve, reject) => {
      var data = {}
      // 获取当前页面设置身份
      var pages = getCurrentPages()
      var currentPage = pages[pages.length - 1]
      if (authHandler.isLogin()) {
        Api.userIdentity().then(res => {
          var obj = res.obj
          if (Api.isNotEmpty(obj)) {
            var isStoreOwner = obj.isStoreOwner
            if (isStoreOwner) {
              // 店主
              wx.setStorageSync("admin", 2)
              currentPage.setData({
                limitShow: 2
              })
              data = { isStoreOwner: true}
            } else {
              wx.setStorageSync("admin", 1)
              currentPage.setData({
                limitShow: 1
              })
              data = { isStoreOwner: false}
            }
          } else {
            wx.setStorageSync("admin", 1)
            currentPage.setData({
              limitShow: 1
            })
            data = { isStoreOwner: false}
          }
          resolve(data);
          return;
        }).catch(e => {
          resolve("异常");
          return;
        });
      } else {
        wx.setStorageSync("admin", 1)
        currentPage.setData({
          limitShow: 1
        })
        data = { isStoreOwner: false}
        resolve(data);
        return;
      }
    })
  }
}

export default IsStoreOwner