import { lazy } from "react";
import { DefaultLayout } from "../components/index.js";

// Lazy-loaded components with default wrapper
const lazyWithDefaultLayout = (importFunction) => {
  const LazyComponent = lazy(importFunction);

  return (props) => (
    <DefaultLayout>
      <LazyComponent {...props} />
    </DefaultLayout>
  );
};

// Pages without default layout
const Register = lazy(() => import("./Register/Register.jsx"));

// Pages with defualt layout
const Home = lazyWithDefaultLayout(() => import("./Home/Home.jsx"));
const Product = lazyWithDefaultLayout(() => import("./Product/Product.jsx"));
const Cart = lazyWithDefaultLayout(() => import("./Cart/Cart.jsx"));
const Shop = lazyWithDefaultLayout(() => import("./Shop/Shop.jsx"));
const Shipping = lazyWithDefaultLayout(() => import("./Shipping/Shipping.jsx"));
const Payment = lazyWithDefaultLayout(() => import("./Payment/Payment.jsx"));
const PlaceOrder = lazyWithDefaultLayout(() =>
  import("./PlaceOrder/PlaceOrder.jsx")
);
const OrderDetails = lazyWithDefaultLayout(() =>
  import("./Order details/OrderDetails.jsx")
);
const Profile = lazyWithDefaultLayout(() => import("./Profile/Profile.jsx"));
const AdminPanel = lazyWithDefaultLayout(() =>
  import("./Admin panel/AdminPanel.jsx")
);
const Create = lazyWithDefaultLayout(() =>
  import("./CreateProduct/Create.jsx")
);
const ComingSoon = lazyWithDefaultLayout(() =>
  import("./Comingsoon/ComingSoon.jsx")
);

export {
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
};
