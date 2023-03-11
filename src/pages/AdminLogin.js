import React from "react";

import { useUserContext } from "../user_context";
const AdminLogin = () => {
  const { email, setemail, psw, setpsw } = useUserContext();
  const handleLogin = () => {
    window.location.href = "/admin-dashboard";
  };

  return (
    <main
      style={{
        background: "#dfe6d8",
        justifyContent: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h2>Login to dashboard</h2>
      <input
        type={"text"}
        placeholder="email"
        style={{
          width: "16rem",
          marginTop: "0.5rem",
          textAlign: "center",
          height: "2.2rem"
        }}
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type={"password"}
        placeholder="password"
        style={{
          width: "16rem",
          marginTop: "0.5rem",
          textAlign: "center",
          height: "2.2rem"
        }}
        onChange={(e) => setpsw(e.target.value)}
      />
      <button
        onClick={handleLogin}
        style={{
          height: "2rem",
          border: "1px solid green",
          width: "16rem",
          fontWeight: "bold"
        }}
      >
        Login
      </button>
    </main>
  );
};

export default AdminLogin;
