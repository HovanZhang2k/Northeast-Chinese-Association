import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { title: '同乡会简介' }
  },
  {
    path: '/activities',
    name: 'Activities',
    component: () => import('@/views/Activities.vue'),
    meta: { title: '精彩活动' },
    children: [
      {
        path: 'recent',
        name: 'RecentActivities',
        component: () => import('@/views/activities/Recent.vue'),
        meta: { title: '近期活动' }
      },
      {
        path: 'past',
        name: 'PastActivities',
        component: () => import('@/views/activities/Past.vue'),
        meta: { title: '往期活动' }
      }
    ]
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/Contact.vue'),
    meta: { title: '联系我们' }
  },
  {
    path: '/join',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录/注册' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 东北同乡会` : '东北同乡会'
  next()
})

export default router 