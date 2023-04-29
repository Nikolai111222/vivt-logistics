const App = {
	template: `
		<div
			class="app_wrapper"
			:class="{
				is_menu_not_active: !$store.getters.IS_MENU,
				light: $store.getters.IS_LIGHT_THEME,
				dark: $store.getters.IS_DARK_THEME
			}"
			@click="$store.commit('SET_SELECT', false)"
		>
			<div
				:class="{
					dark_bg: $store.getters.IS_DARK_BG
				}"
				class="flex main_wrapper"
			>
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>

      <app-menu />
		</div>
	`,
	data: () => {
		return {}
	},
	computed: {},
	mounted () {
    this.$store.commit('fillLogs')
		// draggable false для всех картинок
		document.querySelectorAll('img').forEach((item) => {
			item.setAttribute('draggable', 'false')
		})
	}
}