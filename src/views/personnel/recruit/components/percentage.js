export function claAccuracy(curNum, totalNum) {
  curNum = parseFloat(curNum)
  totalNum = parseFloat(totalNum)
  if (isNaN(curNum) || isNaN(totalNum)) {
    return 0
  }
  if (curNum === 0) {
    return 100
  }
  return Math.round((totalNum / curNum) * 10000) / 100
}
