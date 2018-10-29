//时间戳转化成时间格式

  let timeFormat = (timestamp)=>{
    if (!timestamp) { return "" }
    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
    function add0(m) { return m < 10 ? '0' + m : m }
  }


module.exports = {
  timeFormat: timeFormat
};
