import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './AdminDashboard.css';
import { FaTags, FaBox, FaGift } from 'react-icons/fa'; // Importing Font Awesome icons

export default function AdminDashboard() {
    return (
        <div className='admin-dashboard'>
            <aside className='sidebar'>
                <img src='src/assets/logo.png' alt='Logo' />
                <nav>
                    <ul>
                        <li>
                        <div className='col'>
                            <Link to="/admin/categories">
                                <span className="icon"><FaTags /></span> 
                                <a>Categories</a>
                            </Link>
                        </div>
                        </li>
                        <li>
                            <div className='col'>
                                <Link to="/admin/products">
                                    <span className="icon"><FaBox /></span> 
                                    <a>Products</a>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className='col'>
                                <Link to="/admin/coupons">
                                    <span className="icon"><FaGift /></span> 
                                    <a>Coupons</a>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className='content'>
                <Outlet />
            </main>
        </div>
    );
}
