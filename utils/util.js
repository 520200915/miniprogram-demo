import router from '../router/index'
/**emoji正则 */
const emojiReg = /([^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac])/g
/**
 * 日期格式化
 * let time = new Date().format('yyyy-MM-dd hh:mm:ss') //log   2020-07-31 10:00:00
 */
Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    //季度 
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds() //毫秒 
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
  }
  return fmt
}
/**
 * 防止重复点击
 */
const showLoading = message => {
  if (wx.showLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.showLoading({
      title: message,
      mask: true
    })
  } else {
    // 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
    wx.showToast({
      title: message,
      icon: 'loading',
      mask: true,
      duration: 20000
    })
  }
}
const hideLoading = () => {
  if (wx.hideLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.hideLoading()
  } else {
    wx.hideToast()
  }
}
const showToast = val => {
  let obj = {}
  if (val && typeof val === 'string') {
    obj.title = val
  } else {
    obj = val
  }
  wx.showToast(obj)
}
/**获取节点信息
 * name(id获取class)
 * callBack 回调函数
 * isComponents是否在组件
 */
const getViewInfo = (name, callBack, isComponents) => {
  const query = !isComponents ? wx.createSelectorQuery() : wx.createSelectorQuery().in(isComponents)
  query.select(name).boundingClientRect(res => {
    callBack(res)
  }).exec()
}
/**触底加载 */
const onReachBottom = (obj, callBack) => {
  let _this = router.getPageInstance()
  let {
    pageNum,
    total,
    pageSize,
    nothing
  } = obj
  if (!pageSize) pageSize = 10
  if (!nothing) nothing = 'nothing'
  if (Math.ceil(total / pageSize) > pageNum) {
    _this.setData({
      pageNum: pageNum + 1
    })
    callBack()
  } else {
    _this.setData({
      [nothing]: true
    })
  }
}
/**过滤表情 */
const haveEmoji = value => {
  let val = false
  if (emojiReg.test(value)) {
    showToast('不能输入表情')
    val = true
  }
  return val
}
/**替换表情 */
const replaceEmoji = value => {
  let val = value.replace(emojiReg, '')
  return val.trimStart().trimEnd()
}
/**节流 */
const throttle = (fn, gapTime) => {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }
  let _lastTime = null
  // 返回新的函数
  return function () {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments) //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}
/**获取手机信息 */
const getPhoneInfo = callBack => {
  wx.getSystemInfo({
    success(res) {
      callBack(res)
    },
    fail(err) {
      callBack(err)
    }
  })
}
/**num：要转换的数值，fixed：精确几位小数 */
const decimal = (num, fixed) => {
  const pow = Math.pow(10, fixed)
  return Math.round(num * pow) / pow
}
/**
 * 禁止滑动
 */
const noScroll = () =>{}
const Util = {
  getViewInfo: getViewInfo,
  onReachBottom: onReachBottom,
  haveEmoji,
  replaceEmoji,
  showLoading,
  hideLoading,
  throttle,
  getPhoneInfo,
  decimal,
  showToast,
  noScroll
}
export default Util