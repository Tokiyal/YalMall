// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import GoodsList from './views/GoodsList'
import router from './router'

//导入element-ui
import ElementUI from 'element-ui'

//导入懒加载
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//导入elementui样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.use(VueLazyLoad, {
  loading: '/static/images/loading-svg/loading-bars.svg'
})

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { GoodsList },
  template: '<GoodsList/>'
})
