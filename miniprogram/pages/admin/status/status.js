const app = getApp();
var that
import Api from '../../../utils/api.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: -1,
    alertTab:0,
    hidden:true,
    confirmUp:false,
    confirmDown:false,
    upIndex:0,
    keyword:'',
    indexDel:'',
    goodsId:'',
    currentTabSer:0,
    list:[],
    goodsIdDel:'',
    show1: false,
    showNum: false,
    value:'',
    totalCount:'',
    sImg:'/image/xl.png',
    detailList: [],
    goodsStatus:1,
    classStatus:false,
    baseUrl: app.globalData.imageUrl,
    code:'',
    alertData:["全部商品","引用商品","自建商品"],
  },
  changeValue:function(e){
    var value = e.detail.value
    this.setData({
      value:value
    })
  },
  blurInputEvent:function(){
    wx.navigateTo({
      url: '../serStatus/serStatus?value='+this.data.value,
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = app.touch._touchstart(e, this.data.detailList)
    this.setData({
      detailList: data
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
    var that=this,
      indexDel = this.data.indexDel,
      goodsIdDel = this.data.goodsIdDel
    that.data.detailList.splice(indexDel, 1)
    Api.adminGoodsDelete({ goodId: goodsIdDel })
      .then(res => {
        Api.showToast("删除成功")
        that.setData({
          show1:false,
          detailList: that.data.detailList
        })
      })
  },
  swichNavLast:function(){
    if (this.data.currentTab>-1){
      this.setData({
        hidden: false,
        sImg: '/image/xl1.png',
        classStatus: true,
      })
    }
  },
  swichNav: function (e) {
    var that = this,
        status=e.target.dataset.index
    that.setData({
      goodsStatus: status,
      hidden: true,
      classStatus:false,
      detailList: []
    })
    app.pageRequest.pageData.pageNum = 0
    this.classCode('')
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
        that.setData({
          currentTab: e.target.dataset.current,
          sImg: '/image/xl.png'
        })
    }
  },
  alertNav:function(e){
    var that = this;
    if (that.data.alertTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        alertTab: e.target.dataset.current,
      })

    }
  },
  hideSer:function(){
    this.setData({
      hidden: true,
    })
  },
 
  // 上下架
  confirmTip:function(){
    var id = this.data.goodsId
    wx.navigateTo({
      url: '../editGoods/editGoods?goodsId=' + id,
    })
  },
  confirmUp:function(){
    var _this=this,
      goodsIdList = [],
      index = this.data.upIndex,
      detailList = this.data.detailList,
      goodId = this.data.goodsId
    goodsIdList.push(goodId)
    Api.adminGoodsUp(goodsIdList)
      .then(res => {
        detailList[index].status = "1"
        detailList.splice(index, 1)
        _this.setData({
          detailList: detailList,
          confirmUp:false
        })
        wx.showToast({
          title: '上架成功',
          icon: 'none',
          duration: 2000
        })
      })
  },
  changeStatus:function(e){
    const goodId = e.currentTarget.dataset.id,
      num = e.currentTarget.dataset.num,
          index = e.currentTarget.dataset.index
    this.setData({
      goodsId: goodId
    })
    if (1>num){
      this.setData({
        showNum:true
      })
    }else{
      this.setData({
        confirmUp: true,
        upIndex:index
      })
    }
  },
  confirmDown: function () {
    var _this = this,
      goodsIdList = [],
      index = this.data.upIndex,
      detailList = this.data.detailList,
      goodId = this.data.goodsId
    goodsIdList.push(goodId)
    Api.adminGoodsDown(goodsIdList)
      .then(res => {
        detailList[index].status = "0"
        detailList.splice(index, 1)
        _this.setData({
          detailList: detailList,
          confirmDown:false
        })
        wx.showToast({
          title: '下架成功',
          icon: 'none',
          duration: 2000
        })
      })
  },
  upStatus:function(e){
    const goodId = e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index
    this.setData({
      confirmDown: true,
      upIndex: index,
      goodsId: goodId
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */

  getList: function () {
    var _this = this,
      keyword = this.data.keyword
    Api.adminGoodsList({ keyword: '' })
      .then(res => {
        var detailList = res.obj.result,
          datas = _this.data.detailList,
          totalCount = res.obj.totalCount,
          newArr = app.pageRequest.addDataList(datas, detailList)
        _this.setData({
          detailList: newArr,
          totalCount: totalCount
        })
      })
  },
  
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    Api.adminShopCate()
      .then(res => {
        var obj = res.obj
        obj.unshift({ name: "全部商品", customCategoryCode: "0000" })
        that.setData({
          list: obj
        })
      })
  },
  classCode:function(code){
    var _this = this,
      goodsStatus =this.data.goodsStatus
    if (goodsStatus==0){
      goodsStatus="0,2"
    }
    Api.adminGoodsStatus({ goodsStatus: goodsStatus})
      .then(res => {
        var detailList = res.obj.result
        if (Api.isEmpty(detailList)){
          var datas = _this.data.detailList,
            totalCount = res.obj.totalCount,
            newArr = app.pageRequest.addDataList(datas, detailList)
          _this.setData({
            detailList: newArr,
            totalCount: totalCount
          })
        }else{
          Api.showToast("暂无更多数据了！")
        }
      })
  },
  swichSer: function (e) {
    var that = this,
        code=e.target.dataset.code
    app.pageRequest.pageData.pageNum = 0
    this.classCode(code)
    that.setData({
      detailList: []
    })
    if (that.data.currentTabSer === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTabSer: e.target.dataset.current,
        code:code
      })

    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var gS = this.data.goodsStatus,
      currentTab = this.data.currentTab
    if (currentTab=="-1"){
      this.setData({
        currentTab: 0,
      })
    }else{
      this.setData({
        currentTab: currentTab,
      })
    }
    this.setData({
      goodsStatus: gS,
      hidden: true,
      showNum:false,
      confirmUp:false,
      confirmDown:false,
      classStatus: false,
      detailList: []
    })
    app.pageRequest.pageData.pageNum = 0
    this.classCode('')
  },
  bindDownLoad: function () {
    
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
    this.onShow()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this,
      code = this.data.code,
      goodsStatus = this.data.goodsStatus
    if (this.data.goodsStatus == '' && this.data.code == '') {
      that.getList()
    }
    if (this.data.goodsStatus != '' && this.data.code == '') {
      that.classCode('')
    }
    if (this.data.goodsStatus != '' && this.data.code != '') {
      that.classCode(code)
    }
  },
  lookGoodsDetails: function (e) {
    var id = e.target.dataset.id
    wx.navigateTo({
      url: '/pages/page/goodsDetails/goodsDetails?goodsId='+ id,
    })
  },
  editGoods:function(e){
    var id=e.target.dataset.id
    wx.navigateTo({
      url: '../editGoods/editGoods?goodsId='+id,
    })
  }, 
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = app.touch._touchstart(e, this.data.detailList)
    this.setData({
      detailList: data
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = app.touch._touchmove(e, this.data.detailList)
    this.setData({
      detailList: data
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: (res) => {
    var img='',
    name='',
    id='',
    storeId = wx.getStorageSync('storeId')
    if (res.from === 'button') {
     var res=res.target.dataset
      img =res.img;
      id=res.id
      name=res.name
      return {
        title: name,
        path: '/pages/page/goodsDetails/goodsDetails?goodsId=' + id + "&storeId=" + storeId,
        imageUrl: img,
        success: (res) => {
        },
        fail: (res) => {
        }
      }
    }else{
      return {
        path: '/pages/page/home/home?storeId=' + storeId,
        success: (res) => {
        },
        fail: (res) => {
        }
      }
    }
    
  },
})