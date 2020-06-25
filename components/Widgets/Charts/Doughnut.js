import React from 'react';
import * as Recharts from 'recharts';

const { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,Label} = Recharts;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const data = [
    { name: 'Group A', value: 15 },
    { name: 'Group B', value: 4 },
    { name: 'Group C', value: 1 },
    { name: 'Group D', value: 1 }]


class SimpleDoughnutChart extends React.Component {
    render() {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        //cx={300}
                        //cy={150}
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={1}
                    >
                        <Label
                            value="20" position="centerBottom" className='label-top' fontSize='27px'
                        />
                        <Label
                            value="tasks left" position="centerTop" className='label'
                        />
                        {
                            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="middle" align="right" layout="vertical" />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}

export default SimpleDoughnutChart