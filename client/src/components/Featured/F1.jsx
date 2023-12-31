import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllProducts } from "../../api/product";
import { host } from "../../api/host";
import { useNavigate } from "react-router-dom";

const F1 = ({ category, heading }) => {
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
      <section>
        <p className="cat-heading">{heading}</p>
        <hr className="hr-line" />
        {products.map(
          (product, index) =>
            index < 3 && (
              <div
                key={index}
                className="p-card"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={`${host}/${product.image[0]}`}
                  alt={product.name}
                  className="p-img"
                  loading="lazy"
                />
                <div>
                  <p className="p-name">{product.name}</p>
                  <p className="p-price">₹{product.price}</p>
                </div>
              </div>
            )
        )}
      </section>
    )
  );
};

export default F1;
