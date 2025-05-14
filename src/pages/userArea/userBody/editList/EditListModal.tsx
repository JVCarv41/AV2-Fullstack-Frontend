import React, { useState } from "react";
import {
  ShoppingListType,
  ProductType,
} from "../../../../interfaces/shoppingListInterfaces";
import "./EditList.css";
import ProductInput from "./ProductInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

// APIs
import PutList from "../../../../api/PutList";
import PatchList from "../../../../api/PatchList";
import CreateList from "../../../../api/CreateList";

interface EditListModalProps {
  mode: "edit" | "create";
  list?: ShoppingListType;
  onClose: () => void;
  onSave: (list: ShoppingListType) => void;
  setLists: React.Dispatch<React.SetStateAction<ShoppingListType[]>>;
}

const defaultList: ShoppingListType = {
  _id: "",
  date: "",
  products: [],
};

function EditListModal({ mode, list, onClose, onSave, setLists }: EditListModalProps) {
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

  function callApiEditList(
    original: ShoppingListType,
    updated: ShoppingListType
  ) {
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

  function callApiAddList(list: ShoppingListType) {
    const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
    const token = localStorage.getItem("authToken") || "";
    CreateList(apiUrl, token, list);
  }

  // Submit the changes
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newList: ShoppingListType = {
      ...(list || defaultList),
      date: date ? format(date, "yyyy-MM-dd") : "",
      products,
    };

    if (mode === "edit") {
      console.log("Called API to edit list")
      callApiEditList(list || defaultList, newList);
    } else if (mode === "create") {
      console.log("Called API to create new list")
      callApiAddList(newList);
    }
    onSave(newList);
  }

  return (
    <div className="edit-list-modal">
      <h2>{mode === "edit" ? "Edit Shopping List" : "Create Shopping List"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <DatePicker
            selected={date}
            onChange={(dateObj) => setDate(dateObj)}
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
            className="add-product-button"
          >
            Add Product
          </button>
        </div>
        <div className="modal-buttons">
          <button type="submit" className="submit-button">{mode === "edit" ? "Save" : "Create"}</button>
          <button type="button" onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditListModal;
