const app = getApp();
Component({
  properties: {
   
  },
  data: {
  },
  methods: {
    goRetailStore:function(){
      var retailStoreId = app.globalData.retailStoreId
      wx.navigateToMiniProgram({
        appId: 'wx4f385374765e4cbb', // 要跳转的小程序的appid
        path: 'pages/page/home/home', // 跳转的目标页面
        extarData: {
          storeId: retailStoreId
        },
        success(res) {
          // 打开成功  
        }
      })
    }
  }
})
