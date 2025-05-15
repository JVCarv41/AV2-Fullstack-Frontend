import React from "react";
import LoginArea from "./LoginArea";
import SignUpArea from "./SignUpArea";
import "./AuthArea.css";

function AuthPage() {
  const backendUrl:string = (import.meta as any).env.VITE_BACKEND_URL;

  return (
    <div className="auth-page">
      <h1>TS-Market</h1>
      <div className="auth-container">
        <SignUpArea backendUrl={backendUrl}/>
        <LoginArea backendUrl={backendUrl} />
      </div>
    </div>
  );
}

export default AuthPage;
