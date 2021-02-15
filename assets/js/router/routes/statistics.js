const Stats = {
  template: `
    <main>

      <h3 class="flex container h3">
        Статистика
      </h3>

      <div class="grid container statistics">
        <div class="flex statistics_container counter_container">
          <span class="heading">Входы за сегодня</span>

          <div class="flex flex blocks">
            <div class="flex block">
              <img src="./static/images/green_building.png" alt="">
              <div class="flex info">
                <span class="heading">В здание</span>
                <span class="value slowNumber">{{ entersBuildingToday }}</span>
              </div>
            </div>

            <div class="flex block">
              <img src="./static/images/green_work.png" alt="">
              <div class="flex info">
                <span class="heading">За рабочее место</span>
                <span class="value slowNumber">{{ entersWorkplaceToday }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex statistics_container counter_container">
          <span class="heading">Выходы за сегодня</span>

          <div class="flex flex blocks">
            <div class="flex block">
              <img src="./static/images/red_building.png" alt="">
              <div class="flex info">
                <span class="heading">Из здания</span>
                <span class="value slowNumber">{{ leavesBuildingToday }}</span>
              </div>
            </div>

            <div class="flex block">
              <img src="./static/images/red_work.png" alt="">
              <div class="flex info">
                <span class="heading">С рабочего места</span>
                <span class="value slowNumber">{{ leavesWorkplaceToday }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex statistics_container chart_container">
          <div class="heading">Здание (за сегодня)</div>
          <div class="chart_block">
            <canvas id="buildingTodayCnv" class="chart"></canvas>
          </div>
        </div>

        <div class="flex statistics_container chart_container">
          <div class="heading">Рабочие места (за сегодня)</div>
          <div class="chart_block">
            <canvas id="workplaceTodayCnv" class="chart"></canvas>
          </div>
        </div>
      </div>
    </main>
  `,
  data: () => {
    return {
      entersBuildingToday: Math.floor(Math.random() * (200 - 10 + 1) + 10),
      leavesBuildingToday: Math.floor(Math.random() * (200 - 10 + 1) + 10),
      entersWorkplaceToday: Math.floor(Math.random() * (200 - 10 + 1) + 10),
      leavesWorkplaceToday: Math.floor(Math.random() * (200 - 10 + 1) + 10)
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