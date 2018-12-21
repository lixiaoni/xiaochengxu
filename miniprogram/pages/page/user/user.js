// pages/user/user.js
import Api from '../../../utils/api.js';
import authHandler from '../../../utils/authHandler.js';
var app = getApp();
function getIdentity(_this) {
  if (authHandler.isLogin()) {
    Api.userIdentity()
      .then(res => {
        var obj = res.obj
        if (obj == "null" || obj == null) {
          wx.setStorageSync("admin", 1)
          _this.setData({
            limitShow: 1
          }, function () {
            _this.getUser()
          })
        } else {
          var isStoreOwner = obj.isStoreOwner,
            isPurchaser = obj.isPurchaser
          if (isStoreOwner) {
            if (obj.storeNature == 2) {
              wx.setStorageSync("admin", 2)
              _this.setData({
                limitShow: 2
              }, function () {
                _this.getUser()
              })
            }
            if (obj.storeNature == 1) {
              wx.setStorageSync("admin", 1)
              _this.setData({
                limitShow: 1
              }, function () {
                _this.getUser()
              })
            }

          } else {
            wx.setStorageSync("admin", 1)
            _this.setData({
              limitShow: 1
            }, function () {
              _this.getUser()
            })
          }
        }
      })
  } else {
    _this.getUser()
    wx.setStorageSync("admin", 1)
    _this.setData({
      limitShow: 1
    })
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUser: false,
    limitShow: 1,
    indexEmpty: true,
  },
  toMyStore() {
    let toID = this.data.user.storeId;
    if (toID) {
      wx.setStorageSync("storeId", toID)
      app.globalData.switchStore = true;
      let pages = getCurrentPages() //获取页面数组
      let curPage = pages[pages.length - 1]  //获取当前页
      curPage.onShow()
    }
  },
  showLogin() {
    this.selectComponent("#login").showPage();
  },
  getUser() {
    this.setData({
      isStoreOwner: false,
      otherStoreOwner: false
    })
    app.http.getRequest("/api/user/byuserid").then((res) => {
      if (res.obj) {
        this.setData({
          user: res.obj,
          hasUser: true
        })
        //是否是新零售店主
        if (res.obj.isStoreOwner == true && res.obj.storeNature == 2) {
          this.setData({
            isStoreOwner: true
          })
        } else if (res.obj.isStoreOwner == true && res.obj.storeNature == 1){
          this.setData({
            otherStoreOwner: true   //新零售店主
          })        
        }
        //是否有云订单
        if (res.obj.hasYunStoreOrder == true) {
          this.setData({
            hasYunStoreOrder: true
          })
        } else {
          this.setData({
            hasYunStoreOrder: false
          })
        }
        // 店铺开通是否付费
        if (res.obj.isStoreOwner == true) {
          this.setData({
            payStore: true
          })
        } else {
          this.setData({
            payStore: false
          })
        }

      } else {
        this.setData({
          user: "",
          hasUser: false,
        })
      }
    }).catch(e => {
      this.setData({
        user: "",
        hasUser: false,
      })
    })
  },
  getStore() {
    Api.storeIdInfo().then(res => {
      let store = res.obj.store[0].store;
      if (!store || !store.name) {
        this.setData({
          initOrder: true
        })
      } else {
        this.setData({
          initOrder: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      baseUrl: app.globalData.imageUrl
    })

    try {
      if (options.storeId) {
        wx.setStorageSync("storeId", options.storeId)
        app.globalData.switchStore = true;
      }
      if (options.layerText) {
        app.globalData.userShowTip = true
      }
    } catch (e) { }
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
    this.getStore();
    //跳转弹框
    if (app.globalData.userShowTip) {
      app.globalData.userShowTip = false;
      wx.showModal({
        title: '',
        content: '请登陆购买账号后，点击小云店工作台初始化店铺',
        showCancel: false,
        complete: () => {
          if (!Api.getStoreId()) {
            this.setData({
              indexEmpty: false
            })
          }
          getIdentity(this)

          this.getStore();
        }
      })
    } else {
      if (!Api.getStoreId()) {
        this.setData({
          indexEmpty: false
        })
      }
      getIdentity(this)

      this.getStore();
    }
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