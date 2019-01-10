var count=100
function longTap() {
  var longTap =[]
  for (var i = 0; i < count;i++){
    longTap.push({ selected: true })
  }
  return longTap
}
function longTap1() {
  var longTap1 = []
  for (var i = 0; i < count; i++) {
    longTap1.push({ selected: true })
  }
  return longTap1
}
function arrIndex() {
  var arrIndex = []
  for (var i = 0; i < count; i++) {
    arrIndex.push({ selected: false })
  }
  return arrIndex
}
function arrIndex1() {
  var arrIndex1 = []
  for (var i = 0; i < count; i++) {
    arrIndex1.push({ selected: false })
  }
  return arrIndex1
}
module.exports = {
  longTap: longTap,
  longTap1: longTap1,
  arrIndex: arrIndex,
  arrIndex1: arrIndex1,
}