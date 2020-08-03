// env:dev
//  const domain = 'https://devwx.glsx.com.cn'
// env:uat
const domain = 'https://qcwx.glsx.com.cn'
// env:prod
// const domain = 'https://wx.glsx.com.cn'

// const domain = 'http://192.168.2.152:8080'
const path = '/web-sales-weapp/'

// 会话前缀
const salesSessionId = 'SALES_S_'
module.exports = {
  domain,
  path,
  salesSessionId
}
// 送审测试账号 18012345678 