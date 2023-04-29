const ThemeSwitch = {
    template: `
    <div
      class="flex shadow pointer switch" 
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
}