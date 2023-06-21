import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../redux/actions/index";
import "./ItemSold.css";

export default function ItemSold() {
    const dispatch = useDispatch();
    const dailySales = useSelector((state) => state.dailySales);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const renderBarChart = () => {
        const groupedSales = dailySales.reduce((result, order) => {
            const date = new Date(order.createdAt);
            const isoDate = date.toISOString().split("T")[0]; // Convertir a formato ISO 8601

            if (result[isoDate]) {
                result[isoDate] += order.items.reduce(
                    (acc, item) => (item.qty ? acc + item.qty : acc),
                    0
                );
            } else {
                result[isoDate] = order.items.reduce(
                    (acc, item) => (item.qty ? acc + item.qty : acc),
                    0
                );
            }

            return result;
        }, {});

        const salesData = Object.keys(groupedSales).map((day) => ({
            day,
            itemsSold: groupedSales[day],
        }));

        const maxItemsSold = Math.max(...Object.values(groupedSales));

        return salesData.map((data) => {
            const height = (data.itemsSold / maxItemsSold) * 100;
            const barColor = getBarColor(data.itemsSold);

            return (
                <div
                    className="bar"
                    style={{ height: `${height}%`, backgroundColor: barColor }}
                    key={data.day}
                >
                    <div className="items-sold">{data.itemsSold}</div>
                    <div className="day">{data.day}</div>
                </div>
            );
        });
    };

    const getBarColor = (value) => {
        if (value >= 1) {
            return "#074a9cc7";
        }
        // Puedes agregar más condiciones y retornar diferentes colores según tus necesidades
        return "#FFFFFF";
    };

    return (
        <div className="graphic-container">
            <h2>Item Sales</h2>
            <div className="bar-chart-Item">{renderBarChart()}</div>
        </div>
    );
}
