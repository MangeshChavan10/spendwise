import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import api from "../../api/axios";

const Chart = () => {
  const [categoricalTotals, setCategoricalTotals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/expense/category-totals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(token);

        const formatted = res.data.map((item) => ({
          name: item._id,
          amount: item.totalAmount,
        }));
        console.log(formatted);

        setCategoricalTotals(formatted);
      } catch (err) {
  console.error("Error fetching chart data:", err.response?.data || err.message);
}

    };

    fetchData();
  }, []);

  return (
    <div className="w-full mt-50 h-100 bg-[#1c1c1c] rounded-xl p-4 shadow-lg">
      <h2 className="text-white text-xl mb-4">Expense by Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={categoricalTotals}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1862FD",
              border: "none",
              borderRadius: "8px",
            }}
            itemStyle={{ color: "#1862FD" }}
          />
          <Bar dataKey="amount" fill="#1862FD" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
