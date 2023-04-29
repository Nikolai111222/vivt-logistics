const Logs = {
  template: `
    <main>
      <div class="flex heading">
        <h3 class="flex">
          Журнал
          <div class="flex btns">
            <div
              class="flex btn pointer"
              :class="{ btn_active: isFilters}"
              @click="isFilters = !isFilters"
            >
              <img class="btn_img" :src="'./static/images/' + $store.getters.WHITE + 'filters.svg'" alt="">
            </div>
            <div @click="clearFilters" class="flex pointer btn">
              <img class="btn_img" :src="'./static/images/' + $store.getters.WHITE + 'clear_filters.svg'" alt="">
            </div>
          </div>
        </h3>
        <icon
          @click.native="$store.commit('SET_MENU', !$store.getters.IS_MENU)"
          class="pointer menu_icon"
          image="menu"
          color="#1f2023"
          dark-color="white"
        />
      </div>

      <transition name="fade">
        <div v-show="isFilters" id="logs_filters" class="filters">
          <div class="flex filter">
            <label for="name">Выбрать сотрудника (-ов)</label>

            <div @click.stop="$store.commit('SET_SELECT', true)" class="flex field input_box">
              <img v-if="filters.staff.length === 0" :src="'./static/images/' + $store.getters.WHITE + 'search.svg'" alt="">

              <div v-else @click="filters.staff = []" class="flex count" title="Количество выбранных сотрудников. Нажать чтобы очистить фильтр">
                <span>{{ filters.staff.length }}</span>
              </div>

              <input autocomplete="off" v-model="filters.name" type="text" placeholder="Матвеенков Н.Д." id="name" class="input">

              <transition name="select_slide">
                <div v-if="$store.getters.IS_SELECT" class="select">
                  <label class="flex">
                    <span>Выбрано - {{ filters.staff.length }}</span>
                    <img :src="'./static/images/' + $store.getters.WHITE + 'reset.svg'" @click="animateReset('selected')" :class="{ animate_reset: isAnimating1 }" title="Очистить фильтр" class="pointer">
                  </label>

                  <p v-if="filters.staff.length === 0">Здесь будут выбранные сотрудники</p>

                  <div
                    v-for="selectedEmp in filters.staff"
                    :key="'selectedEmp' + selectedEmp.id"
                    @click="remove(selectedEmp)"
                    class="flex pointer select_item"
                  >
                    <img :src="'./static/images/staff/' + selectedEmp.id + '.png'">
                    <span>{{ selectedEmp.name }}</span>
                  </div>

                  <label class="flex">
                    <span>Найдено - {{ foundStaff.length }}</span>
                    <img :src="'./static/images/' + $store.getters.WHITE + 'reset.svg'" @click="animateReset('found')" :class="{ animate_reset: isAnimating2 }" title="Очистить фильтр" class="pointer">
                  </label>

                  <p v-if="foundStaff.length === 0">По запросу ничего не найдено, либо найденые сотрудники уже выбраны</p>

                  <div
                    v-for="foundEmp in foundStaff"
                    :key="'foundEmp' + foundEmp.id"
                    @click="select(foundEmp)"
                    class="flex pointer select_item"
                  >
                    <img :src="'./static/images/staff/' + foundEmp.id + '.png'">
                    <span>{{ foundEmp.name }}</span>
                  </div>
                </div>
              </transition>
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
                  <option value="placeholder" disabled>Выбрать действие</option>
                  <option value="true">Вошел (-ла)</option>
                  <option value="false">Покинул (-а)</option>
                  <option value="placeholder">Все действия</option>
                </select>
              </div>
            </div>

            <div class="flex filter">
              <label for="place">Место</label>
              <div class="flex field">
                <select class="pointer" v-model="filters.place" id="place">
                  <option value="placeholder" disabled>Выбрать место</option>
                  <option value="true">Территория</option>
                  <option value="false">Рабочее место</option>
                  <option value="placeholder">Территория и рабочее место</option>
                </select>
              </div>
            </div>

            <div class="flex filter">
              <label for="sort">Сортировка</label>
              <div class="flex field">
                <select v-model="filters.sortBy" class="pointer" id="sort">
                  <option value="date">По дате</option>
                  <option value="action">По действию</option>
                  <option value="place">По месту</option>
                </select>
                <div @click="asc = !asc" class="pointer flex sort_icon">
                  <img class="pointer" :class="{ up: !asc }" :src="'./static/images/' + $store.getters.WHITE + 'arrow_down.svg'" alt="">
                </div>
              </div>
            </div>
          </div>
        </transition>

        <div class="logs">
          <log
            v-for="(log, index) in pageByPage"
            :key="index"
            :log-data="log"
          />
        </div>

        <div class="flex pagination">
          <div @click="dec()" class="flex pointer btn pagination_ctrl">
            <img class="btn_img" :src="'./static/images/' + $store.getters.WHITE + 'arrow_left.svg'" alt="">
          </div>

          <div @click="page = 1" :class="{ pagination_item_active: page === 1 }" class="flex pointer pagination_item">1</div>

          <div
            :class="{
              pagination_item_active: page > 1 && page < Math.trunc(foundLogs.length / 10) + 1
            }"
            class="flex pagination_item"
          >
            <span v-if="page > 1 && page < Math.trunc(foundLogs.length / 10) + 1">{{ page }}</span>
            <span v-else>...</span>
          </div>

          <div
            @click="page = Math.trunc(foundLogs.length / 10) + 1"
            :class="{
              pagination_item_active: page === Math.trunc(foundLogs.length / 10) + 1
            }"
            class="flex pointer pagination_item"
          >
            {{ Math.trunc(foundLogs.length / 10) + 1 }}
          </div>

          <div @click="inc()" class="flex pointer btn pagination_ctrl">
            <img class="btn_img" :src="'./static/images/' + $store.getters.WHITE + 'arrow_right.svg'" alt="">
          </div>
        </div>
      </div>
    </main>
  `,

  data: () => {
    return {
      page: 1,
      isFilters: true,
      isActive: false,
      isAnimating1: false,
      isAnimating2: false,
      flag: false,
      asc: true,
      filters: {
        sortBy: 'date',
        staff: [],
        name: '',
        dateFrom: '',
        dateTo: '',
        action: 'placeholder',
        place: 'placeholder'
      }
    }
  },

  computed: {
    selectedStaffIds () {
      let test = []
      for (let i = 0; i < this.filters.staff.length; i++) {
        test.push(this.filters.staff[i].id)
      }
      return test
    },
    staffByName () {
      return this.$store.getters.STAFF.filter(
        emp => emp.name.toLowerCase().includes(this.filters.name.toLowerCase())
      )
    },
    foundStaff () {
      return this.staffByName.filter(
        emp => !this.selectedStaffIds.includes(emp.id)
      )
    },

    logsByStaff () {
      return this.filters.staff.length === 0
        ? this.$store.getters.LOGS
        : this.$store.getters.LOGS.filter(log => this.selectedStaffIds.includes(log.employeeId))
    },
    logsByDate () {
      if ((this.filters.dateFrom !== '') && (this.filters.dateTo === '')) {
        return this.logsByStaff.filter(
          log => log.date > new Date(`
            ${this.filters.dateFrom.slice(0, 4)},
            ${this.filters.dateFrom.slice(5, -3)},
            ${this.filters.dateFrom.slice(8)}
          `)
        )
      } else if ((this.filters.dateFrom === '') && (this.filters.dateTo !== '')) {
        return this.logsByStaff.filter(
          log => log.date < new Date(`
            ${this.filters.dateTo.slice(0, 4)},
            ${this.filters.dateTo.slice(5, -3)},
            ${this.filters.dateTo.slice(8)}
          `)
        )
      } else if ((this.filters.dateFrom !== '') && (this.filters.dateTo !== '')) {
        return this.logsByStaff.filter(
          log => log.date > new Date(`
            ${this.filters.dateFrom.slice(0, 4)},
            ${this.filters.dateFrom.slice(5, -3)},
            ${this.filters.dateFrom.slice(8)}
          `) && log.date < new Date(`
          ${this.filters.dateTo.slice(0, 4)},
          ${this.filters.dateTo.slice(5, -3)},
          ${this.filters.dateTo.slice(8)}
        `)
        )
      }
      return this.logsByStaff
    },
    logsByAction () {
      return (this.filters.action === 'placeholder')
      ? this.logsByDate
      : this.logsByDate.filter(
        log => log.action.toString() === this.filters.action
      )
    },
    logsByPlace () {
      return (this.filters.place === 'placeholder')
      ? this.logsByAction
      : this.logsByAction.filter(
        log => log.building.toString() === this.filters.place
      )
    },
    sortedLogs () {
      switch (this.filters.sortBy) {
        case 'date':
          return this.asc
            ? this.logsByPlace.sort((a, b) => { return a.date - b.date })
            : this.logsByPlace.sort((a, b) => { return b.date - a.date })

        case 'action':
          return this.asc
            ? this.logsByPlace.sort((a, b) => { return (a.action === b.action)? 0 : a.action? 1 : -1 })
            : this.logsByPlace.sort((a, b) => { return (a.action === b.action)? 0 : a.action? -1 : 1 })

        case 'place':
          return this.asc
            ? this.logsByPlace.sort((a, b) => { return (a.building === b.building)? 0 : a.building? 1 : -1 })
            : this.logsByPlace.sort((a, b) => { return (a.building === b.building)? 0 : a.building? -1 : 1 })
      
        default:
          return this.logsByPlace
      }
    },
    foundLogs () { return this.sortedLogs },
    pageByPage () {
      return this.foundLogs.slice((this.page - 1) * 10, this.page * 10)
    }
  },

  methods: {
    inc () {
      if (this.page <= Math.trunc(this.$store.getters.LOGS.length / 10)) this.page++
    },
    dec () {
      if (this.page > 1) this.page--
    },
    remove (emp) {
      this.filters.staff.splice(
        this.filters.staff.findIndex(
          item => item === emp
        ), 1
      )
    },
    select (emp) {
      if (this.filters.staff.findIndex(item => item === emp) === -1) {
        this.filters.staff.push(emp)
      }
    },
    animateReset (target) {
      if (this.flag) return false
      this.flag = true
      if (target === 'selected') {
        this.filters.staff = []
        this.isAnimating1 = true
      } else if (target === 'found') {
        this.filters.name = ''
        this.isAnimating2 = true
      }
      setTimeout(() => {
        if (target === 'selected') this.isAnimating1 = false
          else if (target === 'found') this.isAnimating2 = false
        this.flag = false
      }, 750)
    },
    clearFilters () {
      for (key in this.filters) { this.filters[key] = '' }
      this.filters.action = 'placeholder'
      this.filters.place = 'placeholder'
      this.filters.sortBy = 'date'
      this.asc = true
    },
    changeDateFrom () {
      if (new Date(this.filters.dateFrom) > new Date(this.filters.dateTo)) {
        this.filters.dateFrom = this.filters.dateTo
      }      
    },
    changeDateTo () {
      if (new Date(this.filters.dateTo) < new Date(this.filters.dateFrom)) {
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