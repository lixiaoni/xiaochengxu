import WeCropper from './we-cropper/we-cropper.js'
const App = getApp();

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const pixelRatio = device.pixelRatio
Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      // height,
      pixelRatio,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        // y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    },
  },
  touchStart(e) {
    this.wecropper.touchStart({
      touches: e.touches.filter(i => i.x !== undefined)
    })
  },
  touchMove(e) {
    this.wecropper.touchMove({
      touches: e.touches.filter(i => i.x !== undefined)
    })
  },
  touchEnd(e) {
    this.wecropper.touchEnd()
  },

  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },

  //裁剪
  btnHandle() {
    //高清裁剪
    if (this.data.quality) {
      let _that = this;
      // 点击了裁剪按钮
      let devicePixelRatio = this.data.cropperOpt.pixelRatio
      let { imgLeft, imgTop, scaleWidth, scaleHeight } = this.wecropper // 获取图片在原画布坐标位置及宽高
      let { x, y, width, height } = this.wecropper.cut // 获取裁剪框位置及大小
      // 所有参数乘设备像素比
      imgLeft = imgLeft * devicePixelRatio
      imgTop = imgTop * devicePixelRatio
      scaleWidth = scaleWidth * devicePixelRatio
      scaleHeight = scaleHeight * devicePixelRatio
      x = x * devicePixelRatio
      y = y * devicePixelRatio
      width = width * devicePixelRatio
      height = height * devicePixelRatio

      const targetCtx = wx.createCanvasContext('hideCanvas') // 这里是目标canvas画布的id值

      targetCtx.drawImage(this.data.cropperOpt.src, imgLeft, imgTop, scaleWidth, scaleHeight) // tmp代表被裁剪图片的临时路径

      targetCtx.draw(false, function (e) {
        wx.canvasToTempFilePath({
          canvasId: 'hideCanvas',
          x,
          y,
          width,
          height,
          success(res) {
            const tmpPath = res.tempFilePath;
            _that.afterGetPath(tmpPath)
          },
          fail(e) {
            console.log(e)
          }
        })
      })
    } else {
      this.wecropper.getCropperImage((avatar) => {
        this.afterGetPath(avatar)
      })
    }
  },
  afterGetPath(avatar) {
    if (avatar) {
      //  获取到裁剪后的图片
      var pages = getCurrentPages();
      if (pages.length > 1) {
        //上一个页面实例对象
        var prePage = pages[pages.length - 2];
        //关键在这里
        try {
          prePage.afterCuttingImg(avatar)
        } catch (e) {
          console.warn("please setting afterCuttingImg function to receive img url");
        }
        wx.navigateBack();
      }

    } else {
      console.log('获取图片失败，请稍后重试')
    }
  },
  onLoad(option) {
    let device = wx.getSystemInfoSync()
    let height = device.windowHeight - 50;
    this.setData({
      ["cropperOpt.height"]: height,
      ["cropperOpt.cut.y"]: (height - 300) / 2,
    })

    const { cropperOpt } = this.data
    //裁图质量
    if (option.quality) {
      this.setData({
        quality: true
      })
    }

    if (option.src) {
      cropperOpt.src = option.src
      new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
          // console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          // console.log(`before picture loaded, i can do something`)
          // console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          // console.log(`picture loaded`)
          // console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          // console.log(`before canvas draw,i can do something`)
          // console.log(`current canvas context:`, ctx)
        })
        .updateCanvas()
    }
  }
})
