import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin,
  annotationPlugin
);

function Trends() {
  const resData = useLocation();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Mood",
        data: [],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
        pointBackgroundColor: "rgba(75,192,192,1)",
        pointHoverRadius: 7,
      },
      {
        label: "Anxiety Levels",
        data: [],
        borderColor: "rgba(153,102,255,1)",
        fill: false,
        pointBackgroundColor: "rgba(153,102,255,1)",
        pointHoverRadius: 7,
      },
      {
        label: "Sleep Patterns",
        data: [],
        borderColor: "rgba(255,159,64,1)",
        fill: false,
        pointBackgroundColor: "rgba(255,159,64,1)",
        pointHoverRadius: 7,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "x",
        },
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
      legend: {
        onClick: (e, legendItem) => {
          const index = legendItem.datasetIndex;
          const ci = legendItem.chart;
          const meta = ci.getDatasetMeta(index);

          // Toggle the visibility
          meta.hidden =
            meta.hidden === null ? !ci.data.datasets[index].hidden : null;

          // Update the chart
          ci.update();
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: 3,
            yMax: 3,
            borderColor: "rgba(255,99,132,0.5)",
            borderWidth: 2,
            label: {
              content: "Average Mood",
              enabled: true,
              position: "center",
            },
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  useEffect(() => {
    // Fetch initial data from the server
    axios
      .get(`http://localhost:5000/api/logs/logs?user_id=${resData.state}`)
      .then((response) => {
        const data = response.data;
        const dates = data.map((log) => log.date);
        const moods = data.map((log) => log.mood);
        const anxietyLevels = data.map((log) => log.anxiety);
        const sleepPatterns = data.map((log) => log.sleep);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: "Mood",
              data: moods,
              borderColor: "rgba(75,192,192,1)",
              fill: false,
              pointBackgroundColor: "rgba(75,192,192,1)",
              pointHoverRadius: 7,
            },
            {
              label: "Anxiety Levels",
              data: anxietyLevels,
              borderColor: "rgba(153,102,255,1)",
              fill: false,
              pointBackgroundColor: "rgba(153,102,255,1)",
              pointHoverRadius: 7,
            },
            {
              label: "Sleep Patterns",
              data: sleepPatterns,
              borderColor: "rgba(255,159,64,1)",
              fill: false,
              pointBackgroundColor: "rgba(255,159,64,1)",
              pointHoverRadius: 7,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
      });
  }, []);

  const handleNewLog = (newLog) => {
    setChartData((prevData) => {
      const updatedLabels = [...prevData.labels, newLog.date];
      const updatedMoodData = [...prevData.datasets[0].data, newLog.mood];
      const updatedAnxietyData = [...prevData.datasets[1].data, newLog.anxiety];
      const updatedSleepData = [...prevData.datasets[2].data, newLog.sleep];

      return {
        labels: updatedLabels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: updatedMoodData,
          },
          {
            ...prevData.datasets[1],
            data: updatedAnxietyData,
          },
          {
            ...prevData.datasets[2],
            data: updatedSleepData,
          },
        ],
      };
    });
  };

  return (
    <div>
      <h2>Trends</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default Trends;
