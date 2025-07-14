"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const allowedStatus = ["pending", "processing", "shipped", "delivered", "cancelled"]

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingStatus, setUpdatingStatus] = useState({})
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("success")

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [showToast])

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken")
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem("authToken")
      if (!token) {
        setError("Authentication token not found. Please log in as an administrator.")
        setOrders([])
        setLoading(false)
        return
      }

      const response = await axios.get("/api/users/all-orders", getAuthHeaders())

      if (response.data && response.data.success && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders)
      } else {
        setOrders([])
        showToastMessage("No orders found or invalid data format.", "info")
      }
    } catch (err) {
      console.error("Error fetching all orders:", err)
      setError(err.response?.data?.message || "Failed to load orders. Please check your permissions.")
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingStatus((prev) => ({ ...prev, [orderId]: true }))
    try {
      const response = await axios.patch(
        "/api/users/update-order-status",
        { orderId, status: newStatus },
        getAuthHeaders(),
      )

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order)),
        )
        showToastMessage("Order status updated successfully!", "success")
      } else {
        showToastMessage(response.data.message || "Failed to update order status.", "error")
      }
    } catch (err) {
      console.error("Error updating order status:", err)
      showToastMessage(err.response?.data?.message || "Failed to update order status.", "error")
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [orderId]: false }))
    }
  }

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
  }

  const handleCloseToast = () => {
    setShowToast(false)
  }

  const pageStyles = {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  }

  const mainContainerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  }

  const titleStyles = {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
    textAlign: "center",
  }

  const subtitleStyles = {
    fontSize: "16px",
    color: "#666",
    marginBottom: "40px",
    textAlign: "center",
  }

  const tableContainerStyles = {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    overflowX: "auto",
  }

  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px",
  }

  const thStyles = {
    padding: "12px 15px",
    textAlign: "left",
    borderBottom: "2px solid #e5e7eb",
    backgroundColor: "#f8f9fa",
    color: "#333",
    fontWeight: "600",
    fontSize: "14px",
    textTransform: "uppercase",
  }

  const tdStyles = {
    padding: "12px 15px",
    textAlign: "left",
    borderBottom: "1px solid #e5e7eb",
    color: "#555",
    fontSize: "14px",
  }

  const statusSelectStyles = {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: "white",
    fontSize: "13px",
    cursor: "pointer",
    minWidth: "120px",
  }

  const emptyOrdersStyles = {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  }

  const emptyOrdersIconStyles = {
    fontSize: "64px",
    color: "#ddd",
    marginBottom: "20px",
  }

  const emptyOrdersTextStyles = {
    fontSize: "20px",
    color: "#666",
    marginBottom: "10px",
  }

  const emptyOrdersSubtextStyles = {
    fontSize: "14px",
    color: "#999",
    marginBottom: "30px",
  }

  const loadingStyles = {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
  }

  const errorDisplayStyles = {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
    color: "#dc3545",
  }

  const getToastBackgroundStyles = (type) => {
    switch (type) {
      case "success":
        return { backgroundColor: "#28a745", color: "white" }
      case "error":
        return { backgroundColor: "#dc3545", color: "white" }
      case "info":
        return { backgroundColor: "#007bff", color: "white" }
      default:
        return { backgroundColor: "#28a745", color: "white" }
    }
  }

  const toastContainerStyles = {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "16px 20px",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: "300px",
    zIndex: 1000,
    animation: "slideIn 0.3s ease-out",
  }

  const toastHiddenStyles = {
    display: "none",
  }

  const toastCloseButtonStyles = {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "18px",
    marginLeft: "auto",
  }

  useEffect(() => {
    const styleId = "toast-animation-admin-orders"
    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement("style")
      styleSheet.id = styleId
      styleSheet.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `
      document.head.appendChild(styleSheet)
    }
  }, [])

  if (loading) {
    return <div style={loadingStyles}>Loading all orders...</div>
  }

  if (error) {
    return <div style={errorDisplayStyles}>{error}</div>
  }

  return (
    <div style={pageStyles}>
      {/* Main Content */}
      <main style={mainContainerStyles}>
        <h1 style={titleStyles}>All Orders</h1>
        <p style={subtitleStyles}>Manage all customer orders and update their statuses.</p>

        {orders.length === 0 ? (
          <div style={emptyOrdersStyles}>
            <div style={emptyOrdersIconStyles}>📦</div>
            <div style={emptyOrdersTextStyles}>No orders found</div>
            <div style={emptyOrdersSubtextStyles}>There are no orders to display at the moment.</div>
          </div>
        ) : (
          <div style={tableContainerStyles}>
            <table style={tableStyles}>
              <thead>
                <tr>
                  <th style={thStyles}>Order ID</th>
                  <th style={thStyles}>Ordered By</th>
                  <th style={thStyles}>Items</th>
                  <th style={thStyles}>Quantity</th>
                  <th style={thStyles}>Amount</th>
                  <th style={thStyles}>Shipping Address</th>
                  <th style={thStyles}>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td style={tdStyles}>{order.orderID}</td>
                    <td style={tdStyles}>{order.user?.username || "N/A"}</td>
                    <td style={tdStyles}>
                      {order.items.map((item, index) => (
                        <div key={index}>{item.product?.name || "Unknown Product"}</div>
                      ))}
                    </td>
                    <td style={tdStyles}>{order.items.reduce((total, item) => total + item.quantity, 0)}</td>
                    <td style={tdStyles}>${order.totalAmount.toFixed(2)}</td>
                    <td style={tdStyles}>{order.shippingAddress}</td>
                    <td style={tdStyles}>
                      <select
                        style={statusSelectStyles}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        disabled={updatingStatus[order._id]}
                      >
                        {allowedStatus.map((statusOption) => (
                          <option key={statusOption} value={statusOption}>
                            {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Toast Notification (Inline) */}
      <div style={showToast ? { ...toastContainerStyles, ...getToastBackgroundStyles(toastType) } : toastHiddenStyles}>
        <span style={{ fontSize: "20px" }}>{toastType === "success" ? "✅" : toastType === "error" ? "❌" : "ℹ️"}</span>
        <span style={{ flex: 1, fontWeight: "500" }}>{toastMessage}</span>
        <button onClick={handleCloseToast} style={toastCloseButtonStyles}>
          ×
        </button>
      </div>
    </div>
  )
}
