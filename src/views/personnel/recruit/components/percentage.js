//   isProgressBar 传递第三个参数时该该函数返回数字
export function claAccuracy(curNum, totalNum) {
  curNum = parseFloat(curNum)
  totalNum = parseFloat(totalNum)
  if (isNaN(curNum) || isNaN(totalNum)) {
    return 0
  }
  return Math.round((totalNum / curNum) * 10000) / 100
}
