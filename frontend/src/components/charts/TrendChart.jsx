import { Line } from 'recharts';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function TrendChart({ data, color }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7c94c2', fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7c94c2', fontSize: 12 }} />
        <Tooltip contentStyle={{ backgroundColor: '#0f1728', border: '1px solid #22304a', color: '#e2e8f0' }} itemStyle={{ color: '#fff' }} />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={3} dot={false} fill="url(#trendGradient)" />
      </LineChart>
    </ResponsiveContainer>
  );
}
