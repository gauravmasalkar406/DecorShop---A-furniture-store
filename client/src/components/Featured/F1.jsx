import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllProducts } from "../../api/product";
import { host } from "../../api/host";
import { useNavigate } from "react-router-dom";
import s from "./feature.module.css";

const F1 = ({ category, heading }) => {
  const [products, setProducts] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // fetch products function
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${getAllProducts}/default/${category}/all/0/false/1`
        );

        setProducts(response.data.products);
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    products && (
      <section>
        <p className={s.cat_heading}>{heading}</p>
        <hr className={s.hr_line} />
        {products.map(
          (product, index) =>
            index < 3 && (
              <div
                key={product._id}
                className={s.p_card}
                onClick={() => navigate(`/product/${product._id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/product/${product?._id}`);
                  }
                }}
              >
                <img
                  src={`${host}/${product.image[0]}`}
                  alt={product.name}
                  className={s.p_img}
                  loading="lazy"
                />
                <div>
                  <p className={s.p_name}>{product.name}</p>
                  <p className={s.p_price}>₹{product.price}</p>
                </div>
              </div>
            )
        )}
      </section>
    )
  );
};

export default F1;
