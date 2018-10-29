// pages/address/address.js
const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    hiddenSelt: false,
    hiddenSend: true,
    address:"",  //地址
    invoice:"",  //发票
    phone:"", //电话
    msg:"",  //留言
    sendData:{}, //获取列表传递参数
    orderTitle:"订单"
  },

  //提交
  submit(){
    let type = this.data.currentTab,
        obj = {};
    if(type == 0){
      //自提
      let phone = this.data.phone;
      if (!phone || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
        wx.showToast({
          title: '请输入正确手机号码',
          icon:'none'
        })
        return false;
      }
      obj.userPhone = phone;
      obj.orderType = 1;
    }else if(type == 1){
      //物流
      let add = this.data.address;
      if(add=={}||!add){
        wx.showToast({
          title: '请选择收货人信息',
          icon: 'none'
        })
        return false;
      }
      obj.consigneeInfo = add;
      obj.orderType = 2;
    }

    let goods = this.data.goods;
    let goodsArr = [];
    goods.forEach((el,index,arr)=>{
      let detail = el.preOrderGoodsSkuList;
      if(detail){
        detail.forEach((item, index, arr) => {
          let obj = {};
          obj.goodsId = item.goodsId;
          obj.num = item.num;
          obj.skuCode = item.skuCode;
          goodsArr.push(obj);
        })
      }else{
        goodsArr.push({
          goodsId: el.goodsId,
          num: el.num,
          skuCode: 0
        });
      }
    })
    if (this.data.invoice){
      obj.receiptInfo = this.data.invoice;  //发票
    }
    obj.userMemo = this.data.msg  //留言
    obj.orderGoods = goodsArr;  //商品
    obj.orderCategory = this.data.orderCategory //订单种类
   
    Api.supplyOrde(obj).then((res)=>{
      //'../success/success'
      wx.showToast({
        title: res.message,
        icon: "none"
      })
      
      setTimeout(()=>{
        wx.redirectTo({
          url: '../orderSuccess/orderSuccess?num=' + res.obj.orderNumber
        })
      },800)
    })
  },

  watchInput(e){
    let val = e.detail.value,
        type = e.currentTarget.dataset.type;
    switch(type){
      case "phone" :
        this.setData({
          phone: val
        });break;
      case "msg":
        this.setData({
          msg: val
        }); break;
    }    
    
  },
  //获取地址
  getAddress(obj){
    if(!obj){return}
    this.setData({
      address:obj
    })
  },
  //获取发票
  getInvoice(obj){
    if (!obj) { return }
    this.setData({
      invoice: obj
    })
  },
  toInvoiceDetail(){
    let arr = [],
      invoice = this.data.invoice;
    for (let key in invoice){
      arr.push(key + "=" + invoice[key]);
    }
    let str = arr.join("&")
    wx.navigateTo({
      url: "../invoice/invoice?" + str,
    })
  },
  //获取默认地址
  getDefaultAdress(){
    //userid
    app.http.getRequest("/api/user/usershopaddress/default").then((res)=>{
      if(res.obj){
        this.setData({
          address:res.obj
        })
      }
    })
  },
  // 获取数据
  getData(){
    app.http.postRequest("/api/order/store/" + this.data.storeId+"/preorder", this.data.sendData
    ).then((res)=>{
        this.setData({
          store: res.obj.preOrderStore,
          goods: res.obj.preOrderGoodsList
        })
      this.resetGoods();
    })
  },
  //重置goods
  resetGoods(){
    let goods = this.data.goods,
        price = 0;
    goods.forEach((el)=>{
      //是否优惠
      let off = el.satisfiedWholesale;

      //有sku
      if (!el.num && el.preOrderGoodsSkuList){
        let num = 0;
        el.preOrderGoodsSkuList.forEach((item)=>{
          if (item.num){
            num += item.num;
            let thisPrice = 0;
            //价格
            if(off==true){
              thisPrice = item.wholesalePrice;
            }else{
              thisPrice = item.sellPrice;
            }

            if (!isNaN(thisPrice * item.num)){
              price += thisPrice * item.num;
            }
          }
        })
        el.num = num;
      }
      //没有sku
      if (el.num && !el.preOrderGoodsSkuList){
        let thisPrice = 0;
        //价格
        if (off==true) {
          thisPrice = el.wholesalePrice;
        } else {
          thisPrice = el.sellPrice;
        }
        if (!isNaN(thisPrice * el.num)) {
          price += thisPrice * el.num;
        }
      }
    })

    

    this.setData({
      goods,
      price: price.toFixed(2)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userType = wx.getStorageSync('identity'),
      storeId = wx.getStorageSync('storeId'),
      adminType= wx.getStorageSync("admin");
    
    this.setData({
      baseUrl: app.globalData.imageUrl
    })

    //订单分类[1 进货单|2 普通订单|3 购物车订单]
    let orderType = 3;
    //adminType=3;//delit
    if (adminType==1){
      //普通用户
      orderType = 3;
    } else if (adminType == 3 || adminType == 2){
      //批发商
      orderType = 1;  
      this.setData({orderTitle:'进货单'})
      wx.setNavigationBarTitle({
        title: '提交进货单',
      })
    }

    //let type = options.type;
    let model = JSON.parse(options.model);
    //model = { "goodsId": "180904092152685923df", "num": 1, "skuCode": "180904092152685923df_38a" }
    
    //读取数据

    if(!Array.isArray(model)){
      model = [model]
    }
    this.setData({
      orderCategory: orderType,
      storeId: storeId ?storeId:123,    
      sendData: model,
    })
    this.getData();
    this.getDefaultAdress();

  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      var index = e.currentTarget.dataset.current
      if(index==1){
        that.setData({
          currentTab: e.currentTarget.dataset.current,
          hiddenSelt: true,
          hiddenSend: false
        })
      }else{
        that.setData({
          currentTab: e.currentTarget.dataset.current,
          hiddenSelt: false,
          hiddenSend: true
        })
      }
      
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