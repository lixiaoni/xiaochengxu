import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: Api.getThisStoreId(),
    data: [{
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
        name: "电子产品",
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
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name =options.name,
        arr=[],
        data=this.data.data
    arr=name.split(",")
    for(var i=0;i<data.length;i++){
      if(arr.indexOf(data[i].name)!=-1){
        data[i].selected=true
      }
    }
    this.setData({
      data: data
    })
  },
  selectedFun:function(e){
    var data=this.data.data,
        index = e.target.dataset.index
    data[index].selected = !data[index].selected
    this.setData({
      data: data
    })
  },
  goback:function(){
    var name=this.data.name,
        data = this.data.data,
        id=this.data.id,
        businessScope=''
    for (var i = 0; i < data.length;i++){
      if(data[i].selected){
        businessScope += data[i].name+","
      }
    }
    businessScope = businessScope.slice(0, -1)
    Api.updateMes({ businessScope: businessScope,id:id})
      .then(res => {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 2000,
          success: function () {
            wx.navigateTo({
              url: '../mesEdit/mesEdit',
            })
          }
        })
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