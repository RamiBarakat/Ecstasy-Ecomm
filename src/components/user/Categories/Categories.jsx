import React, { useState, useEffect, forwardRef } from 'react';
import './Categories.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, A11y } from 'swiper/modules';

const Categories = forwardRef((props, ref) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get('https://ecommerce-node4.onrender.com/categories/active');
      setCategories(data.categories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section ref={ref} className="categories" id="categories-section">
      <h3>Categories</h3>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={15}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        className="categories-swiper"
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <Link to={`/category_details/${category._id}`}>
              <div className="category-card">
                <img src={category.image.secure_url} alt={category.name} />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
});

export default Categories;
