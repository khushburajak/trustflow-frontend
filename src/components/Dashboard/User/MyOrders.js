"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const MyOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastType, setToastType] = useState("success")

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            setError(null)

            const token = localStorage.getItem("authToken")
            if (!token) {
                setOrders([])
                setLoading(false)
                return
            }

            const response = await axios.get("/api/users/orders", getAuthHeaders())

            if (response.data && response.data.success && Array.isArray(response.data.orders)) {
                setOrders(response.data.orders)
            } else {
                setOrders([])
            }
        } catch (err) {
            console.error("Error fetching orders:", err)
            setError("Failed to load orders. Please try again later.")
            setOrders([])
        } finally {
            setLoading(false)
        }
    }

    const getAuthHeaders = () => {
        const token = localStorage.getItem("authToken")
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    }

    const showToastMessage = (message, type = "success") => {
        setToastMessage(message)
        setToastType(type)
        setShowToast(true)

        setTimeout(() => {
            setShowToast(false)
        }, 3000)
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

    const headerStyles = {
        width: "100%",
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "16px 24px",
    }

    const headerContainerStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "1280px",
        margin: "0 auto",
    }

    const logoContainerStyles = {
        display: "flex",
        alignItems: "center",
    }

    const logoStyles = {
        backgroundColor: "black",
        padding: "8px 12px",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
    }

    const dotStyles = {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
    }

    const redDotStyles = {
        ...dotStyles,
        backgroundColor: "#ef4444",
    }

    const orangeDotStyles = {
        ...dotStyles,
        backgroundColor: "#f97316",
    }

    const logoTextStyles = {
        color: "white",
        fontWeight: "600",
        marginLeft: "8px",
        fontSize: "16px",
    }

    const searchContainerStyles = {
        flex: "1",
        maxWidth: "384px",
        margin: "0 32px",
    }

    const searchWrapperStyles = {
        position: "relative",
    }

    const searchInputStyles = {
        width: "100%",
        padding: "8px 40px 8px 16px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "14px",
        outline: "none",
    }

    const searchIconStyles = {
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#9ca3af",
        width: "16px",
        height: "16px",
    }

    const navStyles = {
        display: "flex",
        alignItems: "center",
        gap: "32px",
    }

    const navLinkStyles = {
        color: "#374151",
        fontWeight: "500",
        textDecoration: "none",
        fontSize: "14px",
        cursor: "pointer",
    }

    const authLinksStyles = {
        color: "#374151",
        fontWeight: "500",
        fontSize: "14px",
        cursor: "pointer",
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

    const statusBadgeStyles = (status) => {
        let backgroundColor = "#6c757d"
        let color = "white"

        switch (status) {
            case "Delivered":
                backgroundColor = "#28a745"
                break
            case "Processing":
                backgroundColor = "#ffc107"
                color = "#333"
                break
            case "Shipped":
                backgroundColor = "#007bff"
                break
            case "Cancelled":
                backgroundColor = "#dc3545"
                break
            default:
                break
        }

        return {
            backgroundColor,
            color,
            padding: "6px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            display: "inline-block",
            minWidth: "80px",
            textAlign: "center",
        }
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

    const continueShoppingButtonStyles = {
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "15px 30px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "600",
        transition: "background-color 0.2s",
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

    const toastStyles = {
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: toastType === "success" ? "#28a745" : "#dc3545",
        color: "white",
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

    const styleSheet = document.styleSheets[0]
    if (styleSheet && !document.querySelector("#toast-animation-orders")) {
        const keyframes = `
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
        const style = document.createElement("style")
        style.id = "toast-animation-orders"
        style.textContent = keyframes
        document.head.appendChild(style)
    }

    const SearchIcon = () => (
        <svg
            style={searchIconStyles}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
        </svg>
    )

    if (loading) {
        return <div style={loadingStyles}>Loading your orders...</div>
    }

    if (error) {
        return <div style={errorDisplayStyles}>{error}</div>
    }

    return (
        <div style={pageStyles}>

            {/* Main Content */}
            <main style={mainContainerStyles}>
                <h1 style={titleStyles}>My Orders</h1>
                <p style={subtitleStyles}>Track the status of your recent and past orders</p>

                {orders.length === 0 ? (
                    <div style={emptyOrdersStyles}>
                        <div style={emptyOrdersIconStyles}>📦</div>
                        <div style={emptyOrdersTextStyles}>No orders found</div>
                        <div style={emptyOrdersSubtextStyles}>It looks like you haven't placed any orders yet.</div>
                        <button
                            style={continueShoppingButtonStyles}
                            onClick={() => (window.location.href = "/products")}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#0056b3"
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#007bff"
                            }}
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div style={tableContainerStyles}>
                        <table style={tableStyles}>
                            <thead>
                                <tr>
                                    <th style={thStyles}>Order ID</th>
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
                                        <td style={tdStyles}>
                                            {order.items.map((item, index) => (
                                                <div key={index}>{item.product.name}</div>
                                            ))}
                                        </td>
                                        <td style={tdStyles}>{order.items.reduce((total, item) => total + item.quantity, 0)}</td>
                                        <td style={tdStyles}>${order.totalAmount.toFixed(2)}</td>
                                        <td style={tdStyles}>{order.shippingAddress}</td>
                                        <td style={tdStyles}>
                                            <span style={statusBadgeStyles(order.status)}>{order.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {/* Toast Notification */}
            <div style={showToast ? toastStyles : toastHiddenStyles}>
                <span style={{ fontSize: "20px" }}>{toastType === "success" ? "✅" : "❌"}</span>
                <span style={{ flex: 1, fontWeight: "500" }}>{toastMessage}</span>
                <button onClick={handleCloseToast} style={toastCloseButtonStyles}>
                    ×
                </button>
            </div>
        </div>
    )
}

export default MyOrders
