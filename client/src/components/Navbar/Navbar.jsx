import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPersonPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { logoutUser } from "../../api/user.js";
import { removeUser } from "../../store/slices/user.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
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
import s from "./navbar.module.css";

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
      toast.success("Logged out");
    } catch (error) {
      toast.error(error.message || error.data.message);
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
    <div className={s.navbar_main}>
      <div className={s.navbar_primary_container}>
        <h1>
          DecorShop
          <span>.</span>
        </h1>

        <div
          onClick={() => setIsMenuSelected(!isMenuSelected)}
          className={
            isMenuSelected
              ? `${s.nav_menu_active} ${s.nav_links_container}`
              : s.nav_links_container
          }
        >
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? s.pending : isActive ? s.active_link : ""
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive, isPending }) =>
              isPending ? s.pending : isActive ? s.active_link : ""
            }
          >
            SHOP
          </NavLink>
          <NavLink
            to={userInfo ? "/profile" : "/register"}
            className={({ isActive, isPending }) =>
              isPending ? s.pending : isActive ? s.active_link : ""
            }
          >
            PROFILE
          </NavLink>
          {userInfo?.isAdmin && <NavLink to="/adminpanel">ADMIN PANEL</NavLink>}
          <NavLink
            to="/services"
            className={({ isActive, isPending }) =>
              isPending ? s.pending : isActive ? s.active_link : ""
            }
          >
            SERVICES
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive, isPending }) =>
              isPending ? s.pending : isActive ? s.active_link : ""
            }
          >
            NEWS
          </NavLink>
        </div>

        <div className={s.nav_user_menu_container}>
          <div className={s.cart_container}>
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
            className={s.nav_manu_container}
            onClick={() => setIsMenuSelected(!isMenuSelected)}
          >
            {isMenuSelected ? <IoMdMenu size={25} /> : <RxCross2 size={25} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
