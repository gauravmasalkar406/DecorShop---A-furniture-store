import { useState } from "react";
import { Orders, Products, Users } from "../../components/index.js";
import s from "./adminpanel.module.css";
import { ORDERS, PRODUCTS, USERS } from "../../constants/Misc.js";

const AdminPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState(ORDERS);

  const orderBtnStyles =
    selectedCategory === ORDERS
      ? `${s.panel_active} ${s.summary_buy_btn}`
      : s.summary_buy_btn;

  const usersBtnStyles =
    selectedCategory === USERS
      ? `${s.panel_active} ${s.summary_buy_btn}`
      : s.summary_buy_btn;

  const productsBtnStyles =
    selectedCategory === PRODUCTS
      ? `${s.panel_active} ${s.summary_buy_btn}`
      : s.summary_buy_btn;

  return (
    <div className={s.cart_main}>
      <section className={s.cart_p_details}>
        <h4 className={s.cart_sub_head}>Display</h4>
        <hr style={{ marginBottom: "2rem" }} />

        {selectedCategory === ORDERS ? (
          <Orders />
        ) : selectedCategory === USERS ? (
          <Users />
        ) : (
          <Products />
        )}
      </section>
      <section className={s.cart_order_summary}>
        <h4 className={s.cart_sub_head}>Menu</h4>
        <hr style={{ marginBottom: "2rem" }} />
        <button
          className={orderBtnStyles}
          onClick={() => setSelectedCategory(ORDERS)}
          type="button"
        >
          ORDERS
        </button>
        <button
          className={usersBtnStyles}
          onClick={() => setSelectedCategory(USERS)}
          type="button"
        >
          USERS
        </button>
        <button
          className={productsBtnStyles}
          onClick={() => setSelectedCategory(PRODUCTS)}
          type="button"
        >
          PRODUCTS
        </button>
      </section>
    </div>
  );
};

export default AdminPanel;
