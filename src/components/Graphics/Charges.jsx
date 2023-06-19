import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getTotalCharges } from '../../redux/actions';

export default function Charges() {
    const dispatch = useDispatch();
    const totalCharges = useSelector((state) => state.totalCharges);

    useEffect(() => {
        dispatch(getTotalCharges());
    }, [dispatch]);

    const data = Object.keys(totalCharges).map((date) => ({
        date,
        Amount: totalCharges[date],
    }));

    return (
        <div>
            <h2>Total transaction amount</h2>
            <BarChart width={600} height={500} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Amount" fill="#8884d8" barSize={150} />
            </BarChart>
        </div>
    );
}
