<template>
  <div class="hello">
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>
// @flow
// mixed可以是任意类型
function f1 (val: mixed): mixed {
  return typeof val
}

console.log(f1('abc'))  // 'string'

// ?string可以使string或null或undefined
function f2 (val: ?string): string {
  if (val) {
    return val
  }
  return ''
}

console.log(f2('abc'))  // 'abc'
console.log(f2(null))   // ''
console.log(f2())       // ''
// console.log(f2(1))      // Error

// 函数可以有默认值，这时参数只接受string或undefined
function f3 (val: string = 'foo') {
  return val
}

console.log(f3(''))     // ''
console.log(f3('abc'))  // 'abc'
console.log(f3())       // 'foo'
console.log(f3(undefined)) // 'foo'
// console.log(f3(null))   // Error

// 如果规定了具体值，则只能接受该值
function f4 (val: 0 | 1) {
  return val
}

console.log(f4(0))    // 0
// console.log(f4(3))    // Error
// console.log(f4('0'))  // Error

// 比较mixed和any的区别
!(function f5 () {
  console.log('f5')
  // mixed可以是任意类型，可以被具体类型的变量赋值
  // var v1: mixed = 5
  // var v2: number = v1   // Error

  // mixed类型的变量可以被不同类型的值赋值
  var v3: number = 4
  var v4: mixed = v3
  console.log(v4)     // 4
  var v5: string = 'v5'
  v4 = v5
  console.log(v4)     // 'v5'

  // any完全不做类型检测，tsc都会通过，不推荐使用
  var v6: any = 10
  var v7: string = v6   // v7应该是string型，但这种赋值也被通过了
  console.log(v7)       // 10
  v7 = '20'
  console.log(v7)       // '20'

  // v9被设置为any型，相当于没有
  var v8: number = 1
  var v9: any = v8
  console.log(v9)       // 1
  var v10: string = 'v10'
  v9 = v10
  console.log(v9)       // 'v10'
})()

//
!(function f6 () {
  console.log('f6')
  var obj: any = {}
  // obj是any型，所以v1也是any型
  var v1 = obj.a
  console.log(v1)   // undefined
  // var v2 = obj.a.b  // tsc不报错，但其实会报错

  var obj2: any = {
    a: 1,
    b: '2',
    c: true
  }

  var v3: string = obj2.b
  console.log(v3)   // '2'
})()

!(function f7 () {
  console.log('f7')
  // v1被赋值时，认为v1是个number型
  var v1 = 4
  var n: number = v1
  console.log(n)

  // v2的类型被改成string型后，可以赋值给s
  var v2 = 5
  v2 = 'sss'
  var s: string = v2
  console.log(s)
})()

// b参数可选
function f8 (a: string, b?: number) {
  if (b) {
    return a + (b * 2)
  }
  return a
}

console.log(f8('a', 12))      // 'a24'
console.log(f8('a'))          // 'a'
// console.log(f8('a', 'b'))  // Error

// 只有这样可以通过检测
function f9 (fun: () => number) {
  return fun()
}

function f10 (): number {
  return 5
}

console.log(f9(f10))

//
//
//
//
//
//
//
//
//
//
//
//
//
// declare type P = {
//   a: string,
//   b: number
// }
//
// function f5<P> (val: P): P {
//   return val
// }
//
// console.log(f5({ a: 'a', b: 1 }))

export default {
}
</script>
