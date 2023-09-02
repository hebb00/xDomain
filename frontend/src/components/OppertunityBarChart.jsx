import React from "react";
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
import useFetchData from "../hooks/useFetchData";
import { useTheme, CircularProgress } from "@mui/material";
import { tokens } from "../theme";
import config from "../config";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
);

export default function OpportunityBarChart({ title }) {
  const theme = useTheme();
  const { data, loading, error } = useFetchData(
    `${config.BASE_URL}/opp_frequency?n_bins=1000`
  );
  const colors = tokens(theme.palette.mode);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const roundedValues = data.map((value) => Math.round(value.amount));
  const info = {
    labels: roundedValues,
    datasets: [
      {
        label: "Opportunity size $",
        data: data.map((d) => d.frequency),
        backgroundColor: "#64c1ff",
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
          text: "Opportunity size $",
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
          text: "frequency",
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
        position: "relative",
        height: "40vh",
        width: "100%",
        paddingTop: "50px",
      }}
    >
      <Bar options={options} data={info} />
    </div>
  );
}
