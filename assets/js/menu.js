const appMenu = {
  template: `
    <div v-if="$store.getters.IS_MENU" class="flex container menu">
      <div class="flex menu_top">
        <span class="heading">Меню</span>
        <img @click="close" class="pointer" src="./static/images/cross.png" alt="">
      </div>

      <div class="flex menu_items">
        <router-link @click.native="close" exact :to="{ name: 'logs' }" class="menu_item">Журнал</router-link>
        <router-link @click.native="close" exact :to="{ name: 'stats' }" class="menu_item">Статистика</router-link>
        <router-link @click.native="close" exact :to="{ name: 'staff' }" class="menu_item">Сотрудники</router-link>
        <router-link @click.native="logout" exact :to="{ name: 'auth' }" class="menu_item">Выйти</router-link>
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
  `,
  methods: {
    close () { this.$store.commit('SET_MENU', false) },
    logout () {
      this.close()
      this.$store.dispatch('LOG_OUT')
      this.$router.push({ name: 'auth' })
    }
  }
}