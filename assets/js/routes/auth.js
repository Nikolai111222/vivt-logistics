const Auth = {
  template: `
    <div class="container flex" id="auth">
      <div class="form">
        <img src="./static/images/logo.png" alt="">
        <p>Чтобы начать остлеживать проход сотрудников учреждения в здание и к своим рабочим местам выполните авторизацию</p>
        <div class="grid fields">
          <div class="field flex">
            <label for="login">Логин</label>
            <input id="login" type="text" class="shadow input" placeholder="Введите логин">
          </div>
          <div class="field flex">
            <label for="password">Пароль</label>
            <input type="password" id="password" class="shadow input" placeholder="Введите пароль">
          </div>
        </div>
        <router-link :to="{ name: 'logs' }"><input type="submit" value="Войти" class="pointer submit"></router-link>
      </div>
      <img src="./static/images/big_image.png" alt="">
    </div>
  `
}