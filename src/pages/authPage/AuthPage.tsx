import React from "react";
import LoginArea from "./LoginArea";
import SignUpArea from "./SignUpArea";
import "./AuthArea.css";

function AuthPage() {
  return (
    <div className="auth-page">
      <h1>Meaningful Title</h1>
      <div className="auth-container">
        <SignUpArea />
        <LoginArea />
      </div>
    </div>
  );
}

export default AuthPage;
