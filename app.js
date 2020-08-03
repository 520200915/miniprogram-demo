//app.js
import api from './api/api.js'
import router from './router/index.js'
import watch from './utils/watch.js'
import util from './utils/util.js'
App({
  onLaunch: function () {
    this.$router = router
    this.$api = api
    this.$watch = watch
    this.$util = util
  },
  globalData: {
    
  }
})