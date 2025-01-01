import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APP_ENDPOINTS } from "./constants/AppEndpoints.js";
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
      <Routes>
        <Route path={APP_ENDPOINTS.ROOT} element={<Home />} />
        <Route path={APP_ENDPOINTS.PRODUCT} element={<Product />} />
        <Route path={APP_ENDPOINTS.CART} element={<Cart />} />
        <Route path={APP_ENDPOINTS.SHOP} element={<Shop />} />
        <Route path={APP_ENDPOINTS.SHIPPING} element={<Shipping />} />
        <Route path={APP_ENDPOINTS.PAYMENT} element={<Payment />} />
        <Route path={APP_ENDPOINTS.PLACE_ORDER} element={<PlaceOrder />} />
        <Route path={APP_ENDPOINTS.ORDER_DETAILS} element={<OrderDetails />} />
        <Route path={APP_ENDPOINTS.PROFILE} element={<Profile />} />
        <Route path={APP_ENDPOINTS.SERVICES} element={<ComingSoon />} />
        <Route path={APP_ENDPOINTS.NEWS} element={<ComingSoon />} />
        <Route path={APP_ENDPOINTS.ADMIN_PANEL} element={<AdminPanel />} />
        <Route path={APP_ENDPOINTS.CREATE} element={<Create />} />
        <Route path={APP_ENDPOINTS.REGISTER} element={<Register />} />
      </Routes>
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
