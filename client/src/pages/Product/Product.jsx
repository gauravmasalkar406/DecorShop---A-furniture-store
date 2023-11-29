import React, { useEffect, useState } from "react";
import axios from "axios";
import "./product.css";
import { getProductInfo } from "../../api/product.js";
import { useParams } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import StarRating from "../../components/rating/Stars.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCartRoute } from "../../api/cart.js";
import { toast } from "react-toastify";
import { addCartItems } from "../../store/slices/cart.js";
import { host } from "../../api/host.js";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const [product, setProduct] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // userinfo
  const userInfo = useSelector((state) => state.user.userInfo);

  // id from params
  const { id } = useParams();

  // set image src on first render imagesrc will be chnages once user click on different img
  useEffect(() => {
    setImageSrc(product?.image[0]);
  }, [product]);

  // fetching product
  useEffect(() => {
    try {
      const fetchProduct = async () => {
        const response = await axios.get(`${getProductInfo}/${id}`);

        setProduct(response?.data);
      };

      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // increment quantiy
  const incrementQuant = () => {
    setSelectedQuantity((prev) => {
      if (prev >= product?.countInStock) {
        return product?.countInStock;
      } else {
        return prev + 1;
      }
    });
  };

  // decrement quantity
  const decrementQuant = () => {
    setSelectedQuantity((prev) => {
      if (prev <= 1) {
        return 1;
      } else {
        return prev - 1;
      }
    });
  };

  // add to cart btn
  const handleAddToCartBtn = async () => {
    setIsLoading(true);
    if (userInfo && product) {
      try {
        const addToCartResponse = await axios.post(
          addToCartRoute,
          {
            userId: userInfo._id,
            productId: product._id,
            quantity: selectedQuantity,
            price: product.price,
          },
          { withCredentials: true }
        );

        // dispatch it to store
        if (addToCartResponse) {
          dispatch(addCartItems(addToCartResponse?.data?.cartItems));
        }

        setIsLoading(false);

        toast.success(addToCartResponse?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/register");
    }
  };

  return product ? (
    <div className="prodduct-main">
      <section className="product-images-column">
        <div className="product-p-image-container">
          <img src={`${host}/${imageSrc}`} alt="" />
        </div>
        <div className="images-select">
          {product?.image?.map((ele, index) => (
            <div
              className={`products-p-p-image-container ${
                imageSrc === ele && "active-p"
              }`}
              key={index}
              onClick={() => setImageSrc(ele)}
            >
              <img src={`${host}/${ele}`} />
            </div>
          ))}
        </div>
      </section>
      <section>
        {product.countInStock > 0 ? (
          <button className="stock-btn stock-btn-green">In Stock</button>
        ) : (
          <button className="stock-btn stock-btn-red">Out of Stock</button>
        )}

        <h4 className="product-p-name">{product.name}</h4>

        <div className="rating-and-review">
          <span>
            <StarRating rating={product?.rating} />
          </span>
          <span className="product-rating">{product.rating}</span>
          <span className="divider">|</span>
          <span className="numreviews">{product.numReviews} Reviews</span>
        </div>

        <p className="product-p-description">{product.description}</p>

        <h1 className="product-p-price">₹ {product.price}</h1>

        {product.countInStock > 0 && (
          <>
            <div className="quantity-select">
              <p>QUANTITY :</p>
              <div className="quantity-select-value-btn">
                <span>{selectedQuantity}</span>
                <div>
                  <button onClick={incrementQuant}>
                    <IoIosArrowUp />
                  </button>
                  <button onClick={decrementQuant}>
                    <IoIosArrowDown />
                  </button>
                </div>
              </div>
            </div>

            {/* add to cart btn */}
            <button className="add-to-cart-btn" onClick={handleAddToCartBtn}>
              {isLoading ? (
                <span class="loader"></span>
              ) : (
                <>
                  <AiOutlineShoppingCart size={20} />
                  <span className="add-to-cart-btn-desc">ADD TO CART</span>
                </>
              )}
            </button>
          </>
        )}
      </section>
    </div>
  ) : (
    <div className="loader-container">
      <span class="loader-green"></span>
    </div>
  );
};

export default Product;
