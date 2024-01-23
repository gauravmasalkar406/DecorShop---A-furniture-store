import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllProducts } from "../../api/product";
import { host } from "../../api/host";
import { useNavigate } from "react-router-dom";
import s from "./feature.module.css";

const F2 = ({ category, heading }) => {
  const [products, setProducts] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fecthProducts();
  }, []);

  // fetch products function
  const fecthProducts = async () => {
    try {
      const response = await axios.get(
        `${getAllProducts}/default/${category}/all/0/false/1`
      );

      setProducts(response.data.products);
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    products && (
      <section className={s.decoration_products}>
        <div className={s.p_decoration_card}>
          <p className={s.decor_head}>{heading}</p>
          <p className={s.decor_desc}>
            Small be and the rain would phase distance, succeed align.
          </p>
          <button className={s.decor_btn}>SHOP NOW</button>
        </div>
        {products.map(
          (product, index) =>
            index < 3 && (
              <div
                className={s.p_decoration_card}
                key={index}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={`${host}/${product.image[0]}`}
                  alt={product.name}
                  className={s.p_decoration_img}
                  loading="lazy"
                />
                <p className={s.p_name}>{product.name}</p>
                <p className={s.p_price}>₹{product.price}</p>
              </div>
            )
        )}
      </section>
    )
  );
};

export default F2;
