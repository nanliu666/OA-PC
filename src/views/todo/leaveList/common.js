import moment from 'moment'
// 当天是否已经催办
export const checkTime = (time) => {
  if (time) {
    let LastCUrgeTime = moment(time).format('YYYY-MM-DD')
    let nowTime = moment(new Date()).format('YYYY-MM-DD')
    return LastCUrgeTime === nowTime ? true : false
  }
}
