import Api from './api.js'
const app = getApp();
class EnterStoreHandler {

  //构造函数
  constructor(storeNature) {
    this.storeNature = storeNature;
  }

  /**
   * 获取token，如果token过期做强制刷新
   */
  enterStore(options) {
    return new Promise((resolve, reject) => {
      var store = {};
      //获取店铺编号
      // let userId = this.getUserIdFromQrCodeUrl(qrUrl);

      this.getStoreId(options).then((storeId) => {
        //判断店铺编号是否为空
        if (!Api.isNotEmpty(storeId)) {
          // console.error("店铺编号未获取到，请处理2");
          let data = { userId: this.getUserIdFromQrCodeUrl(options.getUserIdFromQrCode), nature: "3" }
          reject(data);
          return;
        }

        //设置storeId
        store.storeId = storeId;
        if (options.q) {
          if (decodeURIComponent(options.q)) {
            store.userId = this.getUserIdFromQrCodeUrl(decodeURIComponent(options.q))
          }
        }
        //获取店铺性质
        Api.getStoreNature({ storeId: storeId }).then(res => {
          var nature = res.obj
          store.storeNature = nature;
          if (nature == "1") {
            if (options.getUserIdFromQrCode) {
              store.userId = this.getUserIdFromQrCodeUrl(options.getUserIdFromQrCode)

            }
          }
          //店铺性质未获取到，不做处理
          if (!Api.isNotEmpty(nature)) {

            // console.error("店铺性质未获取到，请处理1");
            wx.setStorageSync('storeId', storeId);
            let data = { userId: this.getUserIdFromQrCodeUrl(options.getUserIdFromQrCode), nature: "3" }
            resolve(data);
            return;
          }
          //店铺性质不对处理
          if (this.storeNature != nature) {
            let data;
            if (options.getUserIdFromQrCode) {
              data = { userId: this.getUserIdFromQrCodeUrl(options.getUserIdFromQrCode), nature: "2" }
            } else {
              if (options.q) {
                if (decodeURIComponent(options.q)) {
                  data = { userId: this.getUserIdFromQrCodeUrl(decodeURIComponent(options.q)) }
                }
              } else {
                // 零售店进到批零
                wx.setStorageSync("storeIdRetail", storeId)
                app.globalData.storeIdRetail = true
                data = { storeIdRetail: true }
              }
            }
            reject(data);
            return;
          }
          wx.setStorageSync('storeId', storeId);
          resolve(store);
          return;
        }).catch(e => {
          //获取店铺性质异常，不错处理
          // console.error(e);
          wx.setStorageSync('storeId', storeId);
          resolve(store);
          return;
        });
      });

    });
  }

  /**
   * 获取店铺编号
   */
  getStoreId(options) {
    return new Promise((resolve, reject) => {
      let storeId = null;
      // console.log(options)
      //options为空，正常从本地获取店铺编号 TODO
      if (options == undefined || JSON.stringify(options) == "{}") {
        storeId = wx.getStorageSync("storeId")
        resolve(storeId);
        return;
      }

      //从小程序码中获取店铺编号
      if (options.scene) {
        let scene = decodeURIComponent(options.scene);
        storeId = scene.split("store_")[1]
      }

      //从链接中获取店铺编号
      if (options.storeId) {
        storeId = options.storeId;
      }

      if (Api.isNotEmpty(storeId)) {
        //验证店铺编号
        resolve(storeId);
        return;
      }
      //如果店铺编号未获取到，根据用户编号获取店铺编号
      if (storeId == null || options.getUserIdFromQrCode) {
        //获取二维码url地址
        let qrUrl;
        if (options.getUserIdFromQrCode) {
          qrUrl = options.getUserIdFromQrCode
        } else {
          qrUrl = decodeURIComponent(options.q);
        }
        let userId = this.getUserIdFromQrCodeUrl(qrUrl);
        Api.getStoreData({ userId: userId }).then((res) => {
          storeId = res.obj.storeId;
          resolve(storeId);
          return;
        }).catch(e => {
          // console.error(e)
          reject(e);
          return;
        })
      }



    });
  }

  /**
   * 从二维码中获取用户编号
   */
  getUserIdFromQrCodeUrl(qrUrl) {

    if (qrUrl == null || qrUrl == "" || qrUrl == undefined) {
      return null;
    }

    if (qrUrl.indexOf("&userId") == -1) {
      return null;
    }

    let type = qrUrl.match(/type=(\S*)&/)[1];

    if (type == "user") {
      let userId = qrUrl.match(/userId=(\S*)/)[1];
      return userId;
    }
    return null;
  }

}

export default EnterStoreHandler