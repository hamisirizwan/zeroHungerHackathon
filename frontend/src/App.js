import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { Toaster } from "sonner";
import ProtectedRoute from "./Components/auth/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import Chatbot from "./Components/dashboard/Chatbot";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <main>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        {user?.user_type === "donor" && <Chatbot />}

        <Toaster richColors closeButton />
      </BrowserRouter>
    </main>
  );
}

export default App;
