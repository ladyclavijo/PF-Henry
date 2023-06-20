import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as d3 from 'd3';
import { getTotalCharges } from '../../redux/actions';

export default function Charges() {
    const dispatch = useDispatch();
    const totalCharges = useSelector((state) => state.totalCharges);
    const chartRef = useRef();

    useEffect(() => {
        dispatch(getTotalCharges());
    }, [dispatch]);

    useEffect(() => {
        drawChart();
    }, [totalCharges]);

    const drawChart = () => {
        const data = Object.keys(totalCharges).map((date) => ({
            date,
            Amount: totalCharges[date],
        }));

        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const width = 700 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        d3.select(chartRef.current).selectAll('*').remove();

        const svg = d3
            .select(chartRef.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleBand()
            .domain(data.map((d) => d.date))
            .range([0, width])
            .padding(0.1);

        const yScale = d3
            .scaleLinear()
            .domain([0, 1000])
            .range([height, 0]);


        svg
            .append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

        svg
            .append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale).tickFormat((tick) => `$${tick}`));

        svg
            .append('g')
            .attr('class', 'bars')
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', (d) => xScale(d.date))
            .attr('y', (d) => yScale(d.Amount))
            .attr('width', xScale.bandwidth())
            .attr('height', (d) => height - yScale(d.Amount))
            .style('fill', '#8884d8');

        svg
            .selectAll('.bar-label')
            .data(data)
            .join('text')
            .attr('class', 'bar-label')
            .attr('x', (d) => xScale(d.date) + xScale.bandwidth() / 2)
            .attr('y', (d) => yScale(d.Amount) - 5)
            .text((d) => `$${d.Amount}`)
            .attr('text-anchor', 'middle')
            .style('font-size', '10px')
            .style('fill', 'black');
    };

    return (
        <div className=''>
            <h2>Total transaction amount</h2>
            <div ref={chartRef}></div>
        </div>
    );
}
