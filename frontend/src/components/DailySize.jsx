import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { CircularProgress, useTheme } from "@mui/material";
import { tokens } from "../theme";
import config from "../config";
import useFetchData from "../hooks/useFetchData";
ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function DailySize() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, loading, error } = useFetchData(
    `${config.BASE_URL}/data_daily_opp?epoch_start=1668658046`
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const info = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Amount per day",
        data: data.map((d) => d.amount),
        barThickness: 15,
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
          color: colors.grey[100],
        },
        ticks: {
          color: colors.grey[100],
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Opportunity $",
          color: colors.grey[100],
        },
        ticks: {
          autoSkipPadding: 0,
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
        position: "relative",
        height: "35vh",
        width: "100%",
        paddingTop: "50px",
      }}
    >
      <Bar options={options} data={info} />
    </div>
  );
}
