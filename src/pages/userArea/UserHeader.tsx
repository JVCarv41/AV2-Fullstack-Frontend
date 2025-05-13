import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserPage.css";

function UserHeader() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  return (
    <div className="user-header">
      <header>
        <div className="user-header-text">
          <h1>J-Market</h1>
          <h2>Your Shopping Lists</h2>
        </div>
        <section>
          <button onClick={handleLogout}>Logout</button>
          {/* Add more buttons here */}
        </section>
      </header>
    </div>
  );
}

export default UserHeader;