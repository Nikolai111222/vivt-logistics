const Staff = {
  template: `
      <main>

        <div class="page_heading">
          <h2>Сотрудники</h2>
          <p>Список всех сотрудников организации</p>
        </div>

        <section>
          <h3 class="flex container h3">
            Сотрудники
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

          <div v-if="isFilters" class="filters_wrapper">
            <div class="container grid filters" id="staff_filters">
              <div class="flex filter">
                <label for="name">По имени сотрудника</label>
                <div class="flex field">
                  <img src="./static/images/search.png" alt="">
                  <input type="text" placeholder="Найти запись" id="name" class="input">
                </div>
              </div>

              <div class="flex filter">
                <label for="place">Должность</label>
                <div class="flex field">
                  <select id="place">
                    <option>Должность</option>
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
        </section>

        <div class="grid container staff">
          <employee v-for="(emp, index) in 4" :key="index"></employee>
        </div>
  
      </main>
  `,
  data: () => {
    return { isFilters: true }
  }
}