import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getBestSellers } from "../../redux/actions/index";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

const BestSellers = ({ bestSellers, getBestSellers }) => {
  useEffect(() => {
    getBestSellers();
  }, [getBestSellers]);

  // Obtener solo los 5 libros más vendidos
  const topBestSellers = bestSellers.slice(0, 5);

  const data = topBestSellers.map((book) => ({
    id: book.id,
    qty: book.qty,
  }));

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2", "#00FF00"];

  return (
    <div>
      <h2>Bestsellers</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="qty"
          nameKey="id"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bestSellers: state.bestSellers,
});

export default connect(mapStateToProps, { getBestSellers })(BestSellers);
