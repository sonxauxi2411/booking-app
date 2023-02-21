import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../api/authApi";
import "./navbar.css";

const Navbar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handlerLogin = () => {
    navigate("/login");
  };
  const handlerRegister = () => {
    navigate("/register");
  };
  const handlerHome = (e) => {
    navigate("/");
  };
  const handlerLogut = (e) => {
    logoutUser(dispatch, navigate);
  };
  const handlerTransaction = (e) => {
    navigate("/transaction");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo" onClick={handlerHome}>
          Booking Website
        </span>
        <div className="navItems">
          {user ? (
            <>
              <span>{user.orther.fullName}</span>
              <button className="navButton" onClick={handlerTransaction}>
                Transactions
              </button>
              <button className="navButton" onClick={handlerLogut}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="navButton" onClick={handlerRegister}>
                Register
              </button>
              <button className="navButton" onClick={handlerLogin}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
