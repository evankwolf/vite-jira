/**
 * 清除对象中值为undefined/null的键值对
 * @param {*} obj
 * @returns 处理后的对象
 */
function cleanObject(obj) {
  const res = { ...obj }
  Object.keys(res).forEach((key) => {
    const v = obj[key]
    if (!v && v !== 0) {
      delete res[key]
    }
  })
  return res
}

/**
 * 深拷贝数据方法，但也不一定有必要
 * @param {*} data
 */
function deepClone(data) {
  if (!data) return data
  let _data
  switch (typeof data) {
  case "number":
  case "string":
  case "boolean":
  case "bigint": // 这些数据类型直接赋值就可以
    _data = data
    break
  case "symbol": {
    // symbol需要做个字符串切割然后重新Symbol一下
    const str = data.toString()
    const symbolStr = str.slice(str.indexOf("(") + 1, str.length - 1)
    _data = Symbol(symbolStr)
    break
  }
  case "object": {
    // 首先判断是数组还是对象，数组则循环数组下标，对象则循环key数组
    const IS_ARRAY = Array.isArray(data)
    _data = IS_ARRAY ? [] : {}
    const arr = IS_ARRAY
      ? data.map((k, i) => i)
      : // ? data.reduce((prev, cur, i) => (prev.push(i), prev), [])
      Object.keys(data)
    if (arr.length) {
      arr.forEach((k) => {
        _data[k] = deepClone(data[k])
      })
    } else {
      // 一般情况下可能是date/正则/set/map，可以统一处理
      _data = new data.__proto__.constructor(data)
    }
    break
  }
  case "function":
    _data = data // 函数还没想到很好的方法处理
    break
  default:
    throw new Error("什么鬼类型", data)
  }
  return _data
}

export { cleanObject, deepClone }
