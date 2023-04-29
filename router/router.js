const routes = [
  {
    path: '/auth',
    component: Auth,
    name: 'auth'
  },
  {
    path: '/',
    component: App,
    name: 'app',
    children: [
      { path: '/', component: Tools, name: 'tools' },
      { path: '/staff', component: Staff, name: 'staff' },
      { path: '/logs', component: Logs, name: 'logs' }
    ]
  },
  { 
    path: '/404', 
    name: '404', 
    component: NotFound, 
  },
  { 
    path: '*', 
    redirect: '/404' 
  }
]

const router = new VueRouter({ routes, linkActiveClass: 'active' })

router.beforeEach((to, from, next) => {
  if (to.name !== 'auth' && !localStorage.isLoggedIn) next({ name: 'auth' })
  else if (to.name === 'auth' && !!localStorage.isLoggedIn) next({ name: 'tools' })
  else next()
})