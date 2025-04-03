"use client"

import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./placeOrder.css"
import { StoreContext } from "../../components/context/StoreContext"

const PlaceOrder = () => {
  const { cart, setCart, getTotalPrice } = useContext(StoreContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "card",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    // Redirect to home if cart is empty
    if (Object.keys(cart).length === 0) {
      navigate("/")
    }
  }, [cart, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required"

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      // Generate random order number
      const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString()
      setOrderNumber(randomOrderNumber)
      setOrderComplete(true)
      setCart({})
      localStorage.removeItem("cart")
      setIsSubmitting(false)
    }, 2000)
  }

  if (orderComplete) {
    return (
      <div className="order-success">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your order, {formData.name}.</p>
        <p>
          Your order number is: <strong>{orderNumber}</strong>
        </p>
        <p>We've sent a confirmation email to {formData.email}.</p>
        <p>Your order will be delivered to:</p>
        <address>
          {formData.address}, {formData.city}, {formData.zipCode}
        </address>
        <Link to="/" className="back-to-shop">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="place-order-container">
      <h1>Checkout</h1>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="summary-total">
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <h2>Shipping Information</h2>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? "error" : ""}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? "error" : ""}
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={errors.zipCode ? "error" : ""}
            />
            {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
          </div>
        </div>

        <h2>Payment Method</h2>

        <div className="payment-methods">
          <div className="payment-method">
            <input
              type="radio"
              id="card"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === "card"}
              onChange={handleChange}
            />
            <label htmlFor="card">Credit/Debit Card</label>
          </div>

          <div className="payment-method">
            <input
              type="radio"
              id="paytm"
              name="paymentMethod"
              value="paytm"
              checked={formData.paymentMethod === "paytm"}
              onChange={handleChange}
            />
            <label htmlFor="paytm">paytm</label>
          </div>
        </div>

        <div className="form-actions">
          <Link to="/cart" className="back-button">
            Back to Cart
          </Link>
          <button
            type="submit"
            className={`place-order-button ${isSubmitting ? "loading" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder

