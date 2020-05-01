import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "element-ui/lib/theme-chalk/display.css"
import mixin from "./utils/mixin";

Vue.config.productionTip = false

Vue.use(Element, {
  size: "small", // set element-ui default size medium
  // i18n: (key, value) => i18n.t(key, value)
  zIndex: 1000 // set element-ui default zIndex 2000 (主要影响图片放大和 tinymce 编辑器的 dialog 层级)
});

Vue.use(mixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
