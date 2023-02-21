import React from "react";
import {
  RiDashboardFill,
  RiUser3Fill,
  RiHotelFill,
  RiRefundFill,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { BiTransferAlt } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/authapi";
import { useDispatch } from "react-redux";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogout = (e) => {
    logoutUser(dispatch, navigate);
  };
  return (
    <div className="container text-black-50">
      <div>
        <span className="text-uppercase">Main</span>
        <div className="d-flex flex-column ps-2 py-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-dark fw-bold" : "text-black-50"
            }
          >
            <span className="text-info">
              <RiDashboardFill />
            </span>
            Dashboard
          </NavLink>
        </div>
      </div>
      <div>
        <span className="text-uppercase">List</span>
        <div className="d-flex flex-column ps-2 py-2">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "text-dark fw-bold" : "text-black-50"
            }
          >
            <span className="text-info">
              <RiUser3Fill />
            </span>
            Users
          </NavLink>
          <NavLink
            to="/hotels"
            className={({ isActive }) =>
              isActive ? "text-dark fw-bold" : "text-black-50"
            }
          >
            <span className="text-info">
              <RiHotelFill />
            </span>
            Hotels
          </NavLink>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              isActive ? "text-dark fw-bold" : "text-black-50"
            }
          >
            <span className="text-info">
              <RiRefundFill />
            </span>
            Rooms
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive ? "text-dark fw-bold" : "text-black-50"
            }
          >
            <span className="text-info">
              <BiTransferAlt />
            </span>
            Transactions
          </NavLink>
        </div>
      </div>
      <div>
        <span className="text-uppercase">new</span>
        <div className="d-flex flex-column ps-2 py-2">
          <NavLink
            to="/add-hotel"
            className={({ isActive }) =>
              isActive ? "text-dark fw-bold" : "text-black-50"
            }
          >
            <span className="text-info">
              <RiHotelFill />
            </span>
            New Hotel
          </NavLink>
          <NavLink
            to="/add-room"
            className={({ isActive }) =>
              isActive ? "text-dark" : "text-black-50"
            }
          >
            <span className="text-info">
              <RiRefundFill />
            </span>
            New Room
          </NavLink>
        </div>
      </div>
      <div>
        <span className="text-uppercase">User</span>
        <div className="d-flex flex-column ps-2 py-2 text-black-50">
          <span
            className="d-flex gap-2"
            style={{ cursor: "pointer" }}
            onClick={handlerLogout}
          >
            <span className="text-info">
              <RiLogoutBoxRLine />
            </span>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
