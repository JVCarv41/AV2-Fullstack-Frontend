import React from "react";
import { ProductType } from "../../../../../interfaces/shoppingListInterfaces";

interface ProductInputProps {
  product: ProductType;
  idx: number;
  onChange: (idx: number, field: keyof ProductType, value: string | number) => void;
  onRemove: (idx: number) => void;
}

const unitOptions = ["Kg", "k", "L", "ml", "Unidade", "Pacote", "Caixa"];

function ProductInput({ product, idx, onChange, onRemove }: ProductInputProps) {
  return (
    <li className="edit-list-product-input">
      <input
        type="text"
        placeholder="Name"
        value={product.name}
        onChange={e => onChange(idx, "name", e.target.value)}
        className="edit-list-product-field name"
      />
      <input
        type="text"
        placeholder="Category"
        value={product.category}
        onChange={e => onChange(idx, "category", e.target.value)}
        className="edit-list-product-field category"
      />
      <input
        type="number"
        min={1}
        placeholder="Quantity"
        value={product.quantity}
        onChange={e => onChange(idx, "quantity", Number(e.target.value))}
        className="edit-list-product-field quantity"
      />
      <select
        value={product.unit}
        onChange={e => onChange(idx, "unit", e.target.value)}
        className="edit-list-product-field unit"
      >
        <option value="">Select unit</option>
        {unitOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button type="button" onClick={() => onRemove(idx)} className="edit-list-product-remove">
        Remove
      </button>
    </li>
  );
}

export default ProductInput;