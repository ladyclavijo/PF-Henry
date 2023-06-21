import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalCharges } from '../../redux/actions/index';
import './Charges.css';

const Charges = () => {
    const dispatch = useDispatch();
    const totalCharges = useSelector((state) => state.totalCharges);

    useEffect(() => {
        dispatch(getTotalCharges());
    }, [dispatch]);

    const renderBarChart = () => {
        const maxCharge = Math.max(...Object.values(totalCharges));

        return Object.keys(totalCharges).map((date) => {
            const height = (totalCharges[date] / maxCharge) * 100;
            const barColor = getBarColor(totalCharges[date]);

            return (
                <div
                    className="bar"
                    style={{ height: `${height}%`, backgroundColor: barColor }}
                    key={date}
                >
                    <div className="total">${totalCharges[date]}</div>
                    <div className="date">{date}</div>
                </div>
            );
        });
    };

    const getBarColor = (value) => {
        if (value >= 1) {
            return '#074a9cc7';
        }
    };

    return (
        <div className="charges-container">
            <h2 className='text-black'>Total Charges</h2>
            <div className="bar-chart">{renderBarChart()}</div>
        </div>
    );
};

export default Charges;
