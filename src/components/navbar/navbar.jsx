"use client"

import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import "./navbar.css"
import { StoreContext } from "../context/StoreContext"

const Navbar = () => {
  const [menu, setMenu] = useState("shop")
  const { getTotalItems } = useContext(StoreContext)
  const cartItemCount = getTotalItems()

  return (
    <div className="navbar">
      <Link to="/">
        <img src="/assets/textLogo.svg" alt="text logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <li onClick={() => setMenu("shop")} className={menu === "shop" ? "active" : ""}>
          <Link to="/">Shop</Link>
        </li>
        <li onClick={() => setMenu("explore")} className={menu === "explore" ? "active" : ""}>
          <Link to="/">Cookbook</Link>
        </li>
        <li onClick={() => setMenu("reelRecipes")} className={menu === "reelRecipes" ? "active" : ""}>
          <Link to="/">Reel Recipes</Link>
        </li>
      </ul>
      <div className="navbar-right">
        <img src="/assets/search_icon.png" alt="Search" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src="/assets/basket_icon.png" alt="Cart" />
            {cartItemCount > 0 && <div className="dot">{cartItemCount}</div>}
          </Link>
        </div>
        <button>sign in</button>
      </div>
    </div>
  )
}

export default Navbar

