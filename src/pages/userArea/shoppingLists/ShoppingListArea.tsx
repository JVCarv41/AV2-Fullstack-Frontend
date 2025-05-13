import React from "react";
import "../UserPage.css";
import ShoppingList from "./ShoppingList";
import { ShoppingList as ShoppingListType } from "../../../api/GetAllLists";

interface ShoppingListAreaProps {
  lists: ShoppingListType[];
}

function ShoppingListArea({ lists }: ShoppingListAreaProps) {
  return (
    <div className="shopping-lists">
      {lists.map((list) => (
        <ShoppingList key={list._id} list={list} />
      ))}
    </div>
  );
}

export default ShoppingListArea;
