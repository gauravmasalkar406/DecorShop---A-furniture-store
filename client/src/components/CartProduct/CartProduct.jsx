import React, { useState, useEffect } from "react";
import { getProductInfo } from "../../api/product.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteItemFromCartRoute } from "../../api/cart.js";
import { host } from "../../api/host.js";
import { toast } from "react-toastify";
import s from "./cartItem.module.css";

const CartProduct = ({ cartItem, onItemDelete, index, isOrderPage }) => {
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();

  // fetching product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${getProductInfo}/${cartItem.product}`
        );

        setProduct(response?.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || error.message || "An error occurred"
        );
      }
    };

    fetchProduct();
  }, [cartItem]);

  const deleteItem = async () => {
    try {
      await axios.post(
        deleteItemFromCartRoute,
        {
          productId: cartItem?.product,
        },
        { withCredentials: true }
      );

      // this will update products in cart in backend
      onItemDelete();

      // success message
      toast.success("item deleted");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "An error occurred"
      );
    }
  };

  return (
    product && (
      <div className={s.cart_product_main}>
        <section>
          {index === 0 && (
            <h4 className={s.cart_product_head}>PRODUCT DETAILS</h4>
          )}
          <div className={s.cart_product_img_head_container}>
            <div
              className={s.cart_product_img}
              onClick={() => navigate(`/product/${product?._id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/product/${product?._id}`);
                }
              }}
            >
              <img
                src={`${host}/${product?.image[0]}`}
                alt={product?.name}
                loading="lazy"
              />
            </div>
            <div className={s.head_delete_btn}>
              <h5>{product?.name}</h5>
              {!isOrderPage && (
                <button onClick={deleteItem} type="button">
                  Delete
                </button>
              )}
            </div>
          </div>
        </section>
        <section>
          {index === 0 && <h4 className={s.cart_product_head}>QUANTITY</h4>}
          <div className={s.cart_product_quantity_change}>
            <div>{cartItem?.quantity}</div>
          </div>
        </section>
        <section>
          {index === 0 && <h4 className={s.cart_product_head}>PRICE</h4>}
          <h5>₹{product?.price}</h5>
        </section>
        <section>
          {index === 0 && <h4 className={s.cart_product_head}>TOTAL</h4>}
          <h5>{product?.price * cartItem?.quantity}</h5>
        </section>
      </div>
    )
  );
};

export default CartProduct;
