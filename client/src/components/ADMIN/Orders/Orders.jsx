import React, { useState, useEffect } from "react";
import "./order.css";
import { getAllOrdersRoute } from "../../../api/order.js";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchOrders = async () => {
      const response = await axios.get(getAllOrdersRoute, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setOrders(response.data.orders);
      }

      setIsLoading(false);
    };

    try {
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }

    fetchOrders();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <span class="loader-green"></span>
        </div>
      ) : orders && orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th className="make-display-inactive">ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr
                key={index}
                onClick={() => navigate(`/orderdetails/${order._id}`)}
              >
                <td className="make-display-inactive">{order._id}</td>
                <td>{order?.user?.name}</td>
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
    </div>
  );
};

export default Orders;
