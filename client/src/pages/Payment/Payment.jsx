import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import s from "./payment.module.css";

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
        <div className={s.cart_main}>
          <section className={s.cart_p_details}>
            <h4 className={s.cart_sub_head}>Shipping</h4>
            <hr style={{ marginBottom: "2rem" }} />
            <div className={s.payment_main}>
              <h3>Select Payment Method</h3>
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

              <button
                className={s.summary_buy_btn}
                onClick={handlePayment}
                type="button"
              >
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
