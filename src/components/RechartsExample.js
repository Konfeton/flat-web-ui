import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RechartsExample = ({ chartData }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgPrice" name={"Цена"} stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

// RechartsExample.propTypes = {
//     chartData: PropTypes.arrayOf(
//         PropTypes.shape({
//             day: PropTypes.string,
//             avgPrice:PropTypes.number
//         })
//     ).isRequired,
// };

export default RechartsExample;
