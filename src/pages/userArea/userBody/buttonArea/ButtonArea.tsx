import { useEffect, useRef } from "react";
import "./ButtonArea.css";
import GetAllLists from "../../../../api/GetAllLists";
import CreateListButton from "./CreateListButton";


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
      <button onClick={handleGetLists} className="button-area-button">Show Shopping Lists</button>
      <CreateListButton setLists={setLists}/>
    </div>
  );
}

export default ButtonArea;