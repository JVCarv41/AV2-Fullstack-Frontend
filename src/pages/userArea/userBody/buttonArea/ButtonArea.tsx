import React, { useEffect, useRef, useState } from "react";
import "./ButtonArea.css";
import GetAllLists from "../../../../api/GetAllLists";

function ButtonArea({ setLists, setCount }) {
  const calledOnce = useRef(false);

  async function handleGetLists() {
    const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
    const token = localStorage.getItem("authToken") || "";
    try {
      const result = await GetAllLists(apiUrl, token);
      setLists(result.data);
      setCount(result.count);
      console.log(`Number of lists found: ${result.count}`)
    } catch (err) {
      //Nothing here
    }
  }

  useEffect(() => {
    if (!calledOnce.current){
    console.log('Calling "handleGetLists"');
    calledOnce.current = true;
    handleGetLists();
    }
  }, [])

  return (
    <div className="button-area">
      <button onClick={handleGetLists}>Show Shopping Lists</button>
      {/* You can render the lists here if you want */}
    </div>
  );
}

export default ButtonArea;