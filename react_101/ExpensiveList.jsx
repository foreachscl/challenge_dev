// ExpensiveList.jsx

import  { useMemo, useState } from "react";

// export function calculateTotal(items) {
//   console.log("Calculando total...");
//   return items.reduce((acc, item) => acc + item.price, 0);
// }

export default function ExpensiveList({ items }) {
  const [filter, setFilter] = useState("");
  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );


  // Aquí es donde optimizamos:
const total = useMemo(() => calculateTotal(filtered), [filtered]);

  return (
    <div>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Filtrar por nombre"
      />
      <ul>
        {filtered.map(item => (
          <li key={item.id}>
            {item.name}: ${item.price}
          </li>
        ))}
      </ul>
      <div>Total: ${total}</div>
    </div>
  );
}
