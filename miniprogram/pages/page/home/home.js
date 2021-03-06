const app = getApp();
import Api from '../../../utils/api.js'
import authHandler from '../../../utils/authHandler.js';
import EnterStoreHandler from '../../../utils/enterStoreHandler.js';
import IsStoreOwner from '../../../utils/isStoreOwner.js';
// 身份判断
function getIdentity(_this) {
  let isStoreOwner = new IsStoreOwner();
  isStoreOwner.enterIdentity().then(res => {
    _this.homeIndex()
  }).catch(res => {
  });
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indexEmpty: true,
    show: false,
    goRetailStore: true,
    isShow: false,
    showHide: true,
    showDp: true,
    currentTab: 0,
    confirmDown: false,
    baseUrl: '',
    result: [],
    noMoreData: true,
    keyword: '',
    descShow: false,
    totalCount: 0,
    goodsNum: 0,
    store: '',
    bannerHeight: 0,
    swiperHeight: 0,
    goodsHeight: 0,
    coverUrl: '',
    disLike: false,
    identity: '',
    likeShow: false,
    limitShow: 1,
    src: '',
    isOnloaded: false,
    goodsName: '',
    copyGoods: false,
    openStore: false,
    ballBottom: 240,
    ballRight: 120,
    screenHeight: 0,
    screenWidth: 0,
  },
  onPostClick: function(e) {
    this.setData({
      left: e.touches[0].clientX - 10,
      top: e.touches[0].clientY - 10,
    })
  },
  // 关闭
  closeTip: function() {
    this.setData({
      isStoreOwner: false,
      isNotStore: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  confirm: function() {
    this.setData({
      show: false,
      isShow: true,
    })
  },
  editFun: function(e) {
    var goodsId = e.target.dataset.id,
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
  upGoods: function(e) {
    this.setData({
      confirmDown: true
    })
  },
  confirmDown: function() {
    var _this = this,
      goodsIdList = [],
      goodsId = this.data.goodsId
    goodsIdList.push(goodsId)
    Api.adminGoodsDown(goodsIdList)
      .then(res => {
        wx.showToast({
          title: '下架成功',
          icon: 'none',
          duration: 2000,
          success: function() {
            _this.setData({
              showHide: true,
              confirmDown: false,
              currentTab: 0
            })
            _this.emptyArr()
          }
        })
      })
  },
  lookDetails: function(e) {
    var goodsId = e.target.dataset.id
    wx.navigateTo({
      url: '../goodsDetails/goodsDetails?goodsId=' + goodsId,
    })
  },
  editGoods: function() {
    var goodsId = this.data.goodsId
    wx.navigateTo({
      url: '../../admin/editGoods/editGoods?goodsId=' + goodsId,
    })
  },
  closeShow: function() {
    this.setData({
      showHide: true,
      showDp: true,
      currentTab: 0
    })
  },
  // editDp: function () {
  //   this.setData({
  //     showDp: false,
  //   })
  // }, 
  editDpMes: function() {
    var limitShow = this.data.limitShow
    if (limitShow == 2) {
      wx.navigateTo({
        url: '../mesEdit/mesEdit',
      })
    } else {
      wx.navigateTo({
        url: '../mes/mes?code=' + limitShow,
      })
    }
  },
  getList: function() {
    var _this = this,
      keyword = this.data.keyword,
      currentTab = this.data.currentTab,
      descShow = this.data.descShow,
      sortType = ''
    if (currentTab == 0) {
      sortType = 'multiple'
    } else if (currentTab == 2) {
      sortType = 'sales'
    } else if (currentTab == 3) {
      if (descShow) {
        sortType = 'prices_asc'
      } else {
        sortType = 'prices_desc'
      }
    }
    Api.shopList({
        keyword: '',
        sortType: sortType
      })
      .then(res => {
        var detailList = res.obj.result,
          totalCount = res.obj.totalCount
        if (Api.isNotEmpty(detailList)) {
          var datas = _this.data.result,
            newArr = app.pageRequest.addDataList(datas, detailList)
          _this.setData({
            result: newArr,
            totalCount: totalCount,
            baseUrl: app.globalData.imageUrl,
            noMoreData: true
          })
        } else {
          _this.setData({
            noMoreData: false
          })
          Api.showToast("暂无更多数据了！")
        }
      })
  },
  chooseImage: function() {
    var _this = this
    Api.uploadImage("STORE_IMAGE")
      .then(res => {
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
              success: function() {
                _this.closeShow()
              }
            })
          })
      })
  },
  homeIndex: function() {
    var that = this;
    Api.homeIndex({
        goodsSortType: "multiple"
      })
      .then(res => {
        var obj = res.obj
        wx.setNavigationBarTitle({
          title: obj.store.storeName == null ? "小云店" : obj.store.storeName
        })
        app.globalData.isFollow = obj.isFollow
        var result = obj.goods.result
        var floorInfo = Api.isFloorInfo(obj.store.floor)
        that.setData({
          store: obj.store,
          floorInfo: floorInfo,
          baseUrl: app.globalData.imageUrl,
          coverUrl: obj.store.coverUrl,
          result: result,
          totalCount: obj.goods.totalCount,
          likeShow: app.globalData.isFollow
        }, function() {
          var query = wx.createSelectorQuery();
          query.select('#myText').boundingClientRect()
          query.exec(function(res) {
            that.setData({
              bannerHeight: res[0].height
            })
          })
          if (result.length > 0) {
            var query2 = wx.createSelectorQuery();
            query2.select('#result-list').boundingClientRect()
            query2.exec(function(res) {
              that.setData({
                goodsHeight: res[0].height
              })
            })
          }
          var query1 = wx.createSelectorQuery();
          query1.select('#swiper-tab').boundingClientRect()
          query1.exec(function(res) {
            that.setData({
              swiperHeight: res[0].height
            })
          })
        })
      })
  },
  // 初始化数据
  loadData: function() {
    var _this = this
    if (!Api.getStoreId()) {
      this.setData({
        indexEmpty: false
      })
    } else {
      this.setData({
        indexEmpty: true
      })
      this.closeShow()
      app.pageRequest.pageDataIndex.pageNum = 1
      app.pageRequest.pageData.pageNum = 0
      getIdentity(this)
      app.globalData.switchStore = false
    }
  },
  // 浮矿
  // ballMoveEvent: function (e) {
  //   console.log('我被拖动了....')
  //   var touchs = e.touches[0];
  //   var pageX = touchs.pageX;
  //   var pageY = touchs.pageY;
  //   console.log('pageX: ' + pageX)
  //   console.log('pageY: ' + pageY)
  //   //防止坐标越界,view宽高的一般
  //   if (pageX < 30) return;
  //   if (pageX > this.data.screenWidth - 30) return;
  //   if (this.data.screenHeight - pageY <= 30) return;
  //   if (pageY <= 30) return;
  //   //这里用right和bottom.所以需要将pageX pageY转换
  //   var x = this.data.screenWidth - pageX - 30;
  //   var y = this.data.screenHeight - pageY - 30;
  //   console.log('x: ' + x)
  //   console.log('y: ' + y)
  //   this.setData({
  //     ballBottom: y,
  //     ballRight: x
  //   });
  // },
  onLoad: function(options) {
    // 浮矿
    // var _this = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     _this.setData({
    //       screenHeight: res.windowHeight,
    //       screenWidth: res.windowWidth,
    //     });
    //   }
    // });
    // 浮矿
    var _this = this
    if (options != undefined) {
      let enEnterStoreHandler = new EnterStoreHandler("2");
      enEnterStoreHandler.enterStore(options).then(store => {
        //进店成功
        _this.setData({
          isOnloaded: true
        });
        _this.loadData()
      }).catch(store => {
        _this.setData({
          isOnloaded: true
        });
        _this.loadData()
        if (store) {
          // 判断批零进到零售店
          if (store.storeIdRetail) {
            _this.setData({
              goRetailStore: false
            })
          }
        }
      });
    } else {
      _this.loadData()
      this.setData({
        getFollw: authHandler.isLogin(),
        disLike: false,
      })
    }
  },
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  emptyArr: function() {
    this.setData({
      result: []
    });
    app.pageRequest.pageDataIndex.pageNum = 0
    this.getList()
  },
  getListNew: function() {
    var _this = this
    Api.recentGoods()
      .then(res => {
        var detailList = res.obj.result,
          totalCount = res.obj.totalCount
        if (Api.isNotEmpty(detailList)) {
          var datas = _this.data.result,
            newArr = app.pageRequest.addDataList(datas, detailList)
          _this.setData({
            result: newArr,
            totalCount: totalCount,
            baseUrl: app.globalData.imageUrl,
            noMoreData: true
          })
          if (newArr.length > 0) {
            var query2 = wx.createSelectorQuery();
            query2.select('#result-list').boundingClientRect()
            query2.exec(function(res) {
              _this.setData({
                goodsHeight: res[0].height
              })
            })
          }
        } else {
          _this.setData({
            noMoreData: false
          })
          Api.showToast("暂无更多数据了！")
        }
      })
  },
  emptyArrNew: function() {
    var _this = this
    this.setData({
      result: []
    }, function() {
      app.pageRequest.pageData.pageNum = 0
      _this.getListNew()
    });
  },
  swichNav: function(e) {
    var that = this,
      descShow = this.data.descShow,
      index = e.target.dataset.current
    if (this.data.currentTab === index) {
      if (index == 3) {
        that.setData({
          descShow: !descShow
        }, function() {
          this.emptyArr()
        })
      }
      return false;
    } else {
      that.setData({
        currentTab: index,
      }, function() {
        if (index == 1) {
          that.emptyArrNew()
        } else {
          this.emptyArr()
        }
      })
    }
  },
  // 置顶
  topGoods: function() {
    var goodsId = this.data.goodsId,
      _this = this
    Api.topGoods({
        goodsId: goodsId
      })
      .then(res => {
        wx.showToast({
          title: "置顶成功",
          icon: 'none',
          duration: 1000,
          mask: true,
          success: function() {
            _this.closeShow()
            _this.emptyArr()
          }
        })
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  likeStore: function() {
    var _this = this
    Api.likeStore()
      .then(res => {
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
  disLike: function() {
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
          likeShow: false,
          disLike: false
        })
      })
  },
  deteleLikeStore: function() {
    var _this = this
    this.setData({
      disLike: true
    })
  },
  onReady: function() {


  },
  searchBtn(e) {
    this.setData({
      result: []
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
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    this.getStore();
    var _this = this,
      isOnloaded = this.data.isOnloaded
    if (isOnloaded) {
      if (authHandler.isLogin()) {
        var limitShow = this.data.limitShow
        var setlimitShow = wx.getStorageSync("admin")
        if (Api.isNotEmpty(setlimitShow)) {
          this.setData({
            limitShow: setlimitShow
          })
        }
        if (app.globalData.isFollow) {
          this.setData({
            likeShow: true
          })
        }
        if (!app.globalData.isFollow) {
          this.setData({
            likeShow: false
          })
        }
      } else {
        this.setData({
          limitShow: 1,
          likeShow: false
        })
      }
      if (app.globalData.switchStore) {
        this.loadData()
      }
    }
    this.setData({
      getFollw: authHandler.isLogin(),
      disLike: false,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var currentTab = this.data.currentTab
    this.setData({
      currentTab: currentTab,
      noMoreData: true
    }, function() {
      if (currentTab == 1) {
        this.emptyArrNew()
      } else {
        this.emptyArr()
      }
      wx.stopPullDownRefresh();
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var store = this.data.store,
      img = this.data.src,
      goodsName = this.data.goodsName,
      id = this.data.goodsId,
      storeId = store.storeId,
      storeName = store.storeName
    if (res.from === 'button') {
      var name = res.target.dataset.name
      if (name == "names") {
        return {
          title: goodsName,
          path: '/pages/page/goodsDetails/goodsDetails?goodsId=' + id + "&storeId" + storeId,
          imageUrl: img,
          success: (res) => {},
          fail: (res) => {}
        }
      }
    } else {
      return {
        title: storeName,
        path: '/pages/page/home/home?storeId=' + storeId,
        success: (res) => {},
        fail: (res) => {}
      }
    }

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var noMoreData = this.data.noMoreData
    var currentTab = this.data.currentTab
    if (noMoreData) {
      if (currentTab == 1) {
        this.getListNew()
      } else {
        this.getList()
      }
    }
  },
  onPageScroll: function(e) {
    var top = e.scrollTop,
      result = this.data.result,
      goodsHeight = this.data.goodsHeight,
      totalCount = this.data.totalCount,
      swiperHeight = this.data.swiperHeight,
      allHeight = this.data.bannerHeight + swiperHeight - goodsHeight,
      getHeght = top - allHeight,
      goodsNum = (parseInt(getHeght / goodsHeight) + 1) * 2
    if (goodsNum > result.length) {
      this.setData({
        goodsNum: result.length
      })
    } else {
      this.setData({
        goodsNum: goodsNum
      })
    }
  }
})