import React, { useState } from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";
import { instance } from "../utils/axiosConfig";
import { toast } from "sonner";
import { useNavigate, Navigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

function Login() {
  const access_token = localStorage.getItem("access_token");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserLogin = async (event) => {
    event.preventDefault();
    setIsAuthenticating(true);
    try {
      const { data: responseData } = await instance.post("/auth/login", {
        email,
        password,
      });

      toast.success(responseData.message, {
        position: "top-center",
      });
      localStorage.setItem("access_token", responseData.data.access_token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: responseData.data.id,
          name: responseData.data.name,
          location: responseData.data.location,
          email: responseData.data.email,
          user_type: responseData.data.user_type,
          chatHistory: responseData.data.chatHistory,
        })
      );
      setIsAuthenticating(false);
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      setIsAuthenticating(false);
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;

      toast.error(errorMessage, {
        position: "top-right",
      });
    }
  };

  if (access_token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-[#d98c17]">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl text">
              Welcome Back!
            </h1>
          </div>
          <form
            onSubmit={(e) => handleUserLogin(e)}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-200">
                No account?
                <Link to="/signup" className="underline">
                  Sign up
                </Link>
              </p>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-[#4b2114] text-white hover:bg-[#7f3b26] px-5 py-3 text-sm font-medium"
              >
                {isAuthenticating && (
                  <span className="w-4 h-4 border-2 border-dashed rounded-full animate-spin"></span>
                )}
                {isAuthenticating ? "Authenticating..." : "Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
