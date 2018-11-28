const app = getApp();
import Api from '../../../utils/api.js'
import util from '../../../utils/util.js'
var x, y, x1, y1, x2, y2, index, currindex, n, yy;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    stockHide: false,
    isShow: true,
    isStatus: true,
    mainx: 0,
    isEmptySku: false,
    newConst: '',
    pageall: [],
    pageShow: true,
    currentTab: 0,
    hiddenSelt: false,
    hiddenSend: true,
    clickSpecShow: false,
    stock: '',
    strName: '',
    skuListAll: [],
    skuNum: 0,
    brand: '',
    name: '',
    show1: false,
    show: false,
    reImgIndex: 0,
    moveImgShow: true,
    code: '',
    recommendDesc: '',
    description: '',
    categoryCustomCode: '',
    categoryCode: '',
    marketPrice: 100,
    introduction: '',
    sellPrice: '',
    stockNum: 0,
    baseUrl: app.globalData.imageUrl,
    wholesalePrice: 0,
    goodsId: '',
    addGoodsDetails: [],
    mainImgUrl: "",
  },
  // 删除商品图
  showRemoveImg: function (e) {
    var index = e.target.dataset.index
    this.setData({
      show: true,
      reImgIndex: index
    })
  },
  removeImg: function () {
    var index = this.data.reImgIndex,
      pics = this.data.pics
    pics.splice(index, 1)
    this.setData({
      show: false,
      pics
    })
  },
  // 删除详情信息
  removeImage: function (e) {
    var index = e.target.dataset.index
    this.changeData(index)
  },
  changeData: function (index) {
    var data = this.data.addGoodsDetails
    data.splice(index, 1)
    this.setData({
      addGoodsDetails: data
    })
  },
  // 下移
  upData: function (e) {
    var addGoodsDetails = this.data.addGoodsDetails,
      index = e.target.dataset.index,
      newObj = ''
    if (index == addGoodsDetails.length - 1) { return }
    newObj = addGoodsDetails[index]
    addGoodsDetails.splice(index, 1)
    addGoodsDetails.splice(index + 1, 0, newObj)
    this.setData({
      addGoodsDetails: addGoodsDetails
    })
  },
  // 上移
  topData: function (e) {
    var addGoodsDetails = this.data.addGoodsDetails,
      index = e.target.dataset.index,
      newObj = ''
    if (index == 0) { return }
    newObj = addGoodsDetails[index]
    addGoodsDetails.splice(index, 1)
    addGoodsDetails.splice(index - 1, 0, newObj)
    this.setData({
      addGoodsDetails: addGoodsDetails
    })
  },
  insertData: function (e) {
    var index = e.target.dataset.index
    this.insertImg(1, index)
  },
  // 输入描述内容
  addTitle: function () {
    var _this = this,
      data = this.data.addGoodsDetails
    data.push({ input: true, value: '' })
    _this.setData({
      addGoodsDetails: data
    })
  },
  watchInput: function (e) {
    var value = e.detail.value,
      index = e.target.dataset.index,
      data = this.data.addGoodsDetails
    data[index].value = e.detail.value
    this.setData({
      addGoodsDetails: data
    })
  },
  watchDec: function (e) {
    var value = e.detail.value,
      index = e.target.dataset.index,
      data = this.data.addGoodsDetails
    data[index].value = e.detail.value
    this.setData({
      addGoodsDetails: data
    })
  },
  addCont: function () {
    var _this = this,
      data = this.data.addGoodsDetails
    data.push({ textInput: true, value: '' })
    _this.setData({
      addGoodsDetails: data
    })
  },
  watchName: function (event) {
    var _this = this,
      val = event.detail.value
    this.setData({
      name: val
    })
  },
  watchRec: function (event) {
    var _this = this,
      val = event.detail.value
    this.setData({
      recommendDesc: val
    })
  },
  addImage: function () {
    this.insertImg(0)
  },
  insertImg: function (code, index) {
    var _this = this
    Api.uploadImage("GOODS")
      .then(res => {
        var data = this.data.addGoodsDetails
        var url = JSON.parse(res).obj
        if (code == 0) {
          data.push({ img: _this.data.baseUrl + url })
        } else {
          data.splice(index, 0, { img: _this.data.baseUrl + url })
        }
        _this.setData({
          addGoodsDetails: data
        })
      })
  },
  wholesalePrice: function (event) {
    var _this = this,
      val = event.detail.value,
      num = val.length
    if (num > 11) {
      Api.showToast("超过最长数字限制")
    } else {
      this.setData({
        wholesalePrice: (util.newVal(val)).substring(0, 10),
      })
    }
  },
  sellPrice: function (event) {
    var _this = this,
      val = event.detail.value,
      num = val.length
    if (num > 11) {
      Api.showToast("超过最长数字限制")
    } else {
      this.setData({
        sellPrice: (util.newVal(val)).substring(0, 10),
      })
    }
  },
  stockFun: function (e) {
    var _this = this,
      val = e.detail.value
    if (val > 0) {
      this.setData({
        stock: val
      })
    } else {
      this.setData({
        stock: null
      })
      Api.showToast("请输入大于0的有效值！")
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getDetails: function (goodsId) {
    var _this = this
    Api.adminGetDetails({ goodsId: goodsId })
      .then(res => {
        var obj = res.obj,
          arrs = [],
          objImg = obj.goodsImageVOList
        for (var i = 0; i < objImg.length; i++) {
          arrs.push(_this.data.baseUrl + objImg[i].imageUrl)
        }
        if (obj.goodsSpecificationVOList != null) {
          var modelData = JSON.stringify(obj.goodsSpecificationVOList)
        } else {
          var modelData = ''
          _this.setData({
            newConst: obj.stockNum
          })
        }
        if (obj.goodsSkuVOList != null) {
          if (obj.goodsSkuVOList.length > 0) {
            _this.setData({
              clickSpecShow: true
            })
          }
        }
        var str = obj.description
        var arr = util.parseGoodsDescription(str)
        var data = _this.data.addGoodsDetails
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].tag == "h4") {
            data.push({ input: true, value: arr[i].content })
          }
          if (arr[i].tag == "p") {
            data.push({ textInput: true, value: arr[i].content })
          }
          if (arr[i].tag == "img") {
            data.push({ img: arr[i].content })
          }
        }
        _this.setData({
          pics: arrs,
          name: obj.name,
          isStatus: obj.status,
          mainImgUrl: obj.mainImgUrl,
          recommendDesc: obj.recommendDesc,
          pageall: obj.goodsSpecificationVOList,
          sellPrice: obj.sellPrice,
          addGoodsDetails: data,
          stockNum: obj.stockNum,
          model: modelData,
          storeId: obj.storeId,
          storeName: obj.storeName,
          wholesalePrice: obj.wholesalePrice,
          skuNum: obj.stockNum,
          skuListAll: obj.goodsSkuVOList,
          description: obj.description,
          categoryCode: obj.categoryCode,
          strName: obj.customCategoryName,
          codeName: obj.categoryName,
          categoryCustomCode: obj.customCategoryCode == "0" ? '':obj.customCategoryCode
        })
      })
  },
  wholesalePrice: function (event) {
    var _this = this,
      val = event.detail.value
    this.setData({
      wholesalePrice: val
    })
  },
  sellPrice: function (event) {
    var _this = this,
      val = event.detail.value
    this.setData({
      sellPrice: val
    })
  },
  getConfig: function () {
    var _this = this
    Api.saleBatch()
      .then(res => {
        var obj = res.obj
        if (obj.saleBatchNum) {
          _this.setData({
            stock: obj.saleBatchNum
          })
        } else {
          _this.setData({
            stock: null,
            stockHide: true
          })
        }

      })
  },
  // 取消
  cancel: function () {
    this.setData({
      show1: false,
    })
  },
  onLoad: function (options) {
    this.getConfig()
    this.setData({
      goodsId: options.goodsId
    })
    this.getDetails(options.goodsId)
  },
  // tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var index = e.target.dataset.current
      if (index == 1) {
        that.setData({
          currentTab: e.target.dataset.current,
          hiddenSelt: true,
          hiddenSend: false
        })
      } else {
        that.setData({
          currentTab: e.target.dataset.current,
          hiddenSelt: false,
          hiddenSend: true
        })
      }

    }
  },
  // 清空起批量
  clearInput: function (e) {
    this.setData({
      stock: null
    })
  },
  newConst: function (event) {
    var _this = this,
      val = event.detail.value,
      pageall = this.data.pageall,
      index1 = 1,
      index2 = 1,
      len = 1
    if (Api.isEmpty(pageall)) {
      for (var i = 0; i < pageall.length; i++) {
        var data = pageall[i].goodsSpecificationValueVOList.length
        if (i == 0) {
          index1 = pageall[i].goodsSpecificationValueVOList.length
        } else {
          index2 = pageall[i].goodsSpecificationValueVOList.length
        }
      }
      len = index1 * index2
      this.setData({
        newConst: val,
        skuNum: len * val
      })
    } else {
      this.setData({
        newConst: val,
        skuNum: val
      })
    }
  },
  // 分别设置价格和库存
  clickSpec: function (e) {
    var model = JSON.stringify(this.data.pageall),
      skuListAll = this.data.skuListAll,
      sellPrice = this.data.sellPrice,
      newConst = this.data.newConst,
      isEmptySku = this.data.isEmptySku,
      wholesalePrice = this.data.wholesalePrice
    if (skuListAll.length > 0) {
      var modeList = JSON.stringify(this.data.skuListAll)
      wx.navigateTo({
        url: '../set/set?model=' + model + '&modeList=' + modeList
      })
    } else {
      wx.navigateTo({
        url: '../set/set?model=' + model + "&sellPrice=" + sellPrice + "&wholesalePrice=" + wholesalePrice + "&newConst=" + newConst,
      })
    }
  },
  //长按拖动图片
  movestart: function (e) {
    currindex = e.currentTarget.dataset.index;
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
    x1 = e.currentTarget.offsetLeft;
    y1 = e.currentTarget.offsetTop;
  },
  move: function (e) {
    yy = e.currentTarget.offsetTop;
    x2 = e.touches[0].clientX - x + x1;
    y2 = e.touches[0].clientY - y + y1;
    this.setData({
      mainx: currindex,
      moveImgShow: false,
      opacity: 0.7,
      start: { x: x2, y: y2 }
    })
  },
  moveend: function (e) {
    var arr1 = this.data.pics
    if (y2 != 0) {
      var left = e.currentTarget.offsetLeft
      var top = e.currentTarget.offsetTop
      var windWidth = (wx.getSystemInfoSync().windowWidth - 15) / 4
      var leftIndex = (left / windWidth).toFixed()
      var num = parseInt((top / windWidth).toFixed()) + 1
      var newImg = arr1[currindex - 1]
      arr1.splice(currindex - 1, 1);
      if (num == 1) {
        arr1.splice(leftIndex, 0, newImg);
      } else if (num == 2) {
        arr1.splice(leftIndex + 4, 0, newImg);
      }
      this.setData({
        mainx: "",
        pics: arr1,
        moveImgShow: true,
        opacity: 1
      })
    }
  },
  // 图片上传
  chooseImage() {
    app.http.onlychoseImg().then(res => {
      let url = res.tempFilePaths[0];
      Api.toCuttingImg(url)
    })
  },
  afterCuttingImg(url) {
    this.setData({
      uploadImg: true
    })
    var _this = this,
      pics = this.data.pics;
    var _this = this
    app.http.onlyUploadImg(url, "GOODS").then(res => {
      var url = JSON.parse(res).obj
      if (url) {
        pics = pics.concat(_this.data.baseUrl + url);
        if (pics.length > 6) {
          wx.showToast({
            title: '最多上传6张',
            icon: 'none',
            duration: 2000
          })
        } else {
          _this.setData({
            pics: pics,
            isAllImg: false
          }, function () {
            if (pics.length == 6) {
              _this.setData({
                isAllImg: true
              })
            }
          })
        }
      }
    })
  },
  // 图片预览
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.pics
    })
  },
  /**
 * 删除
 */
  confirmDetele: function () {
    const goodId = this.data.goodsId,
      _this = this
    Api.adminGoodsDelete({ goodId: goodId })
      .then(res => {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000
        })
        _this.goback()
      })
  },
  goback: function () {
    var pages = getCurrentPages();             //  获取页面栈
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];    // 上一个页面
    wx.navigateBack({
      data: 1
    })
  },
  deleteList(e) {
    var _this = this
    _this.setData({
      show1: true
    })
  },
  // 下架
  confirmDown: function () {
    var _this = this,
      goodsIdList = [],
      goodId = this.data.goodsId
    goodsIdList.push(goodId)
    Api.adminGoodsDown(goodsIdList)
      .then(res => {
        wx.showToast({
          title: '下架成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () {
          _this.goback()
        }, 1000)

      })
  },
  // 更新
  updateGoods: function (e) {
    var _this = this,
      pics = this.data.pics,
      status = e.target.dataset.status,
      mainImgUrl = '',
      description = '',
      skuListAll = [],
      goodsImageVOList = [],
      sellPrice = this.data.sellPrice,
      wholesalePrice = 0,
      newConst = this.data.newConst,
      saleBatchNum = this.data.stock,
      skuList0 = [],
      skuList1 = [],
      goodsListData = this.data.pageall,
      clickSpecShow = this.data.clickSpecShow,
      addGoodsDetails = this.data.addGoodsDetails
    if (clickSpecShow == false) {
      if (!Api.isEmpty(sellPrice)) {
        Api.showToast("请输入商品零售价！")
        return;
      }
      if (!Api.isEmpty(this.data.skuNum)) {
        Api.showToast("商品库存不能为零！")
        return;
      }
      if (goodsListData != null) {
        if (goodsListData.length == 1) {
          skuListAll = []
          skuList0 = goodsListData[0].goodsSpecificationValueVOList
          for (var i = 0; i < skuList0.length; i++) {
            skuListAll.push({ specValueCodeList: [skuList0[i].specValueCode], marketPrice: '0', sellPrice: sellPrice, stockNum: newConst, wholesalePrice: wholesalePrice })
          }
        } else if (goodsListData.length = 2) {
          skuList0 = goodsListData[0].goodsSpecificationValueVOList
          skuList1 = goodsListData[1].goodsSpecificationValueVOList
          for (var i = 0; i < skuList0.length; i++) {
            for (var j = 0; j < skuList1.length; j++) {
              skuListAll.push({ specValueCodeList: [skuList0[i].specValueCode, skuList1[j].specValueCode], marketPrice: '0', sellPrice: sellPrice, stockNum: newConst, wholesalePrice: wholesalePrice })
            }
          }
        }
        sellPrice = Math.min.apply(Math, skuListAll.map(function (o) { return o.sellPrice }))
      }
    } else {
      skuListAll = this.data.skuListAll
      if (Api.isEmpty(skuListAll)) {
        sellPrice = Math.min.apply(Math, skuListAll.map(function (o) { return o.sellPrice }))
      }
    }
    for (var i = 0; i < addGoodsDetails.length; i++) {
      if (addGoodsDetails[i].input) {
        if (Api.isEmpty(addGoodsDetails[i].value)) {
          description += '<h4>' + addGoodsDetails[i].value + '</h4>'
        }
      } else if (addGoodsDetails[i].textInput) {
        if (Api.isEmpty(addGoodsDetails[i].value)) {
          description += '<p>' + addGoodsDetails[i].value + '</p>'
        }
      } else {
        description += '<img src="' + addGoodsDetails[i].img + '"/>'
      }
    }
    for (var i = 0; i < pics.length; i++) {
      if (i == 0) {
        mainImgUrl = pics[i].replace(this.data.baseUrl, '')
      }
      goodsImageVOList.push({ imageUrl: pics[i].replace(this.data.baseUrl, '') })
    }
    if (Api.isEmpty(skuListAll)){
      if (skuListAll.length == 0) {
        skuListAll = null
      }
    }
    var goodsVO = {
      "categoryCode": this.data.categoryCode,
      "customCategoryCode": this.data.categoryCustomCode,
      "description": description,
      "goodsImageVOList": goodsImageVOList,
      "goodsSkuVOList": skuListAll,
      "goodsSpecificationVOList": this.data.pageall,
      "id": this.data.goodsId,
      "mainImgUrl": mainImgUrl,
      "marketPrice": 10,
      "name": this.data.name,
      "recommendDesc": this.data.recommendDesc,
      "saleBatchNum": saleBatchNum,
      "sellPrice": sellPrice,
      "status": status,
      "stockNum": this.data.skuNum,
      "storeId": this.data.storeId,
      "storeName": this.data.storeName,
      "top": false,
      "wholesalePrice": wholesalePrice
    }
    if (!Api.isEmpty(mainImgUrl)) {
      Api.showToast("请上传商品图片！")
      return;
    }
    if (!Api.isEmpty(this.data.name)) {
      Api.showToast("请输入标题！")
      return;
    }
    if (!Api.isEmpty(this.data.categoryCode)) {
      Api.showToast("请输入商品类目！")
      return;
    }
    Api.updateGoods(goodsVO)
      .then(res => {
        wx.showToast({
          title: '更新成功',
          icon: 'none',
          duration: 2000
        })
        _this.goback()
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
    var that = this
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]
    if (currPage.data.code) {
      that.setData({
        categoryCode: currPage.data.code,
        codeName: currPage.data.codeName,
      })
    }

    if (currPage.data.codeList) {
      var codeList = currPage.data.codeList,
        strName = '',
        code = ''
      for (var i = 0; i < codeList.length; i++) {
        strName += codeList[i].name + ","
        code += codeList[i].customCategoryCode + ","
      }
      that.setData({
        categoryCustomCode: code.slice(0, -1),
        strName: strName.slice(0, -1)
      })
    }
    if (currPage.data.skuListAll != '') {
      that.setData({
        skuListAll: currPage.data.skuListAll,
        skuNum: currPage.data.skuNum,
        clickSpecShow: true
      })
    }
    if (currPage.data.isEmptySku != 1) {
      that.setData({
        skuListAll: [],
        skuNum: '',
        newConst: '',
        sellPrice: '',
        wholesalePrice: '',
        isEmptySku: true,
        pageShow: false,
        clickSpecShow: false,
      })
    }
    if (currPage.data.mydata) {
      var modelData = JSON.stringify(currPage.data.mydata)
      if (modelData.length == 2) {
        that.setData({
          pageall: null,
          skuListAll: null
        })
      } else {
        that.setData({
          pageall: currPage.data.mydata,
        })
      }
      that.setData({
        model: modelData,
      })
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