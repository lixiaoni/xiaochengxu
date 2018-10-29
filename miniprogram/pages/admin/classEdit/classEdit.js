const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    selectAllStatus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = JSON.parse(options.model),
        _this=this
    _this.setData({
      list:list
    })
    
  },
  // 选择
  selectList(e) {
    var index = e.currentTarget.dataset.index;
    let list = this.data.list;
    const selected = list[index].selected;
    if (selected) {
      this.setData({
        selectAllStatus: false
      });
    }
    list[index].selected = !selected;
    this.setData({
      list: list
    });
  },
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let list = this.data.list;
    for (let i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list
    });
  },
  // detele
  removeFun:function(){
    var _this=this,
        list=this.data.list,
        codes=[],
        listNew=[]
    for (var i = 0; i < list.length; i++) {
      if (list[i].selected){
        codes.push(list[i].customCategoryCode)
      }else{
        listNew.push(list[i])
      }
    }
    _this.setData({
      list: listNew
    })
    app.http.postRequest('/admin/shop/customcategory/delete/batch/{{storeId}}',codes)
      .then(res => {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000
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