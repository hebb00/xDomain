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
  Legend
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
        title: {
          display: true,
          text: "frequency",
          color: colors.grey[100],
        },
        ticks: {
          autoSkipPadding: 0,
          color: colors.grey[100],
        },
        grid: {
          color: colors.grey[100],
        },
      },
    },
  };
  return (
    <div
      style={{
        position: "relative",
        height: "30vh",
        width: "40vw",
        paddingTop: "40px",
      }}
    >
      <Bar options={options} data={info} />
    </div>
  );
}
