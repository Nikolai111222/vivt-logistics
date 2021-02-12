const Logs = {
  template: `
    <main>

      <div class="page_heading">
        <h2>Журнал</h2>
        <p>Список событий (посещение и выход) сотрудников организации</p>
      </div>

      <section id="logs">
        <h3 class="flex container h3">
          Записи
          <div class="flex btns">
            <div
              class="flex btn pointer"
              :class="{ btn_active: isFilters}"
              @click="isFilters = !isFilters"
            >
              <img src="./static/images/filters.png" alt="">
            </div>
            <div class="flex pointer btn">
              <img src="./static/images/clear_filters.png" alt="">
            </div>
          </div>
        </h3>

        <transition name="fade">
          <div v-show="isFilters" class="filters_wrapper">
            <div id="logs_filters" class="container grid filters">
              <div class="flex filter">
                <label for="name">По имени сотрудника</label>
                <div class="flex field">
                  <img src="./static/images/search.png" alt="">
                  <input type="text" placeholder="Найти запись" id="name" class="input">
                </div>
              </div>

              <div class="flex filter">
                <label for="date_from">Дата от</label>
                <div class="flex field">
                  <input type="date" id="date_from" class="input">
                </div>
              </div>

              <div class="flex filter">
                <label for="date_to">Дата по</label>
                <div class="flex field">
                  <input type="date" id="date_to" class="input">
                </div>
              </div>

              <div class="flex filter">
                <label for="action">Действие</label>
                <div class="flex field">
                  <select id="action">
                    <option>ksjdfkasd</option>
                  </select>
                </div>
              </div>

              <div class="flex filter">
                <label for="place">Место</label>
                <div class="flex field">
                  <select id="place">
                    <option>Место</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <div class="container logs">
          <div class="grid log" v-for="log in 15" :key="log">
            <div class="flex pointer employee log_item" title="Показать сотрудника">
              <img src="./static/images/staff/3.png" alt="">
              Александров А.А.
            </div>
            <div class="flex log_item">
              <img src="./static/images/calendar.png" alt="">
              14.12.2021 9:00
            </div>
            <div class="flex log_item">
              <img src="./static/images/leave.png" alt="">
              покинул
            </div>
            <div class="flex log_item">
              <img src="./static/images/work.png" alt="">
              рабочее место
            </div>
          </div>
        </div>

        <div class="flex container pagination">
          <div class="flex pointer btn pagination_ctrl">
            <img src="./static/images/arrow_left.png" alt="">
          </div>
          <div class="flex pointer pagination_item pagination_item_active">1</div>
          <div class="flex pointer pagination_item">...</div>
          <div class="flex pointer pagination_item pagination_item_last">36</div>
          <div class="flex pointer btn pagination_ctrl">
            <img src="./static/images/arrow_right.png" alt="">
          </div>
        </div>
      </section>

      <section id="statistics">
        <h3 class="flex container h3">
          Статистика
        </h3>

        <div class="grid container statistics">
          <div class="flex statistics_container counter_container">
            <span class="heading">Входы за сегодня</span>

            <div class="flex flex blocks">
              <div class="flex block">
                <img src="./static/images/green_building.png" alt="">
                <div class="flex info">
                  <span class="heading">В здание</span>
                  <span class="value">{{ entersBuildingToday }}</span>
                </div>
              </div>

              <div class="flex block">
                <img src="./static/images/green_work.png" alt="">
                <div class="flex info">
                  <span class="heading">За рабочее место</span>
                  <span class="value">{{ entersWorkplaceToday }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex statistics_container counter_container">
            <span class="heading">Выходы за сегодня</span>

            <div class="flex flex blocks">
              <div class="flex block">
                <img src="./static/images/red_building.png" alt="">
                <div class="flex info">
                  <span class="heading">Из здания</span>
                  <span class="value">{{ leavesBuildingToday }}</span>
                </div>
              </div>

              <div class="flex block">
                <img src="./static/images/red_work.png" alt="">
                <div class="flex info">
                  <span class="heading">С рабочего места</span>
                  <span class="value">{{ leavesWorkplaceToday }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex statistics_container chart_container">
            <div class="heading">Здание (за сегодня)</div>
            <div class="chart_block">
              <canvas id="buildingTodayCnv" class="chart"></canvas>
            </div>
          </div>

          <div class="flex statistics_container chart_container">
            <div class="heading">Рабочие места (за сегодня)</div>
            <div class="chart_block">
              <canvas id="workplaceTodayCnv" class="chart"></canvas>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  data: () => {
    return {
      isFilters: true,
      filters: {
        name: null,
        dateFrom: null,
        dateTo: null,
        action: null,
        place: null
      },
      entersBuildingToday: Math.floor(Math.random() * (200 - 10 + 1) + 10),
      leavesBuildingToday: Math.floor(Math.random() * (200 - 10 + 1) + 10),
      entersWorkplaceToday: Math.floor(Math.random() * (200 - 10 + 1) + 10),
      leavesWorkplaceToday: Math.floor(Math.random() * (200 - 10 + 1) + 10)
    }
  },
  mounted () {
    renderCharts()
  }
}