import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type ClickPerDay = {
  _id: string;
  count: number;
};

type ClickPerWeek = {
  _id: {
    year: number;
    week: number;
  };
  count: number;
};

type ClickPerMonth = {
  _id: {
    year: number;
    month: number;
  };
  count: number;
};

type BarChartProps = {
  clicksPerDay: ClickPerDay[];
  clicksPerWeek?: ClickPerWeek[];
  clicksPerMonth?: ClickPerMonth[];
};

const BarChart = ({
  clicksPerDay,
  clicksPerWeek = [],
  clicksPerMonth = [],
}: BarChartProps) => {
  const [view, setView] = useState<"day" | "week" | "month">("day");

  const chartData = useMemo(() => {
    if (view === "week") {
      return {
        labels: clicksPerWeek.map((item) => `Week ${item._id.week}`),

        datasets: [
          {
            label: "Weekly Clicks",

            data: clicksPerWeek.map((item) => item.count),

            backgroundColor: "rgba(59, 130, 246, 0.6)",

            borderRadius: 8,
          },
        ],
      };
    }

    if (view === "month") {
      return {
        labels: clicksPerMonth.map(
          (item) => `${item._id.month}/${item._id.year}`,
        ),

        datasets: [
          {
            label: "Monthly Clicks",

            data: clicksPerMonth.map((item) => item.count),

            backgroundColor: "rgba(59, 130, 246, 0.6)",

            borderRadius: 8,
          },
        ],
      };
    }

    return {
      labels: clicksPerDay.map((item) =>
        new Date(item._id).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      ),

      datasets: [
        {
          label: "Daily Clicks",

          data: clicksPerDay.map((item) => item.count),

          backgroundColor: "rgba(59, 130, 246, 0.6)",

          borderRadius: 8,
        },
      ],
    };
  }, [view, clicksPerDay, clicksPerWeek, clicksPerMonth]);

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top" as const,
      },

      title: {
        display: true,

        text:
          view === "day"
            ? "Daily Clicks"
            : view === "week"
              ? "Weekly Clicks"
              : "Monthly Clicks",
      },
    },
  };

  return (
    <div className="h-full w-full">
      <div className="mb-4 flex gap-2">
        <button
          className={`rounded-lg px-4 py-2 text-sm transition ${
            view === "day"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
          onClick={() => setView("day")}
        >
          Day
        </button>

        <button
          className={`rounded-lg px-4 py-2 text-sm transition ${
            view === "week"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
          onClick={() => setView("week")}
        >
          Week
        </button>

        <button
          className={`rounded-lg px-4 py-2 text-sm transition ${
            view === "month"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
          onClick={() => setView("month")}
        >
          Month
        </button>
      </div>

      <div className="h-[300px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
