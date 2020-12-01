// 1.实现一个插件

// 2.实现VueRouter: 处理选项、监控url变化，动态渲染
let Vue

class VueRouter {
  // Vue要在这里用
  constructor(options) {
    this.$options = options

    const initial = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'current', initial)

    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }

  onHashChange() {
    this.current = window.location.hash.slice(1)
    console.log(this.current)
  }
}

// 插件要求实现install(Vue)
VueRouter.install = function(_Vue) {
  // console.log(_Vue)
  Vue = _Vue
  // 利用全局混入延迟调用后续代码
  Vue.mixin({
    beforeCreate() {
      // 任务1：挂载$router
      // 以后每个组件都会调用该方法
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  // 任务2：注册两个全局组件
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      // console.log(h)
      return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
    }
  })

  Vue.component('router-view', {
    render(h) {
      let Component = null
      const route = this.$router.$options.routes.find((route) => route.path === this.$router.current)
      if (route) {
        Component = route.component
      }
      return h(Component)
    }
  })
}

export default VueRouter
