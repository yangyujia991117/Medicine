const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function regexConfig() {
  var reg = {
    userid: /^[A-Za-z0-9]+$/,  //邮箱正则验证
    phoneNumber: /^1(3|4|5|7|8)\d{9}$/,  //手机号正则验证
    cards: /^[\u4e00-\u9fa5]{2,4}$/  //姓名汉字正则验证
  }
  return reg;
}

module.exports = {
  formatTime,
  regexConfig: regexConfig,
}
