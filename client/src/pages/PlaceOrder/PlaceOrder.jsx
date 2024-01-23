import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "../../components/CartProduct/CartProduct.jsx";
import { getCartItemsRoute, removeCartItemsRoute } from "../../api/cart.js";
import { addOrderItems } from "../../api/order.js";
import axios from "axios";
import { toast } from "react-toastify";
import { removeCartItems, updateCartTotal } from "../../store/slices/cart.js";
import { useNavigate } from "react-router-dom";
import s from "./placeorder.module.css";

const PlaceOrder = () => {
  const [cartItems, setCartItems] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.userInfo);

  const shippingAddress = useSelector((state) => state.order.shippingAddress);

  const paymentMethod = useSelector((state) => state.order.paymentMethod);

  const cartTotal = useSelector((state) => state.cart.cartTotal);

  // fetching cart items
  useEffect(() => {
    if (userInfo) {
      try {
        const fetchCartItems = async () => {
          const response = await axios.post(
            getCartItemsRoute,
            {
              userId: userInfo._id,
            },
            { withCredentials: true }
          );

          setCartItems(response?.data?.cartItems);
        };

        fetchCartItems();
      } catch (error) {
        toast(error?.message || error?.response?.data?.message);
      }
    }
  }, [userInfo]);

  // place order
  const handlePlaceOrder = async () => {
    setIsLoading(true);
    if (cartItems && userInfo && shippingAddress && paymentMethod) {
      try {
        const response = await axios.post(
          addOrderItems,
          {
            shippingAddress,
            userId: userInfo?._id,
            paymentMethod,
            totalPrice: cartTotal + 99,
            orderItems: cartItems,
          },
          { withCredentials: true }
        );

        // success message
        toast.success(response?.data?.msg);

        // emptyingt the cart
        dispatch(removeCartItems());

        // updating cart total 0
        dispatch(updateCartTotal(0));

        // database cart
        deleteAllProductFromCart();

        setIsLoading(false);

        // save in store
        if (response?.data?.msg == "Order placed") {
          navigate(`/orderdetails/${response.data.createdOrder._id}`);
        }
      } catch (error) {
        toast(error?.message || error?.response?.data?.message);
      }
    }
  };

  const deleteAllProductFromCart = async () => {
    try {
      const response = await axios.post(
        removeCartItemsRoute,
        { user: userInfo._id },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    userInfo && (
      <div className={s.cart_main}>
        <section>
          <h4 className={s.cart_sub_head}>Place order</h4>
          <hr style={{ marginBottom: "2rem" }} />

          <div className={s.order_main}>
            <p>
              Shipping Address: {shippingAddress?.address},{" "}
              {shippingAddress?.city}, {shippingAddress?.country} -{" "}
              {shippingAddress?.postalCode}
            </p>
            <p>Payment Method: {paymentMethod}</p>
            <hr style={{ marginBottom: "1.5rem", marginTop: "1.5rem" }} />

            <div>
              {cartItems ? (
                cartItems.map((ele, index) => {
                  return (
                    <CartProduct
                      cartItem={ele}
                      key={index}
                      index={index}
                      isOrderPage={true}
                    />
                  );
                })
              ) : (
                <div className={s.loader_container}>
                  <span class={s.loader_green}></span>
                </div>
              )}
            </div>
          </div>
        </section>
        <section>
          <>
            <h4 className={s.cart_sub_head}>Summary</h4>
            <hr style={{ marginBottom: "2rem" }} />
            <div className={s.summary_main}>
              <div className={s.summary_total}>
                <p>Bag total</p>
                <h4>₹{cartTotal}</h4>
              </div>
              <div className={s.summary_total}>
                <p>Convenience Fee</p>
                <h4>₹99</h4>
              </div>
            </div>
            <div className={s.summary_subtotal_conatainer}>
              <p>Total</p>
              <h3>₹{cartTotal + 99}</h3>
            </div>

            <button className={s.summary_buy_btn} onClick={handlePlaceOrder}>
              {isLoading ? <span class={s.loader}></span> : "PLACE ORDER"}
            </button>
          </>
        </section>
      </div>
    )
  );
};

export default PlaceOrder;
