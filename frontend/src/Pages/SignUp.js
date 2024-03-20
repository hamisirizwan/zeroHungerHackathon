import React, { useState } from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";
import { instance } from "../utils/axiosConfig";
import { toast } from "sonner";
import { useNavigate, Navigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

function SignUp() {
  const access_token = localStorage.getItem("access_token");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    user_type: "donor",
  });

  const handleUserSignup = async (event) => {
    event.preventDefault();
    setIsAuthenticating(true);
    try {
      const { data: responseData } = await instance.post(
        "/auth/register",
        userFormData
      );

      toast.success(responseData.data.message, {
        position: "top-center",
      });
      setUserFormData({
        name: "",
        email: "",
        password: "",
        location: "",
        user_type: "donor",
      });

      setIsAuthenticating(false);
      setUserFormData({
        name: "",
        email: "",
        password: "",
        location: "",
        user_type: "donor",
      });
      navigate("/login");
    } catch (error) {
      setIsAuthenticating(false);
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      toast.success(errorMessage, {
        position: "top-center",
      });
    }
  };

  if (access_token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center bg-[#d98c17]">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Get started today!
            </h1>
          </div>
          <form
            onSubmit={(e) => handleUserSignup(e)}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter your name"
                  value={userFormData.name}
                  onChange={(e) =>
                    setUserFormData((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                  id="name"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="location" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter your location"
                  value={userFormData.location}
                  onChange={(e) =>
                    setUserFormData((prevState) => ({
                      ...prevState,
                      location: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
            <div>
              <select
                value={userFormData.user_type}
                onChange={(e) =>
                  setUserFormData((prevState) => ({
                    ...prevState,
                    user_type: e.target.value,
                  }))
                }
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              >
                <option value="donor">Donor</option>
                <option value="recipient">Recipient</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={userFormData.email}
                  onChange={(e) =>
                    setUserFormData((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
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
                  value={userFormData.password}
                  onChange={(e) =>
                    setUserFormData((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-200">
                Already have an account?
                <Link className="underline" to="/login">
                  Login
                </Link>
              </p>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-[#4b2114] text-white hover:bg-[#7f3b26] px-5 py-3 text-sm font-medium"
              >
                {isAuthenticating && (
                  <span className="w-4 h-4 border-2 border-dashed rounded-full animate-spin"></span>
                )}
                {isAuthenticating ? "Authenticating..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default SignUp;
