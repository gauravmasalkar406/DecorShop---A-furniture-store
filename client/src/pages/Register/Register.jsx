import React, { useState } from "react";
import "./register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../api/user.js";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/user.js";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterPage, setIsRegisterPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // changing page
  const changePage = () => {
    setName("");
    setEmail("");
    setPassword("");
    setIsRegisterPage(!isRegisterPage);
  };

  // register form
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // loader
    setIsLoading(true);

    if (name.length < 3) {
      toast.error("Name should have atleast 3 charcters!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setIsLoading(false);
      return;
    }

    if (email.length < 3) {
      toast.error("Email should have atleast 3 charcters!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setIsLoading(false);
      return;
    }

    if (password.length < 3) {
      toast.error("Password should have atleast 3 charcters!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setIsLoading(false);
      return;
    }

    if (name === "" || email === "" || password === "") {
      toast.error("Fill all the detials !", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setIsLoading(false);
      return;
    } else {
      try {
        const registerResponse = await axios.post(
          registerUser,
          {
            name,
            email,
            password,
          },
          { withCredentials: true }
        );

        if (registerResponse.status === 200) {
          const userData = registerResponse.data;

          // Dispatch the addUser action with user information
          dispatch(addUser(userData));

          setIsLoading(false);

          // navigate to previous page
          navigate(-1);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    setIsLoading(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // loader
    setIsLoading(true);

    if (email === "" || password === "") {
      toast.error("Fill all the detials !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else {
      try {
        const loginResponse = await axios.post(
          loginUser,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );

        if (loginResponse.status === 200) {
          const userData = loginResponse.data;

          // Dispatch the addUser action with user information
          dispatch(addUser(userData));

          // navigate to previous page
          navigate(-1);
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    setIsLoading(false);
  };

  // guest login
  const handleGuestLogin = () => {
    setEmail("john@gmail.com");
    setPassword("123456");
    handleLoginSubmit();
  };

  const handleAdminLogin = () => {
    setEmail("admin@gmail.com");
    setPassword("123456");
    handleLoginSubmit();
  };

  return (
    // register
    isRegisterPage ? (
      <div className="register-main">
        <div className="register-container">
          <div className="brand-symbol">D</div>
          <p className="register-head">Welcome</p>
          <p className="register-desc">
            Register to DecorShop E-commerce store
          </p>

          <form className="resgiter-form" onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type="submit">
              {isLoading ? <span class="loader"></span> : "REGISTER"}
            </button>
          </form>

          <p>
            Already a user?{" "}
            <span onClick={changePage} className="login-link">
              login
            </span>
          </p>
        </div>
        <ToastContainer />
      </div>
    ) : (
      // login
      <div className="register-main">
        <div className="register-container">
          <div className="brand-symbol">D</div>
          <p className="register-head">Welcome</p>
          <p className="register-desc">Login to DecorShop E-commerce store</p>

          <form className="resgiter-form" onSubmit={handleLoginSubmit}>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type="submit">
              {isLoading ? <span class="loader"></span> : "LOGIN"}
            </button>

            <button onClick={handleGuestLogin}>GUEST LOGIN</button>
            <button onClick={handleAdminLogin}>ADMIN LOGIN</button>
          </form>

          <p>
            New user?{" "}
            <span onClick={changePage} className="login-link">
              register
            </span>
          </p>
        </div>
        <ToastContainer />
      </div>
    )
  );
};

export default Register;
