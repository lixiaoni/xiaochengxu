const app = getApp();
import Api from '../../../utils/api.js'
import util from '../../../utils/util.js'
var getTempList = function (that) {
  Api.template()
    .then(res => {
      const obj = res.obj
      that.setData({
        templateCont: []
      })
      const templateCont = (that.data.oneTemplateCont).concat(obj)
      that.setData({
        templateCont: [],
        templateCont: templateCont
      })
    })
}
Array.prototype.baoremove = function (dx) {
  if (isNaN(dx) || dx > this.length) { return false; }
  this.splice(dx, 1);
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navindex: -1,
    currentTab: 0,
    oneTemplateCont: [{ templateName: "不用模板", id: '', specificationTemplateContentVOList: [] }],
    templateCont: [],
    addSpec: false,
    modelLen: 0,
    copyData: false,
    addSpecAttc: false,
    watchInput: false,
    updateSpec: false,
    editSpec: false,
    lock: false,
    editDataModel: [],
    editShowModel: false,
    contentShow: false,
    editId: '',
    templateId: '',
    templateContentId: '',
    notemp: { templateName: "衣服" },
    specName: '',
    newTemplateName: '',
    value: '',
    valueEdit: '',
    goodsListData: [],
    show1: false,
    tempNewArr: [],
    tempNewId: '',
    longTap: [{ selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }],
    longTap1: [{ selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }, { selected: true }],
    arrIndex: [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    arrIndex1: [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }]

  },
  stopTouchMove: function () {
    return false;
  },
  setTapArr: function () {
    var longTap = this.data.longTap
    var longTap1 = this.data.longTap1
    for (var i = 0; i < longTap.length; i++) {
      longTap[i].selected = true
    }
    for (var i = 0; i < longTap1.length; i++) {
      longTap1[i].selected = true
    }
    this.setData({
      longTap: longTap,
      longTap1: longTap1
    })
  },
  // 长按事件被触发
  longTap: function (e) {
    //锁住
    this.setData({ lock: true });
    var longTap = this.data.longTap,
      arrIndex = this.data.arrIndex,
      index = e.target.dataset.current
    this.arrEach(longTap, 0)
    if (arrIndex[index].selected) {
      longTap[index].selected = false
    } else {
      longTap[index].selected = true
    }
    this.setData({
      longTap: longTap
    })
  },
  touchend: function () {
    if (this.data.lock) {
      //开锁
      setTimeout(() => {
        this.setData({ lock: false });
      }, 100);
    } else {
      this.setData({ lock: true });
    }
  },
  longTap1: function (e) {
    var longTap = this.data.longTap1,
      arrIndex = this.data.arrIndex1,
      index = e.target.dataset.current
    this.arrEach(longTap, 1)
    if (arrIndex[index].selected) {
      longTap[index].selected = false
    } else {
      longTap[index].selected = true
    }
    this.setData({
      longTap1: longTap
    })
  },
  // 返回上一页
  goback: function () {
    var goodsListData = this.data.goodsListData,
      editDataModel = this.data.editDataModel,
      isEmptySku = false,
      newDataSku = [],
      copyData = this.data.copyData,
      modelLen = this.data.modelLen,
      editShowModel = this.data.editShowModel,
      templateId = this.data.templateId
    if (editShowModel) {
      if (Api.isNotEmpty(templateId)) {
        for (var i = 0; i < goodsListData.length; i++) {
          var data = goodsListData[i].goodsSpecificationValueVOList
          for (var j = 0; j < data.length; j++) {
            data[j].specValueCode = data[j].timestampCode
            delete (data[j].timestampCode)
          }
        }
        newDataSku = goodsListData
        if (goodsListData.length < 1) {
          isEmptySku = 1
        }
      } else {
        if (copyData) {
          for (var i = 0; i < goodsListData.length; i++) {
            var data = goodsListData[i].goodsSpecificationValueVOList
            for (var j = 0; j < data.length; j++) {
              if (data[j].timestampCode) {
                data[j].specValueCode = data[j].timestampCode
                delete (data[j].timestampCode)
              }
            }
          }
          newDataSku = goodsListData
        } else {
          for (var i = 0; i < editDataModel.length; i++) {
            var newData = []
            var dataChild = editDataModel[i].goodsSpecificationValueVOList
            for (var j = 0; j < dataChild.length; j++) {
              if (dataChild[j].selected) {
                if (dataChild[j].timestampCode) {
                  dataChild[j].specValueCode = dataChild[j].timestampCode
                  delete (dataChild[j].timestampCode)
                }
                newData.push(dataChild[j])
              }
            }
            editDataModel[i].goodsSpecificationValueVOList = newData
          }
          newDataSku = editDataModel
        }
        if (editDataModel.length != modelLen) {
          isEmptySku = false
        }
      }
    } else {
      for (var i = 0; i < goodsListData.length; i++) {
        var data = goodsListData[i].goodsSpecificationValueVOList
        for (var j = 0; j < data.length; j++) {
          data[j].specValueCode = data[j].timestampCode
          delete (data[j].timestampCode)
        }
      }
      newDataSku = goodsListData
      if (goodsListData.length < 1) {
        isEmptySku = 1
      }
    }
    for (var i = 0; i < newDataSku.length; i++) {
      if (newDataSku[i].goodsSpecificationValueVOList.length == 0) {
        newDataSku.splice(i, 1)
      }
    }
    if (newDataSku.length == 1) {
      if (newDataSku[0].goodsSpecificationValueVOList.length == 0) {
        newDataSku = []
      }
    }
    var index = this.data.currentTab
    var pages = getCurrentPages();             //  获取页面栈
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];    // 上一个页面
    prevPage.setData({
      mydata: newDataSku,
      isEmptySku: isEmptySku
    })
    wx.navigateBack({
      data: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var oneTemplateCont = this.data.oneTemplateCont,
      arrIndex = this.data.arrIndex,
      arrIndex1 = this.data.arrIndex1,
      specificationTemplateContentVOList = oneTemplateCont[0].specificationTemplateContentVOList
    if (options.model) {
      var model = JSON.parse(options.model)
      var modelLen = model.length
      if (modelLen == 0) {
        specificationTemplateContentVOList.push({ id: '010', specName: "颜色", specValueList: [] })
        oneTemplateCont[0].specificationTemplateContentVOList = specificationTemplateContentVOList
        this.setData({
          oneTemplateCont: oneTemplateCont,
        })
      } else {
        for (var i = 0; i < model.length; i++) {
          specificationTemplateContentVOList.push({ specCode: model[i].specCode, specName: model[i].specName, specValueList: [] })
          var arrChild = model[i].goodsSpecificationValueVOList
          for (var j = 0; j < arrChild.length; j++) {
            arrChild[j].selected = true
            specificationTemplateContentVOList[i].specValueList.push(arrChild[j].specValueName)
            if (modelLen == 1) {
              arrIndex[j].selected = true
            }
            if (modelLen == 2) {
              if (i == 0) {
                arrIndex[j].selected = true
              } else {
                arrIndex1[j].selected = true
              }
            }
          }
        }
        oneTemplateCont[0].specificationTemplateContentVOList = specificationTemplateContentVOList
        this.setData({
          oneTemplateCont: oneTemplateCont,
          arrIndex: arrIndex,
          arrIndex1: arrIndex1,
          editDataModel: model,
          copyData: false,
          modelLen: model.length,
          editShowModel: true
        })
      }
    } else {
      specificationTemplateContentVOList.push({ id: '010', specName: "颜色", specValueList: [] })
      oneTemplateCont[0].specificationTemplateContentVOList = specificationTemplateContentVOList
      this.setData({
        oneTemplateCont: oneTemplateCont,
      })
    }
  },
  checkedFunc: function (arr, isSelected) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].selected = isSelected
    }
    for (var i = 0; i < arr.length; i++) {
      arr[i].selected = isSelected
    }
    return arr
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    var templateId = e.target.dataset.id,
      arrIndex = this.data.arrIndex,
      newTemplateName = e.target.dataset.templatename,
      index = e.target.dataset.current,
      editShowModel = this.data.editShowModel,
      editDataModel = this.data.editDataModel,
      arrIndex1 = this.data.arrIndex1
    if (editShowModel) {
      if (Api.isNotEmpty(templateId)) {
        arrIndex = that.checkedFunc(arrIndex, false)
        arrIndex1 = that.checkedFunc(arrIndex1, false)
      } else {
        for (var i = 0; i < editDataModel.length; i++) {
          var arrEach = editDataModel[i].goodsSpecificationValueVOList
          for (var j = 0; j < arrEach.length; j++) {
            if (i == 0) {
              arrIndex[j].selected = arrEach[j].selected
            } else {
              arrIndex1[j].selected = arrEach[j].selected
            }
          }
        }
      }
    } else {
      arrIndex = that.checkedFunc(arrIndex, false)
      arrIndex1 = that.checkedFunc(arrIndex1, false)
    }
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        templateId: templateId,
        navindex: -1,
        navindex1: -1,
        newTemplateName: newTemplateName,
        goodsListData: [],
        arrIndex: arrIndex,
        arrIndex1: arrIndex1
      })
    }
  },
  // 添加规格
  addAttrc: function () {
    var index = this.data.currentTab
    var templateId = this.data.templateId
    var newArr = { specName: "规格", specValueList: [] }
    var newArr1 = { specName: "颜色", specValueList: [] }
    var templateCont = this.data.templateCont
    var tempArr = templateCont[index].specificationTemplateContentVOList
    templateCont[index].specificationTemplateContentVOList = tempArr
    if (tempArr[0].specName == "规格") {
      tempArr.push(newArr1)
      var tempArrNew = { specName: "颜色", templateId: templateId, specValueList: [] }
    } else {
      tempArr.push(newArr)
      var tempArrNew = { specName: "规格", templateId: templateId, specValueList: [] }
    }
    this.setData({
      templateCont: templateCont
    })
    if (index != 0) {
      Api.saveSpecTemplateContent(tempArrNew)
        .then(res => {
        })
    }
  },
  // 监听input
  watchInput: function (event) {
    var value = event.detail.value,
      num = value.length
    if (value == '') {
      this.setData({
        watchInput: false,
        value: '',
        valueEdit: ''
      })
    } else {
      if (this.data.addSpec) {
        if (num > 16) {
          Api.showToast("超过最长数字限制")
        }
        this.setData({
          watchInput: true,
          value: value.substring(0, 15),
        })
      } else {
        if (this.data.addSpecAttc || this.data.updateSpec) {
          if (num > 7) {
            Api.showToast("超过最长数字限制")
          }
          this.setData({
            watchInput: true,
            value: value.substring(0, 6),
            valueEdit: value.substring(0, 6)
          })
        } else {
          if (num > 10) {
            Api.showToast("超过最长数字限制")
          }
          this.setData({
            watchInput: true,
            value: value.substring(0, 9),
            valueEdit: value.substring(0, 9)
          })
        }
      }
    }
  },
  // 取消
  cancel: function () {
    this.setData({
      addSpec: false,
      addSpecAttc: false,
      updateSpec: false,
      editSpec: false,
      show1: false,
      watchInput: false
    })
  },
  // 添加规格值
  addSpec: function (e) {
    var currentTab = this.data.currentTab
    if (currentTab != 0) {
      this.setData({
        templateContentId: e.target.dataset.id,
      })
    }
    this.setData({
      addSpec: true,
      value: '',
      specName: e.target.dataset.name,
      specNameIndex: e.target.dataset.index
    })
  },
  confirm: function (e) {
    var _this = this
    var specName = _this.data.value,
      newSpecValueList = [],
      specArr = [],
      currentTab = this.data.currentTab,
      specNameIndex = this.data.specNameIndex,
      str = "";
    var templateContentId = _this.data.templateContentId
    var index = _this.data.currentTab
    var templateCont = _this.data.templateCont
    var tempArr = templateCont[index].specificationTemplateContentVOList
    var parentName = _this.data.specName
    if (specName == '') { _this.checkName(); return }
    if (tempArr[specNameIndex].specValueList == null) {
      str = specName
      specArr.push(specName)
      tempArr[specNameIndex].specValueList = specArr
    } else {
      for (var j = 0; j < tempArr[specNameIndex].specValueList.length; j++) {
        str += tempArr[specNameIndex].specValueList[j] + ",";
      }
      str += specName
      tempArr[specNameIndex].specValueList.push(specName)
    }
    newSpecValueList = tempArr[specNameIndex].specValueList
    templateCont[index].specificationTemplateContentVOList = tempArr
    _this.setData({
      templateCont: templateCont
    })
    _this.cancel()
    if (currentTab == 0) { return }
    Api.addTempCont(templateContentId, str)
      .then(res => {
        const code = res.code
        wx.showToast({
          title: '新建成功',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      })
  },
  saveTemplate: function (e) {
    var _this = this
    _this.setData({
      addSpecAttc: true,
      value: ''
    })
  },
  // 删除规格值
  removeTemp: function (e) {
    var specName = e.target.dataset.name,
      _this = this,
      longTap = this.data.longTap,
      arrIndex = this.data.arrIndex,
      rname = e.target.dataset.rname,
      id = e.target.dataset.id,
      pId = this.data.templateId,
      tempArr = {},
      valData = [],
      str = '',
      index = e.target.dataset.index,
      valList = this.data.templateCont
    for (var i = 0; i < valList.length; i++) {
      if (valList[i].id == pId) {
        valData = valList[i].specificationTemplateContentVOList
        for (var j = 0; j < valData.length; j++) {
          if (valData[j].id == id) {
            valData = valData[j].specValueList
            valData.baoremove(index)
            valList[i].specificationTemplateContentVOList[j].specValueList
            for (var h = 0; h < valData.length; h++) {
              str += valData[h] + ","
            }
          }
        }
      }
    }
    str = (str.substring(str.length - 1) == ',') ? str.substring(0, str.length - 1) : str;
    var tempArr = { specName: "specName", templateId: id, specValueList: valData }
    var templateContentId = id
    var specName = str
    longTap[index].selected = true
    arrIndex[index].selected = false
    this.setData({
      longTap: longTap,
      arrIndex: arrIndex,
    })
    if (!Api.isNotEmpty(pId)) {
      Api.showToast("删除成功")
      _this.setData({
        lock: false,
        templateCont: valList
      });
      return
    }
    Api.addTempCont(templateContentId, specName)
      .then(res => {
        _this.setData({
          templateCont: valList
        })
        Api.showToast("删除成功")
        _this.setData({ lock: false });
        _this.setTapArr();
      })
  },
  removeTemp1: function (e) {
    var specName = e.target.dataset.name,
      _this = this,
      id = e.target.dataset.id,
      pId = this.data.templateId,
      longTap1 = this.data.longTap1,
      arrIndex1 = this.data.arrIndex1,
      tempArr = {},
      valData = [],
      str = '',
      index = e.target.dataset.index,
      valList = this.data.templateCont
    for (var i = 0; i < valList.length; i++) {
      if (valList[i].id == pId) {
        valData = valList[i].specificationTemplateContentVOList
        for (var j = 0; j < valData.length; j++) {
          if (valData[j].id == id) {
            valData = valData[j].specValueList
            valData.baoremove(index)
            valList[i].specificationTemplateContentVOList[j].specValueList
            for (var h = 0; h < valData.length; h++) {
              str += valData[h] + ","
            }
          }
        }
      }
    }
    str = (str.substring(str.length - 1) == ',') ? str.substring(0, str.length - 1) : str;
    var tempArr = { specName: "specName", templateId: id, specValueList: valData }
    var templateContentId = id
    var specName = str
    longTap1[index].selected = true
    arrIndex1[index].selected = false
    this.setData({
      longTap1: longTap1,
      arrIndex1: arrIndex1,
    })
    if (!Api.isNotEmpty(pId)) {
      Api.showToast("删除成功")
      _this.setData({
        lock: false,
        templateCont: valList
      });
      return
    }
    Api.addTempCont(templateContentId, specName)
      .then(res => {
        _this.setData({
          templateCont: valList
        })
        Api.showToast("删除成功")
        _this.setData({ lock: false });
        _this.setTapArr();
      })
  },
  // 确定 保存模板
  confirm1: function () {
    var _this = this
    var index = _this.data.currentTab
    var templateContLen = _this.data.templateCont.length
    var tempArr = {}
    var templateCont = _this.data.templateCont
    var listData = _this.data.templateCont[index]
    tempArr["specificationTemplateContentVOList"] = listData["specificationTemplateContentVOList"]
    // tempArr["userId"] = "00000000"
    if (_this.data.value != '') {
      tempArr["templateName"] = _this.data.value
    } else {
      Api.showToast("请输入模板名称！")
      return
    }
    if (templateContLen > 7) {
      Api.showToast("规格模板最多只能创建6个！")
    } else {
      Api.addTemplate(tempArr)
        .then(res => {
          Api.showToast("添加成功")
          getTempList(_this);
          _this.cancel()
        })
    }
  },
  upTop: function (e) {
    var _this = this,
      templateId = _this.data.templateId,
      templateContentId = e.target.dataset.id,
      templateCont = _this.data.templateCont,
      newArr = [],
      index = ''
    for (var i = 0; i < templateCont.length; i++) {
      if (templateCont[i].id == templateId) {
        var specList = templateCont[i].specificationTemplateContentVOList
        index = i
        templateCont[i].specificationTemplateContentVOList = specList.reverse()
      }
    }
    _this.setData({
      templateCont: templateCont
    })
    if (index != 0) {
      Api.tempSort({ templateContentId: templateContentId })
        .then(res => {
        })
    }
  },
  // 长按删除设置false
  arrEach: function (arr, code) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].selected = true
    }
    if (code == 0) {
      this.setData({
        longTap: arr
      })
    } else {
      this.setData({
        longTap1: arr
      })
    }
  },
  // 属性切换
  swichNav(e) {
    var current = e.target.dataset.current,
      pName = e.target.dataset.name,
      switchi = e.target.dataset.switchi,
      code = e.target.dataset.code,
      pIdNew = e.target.dataset.id,
      pId = e.target.dataset.id,
      namechi = e.target.dataset.namechi
    code += code + "" + code
    if (current == undefined) {
      return
    }
    this.alertSpecData(current, pName, switchi, code, pIdNew, pId, namechi)
  },
  alertSpecData: function (current, pName, switchi, code, pIdNew, pId, namechi) {
    var editShowModel = this.data.editShowModel,
      editDataModel = this.data.editDataModel,
      newGoodsListData = [],
      list = {},
      hash = {},
      addArr = [],
      templateCont = this.data.templateCont,
      listChi = [],
      goodsList = [],
      longTap = this.data.longTap,
      longTap1 = this.data.longTap1,
      addIndex = false,
      addIndexChi = false,
      goodsListData = this.data.goodsListData,
      codeTd = this.data.templateId,
      num = '',
      arrIndex = []
    if (pId == undefined || pId == '') {
      pId = '002'
    }
    if (switchi == 0) {
      var arrIndex = this.data.arrIndex
      arrIndex[current].selected = !arrIndex[current].selected
      if (arrIndex[current].selected) {
        if (!longTap[current].selected) {
          longTap[current].selected = true
        }
        this.setData({
          longTap: longTap
        })
      }
      this.setData({
        arrIndex: arrIndex
      })
    } else {
      var arrIndex = this.data.arrIndex1
      arrIndex[current].selected = !arrIndex[current].selected
      if (arrIndex[current].selected) {
        if (!longTap1[current].selected) {
          longTap1[current].selected = true
        }
        this.setData({
          longTap1: longTap1
        })
      }
      this.setData({
        arrIndex1: arrIndex
      })
    }
    if (editShowModel && !Api.isNotEmpty(pIdNew)) {
      if (switchi == 0) {
        if (arrIndex[current].selected) {
          if (current >= editDataModel[switchi].goodsSpecificationValueVOList.length) {
            editDataModel[switchi].goodsSpecificationValueVOList.push({ specValueCode: code, specValueName: namechi, timestampCode: util.ramData() + pId + code + "_" + util.ramNum() })
            editDataModel[switchi].goodsSpecificationValueVOList[editDataModel[switchi].goodsSpecificationValueVOList.length - 1].selected = true
          } else {
            editDataModel[switchi].goodsSpecificationValueVOList[current].selected = true
          }
        } else {
          editDataModel[switchi].goodsSpecificationValueVOList[current].selected = false
        }
      }
      if (switchi == 1) {
        if (editDataModel.length == 1) {
          var copyData = editDataModel[0].goodsSpecificationValueVOList
          editDataModel[0].specCode = util.ramData() + "_" + util.ramNum()
          delete (editDataModel[0].goodsId)
          for (var i = 0; i < copyData.length; i++) {
            copyData[i].specValueCode = util.ramData() + current + pId + "_" + util.ramNum()
          }
          editDataModel[0].goodsSpecificationValueVOList = copyData
          goodsListData = editDataModel
          this.setData({
            copyData: true
          })
          editShowModel: false
        } else {
          if (arrIndex[current].selected) {
            if (current >= editDataModel[switchi].goodsSpecificationValueVOList.length) {
              editDataModel[switchi].goodsSpecificationValueVOList.push({ specValueCode: code, specValueName: namechi, timestampCode: util.ramData() + current + pId + code + "_" + util.ramNum() })
              editDataModel[switchi].goodsSpecificationValueVOList[editDataModel[switchi].goodsSpecificationValueVOList.length - 1].selected = true
            } else {
              editDataModel[switchi].goodsSpecificationValueVOList[current].selected = true
            }
          } else {
            editDataModel[switchi].goodsSpecificationValueVOList[current].selected = false
          }
        }
      }
      this.setData({
        editDataModel: editDataModel,
      })
    }
    for (var i = 0; i < goodsListData.length; i++) {
      if (goodsListData[i].id == pId) {
        addIndex = true
        var codeArr = goodsListData[i].goodsSpecificationValueVOList
        for (var l = 0; l < codeArr.length; l++) {
          if (codeArr[l].specValueCode == code) {
            codeArr.splice(l, 1)
          }
        }
        goodsListData[i].goodsSpecificationValueVOList.push({ specValueCode: code, specValueName: namechi, timestampCode: util.ramData() + i + current + pId + "_" + util.ramNum() })
        if (arrIndex[current].selected != true) {
          goodsListData[i].goodsSpecificationValueVOList.pop()
        }
      }
    }
    if (codeTd == '') {
      codeTd = '000'
    }
    if (!addIndex) {
      listChi.push({ specValueCode: code, specValueName: namechi, selected: false, timestampCode: util.ramData() + current + pId + "_" + util.ramNum() })
      list.specName = pName
      list.id = pId
      list.goodsSpecificationValueVOList = listChi
      list.specCode = util.ramData() + "_" + util.ramNum()
      goodsListData.push(list)
    }
    if (current == this.data.navindex) {
      return false;
    } else {
      // this.arrEach(longTap, 0)
      // this.arrEach(longTap1, 1)
      this.setData({
        navindex: current,
        goodsListData: goodsListData,
      })
    }
  },
  // 删除模板
  unsetSpec: function () {
    var _this = this
    _this.setData({
      show1: true
    })

  },
  confirmDetele: function () {
    var _this = this
    var templateId = this.data.templateId
    Api.templateDelete(templateId)
      .then(res => {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 1000,
          mask: true,
          success: function () {
            getTempList(_this);
            _this.cancel()
            _this.setData({
              currentTab: 0
            })
          }
        })
      })
  },
  // 删除模板内容
  deleteTemplateContentId: function (e) {
    var _this = this,
      arrIndex1 = this.data.arrIndex1
    for (var i = 0; i < arrIndex1.length; i++) {
      arrIndex1[i].selected = false
    }
    if (e.target.dataset.id) {
      var templateContentId = e.target.dataset.id
    } else {
      var templateContentId = ''
    }
    var templateId = this.data.templateId
    var currentTab = this.data.currentTab
    var templateCont = _this.data.templateCont
    var tempContList = templateCont[currentTab].specificationTemplateContentVOList
    var len = tempContList.length
    tempContList.pop()
    templateCont[currentTab].specificationTemplateContentVOList = tempContList
    _this.setData({
      tempNewArr: templateCont,
      contentShow: true,
      arrIndex1: arrIndex1,
      templateId: templateId,
      tempNewId: templateContentId
    })
  },
  // 删除规格的时候删除第二个规格
  removeDataLastArr: function (data) {
    var len = data.length
    if (len == 2) {
      data.pop()
      return data;
    }
  },
  contentDetele: function () {
    var _this = this,
      templateContentId = this.data.tempNewId,
      templateCont = this.data.tempNewArr,
      goodsListData = this.data.goodsListData,
      editDataModel = this.data.editDataModel,
      templateId = this.data.templateId
    this.removeDataLastArr(goodsListData)
    this.removeDataLastArr(editDataModel)
    if (editDataModel.length == 1) {
      // delete (editDataModel[0].goodsId)
      editDataModel[0].specCode = util.ramData() + "_" + util.ramNum()
      var specEditNew = editDataModel[0].goodsSpecificationValueVOList
      for (var i = 0; i < specEditNew.length; i++) {
        delete (specEditNew[i].goodsId)
        delete (specEditNew[i].specCode)
        specEditNew[i].specValueCode = parseInt(util.ramData() + i + i * 6) + "_" + util.ramNum()
      }
      editDataModel[0].goodsSpecificationValueVOList = specEditNew
    }
    if (Api.isNotEmpty(templateId)) {
      Api.deleteTemplate(templateContentId)
        .then(res => {
          wx.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        })
    }
    _this.setData({
      templateCont: templateCont,
      contentShow: false,
      goodsListData: goodsListData,
      editDataModel: editDataModel,
    })

  },
  // 更新模板名称
  updateTemplate: function () {
    var newTemplateName = this.data.newTemplateName
    this.setData({
      updateSpec: true,
      watchInput: true,
      value: newTemplateName
    })
  },
  confirm2: function () {
    var _this = this
    var templateId = this.data.templateId
    var currentTab = this.data.currentTab
    var templateCont = _this.data.templateCont
    var templateName = this.data.value
    var templateCont = _this.data.templateCont
    if (templateName == '') { _this.checkName(); return }
    templateCont[currentTab].templateName = templateName
    _this.setData({
      templateCont: templateCont
    })
    Api.updateTemplateName(templateId, templateName)
      .then(res => {
        wx.showToast({
          title: '更新成功',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        _this.cancel()
      })
  },
  // 更新规格名字
  editName: function (e) {
    var editId = e.target.dataset.id
    var name = e.target.dataset.name
    var _this = this
    _this.setData({
      editSpec: true,
      editId: editId,
      valueEdit: name,
      specName: name,
      watchInput: true
    })
  },
  confirm3: function () {
    var _this = this
    var templateContentId = this.data.editId
    var specName = this.data.valueEdit
    var templateId = _this.data.templateId
    var index = _this.data.currentTab
    var templateCont = _this.data.templateCont
    var tempArr = templateCont[index].specificationTemplateContentVOList
    var parentName = _this.data.specName
    if (specName == '') { _this.checkName(); return }
    var goodsListData = this.data.goodsListData
    for (var i = 0; i < goodsListData.length; i++) {
      if (goodsListData[i].specName == parentName) {
        goodsListData[i].specName = specName
      }
    }
    for (var i = 0; i < tempArr.length; i++) {
      if (tempArr[i].specName == specName) {
        Api.showToast("已经有此规格名称！")
        return
      }
      if (tempArr[i].specName == parentName) {
        tempArr[i].specName = specName
      }
    }
    templateCont[index].specificationTemplateContentVOList = tempArr
    _this.setData({
      templateCont: templateCont,
      editSpec: false,
      goodsListData: goodsListData
    })

    if (templateId == '') {
      var editDataModel = this.data.editDataModel
      if (this.data.editShowModel) {
        editDataModel[index].specName = specName
      }
      return
    }
    Api.updateSpecName(templateContentId, specName)
      .then(res => {
        wx.showToast({
          title: '更新成功',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        _this.cancel()
      })

  },
  checkName: function () {
    if (this.data.value == '') {
      wx.showToast({
        title: '请输入文字！',
        icon: 'none',
        duration: 1000,
        mask: true
      })
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
    var that = this;
    getTempList(that);
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