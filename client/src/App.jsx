import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Product from "./pages/Product/Product.jsx";
import Register from "./pages/Register/Register.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Shipping from "./pages/Shipping/Shipping.jsx";
import Payment from "./pages/Payment/payment.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import OrderDetails from "./pages/Order details/OrderDetails.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ComingSoon from "./pages/Comingsoon/ComingSoon.jsx";
import AdminPanel from "./pages/Admin panel/AdminPanel.jsx";
import Create from "./pages/CreateProduct/Create.jsx";

const DefaultLayout = ({ children }) => (
  <div>
    <Navbar />
    {children}
    <Footer />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <DefaultLayout>
              <Product />
            </DefaultLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <DefaultLayout>
              <Cart />
            </DefaultLayout>
          }
        />
        <Route
          path="/shop"
          element={
            <DefaultLayout>
              <Shop />
            </DefaultLayout>
          }
        />
        <Route
          path="/shipping"
          element={
            <DefaultLayout>
              <Shipping />
            </DefaultLayout>
          }
        />
        <Route
          path="/payment"
          element={
            <DefaultLayout>
              <Payment />
            </DefaultLayout>
          }
        />
        <Route
          path="/placeorder"
          element={
            <DefaultLayout>
              <PlaceOrder />
            </DefaultLayout>
          }
        />
        <Route
          path="/orderdetails/:id"
          element={
            <DefaultLayout>
              <OrderDetails />
            </DefaultLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DefaultLayout>
              <Profile />
            </DefaultLayout>
          }
        />
        <Route
          path="/services"
          element={
            <DefaultLayout>
              <ComingSoon />
            </DefaultLayout>
          }
        />
        <Route
          path="/news"
          element={
            <DefaultLayout>
              <ComingSoon />
            </DefaultLayout>
          }
        />
        <Route
          path="/adminpanel"
          element={
            <DefaultLayout>
              <AdminPanel />
            </DefaultLayout>
          }
        />
        <Route
          path="/create"
          element={
            <DefaultLayout>
              <Create />
            </DefaultLayout>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
