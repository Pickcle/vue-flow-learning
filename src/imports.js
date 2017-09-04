// @flow
import { MyClass } from './exports'
import type { MyObject } from './exports'
import interface { MyInterface } from './exports'

function log () {
  var ins: MyClass = new MyClass('Pickcle')
  console.log(ins)
  //
  // var obj: MyObject = {
  //   name: 'Pickcle'
  // }
  // console.log(obj)

  // var I: MyInterface = {
  //   hobby: 'Game'
  // }
  // console.log(I)
}

export default log
