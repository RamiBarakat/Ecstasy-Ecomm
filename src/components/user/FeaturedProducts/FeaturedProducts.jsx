import './FeaturedProducts.css';

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductModal from '../ProductModal/ProductModal';

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [productModal, setProductModal] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false)


    const getProducts = async (pageNumber) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products?page=${pageNumber}&limit=9`)
            setProducts(data.products);
            const totalProducts = data.total;
            setTotalPages(Math.ceil(totalProducts / 6));
            console.log(data.products, data.total);
            setLoading(false);
        } catch(err) {
            console.error('Error While Fetching Data!', err)
        }
    
    };
    
    useEffect(() => {
        getProducts(page);
    },[page]);
    
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    
    const openProductModal = (product) => {
        setProductModal(product);
        setModalOpen(true);
    };

    const closeProductModal = () => {
        setProductModal(null);
        setModalOpen(false);
    };


    return (
    <section className='featured-products' id="featured-section">
        <h2>Featured Products</h2>

            {loading ? (
                <p>Loading</p>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product._id} className='product-card' onClick={()=> openProductModal(product)}>
                            <img src={product.mainImage.secure_url} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p className='price'>${product.finalPrice}</p>
                            <button>Add to Cart</button>
                        </div>
                    ))}
                </div>
            )}

        
        {/*Pagination*/}
        <div className='pagination'>            
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

    </section>

  )
}
