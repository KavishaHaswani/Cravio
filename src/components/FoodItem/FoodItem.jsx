"use client"

import { useContext } from "react"
import "./FoodItem.css"
import { StoreContext } from "../context/StoreContext"

const FoodItem = ({ id, index, name, description, price, imageUrl, rating, isSoldOut }) => {
  const { cart, addToCart, removeFromCart } = useContext(StoreContext)
  const quantity = cart[id] || 0

  const renderStars = () => {
    const validRating = Math.max(0, Math.min(5, rating))
    const roundedRating = Math.round(validRating)
    const emptyStars = 5 - roundedRating

    return (
      <div className="stars">
        {Array(roundedRating)
          .fill()
          .map((_, idx) => (
            <span key={`full-${idx}`} className="star full">
              ★
            </span>
          ))}
        {Array(emptyStars)
          .fill()
          .map((_, idx) => (
            <span key={`empty-${idx}`} className="star empty">
              ☆
            </span>
          ))}
      </div>
    )
  }

  return (
    <div className="food-item">
      <div className={`food-item__image-wrapper ${isSoldOut ? "sold-out" : ""}`}>
        <img src={`/assets/${imageUrl}`} alt={name} className="food-item__image" />
        {isSoldOut && <div className="food-item__overlay">Sold Out</div>}
      </div>
      <div className="food-item__details">
        <div className="food-item__rating">
          {renderStars()}
          <p className="food-item__name">{name}</p>
          <p className="food-item__description">{description}</p>
          <p className="food-item__price">${price}</p>
        </div>
        <div className="food-item__actions">
          {!isSoldOut &&
            (quantity === 0 ? (
              <button className="food-item__add-to-cart" onClick={() => addToCart(id)}>
                Add to Cart
              </button>
            ) : (
              <>
                <button className="food-item__decrement" onClick={() => removeFromCart(id)}>
                  -
                </button>
                <span className="food-item__quantity">{quantity}</span>
                <button className="food-item__increment" onClick={() => addToCart(id)}>
                  +
                </button>
              </>
            ))}
        </div>
      </div>
    </div>
  )
}

export default FoodItem

