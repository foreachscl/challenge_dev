// ExpensiveList.jsx

import React, { useState } from "react";

function calculateTotal(items) {
  console.log("Calculando total...");
  return items.reduce((acc, item) => acc + item.price, 0);
}

export default function ExpensiveList({ items }) {
  const [filter, setFilter] = useState("");
  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  const total = calculateTotal(filtered);

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
