import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from "recharts";

const OrdersBarChart = () => {
  // Get allOrders from Redux
  const { allOrders } = useSelector((store) => store.order);

  // Count orders by status
  const statusCounts = allOrders.reduce(
    (acc, order) => {
      const status = order.status; // Assuming each order has a "status" field
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    { Pending: 0, Delivered: 0, Cancelled: 0 } // Default keys
  );

  // Transform into Recharts format
  const data = Object.keys(statusCounts).map((key) => ({
    status: key,
    count: statusCounts[key],
  }));

  // Colors for each status
  const COLORS = {
    Pending: "#F0B100",
    Delivered: "#00C951",
    Cancelled: "#FB2C36",
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4    ">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-800">Orders By Status </h2>

      <BarChart width={500} height={320} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" radius={[5, 5, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.status} fill={COLORS[entry.status]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default OrdersBarChart;
