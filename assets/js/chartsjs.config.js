function rand () {
  let array = []
  for (let i = 0; i < 24; i++) {
    array.push(Math.floor(Math.random() * (200 - 10 + 1)) + 10)
  }
  return array
}

function renderCharts () {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            // color: '#7c7c7c'
            // drawOnChartArea: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            // color: '#7c7c7c'
            // drawOnChartArea: false
          }
        }
      ]
    }
  }

  const monthActivityTerCnv = document.getElementById('monthActivityTerCnv');
  if (monthActivityTerCnv !== null) {
    new Chart(monthActivityTerCnv, {
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        datasets: [
          {
            label: 'Посещения',
            data: rand(),
            backgroundColor: 'rgba(224, 162, 0, .1)',
            borderColor: '#e0a200',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointHitRadius: 200
          },
          {
            label: 'Выходы',
            data: rand(),
            backgroundColor: 'rgba(112, 111, 211, .2)',
            borderColor: '#706fd3',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointHitRadius: 200
          }
        ]
      },
      options
    });
  }
  const monthActivityWorkCnv = document.getElementById('monthActivityWorkCnv');
  if (monthActivityWorkCnv !== null) {
    new Chart(monthActivityWorkCnv, {
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        datasets: [
          {
            label: 'Посещения',
            data: rand(),
            backgroundColor: 'rgba(224, 162, 0, .1)',
            borderColor: '#e0a200',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointHitRadius: 200
          },
          {
            label: 'Выходы',
            data: rand(),
            backgroundColor: 'rgba(112, 111, 211, .2)',
            borderColor: '#706fd3',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointHitRadius: 200
          }
        ]
      },
      options
    });
  }

  const yearActivityTerCnv = document.getElementById('yearActivityTerCnv');
  if (yearActivityTerCnv !== null) {
    new Chart(yearActivityTerCnv, {
      type: 'bar',
      data: {
        labels: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
        datasets: [
          {
            label: 'Посещения',
            data: rand(),
            backgroundColor: 'rgba(224, 162, 0, .1)',
            borderColor: '#e0a200',
            borderWidth: 2
          },
          {
            label: 'Выходы',
            data: rand(),
            backgroundColor: 'rgba(112, 111, 211, .2)',
            borderColor: '#706fd3',
            borderWidth: 2
          }
        ]
      },
      options
    });
  }
  const yearActivityWorkCnv = document.getElementById('yearActivityWorkCnv');
  if (yearActivityWorkCnv !== null) {
    new Chart(yearActivityWorkCnv, {
      type: 'bar',
      data: {
        labels: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
        datasets: [
          {
            label: 'Посещения',
            data: rand(),
            backgroundColor: 'rgba(224, 162, 0, .1)',
            borderColor: '#e0a200',
            borderWidth: 2
          },
          {
            label: 'Выходы',
            data: rand(),
            backgroundColor: 'rgba(112, 111, 211, .2)',
            borderColor: '#706fd3',
            borderWidth: 2
          }
        ]
      },
      options
    });
  }

  const dayActivityTerCnv = document.getElementById('dayActivityTerCnv');
  if (dayActivityTerCnv !== null) {
    new Chart(dayActivityTerCnv, {
      type: 'doughnut',
      data: {
        labels: ['Входы', 'Выходы'],
        datasets: [{
          data: [115, 20],
          backgroundColor: ['#FFBE16', '#706fd3'],
          borderAlign: 'inner',
          borderColor: 'transparent',
          hoverBorderColor: 'transparent'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  const dayActivityWorkCnv = document.getElementById('dayActivityWorkCnv');
  if (dayActivityWorkCnv !== null) {
    new Chart(dayActivityWorkCnv, {
      type: 'doughnut',
      data: {
        labels: ['Входы', 'Выходы'],
        datasets: [{
          data: [115, 50],
          backgroundColor: ['#FFBE16', '#706fd3'],
          borderAlign: 'inner',
          borderColor: 'transparent',
          hoverBorderColor: 'transparent'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}

// renderCharts()