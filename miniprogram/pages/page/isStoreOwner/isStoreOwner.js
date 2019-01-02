import Api from '../../../utils/api.js'
import authHandler from '../../../utils/authHandler.js';
import IsStoreOwner from '../../../utils/isStoreOwner.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isStoreOwner = new IsStoreOwner();
    isStoreOwner.enterIdentity(1).then(res => {
      console.log(res)
    }).catch(res => {
      console.log(res)
    });
    // let isStoreOwner = new isStoreOwner("2");
    // isStoreOwner.enterStore().then(res => {
    //   console.log(re)
    // }).catch(res => {
     
    // });
    // console.log(IsStoreOwner.enterStore(11))
    // if (options.storeId) {
    //   wx.setStorageSync("storeId", options.storeId)
    // }
    // let _this = this;
    // this.setData({
    //   limitShow: 1
    // })
    if (authHandler.isLogin()) {
      Api.userIdentity()
        .then(res => {
          var obj = res.obj
          // if (obj == "null" || obj == null) {
          //   wx.switchTab({
          //     url: '../../page/home/home'
          //   })
          // } else {
          //   var isStoreOwner = obj.isStoreOwner
          //   if (isStoreOwner) {
          //     if (obj.storeNature == 2) {
          //       wx.setStorageSync("admin", 2)
          //       _this.setData({
          //         limitShow: 2
          //       })
          //     }
          //     if (obj.storeNature == 1) {
          //       wx.setStorageSync("admin", 1)
          //       wx.switchTab({
          //         url: '../../page/user/user'
          //       })
          //     }
          //   } else {
          //     wx.switchTab({
          //       url: '../../page/user/user'
          //     })
          //   }
          // }
        })
    } else {
      wx.switchTab({
        url: '../../page/home/home'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})