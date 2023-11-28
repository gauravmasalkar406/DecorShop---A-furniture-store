import React, { useState } from "react";
import "./payment.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const navigate = useNavigate();

  const cartTotal = useSelector((state) => state.cart.cartTotal);

  const userInfo = useSelector((state) => state.user.userInfo);

  const handlePayment = () => {
    navigate("/placeorder");
  };

  return (
    userInfo && (
      <div>
        <div className="cart-main">
          <section className="cart-p-details">
            <h4 className="cart-sub-head">Shipping</h4>
            <hr style={{ marginBottom: "2rem" }} />
            <div className="payment-main">
              <h3>Select Payement Method</h3>
              <div>
                <input
                  type="checkbox"
                  checked={paymentMethod === "paypal"}
                  value="paypal"
                />{" "}
                <span>paypal</span>
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
                  <h4>₹{cartTotal}</h4>
                </div>
                <div className="summary-total">
                  <p>Convenience Fee</p>
                  <h4>₹99</h4>
                </div>
              </div>
              <div className="summary-subtotal-conatainer">
                <p>Total</p>
                <h3>₹{cartTotal + 99}</h3>
              </div>

              <button className="summary-buy-btn" onClick={handlePayment}>
                PAYMENT
              </button>
            </>
          </section>
        </div>
      </div>
    )
  );
};

export default Payment;
