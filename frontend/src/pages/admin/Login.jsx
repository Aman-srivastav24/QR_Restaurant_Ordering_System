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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        <div className="flex flex-col gap-4">
          <input
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-black text-white py-2 rounded-lg font-medium hover:opacity-90 active:scale-95 transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
