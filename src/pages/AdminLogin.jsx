import { useState } from "react";

const AdminLogin = ({ setPage }) => {

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

  const login = async () => {

    const res = await fetch(
      "https://smart-cafe-tiz3.onrender.com/api/auth/login",
      {
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify({username,password})
      }
    );

    const data = await res.json();

    if(data.token){
      localStorage.setItem("adminToken",data.token);
      setPage("admin");
    } else{
      alert("Login failed");
    }

  };

  return (
    <div className="p-6">

      <h1 className="text-2xl mb-4">Admin Login</h1>

      <input
        placeholder="username"
        value={username}
        onChange={e=>setUsername(e.target.value)}
        className="border p-2 mb-2"
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        className="border p-2 mb-4"
      />

      <button
        onClick={login}
        className="bg-black text-white px-4 py-2"
      >
        Login
      </button>

    </div>
  );
};

export default AdminLogin;