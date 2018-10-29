import http from './http.js'
class pageRequest extends http {
  constructor() {
    super()
    this.pageData={
      pageNum: 0,
      pageSize:20
    }
    this.pageDataIndex = {
      pageNum: 1,
      pageSize: 20
    }
  } 
  pageGet(url, data){
    if (data == undefined) {
      var data = {}
    }
    this.pageData.pageNum++
    return this.getRequest(url, Object.assign(data, this.pageData))
  }
  pageGetIndex(url, data) {
    if (data == undefined) {
      var data = {}
    }
    this.pageDataIndex.pageNum++
    return this.getRequest(url, Object.assign(data, this.pageDataIndex))
  }
  // 追加数组
  addDataList(data, newArr){
  for (var i = 0; i < newArr.length; i++) {
    data.push(newArr[i]);
  }
  return data
  }
 
}
export default pageRequest