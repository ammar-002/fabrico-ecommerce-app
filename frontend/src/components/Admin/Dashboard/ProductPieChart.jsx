import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ProductPieChart = () => {
  const { allProducts } = useSelector((store) => store.products);
  // console.log(allProducts)
  // Count products per category dynamically
  const categoryCounts = allProducts.reduce((acc, product) => {
    const cat = product.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  // Transform into Recharts format
  const data = Object.keys(categoryCounts).map((key) => ({
    name: key,
    value: categoryCounts[key],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="w-full max-w-xl mx-auto p-4  ">
      <h2 className="text-xl font-semibold mb-3 text-center text-blue-800">
        Products in Categories
      </h2>

      <PieChart width={500} height={350}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ProductPieChart;
