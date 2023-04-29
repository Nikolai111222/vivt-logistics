const Log = {
  template: `
    <div class="grid shadow log">
      <div class="flex log_item employee" title="Показать сотрудника">
        <img :src="'./static/images/staff/' + getEmployee.id + '.png'" alt="">
        {{ getEmployee.name }}
      </div>

      <div class="flex log_item">
        <img src="./static/images/calendar.png" alt="">
        {{ formatDate }}
      </div>

      <div v-if="logData.action" class="flex log_item">
        <img src="./static/images/enter.png" alt="">
        вошел (-ла)
      </div>
      <div v-else class="flex log_item">
        <img src="./static/images/leave.png" alt="">
        покинул (-а)
      </div>

      <div v-if="logData.building" class="flex log_item">
        <!--<img src="./static/images/building.png" alt="">-->
        <icon image="building" color="#e0a200" dark-color="#474787" />
        территория
      </div>
      <div v-else class="flex log_item">
        <!--<img src="./static/images/work.png" alt="">-->
        <icon image="workplace" color="#e0a200" dark-color="#474787" />
        рабочее место
      </div>
    </div>
  `,
  props: {
    logData: {
      type: Object,
      default () { return {} }
    }
  },
  computed: {
    getEmployee () {
      return this.$store.getters.STAFF.find(emp => emp.id === this.logData.employeeId)
    },
    formatDate () {
      let minutes = this.logData.date.getMinutes().toString()
      let hours = this.logData.date.getHours().toString()
      if (minutes.length === 1) minutes = '0' + minutes
      if (hours.length === 1) hours = '0' + hours
      return this.logData.date.toLocaleDateString() + ' ' + hours + ':' + minutes
    }
  }
}