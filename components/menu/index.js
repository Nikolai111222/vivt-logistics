const appMenu = {
  template: `
    <aside>
      <theme-switch />

      <div class="flex">
        <router-link exact :to="{ name: 'tools' }" class="pointer">
          <icon image="tools" color="#1f2023" dark-color="white" />
        </router-link>

        <router-link exact :to="{ name: 'logs' }" class="pointer">
          <icon class="pointer" image="logs" color="#1f2023" dark-color="white" />
        </router-link>

        <router-link exact :to="{ name: 'staff' }" class="pointer">
          <icon class="pointer" image="staff" color="#1f2023" dark-color="white" />
        </router-link>
      </div>

      <icon @click.native="logout()" class="pointer" image="logout" color="#1f2023" dark-color="#fff" />
    </aside>
  `,
  methods: {
    logout () {
      this.$store.dispatch('LOG_OUT')
      this.$router.push({ name: 'auth' })
    }
  }
}