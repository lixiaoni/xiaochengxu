const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    selectAllStatus: false,
    numSle: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = JSON.parse(options.model),
      _this = this
    _this.setData({
      list: list,
      numSle: 0
    })

  },
  // 选择
  selectList(e) {
    var index = e.currentTarget.dataset.index;
    let list = this.data.list;
    var _this = this
    const selected = list[index].selected;
    if (selected) {
      this.setData({
        selectAllStatus: false
      });
    }
    list[index].selected = !selected;
    this.setData({
      list: list
    }, function () {
      var num = 0
      for (var i = 0; i < list.length; i++) {
        if (list[i].selected) {
          num++
        }
      }
      _this.setData({
        numSle: num
      })
    });
  },
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let list = this.data.list;
    for (let i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    if (selectAllStatus) {
      this.setData({
        numSle: list.length - 1
      });
    } else {
      this.setData({
        numSle: 0
      });
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list,
    });
  },
  // detele
  removeFun: function () {
    var _this = this,
      list = this.data.list,
      codes = [],
      listNew = []
    for (var i = 0; i < list.length; i++) {
      if (list[i].selected) {
        codes.push(list[i].customCategoryCode)
      } else {
        listNew.push(list[i])
      }
    }
    _this.setData({
      list: listNew
    })
    app.http.postRequest('/admin/shop/customcategory/delete/batch/{{storeId}}', codes)
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