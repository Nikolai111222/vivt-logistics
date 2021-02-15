const Auth = {
  template: `
    <div class="container flex" id="auth">
      <form class="form">
        <div class="flex logo_wrapper">
          <span class="text_logo">logistics</span>
          <theme-switch />
        </div>

        <p>Чтобы начать отслеживать проход сотрудников учреждения в здание и к своим рабочим местам выполните авторизацию</p>

        <div class="grid fields">
          <div class="field flex">
            <label for="login">Логин</label>
            <input @input="error = false" v-model="formData.login" id="login" type="text" class="shadow input" placeholder="Введите логин">
          </div>

          <div class="field flex">
            <label for="password">Пароль</label>
            <input @input="error = false" v-model="formData.password" type="password" id="password" class="shadow input" placeholder="Введите пароль">
          </div>
  
          <span v-if="error" class="error">Проверьте введенные данные</span>
        </div>
        <input type="submit" value="Войти" class="pointer button" @click="tryLogin">
      </form>

      <img v-if="$store.getters.IS_DARK_THEME" draggable="false" src="./static/images/big_image_purple.png" alt="">
      <img v-else draggable="false" src="./static/images/big_image.png" alt="">
    </div>
  `,
  data: () => {
    return {
      formData: {
        login: 'admin',
        password: 'admin'
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
        this.$router.push({ name: 'logs' })
      } else {
        this.error = true
      }
    }
  }
}