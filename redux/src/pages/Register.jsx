import { useState } from "react";
import API from "../api/authAPI";
import { useNavigate } from "react-router-dom";

export function Register() {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const navigate = useNavigate();

     const register = async() => {
          try{
               const response = await API.post("/register", {
                    email,
                    password
               });
               alert(response.data.message);
               navigate("/");
          }
          catch(error){
               console.log(error);
          }
     };

return (
    <div className="min-h-screen flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

            <div className="text-center mb-8">

                <h1 className="text-4xl font-bold text-gray-800">
                    Create Account
                </h1>

                <p className="text-gray-500 mt-2">
                    Register to get started
                </p>

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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />

                </div>

                <div>

                    <label className="block text-gray-700 mb-2 font-medium">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />

                </div>

                <button
                    onClick={register}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md"
                >
                    Create Account
                </button>

                <p className="text-center text-gray-600 mt-6">

                    Already have an account?

                    <span
                        onClick={() => navigate("/")}
                        className="text-purple-600 font-semibold cursor-pointer hover:underline ml-1"
                    >
                        Login
                    </span>

                </p>

            </div>

        </div>

    </div>
);
}