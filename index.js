Vue.component('employee', Employee)
Vue.component('theme-switch', ThemeSwitch)
Vue.component('log', Log)
Vue.component('icon', Icon)
Vue.component('appMenu', appMenu)

const app = new Vue({
  components: { appMenu },
  router,
  store,
  mounted () {
    document.addEventListener('contextmenu', e => e.preventDefault()) }
}).$mount('#app')
