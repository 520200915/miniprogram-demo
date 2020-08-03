//index.js
//获取应用实例
const {
  $router,
  $util,
  $watch
} = getApp()

Page({
  data: {
    num: '0',
    page2Obj: {
      a: 1,
      b: 2,
      c: new Array(5).fill($util.decimal(Math.random() * 100,2))
    }
  },
  num:0,
  jump: e => $router.jump(e),
  onLoad(options) {
    $watch(this)
    setTimeout(() => {
      this.num = '100'
    }, 3000)
    
  },
  watch: {
    'num'(newVal, oldVal) {
      console.log(newVal, oldVal)
      $util.showToast({
        title: newVal,
        icon: 'none'
      })
    }
  }
})