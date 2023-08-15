import React from "react";
import BarChart from "../Charts/BarChart";
import LineChats from "../Charts/LineChart";
import PieCharts from "../Charts/PieChart";
import ListAdmin from "./ListAdmin";

const Chart = () => {
  return (
    <div className=" ">
      <div className=" p-5">
        <LineChats />
      </div>
      <div className="grid grid-cols-2 p-3 gap-2">
        <BarChart />
        <PieCharts />
      </div>
      <div className="translate-y-20 relative p-5"></div>
    </div>
  );
};

export default Chart;
