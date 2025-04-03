"use client"

import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./cart.css"
import { StoreContext } from "../../components/context/StoreContext"

const Cart = () => {
  const { food_list, cart, addToCart, removeFromCart, getTotalPrice } = useContext(StoreContext)
  const navigate = useNavigate()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Filter products that are in the cart
  const cartItems = food_list.filter((item) => cart[item.id || item.index])

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      navigate("/order")
    }, 1500)
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {cartItems.map((item) => {
          const itemId = item.id || item.index
          const quantity = cart[itemId] || 0
          const itemTotal = item.price * quantity

          return (
            <div key={itemId} className="cart-item">
              <div className="cart-item-image">
                <img src={`/assets/${item.picture}`} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-description">{item.description}</p>
                <p className="cart-item-price">${item.price}</p>
              </div>
              <div className="cart-item-quantity">
                <button className="quantity-btn" onClick={() => removeFromCart(itemId)}>
                  -
                </button>
                <span>{quantity}</span>
                <button className="quantity-btn" onClick={() => addToCart(itemId)}>
                  +
                </button>
              </div>
              <div className="cart-item-total">${itemTotal.toFixed(2)}</div>
            </div>
          )
        })}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        <button
          className={`checkout-btn ${isCheckingOut ? "loading" : ""}`}
          onClick={handleCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
        </button>
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default Cart

