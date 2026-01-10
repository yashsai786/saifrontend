import React, { useState, FC } from "react";
import floodData from "./floodData.json"; // JSON data
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import CountUp from "react-countup";
import { motion, MotionProps } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

interface FloodEvent {
  "Start Date"?: string;
  State?: string;
  "Main Cause"?: string;
  "Human fatality"?: number;
  // Add other properties as needed based on your JSON structure
  [key: string]: any;
}

type FloodData = FloodEvent[];

const professionalPalette: string[] = ["#1E90FF", "#00CED1", "#4682B4", "#5F9EA0", "#87CEFA"];

interface CardProps {
  title: string;
  value: number;
  color: string;
}

const Card: FC<CardProps> = ({ title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    style={{
      background: color,
      color: "#fff",
      padding: "25px 20px",
      borderRadius: "15px",
      width: "220px",
      textAlign: "center",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    }}
  >
    <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>{title}</h3>
    <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>
      <CountUp end={value} duration={2} separator="," />
    </h2>
  </motion.div>
);

const FloodAnalytics: FC = () => {
  // ====== Basic Analysis ======
  const [data, setData] = useState<FloodData>(
  floodData.map((item: any) => ({
    ...item,
    "Human fatality": typeof item["Human fatality"] === "string" 
      ? parseInt(item["Human fatality"], 10) || 0 
      : item["Human fatality"]
  }))
);

  const totalFloods: number = data.length;
  const totalDeaths: number = data.reduce(
    (sum: number, d: FloodEvent) => sum + (typeof d["Human fatality"] === "number" ? d["Human fatality"]! : 0),
    0
  );
  const states: string[] = [...new Set(data.map((d: FloodEvent) => d.State).filter(Boolean))] as string[];

  // Causes
  const causes: Record<string, number> = {};
  data.forEach((d: FloodEvent) => {
    const cause = d["Main Cause"];
    if (cause) {
      causes[cause] = (causes[cause] || 0) + 1;
    }
  });

  // Year Trend
  const yearData: Record<string, number> = {};
  data.forEach((d: FloodEvent) => {
    const year = d["Start Date"]?.split("-")[0];
    if (year) {
      yearData[year] = (yearData[year] || 0) + 1;
    }
  });

  const barData: ChartData<'bar'> = {
    labels: Object.keys(causes),
    datasets: [
      {
        label: "Number of Floods",
        data: Object.values(causes),
        backgroundColor: professionalPalette,
        borderRadius: 5,
      },
    ],
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { display: false } },
    animation: { duration: 1200 },
  };

  const lineData: ChartData<'line'> = {
    labels: Object.keys(yearData),
    datasets: [
      {
        label: "Flood Events per Year",
        data: Object.values(yearData),
        borderColor: "#1E90FF",
        backgroundColor: "rgba(30,144,255,0.2)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#00CED1",
      },
    ],
  };

  const lineOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { display: false } },
    animation: { duration: 1200 },
  };

  const titleMotionProps: MotionProps = {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  const chartMotionPropsLeft: MotionProps = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
  };

  const chartMotionPropsRight: MotionProps = {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
  };

  const insightsMotionProps: MotionProps = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
  };

  const insertMotionProps: MotionProps = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "30px", background: "#f0f8ff", minHeight: "100vh" }}>
      {/* Title */}
      <motion.h1
        {...titleMotionProps}
        style={{ textAlign: "center", color: "#1E3A8A", marginBottom: "40px" }}
      >
        🌊 Flood Management & Detection Dashboard
      </motion.h1>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", marginBottom: "50px" }}>
        <Card title="Total Flood Events" value={totalFloods} color="#1E90FF" />
        <Card title="Total Human Fatalities" value={totalDeaths} color="#00CED1" />
        <Card title="Affected States" value={states.length} color="#4682B4" />
      </div>

      {/* Bar Chart */}
      <motion.div
        {...chartMotionPropsLeft}
        style={{ maxWidth: "900px", margin: "0 auto 60px auto" }}
      >
        <h2 style={{ textAlign: "center", color: "#1E3A8A", marginBottom: "20px" }}>Flood Causes Distribution</h2>
        <Bar data={barData} options={barOptions} />
      </motion.div>

      {/* Line Chart */}
      <motion.div
        {...chartMotionPropsRight}
        style={{ maxWidth: "900px", margin: "0 auto 60px auto" }}
      >
        <h2 style={{ textAlign: "center", color: "#1E3A8A", marginBottom: "20px" }}>Flood Trend Over Years</h2>
        <Line data={lineData} options={lineOptions} />
      </motion.div>

      {/* AI / Management Insights */}
      <motion.div
        {...insightsMotionProps}
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <h2 style={{ textAlign: "center", color: "#1E3A8A", marginBottom: "20px" }}>Key Insights</h2>
        <ul style={{ lineHeight: "1.8", color: "#1E3A8A", fontSize: "18px" }}>
          <li>🌊 Flood events are increasing over the years – early detection is crucial.</li>
          <li>🌧️ Heavy rainfall and dam-related causes are the main triggers.</li>
          <li>📍 Certain states are repeatedly vulnerable – targeted management needed.</li>
          <li>⚠️ Human fatalities show the importance of real-time alert and evacuation systems.</li>
        </ul>
      </motion.div>

      {/* Insert New Flood Data Placeholder */}
      <motion.div
        {...insertMotionProps}
        style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", background: "#E0F7FA", borderRadius: "10px" }}
      >
        <h3 style={{ color: "#00796B", marginBottom: "15px" }}>Insert New Flood Data (Future Feature)</h3>
        <p style={{ color: "#004D40" }}>This section will allow admins to add new flood events and update the dashboard dynamically.</p>
      </motion.div>
    </div>
  );
};

export default FloodAnalytics;
