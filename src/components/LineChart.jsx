import { Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

const LineChart = ({ history, timeFrame }) => {
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
        label: "Price In USD" + "   " + "Timeframe:" + timeFrame,
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
      <Line data={data} options={options} className="chart" />
    </div>
  );
};

export default LineChart;
