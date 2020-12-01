// 声明一个插件
// 声明一个类Store
let Vue

class Store {
  constructor(options) {
    // 1.选项处理
    // this.$options = options
    this._mutations = options.mutations
    this._actions = options.actions
    // 2.响应式state
    // 模拟computed - start
    this.getters = options.getters
    const computed = {}
    Object.keys(this.getters).forEach((key) => {
      const fn = this.getters[key]
      computed[key] = () => fn(this.state, this.getters)
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      })
    })
    this._vm = new Vue({
      data: {
        $$state: options.state
      },
      computed
    })
    // 模拟computed - end

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    // getters - start
    // this.getters = {}
    // Object.keys(options.getters).forEach((key) => {
    //   // console.log(key)
    //   Object.defineProperty(this.getters, key, {
    //     get: () => options.getters[key](this.state),
    //     enumerable: true
    //   })
    // })
    // getters -end
  }

  get state() {
    // console.log(this._vm)
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('please use replaceState to reset state')
  }

  commit(type, payload) {
    const entry = this._mutations[type]
    if (!entry) {
      console.error('unkwnow mutation type')
      return
    }

    entry(this.state, payload)
  }
  dispatch(type, payload) {
    const entry = this._actions[type]

    if (!entry) {
      console.error('unkwnow action type')
      return
    }

    entry(this, payload)
  }
}

function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// 导出对象认为是Vuex
export default { Store, install }
