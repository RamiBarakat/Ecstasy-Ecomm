import './Categories.css';
import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';  // Import navigation styles
import 'swiper/css/pagination'; 
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

const Categories = forwardRef((props, ref) => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    
    const { data } = await axios.get("https://ecommerce-node4.onrender.com/categories/active");
    console.log(data.categories);
    setCategories(data.categories);

    setLoading(false);
  };

  useEffect(() => {
    try {
      setLoading(true);
      getCategories();
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (loading === true) {
    return <p>Loading...</p>;
  }

  return (
    <section ref={ref} className='categories' id="categories-section"> 
      <h3>Categories</h3>
      <div className='category-gap'>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={15}
          slidesPerView={3}
          navigation={true}
          pagination={{ clickable: true }}
        >
          {categories.map(category => (
            <SwiperSlide key={category._id}>
              <Link to={`/category_details/${category._id}`}>
                <div className='category-card'>
                  <img src={category.image.secure_url} alt={category.name} />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
});

export default Categories;
