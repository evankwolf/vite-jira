import { useEffect, useState } from "react"
/**
 * 防抖hooks
 * 思路大概如下：
 * 1. 我们需要一个响应式的变量，这就要求我们使用useState
 * 2. 每次当传进来的参数变化时，我们都必须要监听到
 * 3. 我们需要设置一个定时器，到达定时后返回参数
 * 4. 定时器结束之前，如果再次触发，则清除上一个定时器再设置一个，就像useEffect的return
 * 5. 如果未到达设定的延迟，我们不改变状态值，此时返回的值与初次传入的值相同
 * 6. 当且只有当到达设定延迟之后，我们才改变状态值，之后就返回新状态值
 * @param {*} params 传进来的参数
 * @param {Number} ms 延迟
 * @returns 返回最终结果
 */
const useDebounce = (params, ms = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(params)
  useEffect(() => {
    // 每次params变化后，设置一个定时器
    const timer = setTimeout(() => setDebouncedValue(params), ms)
    // useEffect中的return执行时机为上一个useEffect处理完以后
    // 这就保证了我们如果点击了两次，那么第二次点击的时候，第一个的return就执行了
    return () => clearTimeout(timer)
  }, [params])
  return debouncedValue
}

export default useDebounce
