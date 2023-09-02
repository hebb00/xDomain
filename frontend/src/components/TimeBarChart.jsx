import React from "react";
import { tokens } from "../theme";
import config from "../config";
import useFetchData from "../hooks/useFetchData";
import { useTheme, CircularProgress } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LogarithmicScale
);
export default function TimeBarChart() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, loading, error } = useFetchData(
    `${config.BASE_URL}/latency_histogram`
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  const info = {
    labels: data.map((d) => d.time),
    datasets: [
      {
        label: "amount",
        data: data.map((d) => d.amount),
        backgroundColor: "#6cebc7",
      },
    ],
  };
  const options = {
    maintainAspectRatio:false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Average time (s)",
          color: colors.grey[100],
        },
        ticks: {
          color: colors.grey[100],      
        },
      },
      y: {
        type: 'logarithmic',
        title: {
          display: true,
          text: "Number of opportunities",
          color: colors.grey[100],
        },
        ticks: {
          color: colors.grey[100],
        },
        grid: {
          color: colors.grey[500],
        },
      },
    },
  };
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        width: "100%",
        height:"40vh",
        paddingTop: "50px",
      }}
    >
      <Bar options={options} data={info} />
    </div>
  );
}
