import React from "react";
import "./navbar.css";
import "../../App.css";
import { Link } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Navbar = () => {
  const handlelogout = () => {
    localStorage.removeItem("isLogging");
    window.location.reload();
    toast.success("You are Logged out");
  };
  return (
    <div className="nav-main">
      <div className="logo">
        <h3>
          <Link to="/" className="link">
            JustAskHim
          </Link>
        </h3>
      </div>
      <h4>
        <Link to="/" className="link">
          Chat
        </Link>
      </h4>
      <h4>
        <Link to="/chat-history" className="link">
          History
        </Link>
      </h4>
      <h4>
        <Link to="/contact-us" className="link">
          Contact
        </Link>
      </h4>
      <h4>
        <Link to="/us" className="link">
          About Us
        </Link>
      </h4>
      <h4>
        <button onClick={handlelogout} title="Log-out">
          <LogoutOutlined className="log-out" />
        </button>
      </h4>
    </div>
  );
};

export default Navbar;
