import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip, VictoryLegend } from 'victory';
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
        <div className=''>
            <h2>Total transaction amount</h2>
            <VictoryChart width={700} height={500}>
                <VictoryAxis
                    dependentAxis
                    tickFormat={(tick) => `$${tick}`}
                />
                <VictoryAxis />
                <VictoryLegend x={280} y={20}
                    orientation="horizontal"
                    data={[{ name: "Amount", symbol: { fill: "#8884d8" } }]}
                />
                <VictoryBar
                    data={data}
                    x="date"
                    y="Amount"
                    labelComponent={<VictoryTooltip />}
                    style={{
                        data: { fill: "#8884d8" },
                        labels: { fontSize: 10, angle: -45 }
                    }}
                    barWidth={50}
                    alignment="start"
                />
            </VictoryChart>
        </div>
    );
}
