// components/LoanChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LoanChart({ loanAmount, totalInterest }) {
  const data = {
    labels: ["Loan Amount", "Total Interest"],
    datasets: [
      {
        data: [loanAmount, totalInterest],
        backgroundColor: ["#256D57", "#E8C4FA"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%", // makes it look like a donut
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
    },
  };

  return (
    <Card className="p-3" style={{ width: "320px", height: "180px" }}>
      <Doughnut data={data} options={options} />
    </Card>
  );
}
