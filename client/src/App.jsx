import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import {
  Home,
  Product,
  Register,
  Cart,
  Shop,
  Shipping,
  Payment,
  PlaceOrder,
  OrderDetails,
  Profile,
  AdminPanel,
  Create,
  ComingSoon,
} from "./pages/index.jsx";

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
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/orderdetails/:id" element={<OrderDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services" element={<ComingSoon />} />
          <Route path="/news" element={<ComingSoon />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/create" element={<Create />} />
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
