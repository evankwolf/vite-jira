import { useEffect, useState } from 'react'

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

const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

const useArray = <T>(params: T[])  => {
  const [value, setValue] = useState(params)
  const clear = () => {
    setValue([])
  }
  const removeIndex = (index: number) => {
    if (index < 0 ) throw new Error("索引有问题兄弟")
    const newArr = [...value.slice(0, index), ...value.slice(index + 1)]
    setValue(newArr)
  }
  const add = (param: T) => {
    const newArr = [...value, param]
    setValue(newArr)
  }
  return {
    value,
    clear,
    removeIndex,
    add,
  }
}

export { 
  cleanObject,
  useMount,
  useArray,
}
