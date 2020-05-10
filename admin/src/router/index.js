import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Main = () => import('views/main/Main')
const CategoryCreate = () => import('views/main/CategoryCreate')
const CategoryList = () => import('views/main/CategoryList')

  const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/main',
    component: Main,
    children: [
      {path: '/categories/create',component: CategoryCreate},
      {path: '/categories/list',component: CategoryList},
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
