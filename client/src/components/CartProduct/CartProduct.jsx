import React, { useState, useEffect } from "react";
import "./cartitem.css";
import { getProductInfo } from "../../api/product.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteItemFromCartRoute } from "../../api/cart.js";
import { host } from "../../api/host.js";
import { toast } from "react-toastify";

const CartProduct = ({ cartItem, onItemDelete, index, isOrderPage }) => {
  const [product, setProduct] = useState();

  const navigate = useNavigate();

  // fetching product
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`${getProductInfo}/${cartItem.product}`);

      setProduct(response?.data);
    };

    fetchProduct();
  }, [cartItem]);

  const deleteItem = async () => {
    try {
      const response = await axios.post(
        deleteItemFromCartRoute,
        {
          productId: cartItem?.product,
        },
        { withCredentials: true }
      );

      // this will update products in cart in backend
      onItemDelete();

      // success message
      toast.success(response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-product-main">
      <section>
        {index == 0 && <h4 className="cart-product-head">PRODUCT DETAILS</h4>}
        <div className="cart-prdouct-img-head-container">
          <div
            className="cart-product-img"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <img src={`${host}/${product?.image[0]}`} alt="" />
          </div>
          <div className="head-delete-btn">
            <h5>{product?.name}</h5>
            {!isOrderPage && <button onClick={deleteItem}>Delete</button>}
          </div>
        </div>
      </section>
      <section>
        {index == 0 && <h4 className="cart-product-head">QUANTITY</h4>}
        <div className="cart-product-quanity-change">
          <div>{cartItem?.quantity}</div>
        </div>
      </section>
      <section>
        {index == 0 && <h4 className="cart-product-head">PRICE</h4>}
        <h5>₹{product?.price}</h5>
      </section>
      <section>
        {index == 0 && <h4 className="cart-product-head">TOTAL</h4>}
        <h5>{product?.price * cartItem?.quantity}</h5>
      </section>
    </div>
  );
};

export default CartProduct;
