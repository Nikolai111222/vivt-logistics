const Main = {
  template: `
    <div id="main">

      <header class="flex container header">
        <img class="logo" src="./static/images/logo.png" alt="">

        <nav class="flex nav">
          <router-link exact :to="{ name: 'logs' }" class="nav_item pointer">Журнал</router-link>
          <router-link exact :to="{ name: 'staff' }" class="nav_item pointer">Сотрудники</router-link>
          <span to="/" class="nav_item pointer">События</span>
          <router-link :to="{ name: 'auth' }">
            <div class="flex pointer btn">
              <img src="./static/images/logout.png" alt="">
            </div>
          </router-link>
        </nav>
        
        <div class="flex pointer btn menu_icon">
          <img @click="$parent.isMenuShown = true" src="./static/images/menu.png" alt="">
        </div>
      </header>

      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>

      <footer>Разработал Матвеенков&nbsp;Н.Д. для Цифровой&nbsp;Мир&nbsp;2021&nbsp;(ВИВТ)</footer>
    </div>
  `
}