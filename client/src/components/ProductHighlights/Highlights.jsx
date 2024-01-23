import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import basketChair from "../../assets/basketchair.webp";
import { getAllProducts } from "../../api/product";
import { toast } from "react-toastify";
import { host } from "../../api/host";
import { getUniqueCategoriesRoute } from "../../api/product";
import axios from "axios";
import s from "./highlights.module.css";

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
    <div className={s.highlights_main}>
      <div className={s.highlights_main_container}>
        {categories && (
          <section className={s.category_btns}>
            {categories.map((category, index) => (
              <button
                key={index}
                className={selectedCategory === category ? s.selected : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </section>
        )}

        {products && !isLoading ? (
          <section className={s.products_container}>
            {products.map((product, index) =>
              selectedCategory === "all"
                ? index < 8 && (
                    <div
                      className={s.product_card}
                      onClick={() => navigate(`/product/${product._id}`)}
                      key={index}
                    >
                      <div className={s.product_image_container}>
                        <img
                          src={`${host}/${product.image[0]}`}
                          key={index}
                          className={s.product_image}
                          alt={product.name}
                          loading="lazy"
                        />
                      </div>
                      <p className={s.product_name}>{product.name}</p>
                      <p className={s.product_price}>₹{product.price}</p>
                    </div>
                  )
                : product.category === selectedCategory && (
                    <div
                      className={s.product_card}
                      onClick={() => navigate(`/product/${product._id}`)}
                      key={index}
                    >
                      <div className={s.product_image_container}>
                        <img
                          src={`${host}/${product.image[0]}`}
                          key={index}
                          className={s.product_image}
                          alt={product.name}
                          loading="lazy"
                        />
                      </div>
                      <p className={s.product_name}>{product.name}</p>
                      <p className={s.product_price}>₹{product.price}</p>
                    </div>
                  )
            )}
          </section>
        ) : (
          <div className="loader-container">
            <span className="loader-green"></span>
          </div>
        )}

        <section className={s.go_to_shop_container}>
          <div></div>
          <button onClick={() => navigate("/shop")}>GO TO SHOP</button>
          <div></div>
        </section>

        <section className={s.stylish_banner_container}>
          <div className={s.stylish_banner}>
            <div className={s.stylish_banner_desc_container}>
              <div className={s.banner_title_container}>
                <span className={s.banner_title}>STYLISH</span>
                <span className={s.banner_title_description}>
                  {" "}
                  MINIMAL CHAIR
                </span>
              </div>
              <button>View Now</button>
            </div>
          </div>
          <img src={basketChair} alt="basketchair" loading="lazy" />
        </section>
      </div>
    </div>
  );
};

export default Highlights;
