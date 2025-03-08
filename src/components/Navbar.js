import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#000", color: "#fff" }}>
      <h2>CryptoTracker</h2>
      <div>
        <Link to="/" style={{ margin: "0 15px", color: "#fff" }}>Home</Link>
        <Link to="/cryptocurrencies" style={{ margin: "0 15px", color: "#fff" }}>Cryptocurrencies</Link>
      </div>
    </nav>
  );
};

export default Navbar;
