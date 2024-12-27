import { DefaultLayout as Layout } from "../components/index.js";
import Register from "./Register/Register.jsx";
import Home from "./Home/Home.jsx";
import Product from "./Product/Product.jsx";
import Cart from "./Cart/Cart.jsx";
import Shop from "./Shop/Shop.jsx";
import Shipping from "./Shipping/Shipping.jsx";
import Payment from "./Payment/Payment.jsx";
import PlaceOrder from "./PlaceOrder/PlaceOrder.jsx";
import OrderDetails from "./OrderDetails/OrderDetails.jsx";
import Profile from "./Profile/Profile.jsx";
import AdminPanel from "./AdminPanel/AdminPanel.jsx";
import Create from "./CreateProduct/Create.jsx";
import ComingSoon from "./ComingSoon/ComingSoon.jsx";

// Higher-Order Component for pages with the default layout
const withDefaultLayout = (Page) => {
  return (props) => (
    <Layout>
      <Page {...props} />
    </Layout>
  );
};

const HomePage = withDefaultLayout(Home);
const ProductPage = withDefaultLayout(Product);
const CartPage = withDefaultLayout(Cart);
const ShopPage = withDefaultLayout(Shop);
const ShippingPage = withDefaultLayout(Shipping);
const PaymentPage = withDefaultLayout(Payment);
const PlaceOrderPage = withDefaultLayout(PlaceOrder);
const OrderDetailsPage = withDefaultLayout(OrderDetails);
const ProfilePage = withDefaultLayout(Profile);
const AdminPanelPage = withDefaultLayout(AdminPanel);
const CreatePage = withDefaultLayout(Create);
const ComingSoonPage = withDefaultLayout(ComingSoon);

export {
  HomePage as Home,
  ProductPage as Product,
  Register,
  CartPage as Cart,
  ShopPage as Shop,
  ShippingPage as Shipping,
  PaymentPage as Payment,
  PlaceOrderPage as PlaceOrder,
  OrderDetailsPage as OrderDetails,
  ProfilePage as Profile,
  AdminPanelPage as AdminPanel,
  CreatePage as Create,
  ComingSoonPage as ComingSoon,
};
