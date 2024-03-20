import "./Navbar.css";
import logo from "../Assests/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-[#4b2114] flex items-center justify-between">
      <div>
        <img src={logo} className="w-28 h-auto" alt="logo" />
      </div>
      <div className="flex items-center gap-x-4 text-xl sm:text-2xl px-3">
        <Link
          to="/"
          className="text-[#d98c17] font-semibold hover:underline hover:text-white"
        >
          Home
        </Link>
        <div>
          {access_token ? (
            <div className="flex items-center gap-x-4">
              <Link to="/dashboard" className="text-white">
                Dashboard
              </Link>
              <button
                onClick={() => Logout()}
                className="text-white bg-[#d98c17] px-4 py-2 rounded-xl"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
              <Link to="/login" className="text-white">
                Log In
              </Link>
              <Link
                to="/Signup"
                className="text-white bg-[#d98c17] px-4 py-2 rounded-xl"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
