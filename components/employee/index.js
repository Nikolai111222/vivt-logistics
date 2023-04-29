const Employee = {
    template: `
    <div class="flex shadow employee">

      <img :src="'./static/images/staff/' + employeeData.id + '.png'" alt="">

      <div class="flex info">
        <div class="name">{{ employeeData.name }}</div>
        <div class="position">{{ employeeData.position }}</div>
        <div class="marks">
          <div
            :class="{
              mark_active: employeeData.inPlace[0] === 'building'
            }"
            class="flex mark"
          >
            <icon image="building" color="#e0a200" dark-color="#474787" />
            <span>На территории</span> 
          </div>

          <div
            :class="{
              mark_active: employeeData.inPlace[1] === 'workplace'
            }"
            class="flex mark"
          >
            <icon image="workplace" color="#e0a200" dark-color="#474787" />
            <span>За рабочим местом</span>
          </div>
        </div>
      </div>

    </div>
  `,
  props: {
    employeeData: {
      type: Object,
      default () { return {} }
    }
  }
}