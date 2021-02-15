const Staff = {
  template: `
      <main>

          <h3 class="flex container h3">
            Сотрудники
            <div class="flex btns">
              <div
                class="flex btn pointer"
                :class="{ btn_active: isFilters}"
                @click="isFilters = !isFilters"
              >
                <img class="btn_img" v-if="$store.getters.IS_DARK_THEME" src="./static/images/white_filters.svg" alt="">
                <img class="btn_img" v-else src="./static/images/filters.svg" alt="">
              </div>
              <div @click="clearFilters" class="flex pointer btn">
                <img class="btn_img" v-if="$store.getters.IS_DARK_THEME" src="./static/images/white_clear_filters.svg" alt="">
                <img class="btn_img" v-else src="./static/images/clear_filters.svg" alt="">
              </div>
            </div>
          </h3>

          <div v-if="isFilters" class="filters_wrapper">
            <div class="container grid filters" id="staff_filters">
              <div class="flex filter">
                <label for="name">По имени сотрудника</label>
                <div class="flex field">
                  <img v-if="$store.getters.IS_DARK_THEME" src="./static/images/white_search.svg" alt="">
                  <img v-else src="./static/images/search.svg" alt="">
                  <input v-model="filters.name" type="text" placeholder="Найти запись" id="name" class="input">
                </div>
              </div>

              <div class="flex filter">
                <label for="position">Должность</label>
                <div class="flex field">
                  <select class="pointer" v-model="filters.action" id="position">
                    <option value="placeholder1" disabled>Выберите фильтр</option>
                    <option>Вошел (-ла)</option>
                    <option>Покинул (-а)</option>
                    <option>Все действия</option>
                  </select>
                </div>
              </div>

              <div class="flex filter">
                <label for="place">Место</label>
                <div class="flex field">
                  <select class="pointer" v-model="filters.place" id="place">
                    <option value="placeholder2" disabled>Выберите фильтр</option>
                    <option>Здание</option>
                    <option>Рабочее место</option>
                    <option>Здание и рабочее место</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        <div class="grid container staff">
          <employee v-for="(emp, index) in 4" :key="index"></employee>
        </div>
  
      </main>
  `,
  data: () => {
    return {
      isFilters: true,
      filters: {
        name: '',
        action: 'placeholder1',
        place: 'placeholder2'
      }
    }
  },
  methods: {
    clearFilters () {
      for (key in this.filters) { this.filters[key] = '' }
    }
  },
  mounted () {
    // draggable false для всех картинок
    document.querySelectorAll('img').forEach((item) => {
      item.setAttribute('draggable', 'false')
    })
  }
}