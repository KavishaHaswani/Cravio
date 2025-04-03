"use client"

import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const StoreContext = createContext({
  food_list: [],
  category: "All",
  cart: {},
  setCategory: () => {},
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  getTotalItems: () => {},
  getTotalPrice: () => {},
})

const StoreContextProvider = ({ children }) => {
  const [food_list, setFoodList] = useState([])
  const [category, setCategory] = useState("All")
  const [cart, setCart] = useState({})

  useEffect(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }

    // Fetch food items
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3003/products")
        setFoodList(response.data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        [productId]: (prevCart[productId] || 0) + 1,
      }
      return updatedCart
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart }
      if (updatedCart[productId] > 1) {
        updatedCart[productId] -= 1
      } else {
        delete updatedCart[productId]
      }
      return updatedCart
    })
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  }

  const getTotalPrice = () => {
    return food_list.reduce((total, product) => {
      const quantity = cart[product.id] || 0
      return total + product.price * quantity
    }, 0)
  }

  return (
    <StoreContext.Provider
      value={{
        food_list,
        category,
        cart,
        setCategory,
        setCart,
        addToCart,
        removeFromCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider

