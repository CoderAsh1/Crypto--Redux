import { Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

const LineChart = ({ history }) => {
  console.log(history);
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < history?.data?.history?.length; i += 1) {
    coinPrice.push(history?.data?.history[i].price);
  }

  for (let i = 0; i < history?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(history?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#fffff",
        borderColor: "green",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
