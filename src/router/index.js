import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/:locale?',
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/AboutView.vue')
      },
      {
        path: 'members',
        name: 'members',
        component: () => import('@/views/MembersView.vue')
      },
      {
        path: 'join',
        name: 'join',
        component: () => import('@/views/JoinView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  const localeParam = to.params.locale

  if (localeParam && localeParam !== 'en') {
    const newPath = to.path.replace(/^\/[a-z]{2}/, '') || '/'
    return next({ path: newPath, replace: true })
  }

  next()
})

export default router
