import { useState } from "react";
import { Orders, Products, Users } from "../../components/index.js";
import s from "./adminpanel.module.css";

const AdminPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState("ORDERS");
  return (
    <div className={s.cart_main}>
      <section className={s.cart_p_details}>
        <h4 className={s.cart_sub_head}>Display</h4>
        <hr style={{ marginBottom: "2rem" }} />

        {selectedCategory === "ORDERS" ? (
          <Orders />
        ) : selectedCategory === "USERS" ? (
          <Users />
        ) : (
          <Products />
        )}
      </section>
      <section className={s.cart_order_summary}>
        <h4 className={s.cart_sub_head}>Menu</h4>
        <hr style={{ marginBottom: "2rem" }} />
        <button
          className={
            selectedCategory === "ORDERS"
              ? `${s.panel_active} ${s.summary_buy_btn}`
              : s.summary_buy_btn
          }
          onClick={() => setSelectedCategory("ORDERS")}
        >
          ORDERS
        </button>
        <button
          className={
            selectedCategory === "USERS"
              ? `${s.panel_active} ${s.summary_buy_btn}`
              : s.summary_buy_btn
          }
          onClick={() => setSelectedCategory("USERS")}
        >
          USERS
        </button>
        <button
          className={
            selectedCategory === "PRODUCTS"
              ? `${s.panel_active} ${s.summary_buy_btn}`
              : s.summary_buy_btn
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
