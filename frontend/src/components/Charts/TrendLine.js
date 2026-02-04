import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { day: "Mon", value: 20 },
  { day: "Tue", value: 35 },
  { day: "Wed", value: 28 },
  { day: "Thu", value: 40 },
  { day: "Fri", value: 32 }
];

export default function TrendLine() {
  return (
    <LineChart width={400} height={300} data={data}>
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#10b981" />
    </LineChart>
  );
}
