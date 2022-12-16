import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const renderChart = (datas) => {
  const chart = {
    labels: ['Adaptability', 'Affection', 'Child Friendly', 'Dog Friendly', 'Energy Level', 'Intelligence'],
    datasets: [
      {
        label: 'Cat Behaviour',
        data: [+datas.adaptability, +datas.affection_level, +datas.child_friendly, +datas.dog_friendly, +datas.energy_level, datas.intelligence, 0],
        backgroundColor: 
          'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  return chart
}

export default renderChart
