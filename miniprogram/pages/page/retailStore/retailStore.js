const app = getApp();
Component({
  properties: {
   
  },
  data: {
  },
  methods: {
    goRetailStore:function(){
      var retailStoreId = wx.getStorageSync("storeIdRetail")
      wx.navigateToMiniProgram({
        appId: 'wx4f385374765e4cbb', // 要跳转的小程序的appid
        path: 'pages/page/home/home?storeId='+retailStoreId, // 跳转的目标页面
        envVersion: 'trial',//release
        success(res) {
          // 打开成功  
        }
      })
    }
  }
})
