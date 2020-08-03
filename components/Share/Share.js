// components/share/share.js
const {
  $util
} = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        this.check(newVal)
      }
    },
    canvasData: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {

      }
    },
    hideWx: Boolean,
    hideCancel: Boolean,
    imgInfo: null
  },
  ready() {

  },
  /**
   * 组件的初始数据
   */
  data: {
    flag: false,
    width: 0,
    height: 0
  },

  /** 
   * 组件的方法列表
   */
  methods: {


    /**
     * 检查
     */
    check(bool) {
      if (bool) {
        if (this.data.tempFilePath) return
        this.getImgData(res => {
          if (res.qr) this.draw(res)
        })
      }
    },
    /**
     * 禁止滑动
     */
    noScroll: $util.noScroll(),
    /**
     * 取消
     */
    cancel() {
      this.triggerEvent('hide', false)
    },
    saveImg() {
      let _this = this
      wx.saveImageToPhotosAlbum({
        filePath: _this.data.tempFilePath,
        success(e) {
          wx.showToast({
            title: '保存成功'
          })
          _this.triggerEvent('callBack')
        },
        fail(err) {
          wx.showToast({
            title: err
          })
        }
      })
    },
    /**
     * 保存
     */
    save() {
      let _this = this
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                _this.saveImg()
              },
              fail(err) {
                $util.showToast({
                  title: '请在小程序设置允许保存图片',
                  icon: 'none',
                  mask: true
                })
              }
            })
          } else {
            _this.saveImg()
          }
        }
      })
      wx.nextTick(() => _this.cancel())
    },
    /**
     * 开始生成
     */
    draw(images) {
      const {
        canvasData,
        imgInfo
      } = this.properties

      const ctx = wx.createCanvasContext(`img`, this)
      const {
        width,
        height
      } = imgInfo
      this.setData({
        width,
        height
      })
      $util.getViewInfo('.choose-list', res => {
        $util.getViewInfo('.bg', phoneInfo => {
          $util.getViewInfo('.info', img => {
            let viewTop = (phoneInfo.height - res.height - img.height) / 2
            this.setData({
              viewTop: viewTop,
            })
          }, this)
        }, this)
      }, this)
      ctx.clearRect(0, 0, width, height)
      this.diyDraw(images, canvasData.data, ctx, width, height, res => {
        ctx.draw(true, setTimeout(() => {
          this.getCanvasImg()
        }, 500))
      })
    },
    /**自定义画布 */
    diyDraw(images, data, ctx, width, height, callBack) {
      
      // this.properties.canvasDraw(images, data, ctx, width, height, callBack)
    },
    /**
     * 画布生成图片
     */
    getCanvasImg() {
      let _this = this
      let {
        width,
        height
      } = _this.data
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: width * 2,
        height: height * 2,
        canvasId: 'img',
        fileType: 'jpg',
        quality: 1,
        success(res) {
          _this.triggerEvent('init', res.tempFilePath)
          _this.setData({
            tempFilePath: res.tempFilePath,
            flag: true
          })
          wx.hideLoading()
        },
      }, this)
    },
    /**
     *  图片转成本地
     */
    getImgData(callBack) {
      let images = {}
      let {
        imgList
      } = this.properties.canvasData
      let status = true
      let list = Object.keys(imgList)
      wx.showLoading({
        title: '生成中...',
        mask: true,
        success(res) {
          list.forEach((key, index) => {
            wx.getImageInfo({
              src: imgList[key],
              success(res) {
                images[key] = res.path
                if (index === list.length - 1 && status) return callBack(images)
              },
              fail(err) {
                status = false
                wx.hideLoading()
                wx.showToast({
                  icon: 'none',
                  title: '图片生成失败,请稍后再试'
                })
              }
            })
          })
        }
      })
    }
  }
})