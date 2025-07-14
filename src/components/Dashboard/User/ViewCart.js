import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [removingItem, setRemovingItem] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users/saved-products', getAuthHeaders());

      if (response.data.success) {
        setCartItems(response.data.data || []);
      } else {
        setCartItems([]);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching cart items:', err);
      setError('Failed to load cart items');
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      setRemovingItem(productId);

      await axios.delete(`/api/users/remove-product/${productId}`, getAuthHeaders());

      setCartItems(prevItems => prevItems.filter(item => item._id !== productId));

      showToastMessage('Item removed from cart successfully!', 'success');

    } catch (err) {
      console.error('Error removing item from cart:', err);
      showToastMessage('Failed to remove item from cart', 'error');
    } finally {
      setRemovingItem(null);
    }
  };

  const handleBuyNow = async (productId) => {
    try {
      setPlacingOrder(true);

      await axios.post('/api/products/place-order', {
        productId: productId,
        action: 'buy_now',
        quantity: 1
      }, getAuthHeaders());

      showToastMessage('Order placed successfully!', 'success');

    } catch (err) {
      console.error('Error placing order:', err);
      showToastMessage('Failed to place order', 'error');
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleBuyAll = async () => {
    if (cartItems.length === 0) {
      showToastMessage('Your cart is empty', 'error');
      return;
    }

    try {
      setPlacingOrder(true);

      const orderData = {
        products: cartItems.map(item => ({
          productId: item._id,
          quantity: 1
        })),
        action: 'buy_all'
      };

      await axios.post('/api/products/place-bulk-order', orderData, getAuthHeaders());

      showToastMessage('All items ordered successfully!', 'success');

      setCartItems([]);

    } catch (err) {
      console.error('Error placing bulk order:', err);
      showToastMessage('Failed to place order', 'error');
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleContinueShopping = () => {
    window.location.href = '/products';
  };

  const handleViewProduct = (productId) => {
    window.location.href = `/products/${productId}`;
  };

  const calculateTotalTrustScore = () => {
    if (cartItems.length === 0) return 0;
    const totalScore = cartItems.reduce((sum, item) => sum + (item.trustScore || 0), 0);
    return (totalScore / cartItems.length).toFixed(1);
  };

  const pageStyles = {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  };

  const headerStyles = {
    width: '100%',
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px 24px',
  };

  const headerContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1280px',
    margin: '0 auto',
  };

  const logoContainerStyles = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoStyles = {
    backgroundColor: 'black',
    padding: '8px 12px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const dotStyles = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  };

  const redDotStyles = {
    ...dotStyles,
    backgroundColor: '#ef4444',
  };

  const orangeDotStyles = {
    ...dotStyles,
    backgroundColor: '#f97316',
  };

  const logoTextStyles = {
    color: 'white',
    fontWeight: '600',
    marginLeft: '8px',
    fontSize: '16px',
  };

  const searchContainerStyles = {
    flex: '1',
    maxWidth: '384px',
    margin: '0 32px',
  };

  const searchWrapperStyles = {
    position: 'relative',
  };

  const searchInputStyles = {
    width: '100%',
    padding: '8px 40px 8px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  };

  const searchIconStyles = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    width: '16px',
    height: '16px',
  };

  const navStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  };

  const navLinkStyles = {
    color: '#374151',
    fontWeight: '500',
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer',
  };

  const authLinksStyles = {
    color: '#374151',
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer',
  };

  const mainContainerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  };

  const titleStyles = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center',
  };

  const subtitleStyles = {
    fontSize: '16px',
    color: '#666',
    marginBottom: '40px',
    textAlign: 'center',
  };

  const cartSummaryStyles = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  };

  const summaryItemStyles = {
    textAlign: 'center',
  };

  const summaryLabelStyles = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '5px',
    fontWeight: '500',
  };

  const summaryValueStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  };

  const cartItemsContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '30px',
  };

  const cartItemStyles = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const productImageStyles = {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
    flexShrink: 0,
  };

  const productInfoStyles = {
    flex: 1,
    minWidth: 0,
  };

  const productNameStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
    cursor: 'pointer',
  };

  const productDescriptionStyles = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '12px',
    lineHeight: '1.5',
  };

  const productMetaStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '15px',
  };

  const trustScoreStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const trustScoreBadgeStyles = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  };

  const categoryBadgeStyles = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  };

  const actionButtonsStyles = {
    display: 'flex',
    gap: '10px',
    flexShrink: 0,
  };

  const buyButtonStyles = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  };

  const removeButtonStyles = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  };

  const viewButtonStyles = {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  };

  const bottomActionsStyles = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  };

  const continueShoppingButtonStyles = {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  };

  const buyAllButtonStyles = {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const emptyCartStyles = {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const emptyCartIconStyles = {
    fontSize: '64px',
    color: '#ddd',
    marginBottom: '20px',
  };

  const emptyCartTextStyles = {
    fontSize: '20px',
    color: '#666',
    marginBottom: '10px',
  };

  const emptyCartSubtextStyles = {
    fontSize: '14px',
    color: '#999',
    marginBottom: '30px',
  };

  const loadingStyles = {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
  };

  const errorStyles = {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#dc3545',
  };

  const toastStyles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: toastType === 'success' ? '#28a745' : '#dc3545',
    color: 'white',
    padding: '16px 20px',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: '300px',
    zIndex: 1000,
    animation: 'slideIn 0.3s ease-out',
  };

  const toastHiddenStyles = {
    display: 'none',
  };

  const toastCloseButtonStyles = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '18px',
    marginLeft: 'auto',
  };

  const styleSheet = document.styleSheets[0];
  if (styleSheet && !document.querySelector('#toast-animation-cart')) {
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
    `;
    const style = document.createElement('style');
    style.id = 'toast-animation-cart';
    style.textContent = keyframes;
    document.head.appendChild(style);
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
  );

  const CartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13H17ZM9 21C9.6 21 10 21.4 10 22S9.6 23 9 23 8 22.6 8 22 8.4 21 9 21ZM20 21C20.6 21 21 21.4 21 22S20.6 23 20 23 19 22.6 19 22 19.4 21 20 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (loading) {
    return <div style={loadingStyles}>Loading your cart...</div>;
  }

  if (error) {
    return <div style={errorStyles}>{error}</div>;
  }

  return (
    <div style={pageStyles}>

      {/* Main Content */}
      <main style={mainContainerStyles}>
        <h1 style={titleStyles}>My Cart</h1>
        <p style={subtitleStyles}>Review your saved products and make your purchase</p>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div style={emptyCartStyles}>
            <div style={emptyCartIconStyles}>🛒</div>
            <div style={emptyCartTextStyles}>Your cart is empty</div>
            <div style={emptyCartSubtextStyles}>
              Start shopping and add products to your cart!
            </div>
            <button
              style={continueShoppingButtonStyles}
              onClick={handleContinueShopping}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#5a6268';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#6c757d';
              }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Summary */}
            <div style={cartSummaryStyles}>
              <div style={summaryItemStyles}>
                <div style={summaryLabelStyles}>Total Items</div>
                <div style={summaryValueStyles}>{cartItems.length}</div>
              </div>
              <div style={summaryItemStyles}>
                <div style={summaryLabelStyles}>Average Trust Score</div>
                <div style={summaryValueStyles}>{calculateTotalTrustScore()}/10</div>
              </div>
              <div style={summaryItemStyles}>
                <div style={summaryLabelStyles}>Categories</div>
                <div style={summaryValueStyles}>
                  {[...new Set(cartItems.map(item => item.category))].length}
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div style={cartItemsContainerStyles}>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  style={cartItemStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    style={productImageStyles}
                  />

                  <div style={productInfoStyles}>
                    <h3
                      style={productNameStyles}
                      onClick={() => handleViewProduct(item._id)}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#007bff';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#333';
                      }}
                    >
                      {item.name}
                    </h3>
                    <p style={productDescriptionStyles}>
                      {item.description?.length > 100
                        ? `${item.description.substring(0, 100)}...`
                        : item.description}
                    </p>

                    <div style={productMetaStyles}>
                      <div style={trustScoreStyles}>
                        <span style={trustScoreBadgeStyles}>
                          Trust Score: {item.trustScore}/10
                        </span>
                      </div>
                      <span style={categoryBadgeStyles}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div style={actionButtonsStyles}>
                    <button
                      style={viewButtonStyles}
                      onClick={() => handleViewProduct(item._id)}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#5a6268';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#6c757d';
                      }}
                    >
                      View
                    </button>
                    <button
                      style={{
                        ...buyButtonStyles,
                        opacity: placingOrder ? 0.7 : 1,
                        cursor: placingOrder ? 'not-allowed' : 'pointer'
                      }}
                      onClick={() => handleBuyNow(item._id)}
                      disabled={placingOrder}
                      onMouseEnter={(e) => {
                        if (!placingOrder) {
                          e.target.style.backgroundColor = '#0056b3';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!placingOrder) {
                          e.target.style.backgroundColor = '#007bff';
                        }
                      }}
                    >
                      {placingOrder ? 'Buying...' : 'Buy'}
                    </button>
                    <button
                      style={{
                        ...removeButtonStyles,
                        opacity: removingItem === item._id ? 0.7 : 1,
                        cursor: removingItem === item._id ? 'not-allowed' : 'pointer'
                      }}
                      onClick={() => handleRemoveFromCart(item._id)}
                      disabled={removingItem === item._id}
                      onMouseEnter={(e) => {
                        if (removingItem !== item._id) {
                          e.target.style.backgroundColor = '#c82333';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (removingItem !== item._id) {
                          e.target.style.backgroundColor = '#dc3545';
                        }
                      }}
                    >
                      {removingItem === item._id ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div style={bottomActionsStyles}>
              <button
                style={continueShoppingButtonStyles}
                onClick={handleContinueShopping}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5a6268';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#6c757d';
                }}
              >
                Continue Shopping
              </button>

              <button
                style={{
                  ...buyAllButtonStyles,
                  opacity: placingOrder ? 0.7 : 1,
                  cursor: placingOrder ? 'not-allowed' : 'pointer'
                }}
                onClick={handleBuyAll}
                disabled={placingOrder}
                onMouseEnter={(e) => {
                  if (!placingOrder) {
                    e.target.style.backgroundColor = '#218838';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!placingOrder) {
                    e.target.style.backgroundColor = '#28a745';
                  }
                }}
              >
                <CartIcon />
                {placingOrder ? 'Processing...' : `Buy All Items (${cartItems.length})`}
              </button>
            </div>
          </>
        )}
      </main>

      {/* Toast Notification */}
      <div style={showToast ? toastStyles : toastHiddenStyles}>
        <span style={{ fontSize: '20px' }}>
          {toastType === 'success' ? '✅' : '❌'}
        </span>
        <span style={{ flex: 1, fontWeight: '500' }}>
          {toastMessage}
        </span>
        <button onClick={handleCloseToast} style={toastCloseButtonStyles}>
          ×
        </button>
      </div>
    </div>
  );
};

export default ViewCart;