import React, { useState } from "react";
import {
  ShoppingListType,
  ProductType,
} from "../../../../../interfaces/shoppingListInterfaces";
import "./EditList.css";
import ProductInput from "./ProductInput";
import PutList from "../../../../../api/PutList";
import PatchList from "../../../../../api/PatchList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

interface EditListModalProps {
  mode: "edit" | "create";
  list?: ShoppingListType;
  onClose: () => void;
  onSave: (list: ShoppingListType) => void;
}

const defaultList: ShoppingListType = {
  _id: "",
  date: "",
  products: [],
};

function EditListModal({ mode, list, onClose, onSave }: EditListModalProps) {
  // Store date as Date object
  const initialDate = list?.date ? new Date(list.date) : null;
  const [date, setDate] = useState<Date | null>(initialDate);

  // Editable products state
  const [products, setProducts] = useState<ProductType[]>(list?.products || []);

  // Handle product field change
  function handleProductChange(
    idx: number,
    field: keyof ProductType,
    value: string | number
  ) {
    setProducts((prev) =>
      prev.map((prod, i) => (i === idx ? { ...prod, [field]: value } : prod))
    );
  }

  // Add new product
  function handleAddProduct() {
    setProducts((prev) => [
      ...prev,
      { name: "", category: "", quantity: 1, unit: "" },
    ]);
  }

  // Remove product
  function handleRemoveProduct(idx: number) {
    setProducts((prev) => prev.filter((_, i) => i !== idx));
  }

  function callApiEditList(original: ShoppingListType, updated: ShoppingListType) {
    const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
    const token = localStorage.getItem("authToken") || "";
    const listId: string = list?._id ?? "";

    console.log("Editing list with params:", { apiUrl, token, listId });

    const dateChanged = original.date !== updated.date;

    // Compare products (shallow comparison)
    const productsChanged =
      original.products.length !== updated.products.length ||
      original.products.some((prod, idx) => {
        const up = updated.products[idx];
        return (
          prod.name !== up.name ||
          prod.category !== up.category ||
          prod.quantity !== up.quantity ||
          prod.unit !== up.unit
        );
      });

    // API calls PUT, change whole list
    if (dateChanged && productsChanged) {
      console.log("Both date and products changed.");
      PutList(apiUrl, token, listId, updated);
    }
    // API calls PATCH, change parts of the list
    else if (dateChanged) {
      console.log("Only date changed.");
      const partialList = { date: updated.date };
      PatchList(apiUrl, token, listId, partialList);
    } else if (productsChanged) {
      console.log("Only products changed.");
      const partialList = { products: updated.products };
      PatchList(apiUrl, token, listId, partialList);
    } else {
      console.log("No changes detected in the list.");
    }
  }

  // Submit the changes
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newList: ShoppingListType = {
      ...(list || defaultList),
      date: date ? format(date, "yyyy-MM-dd") : "",
      products,
    };

    callApiEditList(list || defaultList, newList);
    onSave(newList);
  }

  return (
    <div className="edit-list-modal-backdrop">
      <div className="edit-list-modal">
        <h2>
          {mode === "edit" ? "Edit Shopping List" : "Create Shopping List"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label>
            Date:
            <DatePicker
              selected={date}
              onChange={dateObj => setDate(dateObj)}
              dateFormat="yyyy-MM-dd"
            />
          </label>
          <div>
            <strong>Products:</strong>
            <ul>
              {products.map((product, idx) => (
                <ProductInput
                  key={idx}
                  product={product}
                  idx={idx}
                  onChange={handleProductChange}
                  onRemove={handleRemoveProduct}
                />
              ))}
            </ul>
            <button
              type="button"
              onClick={handleAddProduct}
              className="edit-list-add-product"
            >
              Add Product
            </button>
          </div>
          <div className="modal-buttons">
            <button type="submit">{mode === "edit" ? "Save" : "Create"}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditListModal;
