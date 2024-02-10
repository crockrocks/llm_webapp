import React from 'react';
import './styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="brand">Trendy Threads</span>
      </div>
      <div className="categories">
        <span className="category">Shirts</span>
        <span className="category">T-Shirts</span>
        <span className="category">Shoes</span>
        <span className="category">Bags</span>
      </div>
    </nav>
  );
};

export default Navbar;
