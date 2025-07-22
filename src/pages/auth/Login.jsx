import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
// import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const csrf = () =>
    axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await csrf();

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": document.cookie
              .split("; ")
              .find((row) => row.startsWith("XSRF-TOKEN="))
              ?.split("=")[1],
          },
          withCredentials: true, // ⬅️ INI PENTING
        }
      );
      const data = res.data;
      console.log(data);
      if (res.ok) {
        // Simpan token ke localStorage
        if (data.token) {
          localStorage.setItem("auth_token", data.token);
        }
        setMessage("Login berhasil!");
        navigate("/admin");
      } else {
        setMessage(data.message || "Login gagal");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Terjadi kesalahan saat login.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-lemonade-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-lemonade-900">
          Login
        </h2>
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`btn btn-lemonade w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {message && (
            <div className="mt-4 text-center text-red-600">{message}</div>
          )}
        </form>
        <p className="text-sm text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-lemonade-700 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
