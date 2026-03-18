import { useState } from "react";

const AdminLogin = ({ setPage }) => {

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);

  const login = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        "https://smart-cafe-tiz3.onrender.com/api/auth/login",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (data.token) {

        localStorage.setItem("adminToken", data.token);

        alert("Admin login success");

        setPage("admin");

      } else {

        alert(data.message || "Login failed");

      }

    } catch (err) {

      console.log(err);
      alert("Server error");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="p-6">

      <h1 className="text-2xl mb-4">Admin Login</h1>

      <input
        placeholder="username"
        value={username}
        onChange={e=>setUsername(e.target.value)}
        className="border p-2 mb-2 block"
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        className="border p-2 mb-4 block"
      />

      <button
        onClick={login}
        disabled={loading}
        className="bg-black text-white px-4 py-2"
      >
        {loading ? "Logging..." : "Login"}
      </button>

    </div>
  );
};

export default AdminLogin;