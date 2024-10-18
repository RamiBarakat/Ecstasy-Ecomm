import React, {useState, useRef} from 'react'
import Categories from '../Categories/Categories'
import LandingPage from '../LandingPage/LandingPage'
import CategoryDetails from '../../../pages/user/CategoryDetails/CategoryDetails';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';

export default function Home() {
  
  const CategorySectionRef = useRef(null);

  const handleScrollToCategory= () => {
    if (CategorySectionRef.current)
      CategorySectionRef.current.scrollIntoView({behavior: 'smooth'})
  }
  
    return (
    <section className='home'>
      <LandingPage onStartShoppingClick={handleScrollToCategory}/>
      <Categories ref={CategorySectionRef}/>
      <FeaturedProducts/>
    </section>
  )
}
