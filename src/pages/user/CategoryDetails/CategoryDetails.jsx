import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CategoryDetails.css';

export default function CategoryDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/category/${id}`);
      setProducts(data.products);
      setLoading(false);
    } catch (err) {
      console.error('Error while fetching products!', err);
      setError('Failed to fetch products.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <section className="products">
      {products.map(product => (
        <div className="product-card" key={product._id}>
          <img src={product.mainImage.secure_url} alt={product.name} className="product-image" />
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">${product.finalPrice}</p>
        </div>
      ))}
    </section>
  );
}
