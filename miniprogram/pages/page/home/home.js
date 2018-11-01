const app = getApp();
import Api from '../../../utils/api.js'
import authHandler from '../../../utils/authHandler.js';
function getIdentity(_this) {
  if (authHandler.isLogin()) {
    Api.userIdentity()
      .then(res => {
        var obj=res.obj
        if (obj == "null" || obj==null){
          wx.setStorageSync("admin", 1)
          _this.setData({
            limitShow: 1
          })
        }else{
          var isStoreOwner = obj.isStoreOwner
          if (isStoreOwner) {
            wx.setStorageSync("admin", 2)
            _this.setData({
              limitShow: 2
            })
          }else{
            wx.setStorageSync("admin", 1)
            _this.setData({
              limitShow: 1
            })
          }
        }
        _this.homeIndex()
      })
  }else{
    _this.homeIndex()
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
    indexEmpty: true,
    show:false,
    isShow:false,
    showHide:true,
    showDp:true,
    currentTab: 0,
    baseUrl:'',
    result: [],
    noMoreData:true,
    keyword:'',
    descShow:false,
    totalCount:0,
    store:'',
    coverUrl:'',
    identity:'',
    likeShow:false,
    limitShow:1,
    src:'',
    goodsName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  addTip:function(){
    var Id = wx.getStorageSync("storeId"),
      logo =this.data.store.logo,
      name = this.data.store.storeName
    wx.navigateTo({
      url: '../../businessFriend/information/information?status=0&send=&accept='+Id+'&remark=&logo='+logo+'&name='+name,
    })
  },
  confirm:function(){
    this.setData({
      show: false,
      isShow:true,
    })
  },
  editFun:function(e){
    var goodsId=e.target.dataset.id,
      src = e.target.dataset.src,
      goodsName = e.target.dataset.name
    this.setData({
      showHide: false,
      goodsId: goodsId,
      src: src,
      goodsName: goodsName,
    })
  }, 
  // 下架商品
  upGoods:function(e){
    var _this=this,
      goodsIdList=[],
      goodsId = this.data.goodsId
    goodsIdList.push(goodsId)
    Api.adminGoodsDown(goodsIdList)
      .then(res => {
        wx.showToast({
          title: '下架成功',
          icon: 'none',
          duration: 2000,
          success: function () {
            _this.setData({
              showHide: true,
              currentTab:0
            })
            _this.emptyArr()
          }
        })
      })
  },
  editGoods:function(){
    var goodsId = this.data.goodsId
    wx.navigateTo({
      url: '../../admin/editGoods/editGoods?goodsId='+goodsId,
    })
  },
  closeShow: function() {
    this.setData({
      showHide: true,
      showDp:true,
      currentTab:0
    })
  }, 
  editDp: function () {
    this.setData({
      showDp: false,
    })
  }, 
  editDpMes:function(){
    var limitShow = this.data.limitShow
    if (limitShow==2){
      wx.navigateTo({
        url: '../mesEdit/mesEdit',
      })
    }else{
      wx.navigateTo({
        url: '../mes/mes?code=' + limitShow,
      })
    }
  },
  getList: function () {
    var _this = this,
      keyword = this.data.keyword,
      currentTab = this.data.currentTab,
      descShow = this.data.descShow,
      sortType=''
    if (currentTab == 0) {
      sortType = 'multiple'
    } else if (currentTab == 1) {
      sortType = 'sales'
    } else if (currentTab == 2) {
      if (descShow){
        sortType = 'prices_asc'
      }else{
        sortType = 'prices_desc'
      }
    } 
    Api.shopList({ keyword: '', sortType: sortType})
      .then(res => {
        var detailList = res.obj.result
        if (Api.isEmpty(detailList)){
          var datas = _this.data.result,
            newArr = app.pageRequest.addDataList(datas, detailList)
          _this.setData({
            result: newArr,
            noMoreData:true
          })
        }else{
          _this.setData({
            noMoreData:false
          })
          Api.showToast("暂无更多数据了！")
        }
      })
  },
  chooseImage:function(){
    var _this=this
    Api.uploadImage("STORE_IMAGE")
    .then(res=>{
      var url = JSON.parse(res).obj
      _this.setData({
        coverUrl: url
      })
      Api.updateCover(url)
        .then(res => {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1000,
            mask: true,
            success:function(){
              _this.closeShow()
            }
          })
        })
    })
  },
  homeIndex:function(){
    var that = this;
    Api.homeIndex()
      .then(res => {
        var obj = res.obj
        wx.setNavigationBarTitle({
          title: obj.store.storeName
        })
        that.setData({
          store: obj.store,
          baseUrl: app.globalData.imageUrl,
          coverUrl: obj.store.coverUrl,
          result: obj.goods.result,
          totalCount: obj.goods.totalCount,
          likeShow: obj.isFollow
        })
      })    
  },
  onLoad: function (options) {
    var _this = this
    if (options!=undefined){
      if (options.scene) {
        let scene = decodeURIComponent(options.scene);
        var storeId = scene.split("store_")[1]
        wx.setStorageSync("storeId", storeId)
      }
      if (options.query) {
        wx.setStorageSync("storeId", options.query.storeId)
      }
      if (options.storeId) {
        wx.setStorageSync("storeId", options.storeId)
      }
    }
    this.closeShow()
    if (!Api.getStoreId()) {
      this.setData({
        indexEmpty: false
      })
    } else {
      app.pageRequest.pageDataIndex.pageNum = 1
      app.pageRequest.pageData.pageNum = 0
      getIdentity(this)
    }
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  emptyArr: function () {
    this.setData({
      result: []
    });
    app.pageRequest.pageDataIndex.pageNum = 0
    this.getList()
  },
  swichNav: function (e) {
    var that = this,
      descShow = this.data.descShow
    if (this.data.currentTab === e.target.dataset.current) {
      if (e.target.dataset.current == 2) {
        that.setData({
          descShow: !descShow
        }, function () {
          this.emptyArr()
        })
      }
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      },function(){
        this.emptyArr()
      })
    }
  },
  // 置顶
  topGoods:function(){
    var goodsId = this.data.goodsId,
      _this=this
    Api.topGoods({goodsId: goodsId})
    .then(res=>{
      wx.showToast({
        title: "置顶成功",
        icon: 'none',
        duration: 1000,
        mask: true,
        success: function () {
          _this.closeShow()
          _this.emptyArr()
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  likeStore:function(){
    var _this=this
    Api.likeStore()
    .then(res=>{
      wx.showToast({
        title: '关注成功',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
      _this.setData({
        likeShow: true
      })
    })
  }, 
  deteleLikeStore: function() {
    var _this = this
    Api.deteleLikeStore()
      .then(res => {
        wx.showToast({
          title: '取消关注成功',
          icon: 'none',
          duration: 1000,
          mask: true,
        })
        _this.setData({
          likeShow: false
        })
      })
  },
  onReady: function () {


  },
  searchBtn(e) {
    this.setData({
      result:[]
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    if(authHandler.isLogin()){
      var limitShow = this.data.limitShow
      var setlimitShow = wx.getStorageSync("admin")
      if (Api.isEmpty(setlimitShow)){
        this.setData({
          limitShow: setlimitShow
        })
      }
    }else{
      this.setData({
        limitShow: 1,
        likeShow:false
      })
    }
    this.setData({
      getFollw: authHandler.isLogin(),
    })
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
    var currentTab = this.data.currentTab
    this.setData({
      currentTab: currentTab,
      noMoreData:true
    },function(){
      this.emptyArr()
      // this.onShow()
      wx.stopPullDownRefresh();
    })
  },


  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function (res) {
    var store=this.data.store,
        img = this.data.src,
        goodsName = this.data.goodsName,
        id = this.data.goodsId,
        storeId = store.storeId, 
        storeName = store.storeName
    if (res.from === 'button') {
     var name=res.target.dataset.name
      if (name=="names"){
        return {
          title: goodsName,
          path: '/pages/page/home/home?goodsId='+id+"&storeId"+storeId,
          imageUrl: img,
          success: (res) => {
          },
          fail: (res) => {
          }
        }
      }
    }else{
        return {
          title: storeName,
          path: '/pages/page/home/home?storeId='+storeId,
          success: (res) => {
          },
          fail: (res) => {
          }
        }
    }
  
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var noMoreData = this.data.noMoreData
    if (noMoreData){
      this.getList()
    }
  },
})