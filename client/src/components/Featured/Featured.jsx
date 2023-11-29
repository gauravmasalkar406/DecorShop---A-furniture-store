import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./feature.css";
import { host } from "../../api/host";
import instagram2 from "../../assets/instagram2.webp";
import instagram1 from "../../assets/instagram1.webp";
import instagram3 from "../../assets/instagram3.webp";
import instagram4 from "../../assets/instagram4.webp";
import instagram5 from "../../assets/instagram5.webp";

const Featured = ({ products }) => {
  const navigate = useNavigate();

  return (
    products && (
      <>
        <div className="featured-main">
          <section>
            <p className="cat-heading">BEST SELLER</p>
            <hr className="hr-line" />
            {products.map(
              (product, index) =>
                index >= products.length - 10 &&
                index < products.length - 7 && (
                  <div
                    key={index}
                    className="p-card"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <img
                      src={`${host}/${product.image[0]}`}
                      alt=""
                      className="p-img"
                    />
                    <div>
                      <p className="p-name">{product.name}</p>
                      <p className="p-price">₹{product.price}</p>
                    </div>
                  </div>
                )
            )}
          </section>

          <section>
            <p className="cat-heading">NEW ARRIVAL</p>
            <hr className="hr-line" />
            {products.map(
              (product, index) =>
                index >= products.length - 7 &&
                index < products.length - 4 && (
                  <div
                    key={index}
                    className="p-card"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <img
                      src={`${host}/${product.image[0]}`}
                      alt=""
                      className="p-img"
                    />
                    <div>
                      <p className="p-name">{product.name}</p>
                      <p className="p-price">₹{product.price}</p>
                    </div>
                  </div>
                )
            )}
          </section>

          <section>
            <p className="cat-heading">FEATURED</p>
            <hr className="hr-line" />
            {products.map(
              (product, index) =>
                index >= products.length - 4 &&
                index < products.length - 1 && (
                  <div
                    key={index}
                    className="p-card"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <img
                      src={`${host}/${product.image[0]}`}
                      alt=""
                      className="p-img"
                    />
                    <div>
                      <p className="p-name">{product.name}</p>
                      <p className="p-price">₹{product.price}</p>
                    </div>
                  </div>
                )
            )}
          </section>
        </div>

        <hr className="hr-line hr-length" />

        <section className="decoration-products">
          <div className="p-decoration-card">
            <p className="decor-head">Decoration</p>
            <p className="decor-desc">
              Small be and the rain would phase distance, succeed align.
            </p>
            <button className="decor-btn">SHOP NOW</button>
          </div>
          {products
            ?.filter((product) => {
              return product.category === "sofas";
            })
            .map(
              (product, index) =>
                index < 3 && (
                  <div
                    className="p-decoration-card"
                    key={index}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <img
                      src={`${host}/${product.image[0]}`}
                      alt=""
                      className="p-decoration-img"
                    />
                    <p className="p-name">{product.name}</p>
                    <p className="p-price">₹{product.price}</p>
                  </div>
                )
            )}
        </section>

        <section className="decoration-products">
          <div className="p-decoration-card">
            <p className="decor-head">Architect</p>
            <p className="decor-desc">
              Small be and the rain would phase distance, succeed align.
            </p>
            <button className="decor-btn">SHOP NOW</button>
          </div>
          {products
            ?.filter((product) => {
              return product.category === "architect";
            })
            .map(
              (product, index) =>
                index < 3 && (
                  <div
                    className="p-decoration-card"
                    key={index}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <img
                      src={`${host}/${product.image[0]}`}
                      alt=""
                      className="p-decoration-img"
                    />
                    <p className="p-name">{product.name}</p>
                    <p className="p-price">₹{product.price}</p>
                  </div>
                )
            )}
        </section>

        <hr className="hr-line hr-length" />

        <section className="intagram-banner">
          <img src={instagram2} alt="" />
          <img src={instagram1} alt="" />
          <img src={instagram3} alt="" />
          <img src={instagram4} alt="" />
          <img src={instagram5} alt="" />

          <div className="insta-head-container">
            <div className="insta-head">
              <h4>INSTAGRAM</h4>
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default Featured;
