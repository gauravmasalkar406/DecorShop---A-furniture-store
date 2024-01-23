import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ComingSoon from "./pages/Comingsoon/ComingSoon.jsx";

// lazy components
const Home = lazy(() => import("./pages/Home/Home"));
const Product = lazy(() => import("./pages/Product/Product.jsx"));
const Register = lazy(() => import("./pages/Register/Register.jsx"));
const Cart = lazy(() => import("./pages/Cart/Cart.jsx"));
const Shop = lazy(() => import("./pages/Shop/Shop.jsx"));
const Shipping = lazy(() => import("./pages/Shipping/Shipping.jsx"));
const Payment = lazy(() => import("./pages/Payment/Payment.jsx"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder/PlaceOrder.jsx"));
const OrderDetails = lazy(() =>
  import("./pages/Order details/OrderDetails.jsx")
);
const Profile = lazy(() => import("./pages/Profile/Profile.jsx"));
const AdminPanel = lazy(() => import("./pages/Admin panel/AdminPanel.jsx"));
const Create = lazy(() => import("./pages/CreateProduct/Create.jsx"));

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
      <Suspense
        fallback={
          <div className="fallback_container">
            <span className="loader-green"></span>
          </div>
        }
      >
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
      </Suspense>
      <ToastContainer
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        position="top-center"
        transition={Zoom}
        autoClose={1500}
        closeButton={false}
        hideProgressBar={true}
      />
    </BrowserRouter>
  );
};

export default App;
