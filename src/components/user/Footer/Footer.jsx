import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">
            Ecstasy<span className="dot">.</span>
          </h3>
          <p>Your go-to platform for the best products, delivering quality and style to your doorstep.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/account">Account Info</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@ecstasy.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Ecstasy St, Shopping City, Country</p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📷</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">🔗</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Ecstasy. All rights reserved.</p>
        <div className="legal-links">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
