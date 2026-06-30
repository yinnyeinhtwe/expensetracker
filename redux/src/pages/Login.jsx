import { useState } from "react";
import API from "../api/authAPI";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await API.post("/login", {
        email,
        password,
      });
      // console.log("token", response.data.token);
      console.log('RES', response)
     //  if(response.status===401) return;
      if (response.status === 200 && !!response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert(response.data.message);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>

          <p className="text-gray-500 mt-2">Sign in to continue</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Login
          </button>

          <div className="flex items-center">
            <div className="flex-grow border-t"></div>

            <span className="mx-4 text-gray-400">OR</span>

            <div className="flex-grow border-t"></div>
          </div>

          <button
            onClick={googleLogin}
            className="w-full border border-gray-300 hover:bg-gray-100 py-3 rounded-xl flex items-center justify-center gap-3 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />

            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline ml-1"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
