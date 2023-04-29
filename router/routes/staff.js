const Staff = {
  template: `
    <main>
      <div class="flex heading">
        <h3 class="flex">
          Персонал
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
        <div v-show="isFilters" class="filters" id="staff_filters">
          <div class="flex filter" title="Поле для ввода имени сотрудника">
            <label for="name">Имя сотрудника</label>
            <div class="flex field input_box">
              <img :src="'./static/images/' + $store.getters.WHITE + 'search.svg'" alt="">
              <input autocomplete="off" v-model="filters.name" type="text" placeholder="Матвеенков Н.Д." id="name" class="input">
            </div>
          </div>

          <div class="flex filter">
            <label for="position">Должность (-и)</label>

            <div @click.stop="$store.commit('SET_SELECT', true)" class="flex field input_box">
              <img v-if="filters.positions.length === 0" :src="'./static/images/' + $store.getters.WHITE + 'search.svg'" alt="">

              <div v-else @click="filters.positions = []" class="flex count" title="Количество выбранных должностей. Нажать чтобы очистить фильтр">
                <span>{{ filters.positions.length }}</span>
              </div>

              <input autocomplete="off" v-model="filters.position" type="text" placeholder="Бухгалтер" id="position" class="input">

              <transition name="select_slide">
                <div v-if="$store.getters.IS_SELECT" class="select">
                  <label class="flex">
                    <span>Выбрано - {{ filters.positions.length }}</span>
                    <img :src="'./static/images/' + $store.getters.WHITE + 'reset.svg'" @click="animateReset('selected')" :class="{ animate_reset: isAnimating1 }" title="Очистить фильтр" class="pointer">
                  </label>

                  <p v-if="filters.positions.length === 0">Здесь будут выбранные должности</p>

                  <div
                    v-for="selectedPos in filters.positions"
                    :key="'selectedPos' + selectedPos"
                    @click="remove(selectedPos)"
                    class="flex pointer select_item"
                  >
                    <span>{{ selectedPos }}</span>
                  </div>

                  <label class="flex">
                    <span>Найдено - {{ foundPos.length }}</span>
                    <img :src="'./static/images/' + $store.getters.WHITE + 'reset.svg'" @click="animateReset('found')" :class="{ animate_reset: isAnimating2 }" title="Очистить фильтр" class="pointer">
                  </label>

                  <p v-if="foundPos.length === 0">По запросу ничего не найдено, либо найденые должности уже выбраны</p>

                  <div
                    v-for="found in foundPos"
                    :key="'found' + found"
                    @click="select(found)"
                    class="flex pointer select_item"
                  >
                    <span>{{ found }}</span>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <div @click="check" class="flex filter">
            <label>Место</label>
            <div class="flex">
              <label for="inBuilding" class="flex checkbox pointer" title="Выбрать сотрудников на территории">
                <input disabled id="inBuilding" type="checkbox">
                <icon image="building" color="#e0a200" dark-color="#474787" />
              </label>

              <label for="outBuilding" class="flex checkbox pointer" title="Выбрать сотрудников за территорией и рабочего места">
                <input disabled id="outBuilding" type="checkbox">
                <icon image="building" color="#a7a7a7" dark-color="#a7a7a7" />
              </label>

              <label for="inWorkPlace" class="flex checkbox pointer" title="Выбрать сотрудников на территории и за рабочим местом">
                <input disabled id="inWorkPlace" type="checkbox">
                <icon image="workplace" color="#e0a200" dark-color="#474787" />
              </label>

              <label for="outWorkPlace" class="flex checkbox pointer" title="Выбрать сотрудников на территории и не за рабочим местом">
                <input disabled id="outWorkPlace" type="checkbox">
                <icon image="workplace" color="#a7a7a7" dark-color="#a7a7a7" />
              </label>
            </div>
          </div>
        </div>
      </transition>

      <div class="staff">
        <employee
          v-for="employee in foundStaff"
          :key="employee.id"
          :employee-data="employee"
        />
      </div>
    </main>
  `,
  data: () => {
    return {
      value: [],
      filters: {
        name: '',
        positions: [],
        position: ''
      },
      isFilters: true,
      isActive: false,
      isAnimating1: false,
      isAnimating2: false,
      flag: false,
    }
  },
  computed: {
    getStaff () { return this.$store.getters.STAFF },
    staffByName () {
      return this.getStaff.filter(
        emp => emp.name.toLowerCase().includes(this.filters.name.toLowerCase())
      )
    },
    staffByPosition () {
      return this.filters.positions.length === 0
        ? this.staffByName
        : this.staffByName.filter(emp => this.filters.positions.includes(emp.position))
      // return this.staffByName
    },
    foundStaff () { return this.staffByPosition },

    positions () {
      const positions = []
      for (let i = 0; i < this.getStaff.length; i++) {
        if (positions.findIndex(pos => pos === this.getStaff[i].position) === -1) {
          positions.push(this.getStaff[i].position)
        }
      }
      return positions
    },
    posByName () {
      return this.positions.filter(
        pos => pos.toLowerCase().includes(this.filters.position.toLowerCase())
      )
    },
    foundPos () {
      return this.posByName.filter(
        pos => !this.filters.positions.includes(pos)
      )
    },
  },
  methods: {
    inc () {
      if (this.page <= Math.trunc(this.$store.getters.LOGS.length / 10)) this.page++
    },
    dec () { if (this.page > 1) this.page-- },
    remove (emp) {
      this.filters.positions.splice(
        this.filters.positions.findIndex(
          item => item === emp
        ), 1
      )
    },
    select (emp) {
      if (this.filters.positions.findIndex(item => item === emp) === -1) {
        this.filters.positions.push(emp)
      }
    },
    animateReset (target) {
      if (this.flag) return false
      this.flag = true
      if (target === 'selected') {
        this.filters.positions = []
        this.isAnimating1 = true
      } else if (target === 'found') {
        this.filters.position = ''
        this.isAnimating2 = true
      }
      setTimeout(() => {
        if (target === 'selected') this.isAnimating1 = false
          else if (target === 'found') this.isAnimating2 = false
        this.flag = false
      }, 750)
    },
    check () {
      alert('Извините, эта функция на данный момент не доступна')
    },
    clearFilters () {
      this.filters.position = ''
      this.filters.positions = []
      this.filters.name = ''
    }
  },
  mounted () {
    // draggable false для всех картинок
    document.querySelectorAll('img').forEach((item) => {
      item.setAttribute('draggable', 'false')
    })
  }
}