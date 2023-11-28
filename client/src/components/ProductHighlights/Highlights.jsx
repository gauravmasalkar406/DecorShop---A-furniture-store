import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import basketChair from "../../assets/basketchair.webp";
import "./highlights.css";
import { host } from "../../api/host.js";

const Highlights = ({ products }) => {
  const [categories, setCategories] = useState(["all"]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const navigate = useNavigate();

  // find out the categories
  useEffect(() => {
    if (products) {
      const uniqueCategories = Array.from(
        new Set([...categories, ...products.map((product) => product.category)])
      );

      setCategories([...uniqueCategories]);
    }
  }, [products]);

  return (
    products && (
      <div className="highlights-main">
        <div className="highlights-main-container">
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
                          src={product.image[0]}
                          key={index}
                          className="product-image"
                        />
                      </div>
                      <p className="product-name">{product.name}</p>
                      <p className="product-price">₹{product.price}</p>
                    </div>
                  )
            )}
          </section>

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
                  <span className="banner-title-description">
                    {" "}
                    MINIMAL CHAIR
                  </span>
                </div>
                <button>View Now</button>
              </div>
            </div>
            <img src={basketChair} alt="" />
          </section>
        </div>
      </div>
    )
  );
};

export default Highlights;
