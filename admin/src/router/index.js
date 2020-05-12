import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('views/login/Login')

const Main = () => import('views/main/Main')

const CategoryCreate = () => import('views/main/CategoryCreate')
const CategoryList = () => import('views/main/CategoryList')

const ItemCreate = () => import('views/main/ItemCreate')
const ItemList = () => import('views/main/ItemList')

const HeroCreate = () => import('views/main/HeroCreate')
const HeroList = () => import('views/main/HeroList')

const ArticleCreate = () => import('views/main/ArticleCreate')
const ArticleList = () => import('views/main/ArticleList')

const AdCreate = () => import('views/main/AdCreate')
const AdList = () => import('views/main/AdList')

const AdminUserCreate = () => import('views/main/AdminUserCreate')
const AdminUserList = () => import('views/main/AdminUserList')

  const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/login',
    component: Login,
    meta: {isPublic: true}
  },
  {
    path: '/main',
    component: Main,
    children: [
      {path: '/categories/create',component: CategoryCreate},
      {path: '/categories/edit/:id',component: CategoryCreate,props: true},
      {path: '/categories/list',component: CategoryList},

      {path: '/items/create',component: ItemCreate},
      {path: '/items/edit/:id',component: ItemCreate,props: true},
      {path: '/items/list',component: ItemList},

      {path: '/heroes/create',component: HeroCreate},
      {path: '/heroes/edit/:id',component: HeroCreate,props: true},
      {path: '/heroes/list',component: HeroList},

      {path: '/articles/create',component: ArticleCreate},
      {path: '/articles/edit/:id',component: ArticleCreate,props: true},
      {path: '/articles/list',component: ArticleList},

      {path: '/ads/create',component: AdCreate},
      {path: '/ads/edit/:id',component: AdCreate,props: true},
      {path: '/ads/list',component: AdList},

      {path: '/admin_users/create',component: AdminUserCreate},
      {path: '/admin_users/edit/:id',component: AdminUserCreate,props: true},
      {path: '/admin_users/list',component: AdminUserList},
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to,from,next) => {
  console.log(to)
  if(!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }else {
    next()
  }
})

export default router
