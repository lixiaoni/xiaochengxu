import util from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsListData: [],
    goodsSkuVOList: [],
    skuListAll:[],
    skuNum:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this,
        goodsListData = JSON.parse(options.model),
        sellPrice = options.sellPrice,
        newConst = options.newConst,
        skuList0=[],
        skuList1=[],
        skuListAll=[],
      goodsSkuVOList = options.modeList
    console.log(goodsListData)
    if (goodsListData!=''){
      if (goodsListData.length == 1) {
        skuList0 = goodsListData[0].goodsSpecificationValueVOList
        for (var i = 0; i < skuList0.length; i++) {
          skuListAll.push({ id: i + '1' + i, specValueName: skuList0[i].specValueName, specValueCode: "", specValueCodeList: [skuList0[i].specValueCode], marketPrice: '600', sellPrice: sellPrice, stockNum: newConst})
        }
      } else if (goodsListData.length = 2) {
        skuList0 = goodsListData[0].goodsSpecificationValueVOList
        skuList1 = goodsListData[1].goodsSpecificationValueVOList
        for (var i = 0; i < skuList0.length; i++) {
          for (var j = 0; j < skuList1.length; j++) {
            skuListAll.push({ id: j + '1' + i, specValueName: skuList0[i].specValueName, specValueCode: skuList1[j].specValueName, specValueCodeList: [skuList0[i].specValueCode, skuList1[j].specValueCode], marketPrice: '600', sellPrice: sellPrice, stockNum: newConst})
          }
        }
      }
    }
    if (goodsSkuVOList!=undefined){
      goodsSkuVOList = JSON.parse(options.modeList)
      for (var i = 0; i < goodsSkuVOList.length; i++) {
        for (var j = 0; j < skuListAll.length; j++) {
          if (goodsSkuVOList[i].specValueCodeList.sort().toString() == skuListAll[j].specValueCodeList.sort().toString()) {
            skuListAll[j].sellPrice = goodsSkuVOList[i].sellPrice
            skuListAll[j].stockNum = goodsSkuVOList[i].stockNum
          }
        }
      }
    }
    _this.setData({
      skuListAll: skuListAll
    })
  },
  monitor:function(e){
    let id = e.target.dataset.id,
        name = e.target.dataset.name,
        val = e.detail.value,
        skuListAll = this.data.skuListAll
    for (var j = 0; j < skuListAll.length; j++) {
      if (id == skuListAll[j].id){
        if (name =="stockNum"){
          skuListAll[j][name] = val
        }else{
          skuListAll[j][name] = (util.newVal(val)).substring(0, 10)
        }
      }
    }
    this.setData({
      skuListAll: skuListAll
    })
  },
  goback:function(){
    var pages = getCurrentPages();             //  获取页面栈
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];    // 上一个页面
    wx.navigateBack({
      data: 1
    })
  },
  setFun:function(e){
    var skuNum = 0,
      skuListAll = this.data.skuListAll
    var pages = getCurrentPages();             //  获取页面栈
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];    // 上一个页面
    for (var i = 0; i < skuListAll.length;i++){
      delete skuListAll[i].specValueName
      delete skuListAll[i].id
      delete skuListAll[i].specValueCode
      if (skuListAll[i].stockNum!=''){
        skuNum += parseInt(skuListAll[i].stockNum)
      }
    }
    prevPage.setData({
      skuListAll: skuListAll,
      editShowSet:true,
      skuNum: skuNum
    })
    wx.navigateBack({
      data: 1
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