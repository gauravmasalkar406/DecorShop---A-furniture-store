import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../store/slices/order";
import s from "./shipping.module.css";

const Shipping = () => {
  const [address, setAddress] = useState("MG Road");
  const [city, setCity] = useState("Pune");
  const [postalCode, setPostalCode] = useState("123456");
  const [country, setCountry] = useState("India");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cartTotal = useSelector((state) => state.cart.cartTotal);

  const userInfo = useSelector((state) => state.user.userInfo);

  // dispatch address to store
  const handleShipping = () => {
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    userInfo && (
      <div className={s.cart_main}>
        <section className={s.cart_p_details}>
          <h4 className={s.cart_sub_head}>Shipping</h4>
          <hr style={{ marginBottom: "2rem" }} />
          <div className={s.shipping_main}>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
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

            <button className={s.summary_buy_btn} onClick={handleShipping}>
              SHIPPING
            </button>
          </>
        </section>
      </div>
    )
  );
};

export default Shipping;
