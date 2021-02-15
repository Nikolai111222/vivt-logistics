const Logs = {
  template: `
    <main>

      <section id="logs">
        <h3 class="flex container h3">
          Записи
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

        <transition name="fade">
          <div v-show="isFilters" class="filters_wrapper">
            <div id="logs_filters" class="container grid filters">
              <div class="flex filter">
                <label for="name">По имени сотрудника</label>
                <div class="flex field">
                  <img v-if="$store.getters.IS_DARK_THEME" src="./static/images/white_search.svg" alt="">
                  <img v-else src="./static/images/search.svg" alt="">
                  <input v-model="filters.name" type="text" placeholder="Найти запись" id="name" class="input">
                </div>
              </div>

              <div class="flex filter">
                <label for="date_from">Дата от</label>
                <div class="flex field">
                  <input @change="changeDateTo" v-model="filters.dateFrom" type="date" id="date_from" class="input">
                </div>
              </div>

              <div class="flex filter">
                <label for="date_to">Дата по</label>
                <div class="flex field">
                  <input @change="changeDateFrom" v-model="filters.dateTo" type="date" id="date_to" class="input">
                </div>
              </div>

              <div class="flex filter">
                <label for="action">Действие</label>
                <div class="flex field">
                  <select class="pointer" v-model="filters.action" id="action">
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
        </transition>

        <div class="container logs">
          <log v-for="log in 8" :key="log" />
        </div>

        <div class="flex container pagination">
          <div class="flex pointer btn pagination_ctrl">
            <img class="btn_img" v-if="$store.getters.IS_DARK_THEME" src="./static/images/white_arrow_left.svg" alt="">
            <img class="btn_img" v-else src="./static/images/arrow_left.svg" alt="">
          </div>
          <div class="flex pointer pagination_item pagination_item_active">1</div>
          <div class="flex pointer pagination_item">...</div>
          <div class="flex pointer pagination_item pagination_item_last">36</div>
          <div class="flex pointer btn pagination_ctrl">
            <img class="btn_img" v-if="$store.getters.IS_DARK_THEME" src="./static/images/white_arrow_right.svg" alt="">
            <img class="btn_img" v-else src="./static/images/arrow_right.svg" alt="">
          </div>
        </div>
      </section>
    </main>
  `,
  data: () => {
    return {
      isFilters: true,
      filters: {
        name: '',
        dateFrom: '',
        dateTo: '',
        action: 'placeholder1',
        place: 'placeholder2'
      }
    }
  },
  methods: {
    clearFilters () {
      for (key in this.filters) {
        this.filters[key] = ''
      }
    },
    changeDateFrom () {
      if (
        (this.filters.dateFrom === '') ||
        ((new Date(this.filters.dateFrom) > (new Date(this.filters.dateTo))))
      ) {
        this.filters.dateFrom = this.filters.dateTo
      }      
    },
    changeDateTo () {
      if (
        (this.filters.dateTo === '') ||
        ((new Date(this.filters.dateTo) < (new Date(this.filters.dateFrom))))
      ) {
        this.filters.dateTo = this.filters.dateFrom
      }      
    }
  },
  mounted () {
    // draggable false для всех картинок
    document.querySelectorAll('img').forEach((item) => {
      item.setAttribute('draggable', 'false')
    })
  }
}