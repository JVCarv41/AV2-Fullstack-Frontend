// UserPage.tsx
import React, { useState } from "react";
import UserHeader from "./UserHeader";
import ShoppingListArea from "./shoppingLists/ShoppingListArea";
import ButtonArea from "./buttonArea/buttonArea";

function UserPage() {
  const [lists, setLists] = useState([]);
  const [count, setCount] = useState(0);

  return (
    <div className="user-page">
      <UserHeader />
      <div className="user-body">
        <ShoppingListArea lists={lists} />
        <ButtonArea setLists={setLists} setCount={setCount} />
      </div>
    </div>
  );
}

export default UserPage;