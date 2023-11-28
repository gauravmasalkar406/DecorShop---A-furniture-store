import React, { useState } from "react";
import "./shipping.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../store/slices/order";

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
      <div className="cart-main">
        <section className="cart-p-details">
          <h4 className="cart-sub-head">Shipping</h4>
          <hr style={{ marginBottom: "2rem" }} />
          <div className="shipping-main">
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

            <button className="summary-buy-btn" onClick={handleShipping}>
              SHIPPING
            </button>
          </>
        </section>
      </div>
    )
  );
};

export default Shipping;
