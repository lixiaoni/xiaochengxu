import http from './utils/http.js'
import pageRequest from './utils/pageRequest.js'
import AuthHandler from './utils/authHandler.js'
import { imageUrl } from './utils/const.js'
import touch from './utils/touch.js'
App({
  onLaunch: function (options) {
    if (options.query && options.query.storeId) {
      wx.setStorageSync("storeId", options.query.storeId)
    }
    wx.setStorageSync("storeId", "S1000349")
  },
  globalData: {
    userInfo: null,
    skin: "normal",
    imageUrl: imageUrl
  },
  http: new http(),
  pageRequest: new pageRequest(),
  authHandler: new AuthHandler(),
  touch: new touch()
});


