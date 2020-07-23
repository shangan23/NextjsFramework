import React from 'react';
import * as Recharts from 'recharts';


const { PieChart, Pie, Cell, ResponsiveContainer, Tooltip,Legend} = Recharts;

const data = [{ name: 'Grinder', value: 400 }, { name: 'Pumps', value: 300 },
{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class SimplePieChart extends React.Component {
  render() {
    return (
      <ResponsiveContainer width="100%" height={250}>
        <PieChart
          onMouseEnter={this.onPieEnter}>
          <Pie
            data={data}
            //cx={260}
            //cy={120}
            labelLine={false}
            dataKey="value"
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
          >
            {
              data.map((entry, index) => <Cell key={Math.random()} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Tooltip />
          <Legend verticalAlign="middle" align="right" layout="vertical" />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default SimplePieChart