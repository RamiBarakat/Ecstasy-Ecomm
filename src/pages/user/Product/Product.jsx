import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'

export default function Product() {
    const [products, setProducts] = useState([]);
    
    const {productId} = useParams();
    console.log(categoryId); 
    const getProducts = async ()=>{
      const {data} = await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`);
      console.log(data);
      setProducts(data);

    }
    
    useEffect(()=>{
        getProducts();
    },[])
    
  return (
    <section className='products'>
    {products.map(product =>
        <div className='category' key={product._id}>
            <h2>{product.name}</h2>
            <img src={product.mainImage.secure_url} alt={category.name}/>
        </div>
    )}
</section>
  )
}
