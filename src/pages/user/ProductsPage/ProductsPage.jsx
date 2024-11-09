import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductModal from '../../../components/user/ProductModal/ProductModal';
import { useLocation } from 'react-router-dom';
import "../ProductsPage/ProductsPage.css";

export default function ProductsPage(props) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
      category: [],
      priceRange: [],
      inStock: false,
      searchQuery: ''
    });
    const [productModal, setProductModal] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const { selectedCategory, allCategories } = location.state || {}
  
    const getProducts = async (page = 1) => {
      try {
        const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products?page=${page}&limit=16`);
        setProducts(data.products);
        const PageCount = Math.ceil(data.total / 16);
        setTotalPages(PageCount);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    const filterProducts = () => {
      const { category, priceRange, inStock } = filters;
  
      let filtered = [...products]; 
  
      if (category.length > 0) {
        filtered = filtered.filter(product => category.includes(product.categoryId));
      }
  
      if (priceRange.length > 0) {
        filtered = filtered.filter(product => {
          return priceRange.some(range => {
            const [min, max] = range.split('-');
            return product.finalPrice >= min && product.finalPrice <= max;
          });
        });
      }
  
      if (inStock) {
        filtered = filtered.filter(product => product.stock > 0);
      }

      if (filters.searchQuery != '') {
          filtered = filtered.filter(product => product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()));
      }

  
      setFilteredProducts(filtered); // Update filtered products state
    };

    const checkProps = async () => { 
        if(!allCategories) {
          const { data } = await axios.get('https://ecommerce-node4.onrender.com/categories')
          console.log(data.categories)
          setCategories(data.categories);
        } else {
          setCategories(allCategories);
        }
    };

    
    useEffect(() => {
      checkProps();
    }, []);
    
  
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const categoryId = queryParams.get('categoryId');
      const query = queryParams.get('searchQuery')

      if (categoryId) {
        setFilters((prevFilters) => ({
          ...prevFilters, category: [categoryId]
        }));
      } else if (categoryId === '') {
        setFilters((prevFilters) => ({
          ...prevFilters, category: [] 
        }));
      }

      if (query) {
        setFilters((prevFilters) => ({
          ...prevFilters, searchQuery: query
        }));
      }

      getProducts(page);

    }, [page, location.search]);
  
    useEffect(() => {
      filterProducts();
    }, [filters, products]);
  
    const handlePageChange = (index) => {
      setPage(index);
    };
  
    const handleFilterChange = (e) => {
      const { name, value, checked } = e.target;
  
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
  
        if (name === 'category') {
          if (checked) {
            updatedFilters.category = [...updatedFilters.category, value];
          } else {
            updatedFilters.category = updatedFilters.category.filter(item => item !== value);
          }
        } else if (name === 'priceRange') {
          if (checked) {
            updatedFilters.priceRange = [...updatedFilters.priceRange, value];
          } else {
            updatedFilters.priceRange = updatedFilters.priceRange.filter(item => item !== value);
          }
        } else if (name === 'inStock') {
          updatedFilters.inStock = checked;
        }
  
        return updatedFilters;
      });
    };

    const openProductModal = (product) => {
        setProductModal(product);
        setModalOpen(true);
    };

    const closeProductModal = () => {
        setProductModal(null);
        setModalOpen(false);
    };

    const selectedCategoryNames = filters.category.map(cate => {
      const category = categories.find(c => c._id === cate);
      return category ? category.name : '';
    }).join(',') || "All Categories";

  
    return (
      <div className='products-page'>
        {<h2>Searched for {selectedCategoryNames}</h2>}

        <div className='row'>
            <aside className="sidebarProduct">
            <h3>Filters</h3>
    
            {/* Category Filter */}
            <div>
                <h4>Categories</h4>
                {categories.map((cate) => (
                  
                    <label>
                      <input
                        type="checkbox"
                        name="category"
                        key={cate._id}
                        value={cate._id}
                        onChange={handleFilterChange}
                        checked={filters.category.includes(cate._id)}
                      />
                    {cate.name}
                    </label>
                  
                ))}
            </div>
    
            {/* Price Range Filter */}
            <div>
                <h4>Price Range</h4>
                <label>
                <input
                    type="checkbox"
                    name="priceRange"
                    value="0-100"
                    onChange={handleFilterChange}
                />
                $0 - $100
                </label>
                <label>
                <input
                    type="checkbox"
                    name="priceRange"
                    value="100-300"
                    onChange={handleFilterChange}
                />
                $100 - $300
                </label>
                <label>
                <input
                    type="checkbox"
                    name="priceRange"
                    value="300-500"
                    onChange={handleFilterChange}
                />
                $300 - $500
                </label>
            </div>
    
            {/* Stock Availability */}
            <div>
                <label>
                <input
                    type="checkbox"
                    name="inStock"
                    onChange={handleFilterChange}
                />
                In Stock Only
                </label>
            </div>
          </aside>
            
            
            {/* Product Grid */}
            <div className="products-grid-1">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <div key={product._id} className="product-card" onClick={() => openProductModal(product)}>
                        <img src={product.mainImage.secure_url} alt={product.name} />
                        <h4>{product.name}</h4>
                        <p>${product.finalPrice}</p>
                        <button>Add to Cart</button>
                    </div>
                ))
            ) : (
                <div className='wait'>
                No products found
                </div>
            )}
            </div>
        </div>
  
        {/* Pagination */}
        <div className="pagination">
          {[...Array(totalPages).keys()].map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handlePageChange(pageIndex + 1)}
              className={pageIndex + 1 === page ? 'active' : ''}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>
 
        {/*Product Modal*/}
        {isModalOpen && (<ProductModal product={productModal} onClose={closeProductModal} /> )}
      </div>
    );

  }

