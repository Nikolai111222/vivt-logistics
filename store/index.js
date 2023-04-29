let date = 1
const store = new Vuex.Store({
  state: {
    menuState: true,
    isDarkTheme: false,
    isLightTheme: null,
    isDarkBg: false,
    isSelect: false,
    account: { login: 'admin', password: 'admin' },
    logs: [
      // {
      //   employeeId: 1,
      //   date: new Date(`2021, 02, ${date++}`),
      //   action: true,
      //   building: true
      // },
      // {
      //   employeeId: 1,
      //   date: new Date(`2021, 03, ${date++}`),
      //   action: true,
      //   building: false
      // },
      // {
      //   employeeId: 1,
      //   date: new Date(`2021, 03, ${date++}`),
      //   action: false,
      //   building: false
      // },
      // {
      //   employeeId: 1,
      //   date: new Date(`2021, 03, ${date++}`),
      //   action: false,
      //   building: true
      // },
      // {
      //   employeeId: 2,
      //   date: new Date(`2021, 03, ${date++}`),
      //   action: false,
      //   building: true
      // }
    ],
    staff: [
      {
        id: 1,
        name: 'Поднебесная А.Т.',
        position: 'Бухгалтер',
        inPlace: ['building', 'workplace']
      },
      {
        id: 2,
        name: 'Миронов Н.Е.',
        position: 'Грузчик',
        inPlace: ['building']
      },
      {
        id: 3,
        name: 'Поляков С.Р.',
        position: 'Водитель',
        inPlace: ['building', 'workplace']
      },
      {
        id: 4,
        name: 'Воронец В.И.',
        position: 'Водитель',
        inPlace: []
      },
      {
        id: 5,
        name: 'Щербакова И.В.',
        position: 'Зам директора',
        inPlace: ['building', 'workplace']
      },
      {
        id: 6,
        name: 'Просветов А.Т.',
        position: 'Директор',
        inPlace: ['building', 'workplace']
      },
      {
        id: 7,
        name: 'Матвеенков Н.Д.',
        position: 'Разработчик',
        inPlace: []
      },
      {
        id: 8,
        name: 'Воронец В.С.',
        position: 'Грузчик',
        inPlace: []
      },
      {
        id: 9,
        name: 'Кротов Т.И.',
        position: 'Грузчик',
        inPlace: []
      },
      {
        id: 10,
        name: 'Радионов Ф.П.',
        position: 'Грузчик',
        inPlace: []
      },
      {
        id: 11,
        name: 'Быстров Г.Э.',
        position: 'Грузчик',
        inPlace: []
      }
    ]
  },

  actions: {
    LOG_OUT () { localStorage.removeItem('isLoggedIn') },
  },

  mutations: {
    action (state, payload) {
      let staffIds = []
      for (let i = 0; i < state.staff.length; i++) {
        staffIds.push(state.staff[i].id)
      }
      console.log(staffIds)
      state.logs.push({
        employeeId: Math.floor(Math.random() * Math.max.apply(null, staffIds)) + Math.min.apply(null, staffIds),
        date: new Date(),
        action: payload.action === 'enter',
        building: payload.place === 'building'
      })
    },
    fillLogs (state) {
      let staffIds = []
      for (let i = 0; i < state.staff.length; i++) {
        staffIds.push(state.staff[i].id)
      }
      state.logs = []
      // for (let i = 0; i < Math.floor(Math.random() * 80); i++) {
      for (let i = 15; i < 168; i++) {
        state.logs.push({
          employeeId: Math.floor(Math.random() * Math.max.apply(null, staffIds)) + Math.min.apply(null, staffIds),
          date: new Date(
            2021,
            // new Date().getMonth(),
            Math.floor(Math.random() * 11),
            Math.floor(Math.random() * 28),
            Math.floor(1 + Math.random() * (23 + 1 - 1)),
            Math.floor(Math.random() * 59)
          ),
          action: Math.floor(Math.random() * 2) === 1,
          building: Math.floor(Math.random() * 2) === 1
        })
      }
    },
    SET_MENU (state, payload) { state.menuState = payload },
    SET_SELECT (state, payload) { state.isSelect = payload },
    CHANGE_THEME (state) {
      state.isDarkTheme = !state.isDarkTheme
      if (state.isDarkTheme) state.isLightTheme = false
        else state.isLightTheme = true
      if (state.isDarkTheme) {
        setTimeout(() => {
          state.isDarkBg = !state.isDarkBg
        }, 200);
      } else {
        state.isDarkBg = !state.isDarkBg
      }
    }
  },
  getters: {
    LOGS: (state) => { return state.logs },
    STAFF: (state) => { return state.staff },
    IS_MENU: (state) => { return state.menuState },
    GET_ACCOUNT: (state) => { return state.account },
    IS_LOGGED_IN: (state) => { return state.isLoggedIn },
    IS_DARK_THEME: (state) => { return state.isDarkTheme },
    IS_LIGHT_THEME: (state) => { return state.isLightTheme },
    IS_DARK_BG: (state) => { return state.isDarkBg },
    IS_SELECT: (state) => { return state.isSelect },
    WHITE: (state) => { return state.isDarkTheme ? 'white_' : '' }
  }
})