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

Vue.component('theme-switch', {
  template: `
    <div
      class="flex pointer switch" 
      :class="{
        switch_dark: $store.getters.IS_DARK_THEME
      }"
      @click="$store.commit('CHANGE_THEME')"
    >
      <div
        class="flex switch_item"
        :class="{
          switch_item__day: !$store.getters.IS_DARK_THEME,
          switch_item__dark: $store.getters.IS_DARK_THEME
        }"
      >
        <img v-if="$store.getters.IS_DARK_THEME" src="./static/images/night.svg" alt="">
        <img v-else src="./static/images/day.svg" alt="">
      </div>
    </div>
  `
})

Vue.component('log', {
  template: `
    <div class="grid log">
      <div class="flex pointer log_item employee" title="Показать сотрудника">
        <img src="./static/images/staff/3.png" alt="">
        Александров А.А.
      </div>
      <div class="flex log_item">
        <img src="./static/images/calendar.png" alt="">
        14.12.2021 9:00
      </div>
      <div class="flex log_item">
        <img src="./static/images/leave.png" alt="">
        покинул (-а)
      </div>
      <div class="flex log_item">
        <img src="./static/images/work.png" alt="">
        рабочее место
      </div>
    </div>
  `
})

const app = new Vue({
  components: { appMenu },
  router,
  store
}).$mount('#app')
