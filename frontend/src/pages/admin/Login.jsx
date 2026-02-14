import { useState } from "react";
import { adminLogin } from "../../api/authaPi";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      if (!email || !password) {
        alert("Enter email and password");
        return;
      }

      const res = await adminLogin({ email, password });
      console.log("Login response:", res);
      localStorage.setItem("token", res.token);

      navigate("/admin/dashboard");

    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Login</h1>

      <div style={{ display: "flex", flexDirection: "column", width: "300px", gap: "10px" }}>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>
    </div>
  );
}
