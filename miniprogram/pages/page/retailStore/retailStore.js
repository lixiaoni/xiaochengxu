const app = getApp();
Component({
  properties: {
   
  },
  data: {
    globalData: app.globalData,
  },
  methods: {
    goRetailStore:function(){
      var retailStoreId = wx.getStorageSync("storeIdRetail")
      app.navigate.toProgram(app.globalData.navigateToAppID.xpl, 'pages/page/home/home?storeId=' + retailStoreId + '&appid=' + app.globalData.navigateToAppID.me, {})
      // wx.navigateToMiniProgram({
      //   appId: app.globalData.navigateToAppID.xpl, // 要跳转的小程序的appid
      //   path: 'pages/page/home/home?storeId=' + retailStoreId +'&appid='+app.globalData.navigateToAppID.me, // 跳转的目标页面
      //   envVersion: 'trial',//release
      //   success(res) {
      //     // 打开成功  
      //   }
      // })
    }
  }
})
