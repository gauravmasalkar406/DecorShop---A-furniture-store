import React, { useState } from "react";
import "./adminpanel.css";
import Orders from "../../components/ADMIN/Orders/Orders.jsx";
import Products from "../../components/ADMIN/Products/Products.jsx";
import Users from "../../components/ADMIN/Users/Users.jsx";

const AdminPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState("ORDERS");
  return (
    <div className="cart-main">
      <section className="cart-p-details">
        <h4 className="cart-sub-head">Display</h4>
        <hr style={{ marginBottom: "2rem" }} />

        {selectedCategory === "ORDERS" ? (
          <Orders />
        ) : selectedCategory === "USERS" ? (
          <Users />
        ) : (
          <Products />
        )}
      </section>
      <section className="cart-order-summary">
        <h4 className="cart-sub-head">Menu</h4>
        <hr style={{ marginBottom: "2rem" }} />
        <button
          className={
            selectedCategory === "ORDERS"
              ? "panel-active summary-buy-btn"
              : "summary-buy-btn"
          }
          onClick={() => setSelectedCategory("ORDERS")}
        >
          ORDERS
        </button>
        <button
          className={
            selectedCategory === "USERS"
              ? "panel-active summary-buy-btn"
              : "summary-buy-btn"
          }
          onClick={() => setSelectedCategory("USERS")}
        >
          USERS
        </button>
        <button
          className={
            selectedCategory === "PRODUCTS"
              ? "panel-active summary-buy-btn"
              : "summary-buy-btn"
          }
          onClick={() => setSelectedCategory("PRODUCTS")}
        >
          PRODUCTS
        </button>
      </section>
    </div>
  );
};

export default AdminPanel;
