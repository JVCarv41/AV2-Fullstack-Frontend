import React from "react";
import "../UserPage.css";
import { ShoppingList as ShoppingListType } from "../../../api/GetAllLists";

interface ShoppingListProps {
  list: ShoppingListType;
}

function ShoppingList({ list }: ShoppingListProps) {
  const formattedDate = list.date ? list.date.slice(0, 10) : "";

  // Group products by category
  const productsByCategory: { [category: string]: typeof list.products } = {};
  list.products.forEach((product) => {
    if (!productsByCategory[product.category]) {
      productsByCategory[product.category] = [];
    }
    productsByCategory[product.category].push(product);
  });

  return (
    <div className="shopping-list">
      <h2>Shopping List - {formattedDate}</h2>
      {Object.entries(productsByCategory).map(([category, products]) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {products.map((product, idx) => (
              <li key={idx}>
                {product.name} ({product.quantity} {product.unit})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ShoppingList;
