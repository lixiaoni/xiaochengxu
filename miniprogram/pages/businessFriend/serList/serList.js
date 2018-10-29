import Api from '../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: [],
    value: '',
    baseUrl: app.globalData.imageUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getMes:function(e){
    var accept = e.target.dataset.accept,
      name = e.target.dataset.name,
      logo = e.target.dataset.logo
    Api.isFriendStore({ storeId: accept})
    .then(res=>{
      var res=res.obj
      if(res){
        wx.navigateTo({
          url: '../information/information?status=2&send=&accept=' + accept+'&remark=&name='+name+'&logo='+logo,
        })
      }else{
        wx.navigateTo({
          url: '../information/information?status=0&send=&accept=' + accept+'&remark=&logo='+logo+'&name='+name,
        })
      }
    })
  },
  onLoad: function (options) {
    // isFriendStoreUrl
    if (options.value){
      app.pageRequest.pageData.pageNum = 0
      this.getList({ keyword: options.value})
      this.setData({
        value: options.value
      })
    }else{
      app.pageRequest.pageData.pageNum = 0
      this.getList({ keyword: this.data.value })
    }
  
  },
  removeVal:function(){
    this.setData({
      value:''
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  changeValue: function (e) {
    var val = e.detail.value
    this.setData({
      value: val
    })
  },
  searchBtn: function (e) {
    var val = e.detail.value
    app.pageRequest.pageData.pageNum = 0
    this.setData({
      detailList: []
    })
    this.getList({keyword: val })
  },
  getList: function (data) {
    var _this = this
    Api.serWholesalerList(data)
      .then(res => {
        var detailList = res.obj.result
        if (detailList.length==0){
          Api.showToast("暂无更多了")
        }
        if (detailList != null) {
          var datas = _this.data.detailList,
            newArr = app.pageRequest.addDataList(datas, detailList)
          _this.setData({
            detailList: newArr,
          })
        } else {
          Api.showToast("暂无更多了")
        }

      })
  },
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
    this.setData({
      detailList: [],
      value: ''
    })
    app.pageRequest.pageData.pageNum = 0
    this.getList({keyword: this.data.value})
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var val = this.data.value
    this.getList({keyword: val })
  },

})