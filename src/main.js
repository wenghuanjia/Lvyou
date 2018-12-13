// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
// 引入懒加载 组件
import VueLazyload from 'vue-lazyload'
// 懒加载 配置
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // 当你的图片请求失败，就会用这里的图片代替
  error: require('../static/images/touxiang.png'),
  // 当你的图片正在请求的时候，就用这里的图片代替
  loading: require('../static/images/txLoading.gif'),
  attempt: 1
})
// 引入图片放大组件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
var options = {
  fullscreenEl: false //关闭全屏按钮
};
Vue.use(vuePhotoPreview,options)

import { Swipe, SwipeItem, Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
