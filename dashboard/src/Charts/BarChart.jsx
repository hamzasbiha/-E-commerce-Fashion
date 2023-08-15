import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChartCompanent = () => {
  const dataProduct = useSelector((state) => state.product.products);

  const data = [
    {
      country: "AD",
      "hot dog": 99,
      "hot dogColor": "hsl(159, 70%, 50%)",
      burger: 31,
      burgerColor: "hsl(66, 70%, 50%)",
      sandwich: 87,
      sandwichColor: "hsl(26, 70%, 50%)",
      kebab: 109,
      kebabColor: "hsl(318, 70%, 50%)",
      fries: 43,
      friesColor: "hsl(346, 70%, 50%)",
      donut: 89,
      donutColor: "hsl(297, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 55,
      "hot dogColor": "hsl(127, 70%, 50%)",
      burger: 58,
      burgerColor: "hsl(219, 70%, 50%)",
      sandwich: 144,
      sandwichColor: "hsl(345, 70%, 50%)",
      kebab: 136,
      kebabColor: "hsl(110, 70%, 50%)",
      fries: 88,
      friesColor: "hsl(99, 70%, 50%)",
      donut: 7,
      donutColor: "hsl(278, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 162,
      "hot dogColor": "hsl(7, 70%, 50%)",
      burger: 17,
      burgerColor: "hsl(163, 70%, 50%)",
      sandwich: 64,
      sandwichColor: "hsl(80, 70%, 50%)",
      kebab: 151,
      kebabColor: "hsl(358, 70%, 50%)",
      fries: 143,
      friesColor: "hsl(238, 70%, 50%)",
      donut: 80,
      donutColor: "hsl(193, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 66,
      "hot dogColor": "hsl(116, 70%, 50%)",
      burger: 57,
      burgerColor: "hsl(101, 70%, 50%)",
      sandwich: 178,
      sandwichColor: "hsl(179, 70%, 50%)",
      kebab: 126,
      kebabColor: "hsl(339, 70%, 50%)",
      fries: 33,
      friesColor: "hsl(342, 70%, 50%)",
      donut: 177,
      donutColor: "hsl(324, 70%, 50%)",
    },
    {
      country: "AI",
      "hot dog": 108,
      "hot dogColor": "hsl(20, 70%, 50%)",
      burger: 4,
      burgerColor: "hsl(167, 70%, 50%)",
      sandwich: 49,
      sandwichColor: "hsl(95, 70%, 50%)",
      kebab: 43,
      kebabColor: "hsl(337, 70%, 50%)",
      fries: 180,
      friesColor: "hsl(114, 70%, 50%)",
      donut: 165,
      donutColor: "hsl(8, 70%, 50%)",
    },
    {
      country: "AL",
      "hot dog": 2,
      "hot dogColor": "hsl(281, 70%, 50%)",
      burger: 57,
      burgerColor: "hsl(256, 70%, 50%)",
      sandwich: 128,
      sandwichColor: "hsl(284, 70%, 50%)",
      kebab: 166,
      kebabColor: "hsl(27, 70%, 50%)",
      fries: 184,
      friesColor: "hsl(92, 70%, 50%)",
      donut: 141,
      donutColor: "hsl(18, 70%, 50%)",
    },
    {
      country: "AM",
      "hot dog": 128,
      "hot dogColor": "hsl(131, 70%, 50%)",
      burger: 98,
      burgerColor: "hsl(3, 70%, 50%)",
      sandwich: 65,
      sandwichColor: "hsl(353, 70%, 50%)",
      kebab: 149,
      kebabColor: "hsl(263, 70%, 50%)",
      fries: 6,
      friesColor: "hsl(141, 70%, 50%)",
      donut: 25,
      donutColor: "hsl(315, 70%, 50%)",
    },
  ];
  return (
    <div className="card bg-black">
      <BarChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="hot dog" stackId="a" fill="#8884d8" />
        <Bar dataKey="burger" stackId="a" fill="#82ca9d" />
        <Bar dataKey="sandwich" stackId="a" fill="#ffc658" />
        <Bar dataKey="kebab" stackId="a" fill="#f44336" />
        <Bar dataKey="fries" stackId="a" fill="#2196f3" />
        <Bar dataKey="donut" stackId="a" fill="#ff9800" />
      </BarChart>
    </div>
  );
};

export default BarChartCompanent;
