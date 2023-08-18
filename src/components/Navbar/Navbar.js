import React from "react";
import "./navbar.css";
import "../../App.css";
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <Link to="/chat" className="link">
          Chat History
        </Link>
      </h4>
      <h4>
        <Link to="/" className="link">
          Chat
        </Link>
      </h4>
      <h4>
        <Link to="/contact" className="link">
          Contact
        </Link>
      </h4>
      <h4>
        <Link to="/About" className="link">
          About Us
        </Link>
      </h4>
    </div>
  );
};

export default Navbar;
