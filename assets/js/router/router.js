const routes = [
  {
    path: '/auth',
    component: Auth,
    name: 'auth'
  },
  {
    path: '/',
    component: Main,
    name: 'main',
    children: [
      { path: '/', component: Logs, name: 'logs' },
      { path: '/staff', component: Staff, name: 'staff' },
      { path: '/stats', component: Stats, name: 'stats' }
    ]
  },
  { 
    path: '/404', 
    name: '404', 
    component: NotFound, 
  }, { 
    path: '*', 
    redirect: '/404' 
  }
]

const router = new VueRouter({ routes, linkActiveClass: 'active' })

router.beforeEach((to, from, next) => {
  if (to.name !== 'auth' && !localStorage.isLoggedIn) next({ name: 'auth' })
  else if (to.name === 'auth' && !!localStorage.isLoggedIn) next({ name: 'logs' })
  else next()
})