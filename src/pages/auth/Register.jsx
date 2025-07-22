import { Link } from "react-router";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-lemonade-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-lemonade-900">
          Register
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
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
              required
            />
          </div>
          <button type="submit" className="btn btn-lemonade w-full">
            Register
          </button>
        </form>
        <p className="text-sm text-center">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-lemonade-700 hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
