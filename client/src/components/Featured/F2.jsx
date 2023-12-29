import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllProducts } from "../../api/product";
import { host } from "../../api/host";
import { useNavigate } from "react-router-dom";

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
      toast.error(error.response.data.message || error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    products && (
      <section className="decoration-products">
        <div className="p-decoration-card">
          <p className="decor-head">{heading}</p>
          <p className="decor-desc">
            Small be and the rain would phase distance, succeed align.
          </p>
          <button className="decor-btn">SHOP NOW</button>
        </div>
        {products.map(
          (product, index) =>
            index < 3 && (
              <div
                className="p-decoration-card"
                key={index}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={`${host}/${product.image[0]}`}
                  alt={product.name}
                  className="p-decoration-img"
                />
                <p className="p-name">{product.name}</p>
                <p className="p-price">₹{product.price}</p>
              </div>
            )
        )}
      </section>
    )
  );
};

export default F2;
