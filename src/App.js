import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import Home from './components/Dashboard/User/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import ProductList from './components/Product/ProductList';
import SingleProduct from './components/Product/SingleProduct';
import MyReviews from './components/Dashboard/User/MyReviews';
import Settings from './components/Dashboard/User/Settings';
import ManageProducts from './components/Dashboard/Admin/ManageProducts';
import ManageReviews from './components/Dashboard/Admin/ManageReviews';
import ManageUsers from './components/Dashboard/Admin/ManageUsers';
import FAQ from './components/Shared/FAQ';
import SaveMoreOnApp from './components/Shared/SaveMoreOnApp';
import ViewCart from './components/Dashboard/User/ViewCart';
import MyOrders from './components/Dashboard/User/MyOrders';
import ViewOrders from './components/Dashboard/Admin/ViewOrders';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/reviews" element={<ManageReviews />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/faqs" element={<FAQ />} />
            <Route path="/savemoreonapp" element={<SaveMoreOnApp />} />
            <Route path="/view-cart" element={<ViewCart />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/admin/orders" element={<ViewOrders />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;