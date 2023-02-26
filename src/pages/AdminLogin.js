import React from "react";
const AdminLogin = () => {
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
        type={"password" || "number"}
        placeholder="password"
        style={{
          width: "16rem",
          marginTop: "0.5rem",
          textAlign: "center",
          height: "2.2rem"
        }}
        onChange={(e) => {
          if (e.target.value === process.env.REACT_APP_ADMIN_LOGIN) {
            window.location.href = "/admin-dashboard";
          }
        }}
      />
    </main>
  );
};

export default AdminLogin;
