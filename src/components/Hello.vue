<template>
  <div class="hello">
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>
// @flow
!function () {
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
}()

// 比较mixed和any的区别
!function () {
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
}()

//
!function () {
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
}()

!function () {
  // v1被赋值时，认为v1是个number型
  var v1 = 4
  var n: number = v1
  console.log(n)

  // v2的类型被改成string型后，可以赋值给s
  var v2 = 5
  v2 = 'sss'
  var s: string = v2
  console.log(s)
}()

!function () {
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

  // f10的参数参数类型和返回类型都必须和f9的第一个函数参数保持一致
  function f9 (fun: (v: number) => number, val: number): number {
    return fun(val)
  }

  function f10 (val: number): number {
    return val * 5
  }

  console.log(f9(f10, 10))
}()

// Object Type
!function () {
  console.log('object')
  // 声明式的Sealed Object不允许添加属性
  var v1 = {
    a: 1,
    b: '2',
    c: true
  }
  v1.a = 2
  v1.b = '3'
  // v1.c = '4'   // Error
  // v1.d = 1     // Error
  console.log(v1.a, v1.b, v1.c)   // 2 '3' true

  // Unsealed Object可以添加属性
  // Unsealed Object的属性可以被别的类型赋值
  var v2 = {}
  v2.a = '1'
  v2.b = '2'

  // v2.a被赋值为number型，此时可以正常赋值给number型的a
  v2.a = 1
  var a: number = v2.a
  console.log(a)

  // v2.a被赋值为string型，此时可以正常赋值给string型的a
  v2.a = '3'
  var aa: string = v2.a
  console.log(aa)

  // 实参可以比形参多几个额外参数
  function func (obj: { v: number }): number {
    return obj.v * 2
  }

  console.log(func({ v: 2 }))        // 4
  console.log(func({ v: 2, w: 2 }))  // 4
  // console.log('func:', func({ w: 2 }))        // Error

  var obj: {
    a: number,
    b: string
  } = {
    a: 1,
    b: '2',
    c: true
  }
  console.log(JSON.stringify(obj))

  // object声明类型前后加了|后，就不允许额外的属性了
  // var obj1: {| a: number |} = { a: 1, b: 2 }    // Error
}()

!function () {
  var obj: { [string]: number } = {}
  obj['a'] = 1
  obj['b'] = 2

  var a: number = obj['a']
  console.log(a)

  obj.c = 3
  var c: number = obj.c
  console.log(c)

  var obj2: { [number]: string } = {}
  obj2[1] = '1'
  obj2[2] = '2'

  console.log(obj2[1])        // '1'
  // console.log(obj2[3].length) // throw error at runtime
}()

// Array Type
!function () {
  var array: Array<number> = []
  array[0] = 1
  // array[1] = '2'    // Error
}()

// Tuple Type
!function () {
  console.log('tuple')
  var tuple: [number, string, boolean] = [1, '2', true]
  // 不确定哪种类型时，必须都声明
  var randomNumber: number | string | boolean = tuple[Math.round(Math.random() * 2)]
  console.log(randomNumber)

  // 不能赋值给长度不等于自身的tuple
  // var tuple1: [number, string] = tuple    // Error
  // var tuple2: [number, string, boolean, number] = tuple   // Error

  console.log(tuple.join(':'))      // 1:2:true

  // tuple不能使用Array.prototype中的方法
  // tuple.push(4)      // Error
}()

// Class Type
!function () {
  console.log('class')
  class Animal {
    name: string;
    age: number;
    color: string = 'white';
    price = 500;
    speak (str: string): string {
      return `name: ${this.name}, age: ${this.age}, speak: ${str}`
    }
  }

  var cat: Animal = new Animal()
  cat.name = 'Mimi'
  cat.age = 2
  console.log(cat.speak('cat'))     // name: Mimi, age: 2, speak: cat

  var animals: Array<Animal> = [cat]
  console.log(animals)

  // A,B,C可以代表任意类型
  class MyClass<A, B, C> {
    a: A;
    b: B;
    c: C;
    constructor (a: A, b: B, c: C) {
      this.a = a
      this.b = b
      this.c = c
    }
    getA (): A|B {
      return this.c ? this.a : this.b
    }
  }
  var myclass: MyClass<number, string, boolean> = new MyClass(1, 'one', true)
  console.log(myclass.getA())   // 1
  var myclass2: MyClass<string, number, boolean> = new MyClass('two', 2, false)
  console.log(myclass2.getA())   // 2
}()

// Type
!function () {
  console.log('type')
  type MyType = {
    a: number,
    b: string,
    c: boolean
  }
  var type1: MyType = {
    a: 10,
    b: '20',
    c: true
  }
  function checkType (param: MyType) {
    return param.c ? param.a : param.b
  }
  console.log(checkType(type1))   // 10

  // 设置MyType的别名
  type AliasType = MyType
  var type2: AliasType = {
    a: 5,
    b: '8',
    c: true
  }
  console.log(checkType(type2))   // 5

  type UnionAlias = 1 | 2 | 3
  function checkUnion (union: UnionAlias) {
    return union * 5
  }
  var unionNumber: UnionAlias = 1
  console.log(checkUnion(unionNumber)) // 5
}()

// Interface
!function () {
  interface ISpeak {
    speak (): string
  }

  interface IWalk {
    walk (): void
  }

  class Cat implements ISpeak, IWalk {
    // name: 'Cat';
    speak (): string {
      return 'Cat'
    }
    walk (): void {
      console.log('cat walk')
    }
  }

  class Dog implements ISpeak, IWalk {
    // name: 'Dog';
    speak (): string {
      return 'Dog'
    }
    walk (): void {
      console.log('dog walk')
    }
  }

  var cat: ISpeak = new Cat()
  var dog: ISpeak = new Dog()
  console.log(cat.speak())      // 'Cat'
  console.log(dog.speak())      // 'Dog'

  interface IPerson<A, B> {
    +age: A;    // read-only
    -name: B    // write-only
  }

  var mike: IPerson<number, string> = {
    age: 25,
    name: 'Mike'
  }
  // mike.age = 20               // Error read only
  console.log(mike.age)
  mike.name = 'Peter'
  // console.log(mike.name)      // Error write only
}()

// default value
!function () {
  type Item<T: number = 1> = {
    prop: T
  }

  var item1: Item<> = { prop: 1 }
  var item2: Item<2> = { prop: 2 }
  console.log(item1, item2)
}()

// Intersection Type
!function () {
  type A = { a: number }
  type B = { b: number }

  function f (value: A & B) {
    return value.a + value.b
  }

  var union: A & B = { a: 1, b: 2 }
  console.log(f(union))       // 3
}()

// typeof
!function () {
  class A {
    foo () {}
  }
  class B {
    foo () {}
  }
  // var cls1: typeof A = B     // Error
  var cls2: typeof A = A

  var ins1: A = new A()

  var ins2: typeof ins1 = new A()
}()

// type cast expression
!function () {
  var a = (2 + 2: number)
  console.log(a)          // 4
  var obj = { prop: (2 * 2: number) }
  console.log(obj)
}()

// Utility Type
// !function () {
//   type name1 = 'Nike' | 'Charles' | 'Michael'
//   var nameEnum1 = {
//     Nike: 1,
//     Charles: 2,
//     Michael: 3
//   }
//   function printNumber (name: name1) {
//     console.log(nameEnum1[name])
//   }
//   printNumber('Nike')     // 1
//
//   var nameEnum2 = {
//     Mary: 1,
//     Judy: 2,
//     Willian: 3
//   }
//   type name2 = $Keys<typeof nameEnum2>
//
//   var mary: nameEnum2 = 'Mary'
//   console.log(mary)       // mary
// }
export default {
}
</script>
