/**
 * 设置监听器
 */
const watch = page => {
  let {
    watch
  } = page
  Object.keys(watch).forEach(val => {
    let key = val.split('.')
    let nowData = page
    for (let i = 0; i < key.length - 1; i++) {
      nowData = nowData[key[i]]
    }
    let lastKey = key[key.length - 1]
    let watchFun = watch[val].handler || watch[val]
    let deep = watch[val].deep
    observe(nowData, lastKey, watchFun, deep, page)
  })
}
/**
 * 监听属性 并执行监听函数
 */
const observe = (obj, key, watchFun, deep, page) => {
  let val = obj[key]
  if (deep && val != null && typeof val === 'object') {
    Object.keys(val).forEach(childKey => {
      observe(val, childKey, watchFun, deep, page)
    })
  }
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    set(value) {
      watchFun.call(page, value, val)
      val = value
      if (deep) {
        observe(obj, key, watchFun, deep, page)
      }
    },
    get() {
      return val
    }
  })
}
export default watch