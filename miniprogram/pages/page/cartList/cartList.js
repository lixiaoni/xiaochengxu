const app = getApp();
var that
import Api from '../../../utils/api.js'
import authHandler from '../../../utils/authHandler.js';
function getIdentity(_this) {
  if (authHandler.isLogin()) {
    Api.userIdentity()
      .then(res => {
        var obj = res.obj
        if (obj == "null" || obj == null) {
          wx.setStorageSync("admin", 1)
          _this.setData({
            limitShow: 1
          })
        }else{
          var isStoreOwner = obj.isStoreOwner,
            isPurchaser = obj.isPurchaser
          if (isStoreOwner) {
            if (obj.storeNature == 2) {
              wx.setStorageSync("admin", 2)
              _this.setData({
                limitShow: 2
              })
            }
            if (obj.storeNature == 1) {
              wx.setStorageSync("admin", 1)
              _this.setData({
                limitShow: 1
              })
            }
          }else{
            wx.setStorageSync("admin", 1)
            _this.setData({
              limitShow: 1
            })
          }
        }
        _this.getList(_this)
      })
  } else {
    _this.getList(_this)
    wx.setStorageSync("admin", 1)
    _this.setData({
      limitShow: 1
    })
  }
}
Page({
  data: {
    indexEmpty: true,
    enjoyCost:false,
    detailList:[],
    detailList1:[],
    hasList:false,
    lostcarts: [],
    lostList: false,
    totalPrice:0, 
    enjoyCostNew:false,
    baseUrl: app.globalData.imageUrl,
    selectAllStatus:true, 
    allEmpty:true,
    total1:0,
    obj:{
        name:"hello"
    },
    storeMes:[],
    storeId: wx.getStorageSync('storeId'),
    hidden: true,
    idnex:'',
    leftVal:'',
    numbers: 1,
    baseUrl: app.globalData.imageUrl,
    limitShow:1,
    storeAmount: 0,
    storeNum: 0,
    differentPrice:0,
    editDetailList:'',
    goodsConfig:[]
  },
  
  // 规格
  //选择规格
  showAlert: function (e) {
    var that = this,
      name=e.target.dataset.name,
      limitShow = this.data.limitShow
    if (name == "more") {
      var index = e.target.dataset.index,
        detailList = this.data.detailList[index]
      wx.navigateTo({
        url: '../goodsDetails/goodsDetails?goodsId=' + detailList["goodsId"] + "&code=" + index + "&name=more",
      })
    }
    if (limitShow == 3 && name == "one") {
      var gid = e.target.dataset.gid
      wx.navigateTo({
        url: '../goodsDetails/goodsDetails?goodsId=' + gid + "&code=" + index + "&name=more",
      })
    }
    if (limitShow != 3 && name == "one") {
      var gid = e.target.dataset.gid
      wx.navigateTo({
        url: '../goodsDetails/goodsDetails?goodsId=' + gid + "&code=" + index + "&name=one",
      })
    }
  },
  lookDetails: function (e) {
    var goodsId = e.target.dataset.id
    wx.navigateTo({
      url: '../goodsDetails/goodsDetails?goodsId=' + goodsId,
    })
  },
  //选择规格属性
  changeButton: function (e) {
    var that = this;
    if (this.data.specsTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        specsTab: e.target.dataset.current,
      })
    }
  },
  // 购买数量
  minusCount1: function () {
    var num = this.data.numbers
    num = num - 1
    if (num == 0) {
      return
    } else {
      this.setData({
        numbers: num
      })
    }
  }, 
  addCount1: function () {
    var num = this.data.numbers
    num = parseInt(num) + 1
    this.setData({
      numbers: num
    })
  },
  blurInput: function (e) {
    var num = e.detail.value
    if (num == '') {
      num = 1
    }
    const index = e.currentTarget.dataset.index;
    let detailList = this.data.detailList;
    let storeId = this.data.storeId
    detailList[index].shoppingCartSkuList[0].num = num;
    detailList[index].num = num
    var arr = this.updatePrice(num, index)
    detailList[index].allGoodsAmount = arr[0]
    detailList[index].allGoodsPf = arr[1]
    var data = detailList[index].shoppingCartSkuList
    var dataArr = []
    dataArr.push({ goodsId: data[0]["goodsId"], num: parseInt(num), skuCode: data[0]["skuCode"], storeId: storeId })
    this.addCart(data[0]["goodsId"], JSON.stringify(dataArr))
    this.setData({
      detailList: detailList
    });
    this.getTotalPrice();
  },
  blurInput1: function (e) {
    var num = e.detail.value
    if (num == '') {
      num = 1
    }
    const index = e.currentTarget.dataset.index;
    let detailList = this.data.detailList;
    let storeId = this.data.storeId
    detailList[index].num = num
    detailList[index].allGoodsPf = num * detailList[index].wholesalePrice
    detailList[index].allGoodsAmount = num * detailList[index].sellPrice
    var dataArr = []
    dataArr.push({ goodsId: detailList[index]["goodsId"], num: parseInt(num), skuCode: 0, storeId: storeId })
    this.addCart(detailList[index]["goodsId"], JSON.stringify(dataArr))
    this.setData({
      detailList: detailList
    }, function () {
      this.getTotalPrice();
    });
  },
  changeNum1: function (e) {
    var num = e.detail.value
    const index = e.currentTarget.dataset.index;
    let detailList = this.data.detailList;
    if (num == '') { return }
    num = num.replace(/\b(0+)/gi, "")
    if (num == 0) {
      num = 1
    }
    let storeId = this.data.storeId
    let stockNum = detailList[index].stockNum
    if (num > stockNum) {
      num = stockNum
    }
    detailList[index].num = num
    detailList[index].allGoodsPf = num * detailList[index].wholesalePrice
    detailList[index].allGoodsAmount = num * detailList[index].sellPrice
    var dataArr = []
    dataArr.push({ goodsId: detailList[index]["goodsId"], num: parseInt(num), skuCode: 0, storeId: storeId })
    this.addCart(detailList[index]["goodsId"], JSON.stringify(dataArr))
    this.setData({
      detailList: detailList
    }, function () {
      this.getTotalPrice();
    });
  },
  weghtSwi: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  urlHome: function () {
    wx.switchTab({
      url: '../home/home'
    })
  },
  //关闭弹框
  closeAlert: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(1000).step()
    that.setData({
      animationData: animation.export(),

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        hidden: true

      })
    }, 300)
  },  
  rightList:function(e){
    this.setData({
      leftVal:0
    });
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
  urlHome: function () {
    wx.switchTab({
      url: '../home/home'
    })
  },
  getList:function(){
    this.setData({
      detailList: [],
      lostcarts:[],
    })
    var _this=this
    Api.cartList()
      .then(res => {
        const obj=res.obj
        if (obj==null){
          _this.setData({
            allEmpty: false
          })
          return
        }else{
          _this.setData({
            allEmpty: true
          })
        }
          var newEffectiveListLen = res.obj.effectiveList.length,
          newFailureListLen= res.obj.failureList.length,
          storeMes=[]
        if (newEffectiveListLen>0){
         var  effectiveList = obj.effectiveList[0].goodsList,
           store = obj.effectiveList[0].store
        }else{
          var effectiveList=[]
        }
        if (newFailureListLen > 0) {
          var failureList = obj.failureList[0].goodsList
        } else {
          var failureList = []
        }
        if (effectiveList.length>0){
          _this.setData({
            hasList: true,
            selectAllStatus:true,
          });
          for (var i = 0; i < effectiveList.length; i++) {
            effectiveList[i].selected = true
            var newSkvArr = effectiveList[i].shoppingCartSkuList
            if (Api.isNotEmpty(newSkvArr)) {
              var num = 0;
              var allGoodsAmount = 0
              var allGoodsPf = 0
              for (var j = 0; j < newSkvArr.length; j++) {
                num += newSkvArr[j].num
                allGoodsAmount += newSkvArr[j].sellPrice * newSkvArr[j].num
                allGoodsPf += newSkvArr[j].wholesalePrice * newSkvArr[j].num
              }
              effectiveList[i].num = num
              effectiveList[i].allGoodsAmount = allGoodsAmount.toFixed(2)
              effectiveList[i].allGoodsPf = allGoodsPf.toFixed(2)
            } else {
              effectiveList[i].allGoodsAmount = (effectiveList[i].sellPrice * effectiveList[i].num).toFixed(2)
              effectiveList[i].allGoodsPf = (effectiveList[i].wholesalePrice * effectiveList[i].num).toFixed(2)
            }
          }
        }
        if (failureList.length > 0) {
          _this.setData({
            lostList: true,
          });
        }
        if (effectiveList.length == 0 && failureList.length==0){
          _this.setData({
            allEmpty:false
          })
        }
        storeMes.push(store)
        if(effectiveList.length==0){
          _this.setData({
            hasList:false
          })
        }
        var saleBatchNum = 0
        var saleBatchAmount=0
        if (Api.isNotEmpty(store)){
          if (store.saleBatchAmount == null){
            saleBatchAmount=0
          }else{
            saleBatchAmount = store.saleBatchAmount
          }
          if (store.saleBatchNum == null) {
            saleBatchNum =0
          } else {
            saleBatchNum = store.saleBatchNum
          }
        }
        _this.setData({
          storeAmount:saleBatchAmount,
          storeNum: saleBatchNum,
          detailList: effectiveList,
          lostcarts: failureList,
          storeMes: storeMes
        },function(){
          _this.getTotalPrice();
        })
      })
    
  },
  onLoad: function (options) {
  
  },
  onShow() {
    this.setData({
      detailList: []
    })
    if (!Api.getStoreId()) {
      this.setData({
        indexEmpty: false
      })
    } else {
      getIdentity(this)
    }
    
  },
  /**
   * 当前商品选中事件
   */
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let detailList = this.data.detailList;
    const selected = detailList[index].selected;
    detailList[index].selected = !selected;
    var len = detailList.length,
        num=0;
    for (var i = 0; i < detailList.length;i++){
      if (detailList[i].selected){
        num=num+1
      }
    }
    if(num==len){
      this.setData({
        selectAllStatus: true
      })
    }else{
      this.setData({
        selectAllStatus: false
      })
    }
    this.setData({
      detailList: detailList
    });
    this.getTotalPrice();
  },
  /**
   * 清空失效宝贝
   */
  emptyAll(e) {
    var _this=this
    Api.deteleCartFai()
     .then(res => {
        wx.showToast({
          title: '清空成功',
          icon: 'none',
          duration: 2000
        })
       setTimeout(function () {
         _this.getList()
       }, 1000)
    })
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index,
      goodsId = e.currentTarget.dataset.id,
          _this=this
    Api.deteleCartGoods({ goodsId: goodsId})
    .then(res=>{
      Api.showToast("删除成功")
      _this.getList()
    })
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let detailList = this.data.detailList;

    for (let i = 0; i < detailList.length; i++) {
      detailList[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      detailList: detailList
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCart(goodsId,data){
    Api.updateMoreCart(data)
      .then(res => {
      })
  },
  changeNum: function (e) {
    var num = e.detail.value
    if (num == '') { return }
    num = num.replace(/\b(0+)/gi, "")
    if (num == 0) {
      num = 1
    }
    const index = e.currentTarget.dataset.index;
    let detailList = this.data.detailList;
    let storeId = this.data.storeId
    let stockNum = detailList[index].shoppingCartSkuList[0].stockNum
    if (num > stockNum) {
      num = stockNum
    }
    detailList[index].shoppingCartSkuList[0].num = num;
    detailList[index].num = num
    var arr = this.updatePrice(num, index)
    detailList[index].allGoodsAmount = arr[0]
    detailList[index].allGoodsPf = arr[1]
    var data = detailList[index].shoppingCartSkuList
    var dataArr = []
    dataArr.push({ goodsId: data[0]["goodsId"], num: parseInt(num), skuCode: data[0]["skuCode"], storeId: storeId })
    this.addCart(data[0]["goodsId"], JSON.stringify(dataArr))
    this.setData({
      detailList: detailList
    });
    this.getTotalPrice();
  },
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let detailList = this.data.detailList;
    let num = detailList[index].shoppingCartSkuList[0].num;
    num = parseInt(num) + 1;
    let stockNum = detailList[index].shoppingCartSkuList[0].stockNum
    if (num > stockNum) {
      num = stockNum
    }
    let storeId = this.data.storeId
    detailList[index].shoppingCartSkuList[0].num = num;
    detailList[index].num = num
    var arr = this.updatePrice(num, index)
    detailList[index].allGoodsAmount = arr[0]
    detailList[index].allGoodsPf = arr[1]
    var data = detailList[index].shoppingCartSkuList
    var dataArr=[]
    dataArr.push({ goodsId: data[0]["goodsId"], num: parseInt(num), skuCode: data[0]["skuCode"], storeId:storeId})
    this.addCart(data[0]["goodsId"],JSON.stringify(dataArr))
    this.setData({
      detailList: detailList
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  
  minusCountNew(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let detailList = this.data.detailList;
    let storeId = this.data.storeId
    let num = detailList[index].num
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    detailList[index].num = num;
    detailList[index].allGoodsPf = num * detailList[index].wholesalePrice
    detailList[index].allGoodsAmount = num * detailList[index].sellPrice
    var dataArr = []
    dataArr.push({ goodsId: detailList[index]["goodsId"], num: parseInt(num), skuCode:0, storeId: storeId })
    this.addCart(detailList[index]["goodsId"], JSON.stringify(dataArr))
    this.setData({
      detailList: detailList
    },function(){
      this.getTotalPrice();
    });
    
  },
  addCountNew(e) {
    const index = e.currentTarget.dataset.index;
    let detailList = this.data.detailList;
    let num = detailList[index].num;
    num = parseInt(num) + 1;
    let stockNum = detailList[index].stockNum
    if (num > stockNum) {
      num = stockNum
    }
    let storeId = this.data.storeId
    detailList[index].num = num
    detailList[index].allGoodsPf = num * detailList[index].wholesalePrice
    detailList[index].allGoodsAmount = num * detailList[index].sellPrice
    var dataArr = []
    dataArr.push({ goodsId: detailList[index]["goodsId"], num: parseInt(num), skuCode: 0, storeId: storeId })
    this.addCart(detailList[index]["goodsId"], JSON.stringify(dataArr))
    this.setData({
      detailList: detailList
    },function(){
      this.getTotalPrice();
    });
  },
  // 更改商品价格
  updatePrice:function(num,index){
    var effectiveList = this.data.detailList[index],
      shoppingCartSkuList = effectiveList.shoppingCartSkuList
    if (Api.isNotEmpty(shoppingCartSkuList)){
      var arr = []
      arr.push(shoppingCartSkuList[0].sellPrice * num)
      arr.push(shoppingCartSkuList[0].wholesalePrice * num)
      return arr
    }else{
      var arr = []
      arr.push(effectiveList.sellPrice * num)
      arr.push(effectiveList.wholesalePrice * num)
      return arr
    }
  },
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let detailList = this.data.detailList;
    let storeId = this.data.storeId
    let num = detailList[index].shoppingCartSkuList[0].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    detailList[index].shoppingCartSkuList[0].num = num;
    detailList[index].num = num
    var arr=this.updatePrice(num,index)
    detailList[index].allGoodsAmount = arr[0]
    detailList[index].allGoodsPf = arr[1]
    var data = detailList[index].shoppingCartSkuList
    var dataArr = []
    dataArr.push({ goodsId: data[0]["goodsId"], num: parseInt(num), skuCode: data[0]["skuCode"], storeId: storeId })
    this.addCart(data[0]["goodsId"], JSON.stringify(dataArr))
    this.setData({
      detailList: detailList
    });
    this.getTotalPrice();
  },
  /**
   * 计算总价
   */
  getTotalPrice() {
    var limitShow = this.data.limitShow,
      storeNum = this.data.storeNum,
      storeAmount = this.data.storeAmount,
      allTotalNum=0,
      total1=0,
      totalNew=0,
      differentPrice = this.data.differentPrice,
      differentPriceNew = 0,
      saleBatchGoodsNum=0,
      allGoodsAmount = 0,
      enjoyCost=false
    var detailList = this.data.detailList;// 获取购物车列表
    for (var i = 0; i < detailList.length; i++) { 
      if (detailList[i].selected) {
        total1 += parseFloat(detailList[i].allGoodsAmount);
      }
    }
    this.setData({ 
      detailList: detailList,
      total1: total1.toFixed(2),
      enjoyCost: enjoyCost,
      differentPrice: parseInt(differentPrice),
    });
  },
  creatOrder:function(){
    var data=this.data.detailList,
        model=[]
    for(var i=0;i<data.length;i++){
      if (data[i].selected){
        var dataArr = data[i].shoppingCartSkuList
        if (dataArr!=null){
          for (var j = 0; j < dataArr.length; j++) {
            model.push({ goodsId: data[i].goodsId, num: parseInt(dataArr[j].num), skuCode: dataArr[j].skuCode })
          }
        }else{
          model.push({ goodsId: data[i].goodsId, num: parseInt(data[i].num), skuCode:0})
        }
      }
    }
   if(model.length==0){
     Api.showToast("请勾选商品！")
     return
   }
    var model = JSON.stringify(model);
    wx.navigateTo({
      url: '../address/address?model=' + model + '&enjoyCost=' + this.data.enjoyCost + '&totalPrice=' + this.data.totalPrice,
    })
  },
  onPullDownRefresh: function () {
    this.onShow()
    wx.stopPullDownRefresh();
  },
})