const Api = require("../../../utils/api.js");
const app = getApp();
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    comName: { 
      type: String, 
      value: '',
    },
    wx: {
      type: String, 
      value: '',
    },
    head: {
      type: String, 
      value: '',
      observer: function (newVal, oldVal) {
        if (newVal){
          wx.downloadFile({
            url: newVal +"?x-oss-process=style/logo",
            success:(res)=>{
              this.setData({
                headPic: res.tempFilePath
              })
            }
          })
        }
      }
    },
    goodsName: {
      type: String, 
      value: '',
      observer: function (newVal, oldVal) {
        this.setData({
          goodsName:newVal.substring(0, 6)
        })
      }
    },
    goodsNum: {
      type: String, 
      value: '',
    },
    price: {
      type: Number, 
      value: '',
      observer: function (newVal, oldVal) {
        this.setData({
          myprice: newVal.toFixed(2)
        })
      }
    },
  },
  data: {
    // 这里是一些组件内部数据
    wode:false,
    baseUrl: app.globalData.imageUrl,
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    ready: function () { 
      Api.getPaymentImg().then(res=>{
        if (res.obj){
          this.setData({
            hasImg:true
          })
          wx.downloadFile({
            url: this.data.baseUrl + res.obj,
            success: (res) => {
              this.setData({
                paymentUrl: res.tempFilePath                
              })
            }
          })
         
        }
      })
    },
  },
  methods: {
    close(){
      this.setData({
        show:false
      })
    },
    save() {
      if (this.data.paymentUrl){
        this.cancancan();      
      }else{
        wx.showToast({
          title:"无收款二维码",
          icon:'none'
        })
      }
    },
    roundRect(ctx, x, y, w, h, r) {
      // 开始绘制
      ctx.beginPath()
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      // 这里是使用 fill 还是 stroke都可以，二选一即可
      ctx.setFillStyle('transparent')
      // 左上角
      ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

      // border-top
      ctx.moveTo(x + r, y)
      ctx.lineTo(x + w - r, y)
      // 右上角
      ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

      // border-right
      ctx.lineTo(x + w, y + h - r)
      ctx.lineTo(x + w - r, y + h)
      // 右下角
      ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

      // border-bottom
      ctx.lineTo(x + r, y + h)
      ctx.lineTo(x, y + h - r)
      // 左下角
      ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

      // border-left
      ctx.lineTo(x, y + r)
      ctx.lineTo(x + r, y)

      // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
      ctx.fill()
      ctx.closePath()
      // 剪切
      ctx.clip()
    },
    cancancan() {
      if (this.data.drawing){
        return
      }
      this.setData({
        drawing:true
      })
      wx.showLoading({
        title: '正在保存'
      })
      const targetCtx = wx.createCanvasContext('my',this) // 这里是目标canvas画布的id值
      targetCtx.setFillStyle('#fff')
      targetCtx.fillRect(0, 0, 375, 667);
      targetCtx.stroke();

      targetCtx.save()
      // targetCtx.beginPath()
      // targetCtx.arc(110, 60, 30, 0, 2 * Math.PI)
      // targetCtx.clip()
      // targetCtx.drawImage("/image/lalala.png", 80, 30, 60, 60)
      this.roundRect(targetCtx, 104, 42, 36, 36, 5)
      targetCtx.drawImage(this.data.headPic, 104, 42, 36, 36)
      targetCtx.restore()




      targetCtx.setFillStyle('#000');
      targetCtx.font = 'bold 17px normal';
      targetCtx.fillText(this.data.comName, 150, 54);

      targetCtx.font = 'normal normal 14px normal';
      targetCtx.setFontSize(14);
      targetCtx.setFillStyle('#999');
      targetCtx.fillText("微信号：" + this.data.wx, 150, 78);

      targetCtx.setFontSize(16);
      targetCtx.setTextAlign('center');
      targetCtx.setFillStyle('#333');
      targetCtx.fillText("您购买了：" + this.data.goodsName + "...等" + this.data.goodsNum+"件商品", 186, 126, 375);

      targetCtx.setFontSize(32);
      targetCtx.setTextAlign('center');
      targetCtx.setFillStyle('#ccaa77');
      targetCtx.fillText("￥" + this.data.myprice, 187, 187);

      targetCtx.drawImage(this.data.paymentUrl, 112.5, 226, 150, 150);

      targetCtx.draw();
      //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
      setTimeout(() => {
        wx.canvasToTempFilePath({
          height: '430',
          canvasId: 'my',
          success: (res) => {
            var tempFilePath = res.tempFilePath;
            this.setData({
              imagePath: tempFilePath,
              canvasHidden: true
            });
            wx.saveImageToPhotosAlbum({
              filePath: this.data.imagePath,
              success: function (res) {
                wx.showToast({
                  title: '已保存到手机相册',
                  icon: 'none'
                })
              }
            })
          },
          fail: (res) => {
            console.log(res);
          },
          complete:(()=>{
            this.setData({
              drawing:false
            })
            wx.hideLoading()
          })
        },this);
      }, 500);
    },
  }
})
