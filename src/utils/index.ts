/**
 * 清除对象中值为undefined/null的键值对
 * @param {*} obj
 * @returns 处理后的对象
 */
function cleanObject(obj: object) {
  const res = { ...obj }
  Object.keys(res).forEach((key) => {
    const v = obj[key]
    if (!v && v !== 0) {
      delete res[key]
    }
  })
  return res
}

export { cleanObject }
