import React, { useState } from "react";
import "../UserPage.css";
import GetAllLists, { ShoppingList } from "../../../api/GetAllLists";

function ButtonArea({ setLists, setCount }) {
  async function handleGetLists() {
    const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
    const token = localStorage.getItem("authToken") || "";
    try {
      const result = await GetAllLists(apiUrl, token);
      setLists(result.data);
      setCount(result.count);
      console.log(result.data); // For debug
      console.log(result.count)
    } catch (err) {
      console.error("Failed to fetch lists", err);
    }
  }

  return (
    <div className="button-area">
      <button onClick={handleGetLists}>Show shopping lists</button>
      {/* You can render the lists here if you want */}
    </div>
  );
}

export default ButtonArea;