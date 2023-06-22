import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRevenue } from '../../redux/actions';
import "./TotalRevenue.css";

export default function TotalRevenue() {
    const dispatch = useDispatch();
    const revenueByCategory = useSelector((state) => state.revenue.revenueByCategory);
    console.log(revenueByCategory)
    useEffect(() => {
        dispatch(setRevenue());
    }, [dispatch]);

    const renderChart = () => {
        return (
            <div className="bar-chart-revenue">
                {Object.entries(revenueByCategory).map(([category, revenue]) => (
                    <div key={category} className="bar">
                        <div className="bar-label">{category}</div>
                        <div className="bar-fill" style={{ height: `${revenue / 1000}px` }}></div>
                        <div className="bar-value">{revenue}</div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='text-total mt-11'>
            <h2>Revenue by Category</h2>
            {revenueByCategory && renderChart()}
        </div>
    );
}
