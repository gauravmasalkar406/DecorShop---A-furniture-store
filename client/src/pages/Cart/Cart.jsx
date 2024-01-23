import React, { useEffect, useState } from "react";
import CartProduct from "../../components/CartProduct/CartProduct";
import axios from "axios";
import { getCartItemsRoute } from "../../api/cart.js";
import { useSelector, useDispatch } from "react-redux";
import { addCartItems } from "../../store/slices/cart.js";
import { useNavigate } from "react-router-dom";
import { updateCartTotal } from "../../store/slices/cart.js";
import s from "./cart.module.css";
import { toast } from "react-toastify";

const Cart = () => {
  const [isItemDeleted, setIsItemDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const userInfo = useSelector((state) => state.user.userInfo);

  const cartTotal = useSelector((state) => state.cart.cartTotal);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      try {
        const fetchCartItems = async () => {
          setIsLoading(true);

          const response = await axios.post(
            getCartItemsRoute,
            {
              userId: userInfo._id,
            },
            { withCredentials: true }
          );

          setIsLoading(false);

          dispatch(addCartItems(response?.data?.cartItems));

          // setCartItems(response?.data?.cartItems);
        };

        fetchCartItems();
      } catch (error) {
        toast(error?.message || error?.response?.data?.message);
      }
    }
  }, [isItemDeleted]);

  // calculate cart total
  useEffect(() => {
    if (cartItems) {
      const total = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      dispatch(updateCartTotal(total));
    }
  }, [cartItems]);

  const changeDeletedState = () => {
    setIsItemDeleted(!isItemDeleted);
  };

  const checkoutHanlder = () => {
    navigate("/shipping");
  };

  return (
    userInfo && (
      <div className={s.cart_main}>
        <section className={s.cart_p_details}>
          <h4 className={s.cart_sub_head}>Shopping Cart</h4>
          <hr style={{ marginBottom: "2rem" }} />

          {isLoading ? (
            <div className="loader-container">
              <span className="loader-green"></span>
            </div>
          ) : (
            cartItems?.map((ele, index) => {
              return (
                <CartProduct
                  cartItem={ele}
                  key={index}
                  onItemDelete={changeDeletedState}
                  index={index}
                />
              );
            })
          )}
        </section>
        <section className={s.cart_order_summary}>
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

            <button className={s.summary_buy_btn} onClick={checkoutHanlder}>
              CHECKOUT
            </button>
          </>
        </section>
      </div>
    )
  );
};

export default Cart;
