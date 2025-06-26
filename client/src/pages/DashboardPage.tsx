import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Users',
      data: [3, 7, 4, 5, 6],
      fill: false,
      borderColor: '#d9534f',
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: true },
    title: { display: true, text: 'Weekly Activity' },
  },
};

const DashboardPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>
      <div className="card p-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardPage;
