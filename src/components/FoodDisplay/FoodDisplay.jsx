"use client"

import { useContext } from "react"
import "./FoodDisplay.css"
import FoodItem from "../FoodItem/FoodItem"
import { StoreContext } from "../context/StoreContext"

const FoodDisplay = () => {
  const { food_list, category } = useContext(StoreContext)

  // Filter products based on selected category
  const filteredProducts = category === "All" ? food_list : food_list.filter((product) => product.category === category)

  // Separate available and sold out products
  const availableProducts = filteredProducts.filter((product) => product.quantityAvailable > 0)
  const soldOutProducts = filteredProducts.filter((product) => product.quantityAvailable === 0)

  if (filteredProducts.length === 0) {
    return (
      <div className="food-display">
        <p className="no-products">No products found in this category.</p>
      </div>
    )
  }

  return (
    <div className="food-display">
      {availableProducts.map((product) => (
        <FoodItem
          key={product.id || product.index}
          id={product.id || product.index}
          index={product.index}
          name={product.name}
          description={product.description}
          price={product.price}
          imageUrl={product.picture}
          rating={product.rating}
          isSoldOut={false}
        />
      ))}
      {soldOutProducts.map((product) => (
        <FoodItem
          key={`sold-out-${product.id || product.index}`}
          id={product.id || product.index}
          index={product.index}
          name={product.name}
          description={product.description}
          price={product.price}
          imageUrl={product.picture}
          rating={product.rating}
          isSoldOut={true}
        />
      ))}
    </div>
  )
}

export default FoodDisplay

