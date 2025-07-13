// components/Charts/ExpensePieChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#ffbb28'];

export default function ExpensePieChart({ data }) {
  return (
    <PieChart width={1000} height={500}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={200}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
      
    </PieChart>
  );
}
