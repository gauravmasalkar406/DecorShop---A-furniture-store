import React, { useEffect, useState } from "react";
import "./orderdetails.css";
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
        console.log(error);
      }
    };

    getOrderDetails();
  }, []);

  // stripe payment integration
  const handlePaymentWithStripe = async () => {
    const stripe = await loadStripe(
      "pk_test_51OGNBpSGXGx0sWMFwly4NqaNFjEGQey4qleAL3oBxu2DcaSsksP1u8UoafDCXkGwkdi4pGdr8DYH9dxP4VRp5T4T00YOzaY7qG"
    );

    // order id will be sent to server
    try {
      const response = await axios.post(
        stripePayRoute,
        { id: id },
        { withCredentials: true }
      );

      const session = response.data;

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
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

      if (response?.status == 200) {
        setOrder(response.data);

        toast.success("Order delivered", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    order &&
    userInfo && (
      <div className="cart-main">
        <section>
          <h4 className="cart-sub-head">Order Details</h4>
          <hr style={{ marginBottom: "2rem" }} />

          <div className="order-main">
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
                  <div className="cart-product-main" key={index}>
                    <section>
                      {index == 0 && (
                        <h4 className="cart-product-head">PRODUCT DETAILS</h4>
                      )}
                      <div className="cart-prdouct-img-head-container">
                        <div
                          className="cart-product-img"
                          onClick={() => navigate(`/product/${ele.productId}`)}
                        >
                          <img
                            src={`${host}/${ele?.product?.image[0]}`}
                            alt=""
                          />
                        </div>
                        <div className="head-delete-btn">
                          <h5>{ele.product?.name}</h5>
                        </div>
                      </div>
                    </section>
                    <section>
                      {index == 0 && (
                        <h4 className="cart-product-head">QUANTITY</h4>
                      )}
                      <div className="cart-product-quanity-change">
                        <div>{ele?.quantity}</div>
                      </div>
                    </section>
                    <section>
                      {index == 0 && (
                        <h4 className="cart-product-head">PRICE</h4>
                      )}
                      <h5>₹{ele.product?.price}</h5>
                    </section>
                    <section>
                      {index == 0 && (
                        <h4 className="cart-product-head">TOTAL</h4>
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
            <h4 className="cart-sub-head">Summary</h4>
            <hr style={{ marginBottom: "2rem" }} />
            <div className="summary-main">
              <div className="summary-total">
                <p>Bag total</p>
                <h4>₹{order.totalPrice - 99}</h4>
              </div>
              <div className="summary-total">
                <p>Convenience Fee</p>
                <h4>₹99</h4>
              </div>
            </div>
            <div className="summary-subtotal-conatainer">
              <p>Total</p>
              <h3>₹{order.totalPrice}</h3>
            </div>

            {!order.isPaid && !userInfo.isAdmin && (
              <>
                <button
                  className="summary-buy-btn"
                  onClick={handlePaymentWithStripe}
                >
                  PAY HERE
                </button>
              </>
            )}

            {order.isPaid && userInfo.isAdmin && (
              <>
                <button
                  className="summary-buy-btn"
                  onClick={handleUpdateDelivered}
                >
                  MARK DELIVERED
                </button>
              </>
            )}
          </>
        </section>
      </div>
    )
  );
};

export default OrderDetails;
