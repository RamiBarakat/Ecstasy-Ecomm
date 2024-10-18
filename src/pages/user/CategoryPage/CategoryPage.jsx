import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoryPage.css';
import { useNavigate } from 'react-router-dom';

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()

  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://ecommerce-node4.onrender.com/categories');
      console.log(data.categories);
      setCategories(data.categories);
      setFilteredCategories(data.categories);
      setLoading(false);
    } catch (error) {
      console.error('Error occurred while loading categories:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const filterQuery = (query) => {
    setSearchTerm(query);
    if (!query) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  const handleCategoryClick = (category_id) => {

    const selectedCategory = categories.find(cate => cate._id === category_id);

    navigate(`/products?categoryId=${category_id}`,
        {
             state : {
                selectedCategory,
                allCategories: categories
             }

        })
  }

  return (
    <div className="categories-page">
      <h1>Categories</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for anything!"
          value={searchTerm}
          onChange={(e) => filterQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="categories-grid">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (

              <div key={category._id} className="category-card"  onClick={() => handleCategoryClick(category._id)}>
                <img src={category.image.secure_url} alt={category.name} />
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            ))
          ) : (
            <p>No categories found</p>
          )}
        </div>
      )}
    </div>
  );
}
