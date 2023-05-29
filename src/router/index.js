import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/home/index.vue"
import NotFound from "../views/NotFound.vue"
import Article from "../views/article/article.vue"
import Link from "../views/link/link.vue"
import Message from "../views/message/message.vue"
import Login from "../views/user/login.vue"
import Category from "../views/category/category.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: "首页"
      }
    },
    {
      path: "/article/:id",
      name: "article",
      component: Article,
      meta: {
        title: "文章"
      }
    },
    {
      path: "/link",
      name: "link",
      component: Link,
      meta: {
        title: "友链"
      }
    },
    {
      path: "/message",
      name: "message",
      component: Message,
      meta: {
        title: "留言"
      }
    },
    {
      path: "/category",
      name: "category",
      component: Category,
      meta: {
        title: "分类"
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "登录"
      }
    },
    {
      path: '/:catchAll(.*)',
      name: "NotFound",
      component: NotFound, // 匹配所有路径
      meta: {
        title: "没有找到文件"
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")
  if (token && to.name === 'login') {
    next({ name: "home" })
  } else {
    next()
  }
})

export default router
