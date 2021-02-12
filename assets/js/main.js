Vue.component('employee', {
  template: `
    <div class="flex shadow employee">

      <img src="./static/images/staff/1.png" alt="">

      <div class="flex info">
        <div class="name">Александров Александр Александрович</div>
        <div class="position">Техник</div>
        <div class="flex marks">

          <div class="flex mark">
            <img src="./static/images/building.png" alt="">
            <span>В здании</span>
          </div>

          <div class="flex mark">
            <img src="./static/images/work.png" class="icon" alt="">
            <span>За рабочим<br>местом</span>
          </div>

        </div>
      </div>

    </div>
  `
})

const appMenu = {
  template: `
    <div v-if="$parent.isMenuShown" class="flex container menu">
      <div class="flex menu_top">
        <span class="heading">Меню</span>
        <img @click="$parent.isMenuShown = false" class="pointer" src="./static/images/cross.png" alt="">
      </div>

      <div class="flex menu_items">
        <router-link @click.native="$parent.isMenuShown = false" exact :to="{ name: 'logs' }" class="menu_item">Журнал</router-link>
        <router-link @click.native="$parent.isMenuShown = false" exact :to="{ name: 'staff' }" class="menu_item">Сотрудники</router-link>
        <router-link @click.native="$parent.isMenuShown = false" exact :to="{ name: 'auth' }" class="menu_item">Выйти</router-link>
      </div>
      
      <div class="flex menu_btns">
        <div class="flex btns_group">
          <span class="group_name">Войти</span>
          <button>В здание</button>
          <button>На рабочее место</button>
        </div>
        <div class="flex btns_group">
          <span class="group_name">Выйти</span>
          <button>Из здания</button>
          <button>С рабочего места</button>
        </div>
      </div>
    </div>
  `
}

// Vue.component('appMenu', {
//   template: `
//     <div v-if="true" class="flex container menu">
//       <div class="flex menu_top">
//         <span class="heading">Меню</span>
//         <img class="pointer" src="./static/images/cross.png" alt="">
//       </div>

//       <div class="flex menu_items">
//         <router-link exact :to="{ name: 'logs' }" class="menu_item">Журнал</router-link>
//         <router-link exact :to="{ name: 'staff' }" class="menu_item">Сотрудники</router-link>
//         <router-link exact :to="{ name: 'auth' }" class="menu_item">Выйти</router-link>
//       </div>
      
//       <div class="flex menu_btns">
//         <div class="flex btns_group">
//           <span class="group_name">Войти</span>
//           <button>В здание</button>
//           <button>На рабочее место</button>
//         </div>
//         <div class="flex btns_group">
//           <span class="group_name">Выйти</span>
//           <button>Из здания</button>
//           <button>С рабочего места</button>
//         </div>
//       </div>
//     </div>
//   `,
//   data: () => {
//     return {}
//   }
// })

// 2. Определяем несколько маршрутов
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
      { path: '/staff', component: Staff, name: 'staff' },
      { path: '/', component: Logs, name: 'logs' }
    ]
  },
  { path: "*", component: Auth },
]

// 3. Создаём экземпляр маршрутизатора и передаём маршруты в опции `routes`
const router = new VueRouter({ routes, linkActiveClass: 'active' })

// 4. Создаём и монтируем корневой экземпляр приложения.
const app = new Vue({
  components: {
    appMenu
  },
  data: { isMenuShown: false },
  mounted () {
    document.querySelectorAll('img').forEach((el) => {
      el.setAttribute('draggable', 'false')
    })
  },
  router
}).$mount('#app')
