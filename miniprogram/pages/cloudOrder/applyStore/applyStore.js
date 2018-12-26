// pages/cloudOrder/applyStore/applyStore.js
const Api = require("../../../utils/api.js");
const App = getApp();

Component({

  /**
   * 页面的初始数据
   */
  data: {
    // 筛选器
    beforeChose: [0, 0, 0],
    floorChose: "",
    baseUrl: App.globalData.imageUrl,
    //END 筛选器
    //店铺号
    shopCode: "",
    //楼层
    floorModal: false, //
    rangeModal: false, //经营范围
    modal: true, //第一步
    mallList: [{
      name: '1',
      code: 1
    }],
    mallModal: false,
    nameNum: 0,
    name: "",
    url: "",
    itemNum: 0,
    item: [{
      name: "服饰内衣",
      checked: false,
      color: "#fff",
      colorTrue: "#cde6dc"
    },
    {
      name: "母婴玩具",
      checked: false,
      color: "#fff",
      colorTrue: "#d6cde6"
    },
    {
      name: "鞋类箱包",
      checked: false,
      color: "#fff",
      colorTrue: "#cddee6"
    },
    {
      name: "运动户外",
      checked: false,
      color: "#fff",
      colorTrue: "#d4e6cd"
    },
    {
      name: "珠宝配饰",
      checked: false,
      color: "#fff",
      colorTrue: "#cde6dc"
    },
    {
      name: "化妆品",
      checked: false,
      color: "#fff",
      colorTrue: "#d6cde6"
    },
    {
      name: "家居家纺",
      checked: false,
      color: "#fff",
      colorTrue: "#cddee6"
    },
    {
      name: "日用百货",
      checked: false,
      color: "#fff",
      colorTrue: "#d4e6cd"
    },
    {
      name: "休闲装",
      checked: false,
      color: "#fff",
      colorTrue: "#cde6dc"
    },
    {
      name: "礼品婚庆",
      checked: false,
      color: "#fff",
      colorTrue: "#d6cde6"
    },
    {
      name: "仿真花艺",
      checked: false,
      color: "#fff",
      colorTrue: "#cddee6"
    },
    ],
  },
  methods: {
    watchInput(e) {
      let val = e.detail.value,
        type = e.currentTarget.dataset.type,
        obj = {};
      switch (type) {
        case 'name':
          let num = val.length;
          obj = {
            name: val,
            nameNum: num
          }

      }
      this.setData(obj);
    },
    open() {
      let url = this.data.url,
        name = this.data.name;
      if (!url) {
        wx.showToast({
          title: "请上传LOGO",
          icon: 'none'
        })
        return
      }
      if (!name) {
        wx.showToast({
          title: "请输入名称",
          icon: 'none'
        })
        return
      }

      App.http.getRequest("/api/exist?storeName=" + encodeURI(name)).then(res => {
        if (res.obj == true) {
          wx.showToast({
            title: '名字重复，请更换店名',
            icon: "none"
          })
        } else {
          this.setData({
            comName: name,
            cUrl: url,
            modal: false
          })
        }
      })
    },
    choseImg() {
      App.http.onlychoseImg().then(res => {
        this.setData({
          url: res.tempFilePaths[0]
        })
      })
    },

    pcikMe(e) {
      let index = e.currentTarget.dataset.index;
      let status = !this.data.item[index].checked;
      if (status) {
        if (this.data.itemNum == 2) {
          wx.showToast({
            title: '最多选择两个主营范围',
            icon: 'none'
          })
          return
        }
        this.setData({
          itemNum: ++this.data.itemNum
        })
      } else {
        this.setData({
          itemNum: --this.data.itemNum
        })
      }
      this.setData({
        ["item[" + index + "].checked"]: status
      })
    },
    sureRange() {
      this.closeModal();
    },
    // 模态框
    showModal(e) {
      let type = e.currentTarget.dataset.type;
      let obj = {};
      switch (type) {
        case "range":
          obj = {
            rangeModal: true
          }
          break;
        case "floor":
          obj = {
            floorModal: true
          }
          break;
        case 'mall':
          obj = {
            mallModal: true
          }
      }
      this.setData(obj)
    },
    closeModal() {
      this.setData({
        rangeModal: false,
        floorModal: false,
        mallModal: false
      })
    },
    //商城
    choseMall(e) {
      let val = e.detail.value;
      this.setData({
        mallChose: val
      })
    },
    sureMall() {
      let index = this.data.mallChose[0];
      this.setData({
        mallSureChose: this.data.mallList[index],
        beforeChose: [0, 0, 0],
        floorChose: "",
      })
      this.getFloorList();
      this.closeModal();
    },
    // 楼层
    choseFloor(e) {
      let val = e.detail.value;
      let old = this.data.beforeChose;
      if (val[0] == old[0]) {
        if (val[1] == old[1]) {
          this.setData({
            beforeChose: [val[0], val[1], val[2]]
          })
        } else {
          this.setData({
            beforeChose: [val[0], val[1], 0]
          })
        }
      } else {
        this.setData({
          beforeChose: [val[0], 0, 0]
        })
      }
      let newArr = this.data.beforeChose
      this.setData({
        choseFloor: this.data.choseMall[newArr[0]].childList,
        choseArea: this.data.choseMall[newArr[0]].childList[newArr[1]].childList,
      })
    },
    sureFloor() {
      this.setData({
        floorChose: this.data.beforeChose
      })
      this.closeModal();
    },
    // 下一步
    next() {
      let obj = {},
        floorObj = {};

      //选择范围
      let rangeItem = [];
      this.data.item.forEach(el => {
        if (el.checked == true) {
          rangeItem.push(el.name);
        }
      })
      if (rangeItem.length == 0) {
        wx.showToast({
          title: '请选择经营范围',
          icon: 'none'
        })
        return
      }
      obj.businessScope = rangeItem.join(",");
      //商城
      floorObj.mallCode = this.data.mallSureChose.code;

      //楼层
      if (this.data.floorChose) {
        let floorarr = this.data.floorChose;
        let cMall = this.data.choseMall[floorarr[0]] ? this.data.choseMall[floorarr[0]] : {
          code: 0
        },
          cFloor = this.data.choseFloor[floorarr[1]] ? this.data.choseFloor[floorarr[1]] : {
            code: 0
          },
          cArea = this.data.choseArea[floorarr[2]] ? this.data.choseArea[floorarr[2]] : {
            code: 0
          };

        floorObj.balconyCode = cMall.code;
        floorObj.floorAreaCode = cArea.code;
        floorObj.floorCode = cFloor.code;
      } else {
        wx.showToast({
          title: '请选择楼层区域',
          icon: 'none'
        })
        return
      }
      //店铺号
      if (this.data.shopCode == "") {
        wx.showToast({
          title: '店铺号不能为空',
          icon: 'none'
        })
        return
      }
      floorObj.storeDoorNum = this.data.shopCode;
      floorObj.storeId = this.data.storeID;

      obj.id = this.data.storeID;
      obj.name = this.data.comName;

      App.http.onlyUploadImg(this.data.cUrl, "STORE_IMAGE").then(res => {
        var url = JSON.parse(res).obj;
        let p1 = Api.updateMes(obj)
        let p2 = App.http.postRequest("/api/floor/store/addorupdate", floorObj)
        let p3 = Api.uploadLogoImg(url)
        Promise.all([p1, p2, p3]).then(res => {
          wx.redirectTo({
            url: "/pages/cloudOrder/congratulation/congratulation",
          })
        }).catch(e => {
          wx.showToast({
            title: e.message,
            icon: 'none'
          })
        })

      })

    },
    getStore() {
      Api.storeIdInfo().then(res => {
        let store = res.obj.store[0].store;
        this.setData({
          store
        })
      })
    },
    getFloorList() {
      let mall = this.data.mallSureChose;
      Api.threeFloorList({
        mallCode: mall.code ? mall.code : 1000
      }).then(res => {
        let arr = this.data.beforeChose;
        this.setData({
          choseMall: res.obj,
          choseFloor: res.obj[arr[0]].childList,
          choseArea: res.obj[arr[0]].childList[arr[1]].childList,
        })
      })
    },
    getMallList() {
      App.http.getRequest("/api/floor/mall/findAll").then(res => {
        this.setData({
          mallList: res.obj,
          mallSureChose: res.obj[0],
          mallChose: [0],
        })
        this.getFloorList();
      })
    },
    inputCode(e) {
      this.setData({
        shopCode: e.detail.value
      })
    },
    getUser() {
      App.http.getRequest("/api/user/byuserid").then((res) => {
        if (res.obj.storeId) {
          this.setData({
            storeID: res.obj.storeId
          })
          let nowID = wx.getStorageSync('storeId');
          if (res.obj.storeId != nowID) {
            wx.switchTab({
              url: '../../page/user/user'
            })
          }
        } else {
          wx.showToast({
            title: '请重新登录账号后,再次进入设置',
            icon: "none"
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1000)
        }
      })
    },
  },


  /**
   * 生命周期函数--监听页面加载
   */
  lifetimes: {
    // var store = wx.getStorageSync('storeId');
    // this.setData({
    //   storeID: store
    // })
    ready: function () {
      this.getUser(),
        this.getMallList()
    }

    // this.getStore();
  }

})