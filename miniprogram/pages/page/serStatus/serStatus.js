const app = getApp();
var that
import Api from '../../../utils/api.js'
Page({
  data: {
    history: [],
    hidden: false,
    baseUrl: app.globalData.imageUrl,
    result: [],
    value: '',
    limitShow: wx.getStorageSync('admin'),
    showResult: false,
    closeCont: false,
  },
  searchInput(e) {
    if (e.detail.value == '') {
      this.setData({
        value: e.detail.value,
        hidden: false,
      })
    } else {
      this.setData({
        value: e.detail.value,
        hidden: true,
      })
    }

  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = app.touch._touchstart(e, this.data.result)
    this.setData({
      result: data
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = app.touch._touchmove(e, this.data.result)
    this.setData({
      result: data
    })
  },
  //搜索确定键
  getList: function (value) {
    var keyword = value,
      _this = this
    Api.goodsApiSearchList({ keyword: keyword })
      .then(res => {
        var obj = res.obj.result,
          totalCount = res.obj.totalCount
        var datas = _this.data.result,
          newArr = app.pageRequest.addDataList(datas, obj)
        _this.setData({
          result: newArr,
          showResult: true,
        })
      })
  },
  searchBtn(e) {
    app.pageRequest.pageData.pageNum = 0
    this.setData({
      result: []
    })
    var value = this.data.value
    if (Api.isEmpty(value)) {
      this.historyHandle(value)
    }
    this.getList(value)
  },
  // 清空input的内容
  emptyInput(e) {
    this.setData({
      value: '',
      showResult: false,
      hidden: false,
      closeCont: false
    })
    wx.removeStorageSync('history')
  },
  keywordHandle(e) {
    const text = e.target.dataset.name;
    this.setData({
      value: text,
      showResult: true
    })
    this.historyHandle(text);
    this.getList(text)
  },
  historyHandle(value) {
    let history = this.data.history;
    const idx = history.indexOf(value);
    if (idx === -1) {
      // 搜索记录只保留8个
      if (history.length > 7) {
        history.pop();
      }
    } else {
      history.splice(idx, 1);
    }
    history.unshift(value);
    wx.setStorageSync('history', JSON.stringify(history));
    this.setData({
      history
    });
  },
  removeAll() {
    this.setData({
      history: []
    });
    wx.removeStorageSync('history')
  },
  onLoad(options) {
    app.pageRequest.pageData.pageNum = 0
    const history = wx.getStorageSync('history');
    if (history) {
      this.setData({
        history: JSON.parse(history)
      })
    }
    var _this = this
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    app.pageRequest.pageData.pageNum = 0
    this.setData({
      result: [],
    })
    this.getList(this.data.value)
    wx.stopPullDownRefresh();
  },
  onShareAppMessage: (res) => {
    var img = '',
      name = '',
      id = ''
    if (res.from === 'button') {
      var res = res.target.dataset
      img = res.img;
      id = res.id
      name = res.name
    }
    return {
      title: name,
      path: '/pages/page/goodsDetails/goodsDetails?goodsId=' + id,
      imageUrl: img,
      success: (res) => {
      },
      fail: (res) => {
      }
    }
  },
  lookGoodsDetails: function (e) {
    var id = e.target.dataset.id
    wx.navigateTo({
      url: '/pages/page/goodsDetails/goodsDetails?goodsId=' + id,
    })
  },
  editGoods: function (e) {
    var id = e.target.dataset.id
    wx.navigateTo({
      url: '../editGoods/editGoods?goodsId=' + id,
    })
  },
  // 上下架
  changeStatus: function (e) {
    const goodId = e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index,
      _this = this,
      result = this.data.result,
      goodsIdList = []
    goodsIdList.push(goodId)
    Api.goodsApiSearchList(goodsIdList)
      .then(res => {
        result[index].status = "1"
        _this.setData({
          result: result,
        })
        wx.showToast({
          title: '上架成功',
          icon: 'none',
          duration: 2000
        })
      })

  },
  //删除事件
  del: function (e) {
    var indexDel = e.currentTarget.dataset.index,
      goodsIdDel = e.currentTarget.dataset.id
    var _this = this
    _this.setData({
      show1: true,
      indexDel: indexDel,
      goodsIdDel: goodsIdDel
    })
  },
  confirmDetele: function () {
    var that = this,
      indexDel = this.data.indexDel,
      goodsIdDel = this.data.goodsIdDel
    that.data.detailList.splice(indexDel, 1)
    Api.adminGoodsDelete({ goodId: goodsIdDel })
      .then(res => {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000
        })
        that.setData({
          detailList: that.data.detailList
        })
        that.cancel()
      })
  },
  upStatus: function (e) {
    const goodId = e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index,
      _this = this,
      result = this.data.result,
      goodsIdList = []
    goodsIdList.push(goodId)
    Api.adminGoodsDown(goodsIdList)
      .then(res => {
        result[index].status = "0"
        _this.setData({
          result: result,
        })
        wx.showToast({
          title: '下架成功',
          icon: 'none',
          duration: 2000
        })
      })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var value = this.data.value
    this.getList(value)
  }
})