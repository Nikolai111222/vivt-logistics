const Main = {
  template: `
    <div id="main">

      <header class="flex container header">
        <div class="flex logo_wrapper">
          <router-link :to="{ name: 'logs' }" class="pointer text_logo">
            <span>logistics</span>
          </router-link>

          <theme-switch />
        </div>

        <nav class="flex nav">
          <router-link exact :to="{ name: 'logs' }" class="nav_item pointer">Журнал</router-link>
          <router-link exact :to="{ name: 'stats' }" class="nav_item pointer">Статистика</router-link>
          <router-link exact :to="{ name: 'staff' }" class="nav_item pointer">Сотрудники</router-link>
          <span to="/" class="flex nav_item pointer list">
            События
            <div class="arrow_down"></div>
            <div class="hidden_menu">
              <div>
                <span class="heading">Войти</span>
                <button class="pointer">В здание</button>
                <button class="pointer">На рабочее место</button>
              </div>
              <div>
                <span class="heading">Выйти</span>
                <button class="pointer">Из здания</button>
                <button class="pointer">С рабочего места</button>
              </div>
            </div>
          </span>
          <div @click="logout" class="flex pointer btn">
            <img class="btn_img" v-if="$store.getters.IS_DARK_THEME" src="./static/images/white_logout.svg" alt="">
            <img class="btn_img" v-else src="./static/images/logout.svg" alt="">
          </div>
        </nav>
        
        <div @click="$store.commit('SET_MENU', true)" class="flex pointer btn menu_icon">
          <img
            v-if="$store.getters.IS_DARK_THEME"
            class="menu_icon"
            src="./static/images/white_menu.svg"
            alt=""
          >
          <img class="menu_icon" v-else src="./static/images/menu.svg" alt="">
        </div>
      </header>

      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>

      <footer>Разработал Матвеенков&nbsp;Н.Д. для Цифровой&nbsp;Мир&nbsp;2021&nbsp;(ВИВТ)</footer>
    </div>
  `,
  methods: {
    logout () {
      this.$store.dispatch('LOG_OUT')
      this.$router.push({ name: 'auth' })
    }
  },
  mounted () {
    // draggable false для всех картинок
    document.querySelectorAll('img').forEach((item) => {
      item.setAttribute('draggable', 'false')
    })
  },
}