import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserRoute } from "../../api/user";
import { getMyOrdersRoute } from "../../api/order.js";
import { toast } from "react-toastify";
import axios from "axios";
import { addUser } from "../../store/slices/user.js";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import s from "./profile.module.css";

const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [myOrders, setMyOrders] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // fetching my orders
  useEffect(() => {
    const getMyOrders = async () => {
      setIsLoading(true);

      try {
        const response = await axios.post(
          getMyOrdersRoute,
          {
            userId: userInfo._id,
          },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setMyOrders(response.data);
        }

        setIsLoading(false);
      } catch (error) {
        toast.error(
          error?.data?.message || error?.error || "An error occurred"
        );
      }
    };

    getMyOrders();
  }, []);

  // handle update user information
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password do not match");
    }
    if (password.length < 3) {
      return toast.error("Password is not valid");
    }

    try {
      const response = await axios.put(
        updateUserRoute,
        { _id: userInfo._id, name, email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(addUser(response.data));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <div className={s.cart_main}>
      <section className={s.cart_p_details}>
        <h4 className={s.cart_sub_head}>My Orders</h4>
        <hr style={{ marginBottom: "2rem" }} />

        {isLoading ? (
          <div className="loader-container">
            <span className="loader-green" />
          </div>
        ) : myOrders && myOrders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th className={s.make_display_inactive}>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order, index) => (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <tr
                  key={order._id}
                  onClick={() => navigate(`/orderdetails/${order._id}`)}
                >
                  <td className={s.make_display_inactive}>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <IoMdCheckmark style={{ color: "green" }} />
                    ) : (
                      <RxCross2 style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <IoMdCheckmark style={{ color: "green" }} />
                    ) : (
                      <RxCross2 style={{ color: "red" }} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders available</p>
        )}
      </section>
      <section className={s.cart_order_summary}>
        <h4 className={s.cart_sub_head}>Update user details</h4>
        <hr style={{ marginBottom: "2rem" }} />

        <form className={s.register_form} onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">UPDATE</button>
        </form>
      </section>
    </div>
  );
};

export default Profile;
