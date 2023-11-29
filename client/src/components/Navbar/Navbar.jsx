import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPersonPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { logoutUser } from "../../api/user.js";
import { removeUser } from "../../store/slices/user.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getCartItemsRoute } from "../../api/cart.js";
import {
  addCartItems,
  removeCartItems,
  updateCartTotal,
} from "../../store/slices/cart.js";
import {
  removeLatestOrder,
  removeShippingAddress,
} from "../../store/slices/order.js";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [isMenuSelected, setIsMenuSelected] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // login userinfo
  const userInfo = useSelector((state) => state.user.userInfo);

  // cart items
  const cartItems = useSelector((state) => state.cart.cartItems);

  // logout user
  const handleLogout = async () => {
    try {
      // remove user from store
      dispatch(removeUser());

      // request for logut
      const logOutResponse = await axios.get(logoutUser, {
        withCredentials: true,
      });

      dispatch(removeCartItems());

      dispatch(updateCartTotal(0));

      dispatch(removeLatestOrder());

      dispatch(removeShippingAddress());

      navigate("/");

      // success message
      toast.success(logOutResponse?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      try {
        const fetchCartItems = async () => {
          const response = await axios.post(
            getCartItemsRoute,
            {
              userId: userInfo._id,
            },
            { withCredentials: true }
          );

          dispatch(addCartItems(response?.data?.cartItems));
        };

        fetchCartItems();
      } catch (error) {
        console.log(error);
      }
    }
  }, [userInfo]);

  return (
    <div className="navbar-main">
      <div className="navbar-primary-container">
        <h1>
          DecorShop
          <span>.</span>
        </h1>

        <div
          onClick={() => setIsMenuSelected(!isMenuSelected)}
          className={
            isMenuSelected
              ? "nav-menu-active nav-links-container"
              : "nav-links-container"
          }
        >
          <Link to="/">HOME</Link>
          <Link to="/shop">SHOP</Link>
          <Link to={userInfo ? "/profile" : "/register"}>PROFILE</Link>
          {userInfo?.isAdmin && <Link to="/adminpanel">ADMIN PANEL</Link>}
          <Link to="/services">SERVICES</Link>
          <Link to="/news">NEWS</Link>
        </div>

        <div className="nav-user-menu-container">
          <div className="cart-container">
            <AiOutlineShoppingCart
              size={25}
              onClick={() =>
                userInfo ? navigate("/cart") : navigate("/register")
              }
            />
            <div>{cartItems ? cartItems.length : 0}</div>
          </div>

          {userInfo ? (
            <IoPersonRemoveOutline size={25} onClick={handleLogout} />
          ) : (
            <BsPersonPlus size={25} onClick={() => navigate("/register")} />
          )}

          <div
            className="nav-manu-container"
            onClick={() => setIsMenuSelected(!isMenuSelected)}
          >
            {isMenuSelected ? <IoMdMenu size={25} /> : <RxCross2 size={25} />}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
