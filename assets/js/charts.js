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
      xAxes: [{gridLines: {
        color: '#7c7c7c'
      }}],
      yAxes: [{gridLines: {
        color: '#7c7c7c'
      }}]
    }
  }

  const buildingTodayCnv = document.getElementById('buildingTodayCnv');
  if (buildingTodayCnv !== null) {
    new Chart(buildingTodayCnv, {
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        datasets: [
          {
            label: 'Посещения',
            data: rand(),
            backgroundColor: 'rgba(76, 175, 91, .1)',
            borderColor: '#4CAF5B',
            borderWidth: 2
          },
          {
            label: 'Выходы',
            data: rand(),
            backgroundColor: 'rgba(170, 49, 49, .1)',
            borderColor: '#AA3131',
            borderWidth: 2
          }
        ]
      },
      options
    });
  }


  const workplaceTodayCnv = document.getElementById('workplaceTodayCnv');
  if (workplaceTodayCnv !== null) {
    new Chart(workplaceTodayCnv, {
        type: 'line',
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          datasets: [
            {
              label: 'Посещения',
              data: rand(),
              backgroundColor: 'rgba(76, 175, 91, .1)',
              borderColor: '#4CAF5B',
              borderWidth: 2
            },
            {
              label: 'Выходы',
              data: rand(),
              backgroundColor: 'rgba(170, 49, 49, .1)',
              borderColor: '#AA3131',
              borderWidth: 2
            }
          ]
        },
        options
    });
  }
}

renderCharts()