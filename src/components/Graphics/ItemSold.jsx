import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getOrders } from "../../redux/actions/index";

export default function Graphic() {
  const dispatch = useDispatch();
  const dailySales = useSelector((state) => state.dailySales);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // Agrupar las ventas por día
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

  // Convertir los datos agrupados en un array para el gráfico
  const salesData = Object.keys(groupedSales).map((day) => ({
    day,
    itemsSold: groupedSales[day],
  }));

  return (
    <div>
      <h2>Item Sales</h2>
      <BarChart width={600} height={500} data={salesData}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="itemsSold" fill="rgba(75, 192, 192, 0.6)" barSize={150} />
      </BarChart>
    </div>
  );
}
