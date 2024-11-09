import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [query, setQuery] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const isLogin = () => {
    if (localStorage.getItem('userToken')) {
      setLoggedIn(true);

    } else {
      setLoggedIn(false);
    }
  }


  useEffect(()=>{
    isLogin()
  },[])

  const getCategories = async () => {
    try {
      const { data } = await axios.get('https://ecommerce-node4.onrender.com/categories');
      setCategories(data.categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const searchQuery = () => {
    navigate(`/products?categoryId=${selectedCategory}&searchQuery=${query}`, {
      state: {
        selectedCategory,
        allCategories: categories,
      },
    });
  };

  return (
    <nav className="navbar">
      <div className="top-part">
        <div className="sign-in-register">
          {loggedIn ? (
            <p>Welcome, <a href="/profile">User</a></p>
          ) : (
            <p><a href="/login">Login</a> or <a href="/register">Register</a></p>
          )}
        </div>

        <div className="top-links">
          <Link to="/all_categories">Categories</Link>
          <Link to="/products">Products</Link>
          <ScrollLink to="footer" smooth={true} duration={500}>
            Help & Contact
          </ScrollLink>
        </div>

        <div className="wishlist-cart">
          <a href="#">Wishlist</a>
          <Link to="/cart">
            <FaShoppingCart size={24} />
          </Link>
        </div>
      </div>

      <div className="sep" />

      <div className="bottom-part">
        <div className="logo">
          <Link to="/">
            <img alt="logo" src="src/assets/logo.png" />
          </Link>
        </div>

        <div className="navbar-search">
          <select
            className="search-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cate) => (
              <option key={cate._id} value={cate._id}>
                {cate.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search for anything"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn" onClick={searchQuery}>
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}
