import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  getOrderByIdRoute,
  stripePayRoute,
  updateOrderToDeliveredRoute,
} from "../../api/order.js";
import { host } from "../../api/host.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import s from "./orderdetails.module.css";

const OrderDetails = () => {
  const [paidDate, setPaidDate] = useState();
  const [deliveredDate, setDeliveredDate] = useState();
  const [order, setOrder] = useState();
  const userInfo = useSelector((state) => state.user.userInfo);
  // order id from params
  const { id } = useParams();
  const navigate = useNavigate();

  // get order details by id
  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await axios.post(
          getOrderByIdRoute,
          { id },
          { withCredentials: true }
        );

        if (response?.status == 200) {
          setOrder(response.data);
        }
      } catch (error) {
        toast(error?.message || error?.response?.data?.message);
      }
    };

    getOrderDetails();
  }, []);

  // stripe payment integration
  const handlePaymentWithStripe = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_KEY);

    // order id will be sent to server
    try {
      const response = await axios.post(
        stripePayRoute,
        { id },
        { withCredentials: true }
      );

      const session = response.data;

      stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      toast.error(
        error.response.data.message || error?.message || "An error occurred"
      );
    }
  };

  // date formatting
  useEffect(() => {
    if (order) {
      const dateString = order.paidAt;
      const dateObject = new Date(dateString);
      const formattedDate = dateObject.toLocaleDateString();
      const formattedTime = dateObject.toLocaleTimeString();
      setPaidDate(`Date: ${formattedDate}, Time: ${formattedTime}`);
    }
  }, [order]);

  // date formatting
  useEffect(() => {
    if (order) {
      const dateString = order.deliveredAt;
      const dateObject = new Date(dateString);
      const formattedDate = dateObject.toLocaleDateString();
      const formattedTime = dateObject.toLocaleTimeString();
      setDeliveredDate(`Date: ${formattedDate}, Time: ${formattedTime}`);
    }
  }, [order]);

  // function only for admin ---> update order is delivered to user
  const handleUpdateDelivered = async () => {
    try {
      const response = await axios.put(
        updateOrderToDeliveredRoute,
        { id },
        { withCredentials: true }
      );

      if (response?.status === 200) {
        setOrder(response.data);

        toast.success("Order delivered");
      }
    } catch (error) {
      toast.error(
        error.response.data.message || error?.message || "An error occurred"
      );
    }
  };

  return order && userInfo ? (
    <div className={s.cart_main}>
      <section>
        <h4 className={s.cart_sub_head}>Order Details</h4>
        <hr style={{ marginBottom: "2rem" }} />

        <div className={s.order_main}>
          <p>
            Shipping Address: {order.shippingAddress?.address},{" "}
            {order.shippingAddress?.city}, {order.shippingAddress?.country} -{" "}
            {order.shippingAddress?.postalCode}
          </p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>
            Delivery status:{" "}
            {order.isDelivered
              ? `Delivered at ${deliveredDate}`
              : "Not delivered"}
          </p>
          <p>Payment: {order.isPaid ? `Paid at ${paidDate}` : "Not paid"}</p>

          <hr style={{ marginBottom: "1.5rem", marginTop: "1.5rem" }} />

          <div>
            {order?.orderItems?.map((ele, index) => {
              return (
                <div className={s.cart_product_main} key={ele.productId}>
                  <section>
                    {index === 0 && (
                      <h4 className={s.cart_product_head}>PRODUCT DETAILS</h4>
                    )}
                    <div className={s.cart_product_img_head_container}>
                      <div
                        className={s.cart_product_img}
                        onClick={() => navigate(`/product/${ele.productId}`)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            navigate(`/product/${ele.productId}`);
                          }
                        }}
                      >
                        <img src={`${host}/${ele?.product?.image[0]}`} alt="" />
                      </div>
                      <div className={s.head_delete_btn}>
                        <h5>{ele.product?.name}</h5>
                      </div>
                    </div>
                  </section>
                  <section>
                    {index === 0 && (
                      <h4 className={s.cart_product_head}>QUANTITY</h4>
                    )}
                    <div className={s.cart_product_quantity_change}>
                      <div>{ele?.quantity}</div>
                    </div>
                  </section>
                  <section>
                    {index === 0 && (
                      <h4 className={s.cart_product_head}>PRICE</h4>
                    )}
                    <h5>₹{ele.product?.price}</h5>
                  </section>
                  <section>
                    {index === 0 && (
                      <h4 className={s.cart_product_head}>TOTAL</h4>
                    )}
                    <h5>{ele.product?.price * ele?.quantity}</h5>
                  </section>
                </div>
              );
            })}
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
              <h4>₹{order.totalPrice - 99}</h4>
            </div>
            <div className={s.summary_total}>
              <p>Convenience Fee</p>
              <h4>₹99</h4>
            </div>
          </div>
          <div className={s.summary_subtotal_container}>
            <p>Total</p>
            <h3>₹{order.totalPrice}</h3>
          </div>

          {!order.isPaid && !userInfo.isAdmin && (
            <button
              className={s.summary_buy_btn}
              onClick={handlePaymentWithStripe}
              type="button"
            >
              PAY HERE
            </button>
          )}

          {order.isPaid && userInfo.isAdmin && (
            <button
              className={s.summary_buy_btn}
              onClick={handleUpdateDelivered}
              type="button"
            >
              MARK DELIVERED
            </button>
          )}
        </>
      </section>
    </div>
  ) : (
    <div className="loader-container">
      <span class="loader-green" />
    </div>
  );
};

export default OrderDetails;
