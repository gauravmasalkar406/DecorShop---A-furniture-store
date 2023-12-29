import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import basketChair from "../../assets/basketchair.webp";
import "./highlights.css";
import { getAllProducts } from "../../api/product";
import { toast } from "react-toastify";
import { host } from "../../api/host";
import { getUniqueCategoriesRoute } from "../../api/product";
import axios from "axios";

const Highlights = () => {
  const [categories, setCategories] = useState(["all"]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fecthProducts();
  }, [selectedCategory]);

  // fetch products function
  const fecthProducts = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${getAllProducts}/default/${selectedCategory}/all/0/false/1`
      );

      setProducts(response.data.products);
    } catch (error) {
      toast.error(error.response.data.message || error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // fetching unique categories
  useEffect(() => {
    const fetchUniqueCategories = async () => {
      try {
        const response = await axios.get(getUniqueCategoriesRoute);

        setCategories(["all", ...response.data.unique]);
      } catch (error) {
        toast.error(error.response.data.message || error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    fetchUniqueCategories();
  }, []);

  return (
    <div className="highlights-main">
      <div className="highlights-main-container">
        {categories && (
          <section className="category-btns">
            {categories.map((category, index) => (
              <button
                key={index}
                className={selectedCategory === category ? "selected" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </section>
        )}

        {products && !isLoading ? (
          <section className="products-container">
            {products.map((product, index) =>
              selectedCategory === "all"
                ? index < 8 && (
                    <div
                      className="product-card"
                      onClick={() => navigate(`/product/${product._id}`)}
                      key={index}
                    >
                      <div className="product-image-container">
                        <img
                          src={`${host}/${product.image[0]}`}
                          key={index}
                          className="product-image"
                          alt={product.name}
                        />
                      </div>
                      <p className="product-name">{product.name}</p>
                      <p className="product-price">₹{product.price}</p>
                    </div>
                  )
                : product.category === selectedCategory && (
                    <div
                      className="product-card"
                      onClick={() => navigate(`/product/${product._id}`)}
                      key={index}
                    >
                      <div className="product-image-container">
                        <img
                          src={`${host}/${product.image[0]}`}
                          key={index}
                          className="product-image"
                          alt={product.name}
                        />
                      </div>
                      <p className="product-name">{product.name}</p>
                      <p className="product-price">₹{product.price}</p>
                    </div>
                  )
            )}
          </section>
        ) : (
          <div className="loader-container">
            <span className="loader-green"></span>
          </div>
        )}

        <section className="go-to-shop-container">
          <div></div>
          <button onClick={() => navigate("/shop")}>GO TO SHOP</button>
          <div></div>
        </section>

        <section className="stylish-banner-container">
          <div className="stylish-banner">
            <div className="stylish-banner-desc-container">
              <div className="banner-title-container">
                <span className="banner-title">STYLISH</span>
                <span className="banner-title-description"> MINIMAL CHAIR</span>
              </div>
              <button>View Now</button>
            </div>
          </div>
          <img src={basketChair} alt="basketchair" />
        </section>
      </div>
    </div>
  );
};

export default Highlights;
