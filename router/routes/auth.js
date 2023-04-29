const Auth = {
  template: `
    <div
      class="container flex"
			:class="{
				is_menu_not_active: !$store.getters.IS_MENU,
				light: $store.getters.IS_LIGHT_THEME,
				dark: $store.getters.IS_DARK_THEME,
        dark_bg: $store.getters.IS_DARK_BG
			}"
    >
      <div class="flex" id="auth">
        <form class="form">
          <div class="flex logo_wrapper">
            <span class="text_logo">logistics</span>
            <theme-switch />
          </div>

          <p>Чтобы начать отслеживать проход сотрудников учреждения в здание и к своим рабочим местам выполните авторизацию</p>

          <div class="grid fields">
            <div class="flex field_wrapper">
              <label for="login">Логин</label>
              <div class="flex field input_box">
                <img :src="'./static/images/' + $store.getters.WHITE + 'user.svg'" alt="">
                <input @input="error = false" v-model="formData.login" id="login" type="text" class="shadow input" placeholder="Введите логин">
              </div>
            </div>

            <div class="flex field_wrapper">
              <label for="password">Пароль</label>
              <div class="flex field input_box">
                <img :src="'./static/images/' + $store.getters.WHITE + 'key.svg'" alt="">
                <input @input="error = false" v-model="formData.password" type="password" id="password" class="shadow input" placeholder="Введите пароль">
              </div>
            </div>
    
            <span v-if="error" class="error">Проверьте введенные данные</span>
          </div>
          <input type="submit" value="Войти" class="pointer button" @click="tryLogin">
        </form>

        <img v-if="$store.getters.IS_DARK_THEME" draggable="false" src="./static/images/big_image_purple.png" alt="">
        <img v-else draggable="false" src="./static/images/big_image.png" alt="">
      </div>
    </div>
  `,
  data: () => {
    return {
      formData: {
        login: '',
        password: ''
      },
      error: false
    }
  },
  methods: {
    tryLogin () {
      if (
        (this.formData.login === this.$store.getters.GET_ACCOUNT.login) &&
        (this.formData.password === this.$store.getters.GET_ACCOUNT.password)
      ) {
        localStorage.setItem('isLoggedIn', true)
        this.$router.push({ name: 'tools' })
      } else {
        this.error = true
      }
    }
  }
}