//   isProgressBar 传递第三个参数时该该函数返回数字
export function claAccuracy(curNum, totalNum, isProgressBar) {
  curNum = parseFloat(curNum)
  totalNum = parseFloat(totalNum)
  if (isNaN(curNum) || isNaN(totalNum)) {
    return 0
  }
  // 饿了么组件progress——进度条接受一个纯数字
  if (isProgressBar) {
    return Math.round((totalNum / curNum) * 10000) / 100
  } else {
    return Math.round((totalNum / curNum) * 10000) / 100 + '%'
  }
}
