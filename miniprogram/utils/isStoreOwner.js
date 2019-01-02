import Api from './api.js'
const app = getApp();
class IsStoreOwner {
  /**
   * 获取token，如果token过期做强制刷新
   */
  enterIdentity(storeNature) {
    console.log(storeNature)
    return new Promise((resolve, reject) => {
      Api.userIdentity().then(res => {
        var obj = res.obj
        console.log(obj)
        if (obj == "null" || obj == null) {
          resolve(false);
          return;
        } else {
          var isStoreOwner = obj.isStoreOwner
          if (isStoreOwner) {
            if (obj.storeNature == 2) {
            //   wx.setStorageSync("admin", 2)
            //   _this.setData({
            //     limitShow: 2
            //   })
              resolve(true);
              return;
            }
            // if (obj.storeNature == 1) {
            //   wx.setStorageSync("admin", 1)
            //   wx.switchTab({
            //     url: '../../page/user/user'
            //   })
            // }
          } else {
            resolve(false);
            return;
            // wx.switchTab({
            //   url: '../../page/user/user'
            // })
          }
        }
        
      }).catch(e => {
        resolve(store);
        return;
      });
    });
  }

}

export default IsStoreOwner