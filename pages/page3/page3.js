// pages/page3/page3.js
const {
  $router,
  $api
} = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    canvasData: {
      canvasInfo: {
        width: 200,
        height: 200
      },
      imgList: {
        qr: '../../images/test.jpg',
        banner: '../../images/123.jpg'
      },
      data: {
        name: '膜法师',

      }
    }
  },
  back() {
    $router.back(page => {
      page.setData({
        show3: true
      })
    }, 2)
  },
  /**
   * 隐藏分享组件
   */
  hideShare(e) {
    this.setData({
      showShare: e.detail
    })
  },
  /**
   * 点击分享
   */
  share() {
    this.setData({
      showShare: true
    })
  },
  draw(e) {
    console.log(e)
    let {
      data,
      height,
      width,
      images,
      ctx,
      callBack
    } = e.detail
    ctx.setFillStyle('#333')
    ctx.setFontSize(20)
    ctx.setStrokeStyle('#333')
    ctx.strokeText(data.name, 10, 10)
    ctx.drawImage(images.qr, width / 2 - 40, 40, 80, 80)
    return callBack()
  },
  init(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $api.get('boutiqueDeliveryOrder/getBdOrder', {
      orderCode: 2007311017287578
    }, res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})