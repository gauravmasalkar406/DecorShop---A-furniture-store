import React, { useState, useEffect } from "react";
import "./user.css";
import axios from "axios";
import { getAllUsersRoute, deleteUseroute } from "../../../api/user";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState();
  const [usersUpdated, setUsersUpdated] = useState(false);

  // fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await axios.get(getAllUsersRoute, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUsers(response.data);
      }
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
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        setUsersUpdated(!usersUpdated);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      {users && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user._id}</td>
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
      )}
    </div>
  );
};

export default Users;
