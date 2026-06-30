import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/authAPI";

export function Profile() {
     const [user, setUser] = useState(null);
     const navigate = useNavigate();

     useEffect(() => {
          const token = localStorage.getItem("token");
          // No token -> go to login
          if (!token) {
               navigate("/");
               return;
          }
          
          const getProfile = async () => {
               try{
                    const response = await API.get("/profile");
                    setUser(response.data.user);
               }
               catch(error){
                    console.log(error);
               }
          };
          getProfile();
     },[]);

     const logout = () => {
          localStorage.removeItem("token");
          navigate("/");
     }

     return(
<div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">

    <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">

        {user && (
            <>

                {/* Profile Header */}
                <div className="flex flex-col items-center">

                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">

                        {user.email.charAt(0).toUpperCase()}

                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mt-5">
                        Welcome 👋
                    </h1>

                    <p className="text-gray-500 mt-1">
                        You have successfully logged in.
                    </p>

                </div>

                {/* User Information */}
                <div className="mt-8 space-y-4">

                    <div className="bg-gray-50 rounded-xl p-4 border">

                        <p className="text-sm text-gray-500">
                            User ID
                        </p>

                        <p className="text-lg font-semibold text-gray-800">
                            {user.id}
                        </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border">

                        <p className="text-sm text-gray-500">
                            Email Address
                        </p>

                        <p className="text-lg font-semibold text-gray-800 break-all">
                            {user.email}
                        </p>

                    </div>

                </div>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md"
                >
                    Logout
                </button>

            </>
        )}

        {!user && (
            <div className="flex flex-col items-center">

                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                <p className="mt-4 text-gray-600">
                    Loading profile...
                </p>

            </div>
        )}

    </div>

</div>
     );
}