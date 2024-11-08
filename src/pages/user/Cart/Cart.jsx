import React, { useState } from 'react'
import './Cart.css'


export default function Cart() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [cartItems, setCartItems] = useState([
        {
          id: 1,
          name: 'Lucite Incense Holder Set',
          description: 'Set of 2',
          price: 14,
          quantity: 3,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          name: 'Arc Dusen Dusen Puzzle',
          description: 'Puzzle',
          price: 28,
          quantity: 1,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 3,
          name: 'Lucite Stapler',
          description: 'Iridescent',
          price: 26,
          quantity: 1,
          image: 'https://via.placeholder.com/150',
        },
      ]);

      const checkLogin = () => {
        if (localStorage.getItem('token')) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      }

    const getTotalPrice = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2);
    }

    const decreaseQuantity = (id) => {
        setCartItems(cartItems.map( item => {
            if(item.id === id) {
                return {...item, quantity: Math.max(item.quantity - 1, 1)}
            }
            return item;
        }));
    }

    const increaseQuantity = (id) =>
    {
        const newItems = cartItems.map(item => {
            if(item.id === id) {
                return {...item, quantity: item.quantity + 1}
            }
            return item;
        })

        setCartItems(newItems);

    }

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    }

  return (
    <div className='cart-container'>
      <h2>Cart</h2>
      {loggedIn ? (
        <div className="cart-items">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="product-cell">
                    <button
                      className="remove-button"
                      onClick={() => removeItem(item.id)}
                    >
                      x
                    </button>
                    <img src={item.image} alt={item.name} />
                    <h3>{item.name}</h3>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="not-table">
            <div className="special-instruction">
              <h3>Special Instruction</h3>
              <textarea placeholder="Add a note to your order"></textarea>
            </div>

            <div className="cart-summary">
              <p>Total: $ {getTotalPrice()} USD</p>
              <p>Taxes and shipping not included</p>
              <button className="checkout-button">Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Please login to view your cart</p>
      )}
    </div>
  );
}