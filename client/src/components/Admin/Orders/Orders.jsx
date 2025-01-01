import React, { useState, useEffect } from "react";
import { getAllOrdersRoute } from "../../../api/order.js";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import s from "./order.module.css";
import { FORMAT_DATE } from "../../../utils/date.js";

const Orders = () => {
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(getAllOrdersRoute, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || error.message || "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleNavigateToOrderPage = (order) => {
    navigate(`/orderdetails/${order._id}`);
  };

  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <span className="loader-green" />
        </div>
      ) : orders && orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th className={s.make_display_inactive}>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr
                key={order._id}
                onClick={() => handleNavigateToOrderPage(order)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleNavigateToOrderPage(order);
                    event.preventDefault();
                  }
                }}
                tabIndex={0}
                style={{ cursor: "pointer" }}
              >
                <td className={s.make_display_inactive}>{order._id}</td>
                <td>{order?.user?.name}</td>
                <td>{FORMAT_DATE(order.createdAt)}</td>
                <td>{`$${order.totalPrice}`}</td>
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
    </div>
  );
};

export default Orders;
