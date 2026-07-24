import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#3a82ff', '#f97316', '#22c55e', '#a855f7'];

export default function DoughnutChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={96} paddingAngle={3}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
