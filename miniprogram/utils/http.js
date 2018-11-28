import AuthHandler from './authHandler.js';
import {
  baseUrl,
  uploadImg
} from './const.js'
/**
 请求
 */
class request {
  constructor() {
    this._baseUrl = baseUrl,
      this.defaultHeader = {
        'content-type': 'application/json;charset=UTF-8'
      },
      this.defaultUploadHeader = {
        'content-type': 'multipart/form-data'
      },
      this.authHandler = new AuthHandler()
  }
  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header) {
    return this.requestAll(url, data, 'PUT', header)
  }
  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header) {
    return this.requestAll(url, data, 'GET', header)
  }
  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header) {
    return this.requestAll(url, data, 'DELETE', header)
  }
  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header) {
    return this.requestAll(url, data, 'POST', header)
  }
  /**
   * 解析URL
   */
  analysisUrl(url, data) {
    for (var key in data) {
      url = url.replace(new RegExp("\\{\\{" + key + "\\}\\}", "g"), data[key]);
    }
    return url
  }
  /**
   * 网络请求
   */
  requestAll(url, data, method, customHeader) {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: "正在加载",
    })
    return new Promise((resolve, reject) => {
      url = this.analysisUrl(url, data);
      var header = (customHeader === undefined || customHeader == null || customHeader == "") ? this.defaultHeader : customHeader;
      this.authHandler.getTokenOrRefresh().then(token => {
        if (token) {
          header['Authorization'] = token;
        } else {
          delete header['Authorization'];
        }
        // var formId = wx.getStorageSync('formId')
        // var storeId = wx.getStorageSync('storeId')
        // header['formId'] = formId;
        // header['storeId'] = storeId;
        wx.request({
          url: this._baseUrl + url,
          data: data,
          header: header,
          method: method,
          success: (res => {
            let pages = getCurrentPages()
            let curPage = pages[pages.length - 1]
            this.__page = curPage
            if (res.statusCode === 200) {
              if (res.data.code == 0) {
                resolve(res.data);
              } else if (res.data.code == 1) {
                wx.showToast({
                  title: res.data.message,
                  duration: 2000,
                  icon: 'none'
                })
                reject(res);
              } else {
                reject(res);
              }
            } else if (res.statusCode === 401) {
              if (res.data && res.data.error_description 
                  && res.data.error_description.indexOf("Access token expired")!=-1){
                this.authHandler.flushTokenInfo();
              }else{
              curPage.loginCom = curPage.selectComponent("#login");
              curPage.loginCom.showPage();
              }
              reject(res)
            } else {
              //其它错误，提示用户错误信息
              if (this._errorHandler != null) {
                this._errorHandler(res)
              }
              reject(res)
            }
          }),
          fail: (res => {
            if (this._errorHandler != null) {
              this._errorHandler(res)
            }
            reject(res)
          }),
          complete: function() {
            wx.hideLoading()
            wx.hideNavigationBarLoading()
          }
        })
      })
    });
  }
  /**
   * 上传图片
   */
  chooseImageUpload(types) {
    return this.chooseImage(types)
  }

  chooseImage(types) {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: "正在加载",
    })
    return new Promise((resolve, reject) => {
      this.authHandler.getTokenOrRefresh().then(token => {
        var header = this.defaultUploadHeader
        if (token) {
          header['Authorization'] = token;
        } else {
          delete header['Authorization'];
        }
        wx.chooseImage({
          count: 6,
          sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
          success: function(res) {
            var imgSrc = res.tempFilePaths;
            var tempFilePaths = res.tempFilePaths
            wx.uploadFile({
              url: uploadImg,
              filePath: tempFilePaths[0],
              name: 'file',
              header: header,
              formData: {
                'type': types ? types:""
              },
              success: (res => {
                if (res.statusCode === 200) {
                  resolve(res.data)
                } else {
                  if (this._errorHandler != null) {
                    this._errorHandler(res)
                  }
                  reject(res)
                }
              }),
            })
          },
          fail: (res => {
            if (this._errorHandler != null) {
              this._errorHandler(res)
            }
            reject(res)
          }),
          complete: function() {
            wx.hideLoading()
            wx.hideNavigationBarLoading()
          }
        })
      })
    })
  }
  onlychoseImg() {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 6,
        sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          resolve(res)
        },
        fail: (e => {
          reject(e)
        })
      })
    })
  }
  onlyUploadImg(url, types) {
    if(!url){
      console.warn('no upload url')
      return
    }
    
    return new Promise((resolve, reject) => {
      this.authHandler.getTokenOrRefresh().then(token => {
        var header = this.defaultUploadHeader
        if (token) {
          header['Authorization'] = token;
        } else {
          delete header['Authorization'];
        }
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: uploadImg,
          filePath: url,
          name: 'file',
          header: header,
          formData: {
            'type': types ? types:""
          },
          success: (res => {
            if (res.statusCode === 200) {
              resolve(res.data)
            } else {
              if (this._errorHandler != null) {
                this._errorHandler(res)
              }
              reject(res)
            }
          }),
          complete: (res=>{
            wx.hideLoading();
          })
        })
      })
    })

  }
}
export default request