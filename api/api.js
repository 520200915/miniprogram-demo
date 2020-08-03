import {
  domain,
  path,
  salesSessionId
} from './http.js'
/**接口 */
class Request {
  get(url, data, success, fail) {
    return this.request('GET', url, data, success, fail)
  }
  post(url, data, success, fail) {
    return this.request('POST', url, data, success, fail)
  }
  request(method, url, data, success, fail) {
    let _this = this
    return new Promise((resolve, reject) => {
      wx.showNavigationBarLoading()
      const header = method === 'POST' ? {
        'content-type': 'application/json'
      } : {}
      let [_url, query] = url.split('?')
      if (_url && query) header['content-type'] = query
      if (!success) success = data
      wx.request({
        url: `${domain}${path}${url}`,
        data: typeof data === 'function' ? {} : data,
        method: method,
        header: _this.setHeader(header),
        dataType: 'json',
        responseType: 'text',
        success(response) {
          _this.setHeader(response.header)
          /**业务代码 */
          if (success && typeof success == 'function') {
            success(response.data, resolve)
          } else {
            resolve(response.data)
          }
          if (fail && typeof fail === 'function') fail(response.data, reject)
        },
        fail(error) {
          console.error(`接口异常：${url}`, error)
          wx.showToast({
            title: '系统异常',
            icon: 'none'
          })
          if (fail && typeof fail == 'function') {
            fail(error, reject)
          } else {
            reject(error)
          }
        },
        complete() {
          wx.stopPullDownRefresh()
          wx.hideNavigationBarLoading()
        }
      })
    })
  }
  /**
   * 设置请求头Cookie信息
   * header 源请求头信息
   * return 包含Cookie信息header
   */
  setHeader(header) {
    // 本地获取存储的sessionId
    let sessionId = wx.getStorageSync(salesSessionId)
    let cookies = header['Set-Cookie']
    if (cookies) {
      let re = new RegExp(`${salesSessionId}\=([^\]*)`, "ig")
      sessionId = ((cookies.match(re)) ? (cookies.match(re)[0].substr(salesSessionId.length + 1)) : null)
      if (sessionId) wx.setStorageSync(salesSessionId, sessionId)
    }
    if (sessionId) header['Cookie'] = [salesSessionId, '=', sessionId].join('')
    return header
  }
  salesSessionId() {
    return salesSessionId
  }
}
export default new Request()