<template>
  <div class="hello">
    <p>{{ name }}</p>
    <p>{{ value }}</p>
    <p>{{ count }}</p>
  </div>
</template>

<script>
// declare type ABC = {
//   a: string;
//   b: string;
//   c: number;
//   d: Array<number>;
// }

var abc = {
  a: 'aa',
  b: 'bb',
  c: 12
}

function a (cb: Function) {
  return cb('true')
}

function b (val: number): number {
  return val * val
}

var sth = a(b)

export default {
  data () {
    return {
      name: this.aa(abc),
      value: this.bb('dfs'),
      count: sth
    }
  },

  methods: {
    aa (obj: { a: string; b: string; c: number; d?: Array<number> }): string {
      return obj.a + obj.b + obj.c + ((obj.d && obj.d.toString()) || '')
    },

    bb (value: mixed) {
      return typeof value
    },

    cc (cb: () => string) {
      return cb(true)
    },

    ee (): number {
      return this.cc(function (value: number): number {
        return value * 2
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  display: block;
}
</style>
