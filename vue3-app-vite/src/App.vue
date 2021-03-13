<template>
  <button @click="countRef++">count:{{countRef}}</button>
  <h1>count: {{ count}}</h1>
  <button @click="increase">increase</button>
  <button @click="decrease">decrease</button>
</template>

<script>
import { ref } from "vue"

// 也可以直接单独提取出来，完成相应的逻辑处理之后再 return 为对象。
// 在 setup 中使用时，直接在 return { ...xxx } 解构方式获取引入即可。
function userCount () {
  let count = ref(0)
    const increase = () => {
      count.value ++
    }
  const decrease = () => {
    count.value --
  }
  return {
    count,
    increase,
    decrease
  }
}

export default {
  setup () {
    console.log('所有生命周期钩子函数之前调用')
    console.log(this) // undefined

    let countRef = ref(0) // 把默认值传进去，返回一个具有响应式的数据。
    console.log(countRef.value) // 在 setup 中获取该值操作时需要使用 .value 获取。

    return {
      countRef,
      ...userCount()
    }
    /*
    let count = ref(0)
    const increase = () => {
      count.value ++
    }
    return {
      // 返回的所有属性都会被附着到组件的实例中去。
      countRef,
      count,
      increase
    }
    */
  }
  /* data() {
    return {
      count: 0
    }
  },
  methods: {
    increase() {
      this.count++
    }
  } */
}
</script>
