// UserPage.tsx
import React, { useState } from "react";
import UserHeader from "./userHeader/UserHeader";
import ShoppingListArea from "./userBody/shoppingLists/ShoppingListArea";
import ButtonArea from "./userBody/buttonArea/ButtonArea";
import { ShoppingListType } from "../../interfaces/shoppingListInterfaces";

interface ShoppingListAreaProps {
  lists: ShoppingListType[];
  setLists: React.Dispatch<React.SetStateAction<ShoppingListType[]>>;
}

function UserPage() {
  const [lists, setLists] = useState<ShoppingListType[]>([]);
  const [count, setCount] = useState(0);

  return (
    <div className="user-page">
      <UserHeader />
      <div className="user-body">
        <ShoppingListArea lists={lists} setLists={setLists} />
        <ButtonArea setLists={setLists} setCount={setCount} />
      </div>
    </div>
  );
}

export default UserPage;