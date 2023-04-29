const Tools = {
  template: `
    <main>
      <div class="flex heading">
        <h3>Инструменты</h3>
        <icon
          @click.native="$store.commit('SET_MENU', !$store.getters.IS_MENU)"
          class="pointer menu_icon"
          image="menu"
          color="#1f2023"
          dark-color="#ffffff"
        />
      </div>

      <div class="tools">
        <div class="shadow flex">
          <h4>Последняя активность</h4>
          <div class="activity">
            <div v-for="(log, index) in recentActivity" :key="index" class="flex employee_activity">
              <img :src="'./static/images/staff/' + empId(log.employeeId).id + '.png'">
              <div>
                <span>{{ empId(log.employeeId).name }}</span>
                <p>
                  <span v-if="log.action && log.building">вошел (-а) на территорию</span>
                  <span v-if="log.action && !log.building">приступил (-а) к работе</span>

                  <span v-if="!log.action">покинул (-а)</span>
                  <span v-if="!log.action && log.building">территорию</span>
                  <span v-if="!log.action && !log.building">рабочее место</span>
                  {{ formatedDate(log.date) }}
                </p>
              </div>
            </div>
          </div>
          <router-link exact :to="{ name: 'logs' }" class="pointer link">
            Посмотреть весь журнал
          </router-link>
        </div>

          <div class="shadow flex">
            <h4>Работники</h4>

            <div class="flex tool_switch">
              <span
                @click="empInTerritory = true"
                class="pointer tool_switch_item"
                :class="{ tool_switch__active: empInTerritory }"
              >На территории</span>
              <span
                @click="empInTerritory = false"
                class="pointer tool_switch_item"
                :class="{ tool_switch__active: !empInTerritory }"
              >За рабочем местом</span>
            </div>

            <div v-if="empInTerritory" class="activity">
              <div v-for="emp in staffInTerritory" :key="emp.id" class="flex employee_activity">
                <img :src="'./static/images/staff/' + emp.id + '.png'">
                <div>
                  <span>{{ emp.name }}</span>
                </div>
              </div>
            </div>

            <div v-else class="activity">
              <div v-for="emp in staffInWorkplace" :key="emp.id" class="flex employee_activity">
                <img :src="'./static/images/staff/' + emp.id + '.png'">
                <div>
                  <span>{{ emp.name }}</span>
                </div>
              </div>
            </div>

            <router-link exact :to="{ name: 'staff' }" class="pointer link">
              Посмотреть весь персонал
            </router-link>
          </div>

          <div class="shadow flex">
            <h4>Активность за месяц</h4>
            <div class="flex tool_switch">
              <span
                @click="monthTerritory = true"
                class="pointer tool_switch_item"
                :class="{ tool_switch__active: monthTerritory }"
              >Территория</span>
              <span
                @click="monthTerritory = false"
                class="pointer tool_switch_item"
                :class="{ tool_switch__active: !monthTerritory }"
              >Рабочее место</span>
            </div>
            <div v-show="monthTerritory" class="chart">
              <canvas id="monthActivityTerCnv" />
            </div>
            <div v-show="!monthTerritory" class="chart">
              <canvas id="monthActivityWorkCnv" />
            </div>
          </div>

          <div class="shadow flex">
            <h4>Активность за день</h4>
            <div class="flex tool_switch">
              <span
                @click="dayTerritory = true"
                class="pointer tool_switch_item"
                :class="{ tool_switch__active: dayTerritory }"
              >Территория</span>
              <span
                @click="dayTerritory = false"
                class="pointer tool_switch_item"
                :class="{ tool_switch__active: !dayTerritory }"
              >Рабочее место</span>
            </div>
            <div v-show="dayTerritory" class="chart">
              <canvas id="dayActivityTerCnv" />
            </div>
            <div v-show="!dayTerritory" class="chart">
              <canvas id="dayActivityWorkCnv" />
            </div>
          </div>

        <div class="shadow flex">
          <h4>Активность за год</h4>
          <div class="flex tool_switch">
            <span
              @click="yearTerritory = true"
              class="pointer tool_switch_item"
              :class="{ tool_switch__active: yearTerritory }"
            >Территория</span>
            <span
              @click="yearTerritory = false"
              class="pointer tool_switch_item"
              :class="{ tool_switch__active: !yearTerritory }"
            >Рабочее место</span>
          </div>
          <div v-show="yearTerritory" class="chart">
            <canvas id="yearActivityTerCnv" />
          </div>
          <div v-show="!yearTerritory" class="chart">
            <canvas id="yearActivityWorkCnv" />
          </div>
        </div>
      </div>
    </main>
  `,
  data: () => {
    return {
      empInTerritory: true,
      monthTerritory: true,
      yearTerritory: true,
      dayTerritory: true,
      months: [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря'
      ],
    }
  },
  methods: {
    empId (id) {
      return this.$store.getters.STAFF.find(
        emp => emp.id === id
      )
    },
    formatedDate (date) {
      return date.getDate()
        + ' ' + this.months[date.getMonth()]
        + ' ' + date.getFullYear()
    }
  },
  computed: {
    recentActivity () {
      return this.$store.getters.LOGS.sort((a, b) => { return a.date - b.date }).slice(0, 10)
      // return this.$store.getters.LOGS.slice(0, 10)
    },
    staffInTerritory () {
      return this.$store.getters.STAFF.filter(
        emp => emp.inPlace.includes('building')
      )
    },
    staffInWorkplace () {
      return this.$store.getters.STAFF.filter(
        emp => emp.inPlace.includes('workplace')
      )
    }
  },
	mounted () {
		renderCharts()

		// draggable false для всех картинок
		document.querySelectorAll('img').forEach((item) => {
			item.setAttribute('draggable', 'false')
		})
	}
}