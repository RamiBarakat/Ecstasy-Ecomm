import React from 'react';
import './ProductModal.css';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal-content'>
        <button className="close-modal" onClick={onClose}>×</button>

        <div className='modal-body'>
          <div className='modal-images'>
            <img src={product.mainImage.secure_url} alt={product.name} />
            <div className='sub-images'>
              {product.subImages && product.subImages.map((img, index) => (
                <img key={index} src={img.secure_url} alt={product.name} />
              ))}
            </div>
          </div>

          <div className='modal-info'>
            <h2>{product.name}</h2>
            <p className='modal-description'>{product.description}</p>
            <p className='modal-price'>${product.finalPrice}</p>
            <div className='modal-buttons'>
              <button className='add-to-cart-btn'>Add to Cart</button>
              <button className='buy-now-btn'>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
