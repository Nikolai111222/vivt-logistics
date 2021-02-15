const store = new Vuex.Store({
  state: {
    menuState: false,
    isDarkTheme: false,
    isLightTheme: undefined,
    isDarkBg: false,
    account: { login: 'admin', password: 'admin' }
    // logs: [
    //   {
    //     employeeId: 1,
    //     date: new
    //   }
    // ]
  },
  actions: {
    LOG_OUT () { localStorage.removeItem('isLoggedIn') },
  },
  mutations: {
    SET_MENU (state, payload) { state.menuState = payload },
    CHANGE_THEME (state) {
      state.isDarkTheme = !state.isDarkTheme
      if (state.isDarkTheme) {
        state.isLightTheme = false
      } else {
        state.isLightTheme = true
      }
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
    IS_MENU: (state) => { return state.menuState },
    GET_ACCOUNT: (state) => { return state.account },
    IS_LOGGED_IN: (state) => { return state.isLoggedIn },
    IS_DARK_THEME: (state) => { return state.isDarkTheme },
    IS_LIGHT_THEME: (state) => { return state.isLightTheme },
    IS_DARK_BG: (state) => { return state.isDarkBg }
  }
})