import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function GoogleSuccess() {
     const navigate = useNavigate();
     const location = useLocation();

     useEffect(() => {
          const token = new URLSearchParams(location.search).get("token");
          if(token){
               localStorage.setItem("token", token);
               navigate("/profile");
          }
          else {
               navigate("/");
          }

     },[location, navigate]);

     return(
          <div>
               <h2>Signing you in ...</h2>
          </div>
     );
}