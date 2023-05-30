import './assets/main.css'
import "./assets/global.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Store from './store/Stroage'
import http from "./utils/http"
import Notiflix from './utils/notiflix'
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css' //样式

const app = createApp(App)

app.use(router)
app.use(Store)
//创建v-highlight全局指令
app.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightElement(block)
    })
})
// vue3写法 将http公共方法挂在到vue实例$http中
app.config.globalProperties.$http = http
app.config.globalProperties.$not = Notiflix

app.mount('#app')
