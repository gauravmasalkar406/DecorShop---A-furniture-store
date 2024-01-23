import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllUsersRoute, deleteUseroute } from "../../../api/user";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import s from "./user.module.css";

const Users = () => {
  const [users, setUsers] = useState();
  const [usersUpdated, setUsersUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // fetch all users
  useEffect(() => {
    setIsLoading(true);

    const fetchAllUsers = async () => {
      const response = await axios.get(getAllUsersRoute, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUsers(response.data);
      }

      setIsLoading(false);
    };

    fetchAllUsers();
  }, [usersUpdated]);

  // on delete user
  const handleUserDelete = async (id) => {
    try {
      const response = await axios.delete(deleteUseroute, {
        data: { id },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(response.data.message);

        setUsersUpdated(!usersUpdated);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <span class="loader-green"></span>
        </div>
      ) : (
        users && (
          <table>
            <thead>
              <tr>
                <th className={s.make_display_inactive}>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className={s.make_display_inactive}>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <IoMdCheckmark style={{ color: "green" }} />
                    ) : (
                      <RxCross2 style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <button
                      style={{
                        border: "0px",
                        background: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleUserDelete(user._id)}
                    >
                      <AiOutlineDelete style={{ color: "red" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default Users;
