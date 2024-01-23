import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../api/user.js";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/user.js";
import s from "./register.module.css";

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
      toast.error("Invalid email !");

      setIsLoading(false);
      return;
    }

    if (password.length < 3) {
      toast.error("Invalid password");

      setIsLoading(false);
      return;
    }

    if (name === "" || email === "" || password === "") {
      toast.error("Fill all details");

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
        toast.error(error.message);
      }
    }

    setIsLoading(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // loader
    setIsLoading(true);

    if (email === "" || password === "") {
      toast.error("Fill all detials!");
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
        toast.error(error.response.data.message);
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
      <div className={s.register_main}>
        <div className={s.register_container}>
          <div className={s.brand_symbol}>D</div>
          <p className={s.register_head}>Welcome</p>
          <p className={s.register_desc}>
            Register to DecorShop E-commerce store
          </p>

          <form className={s.resgiter_form} onSubmit={handleRegisterSubmit}>
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
              {isLoading ? <span className="loader"></span> : "REGISTER"}
            </button>
          </form>

          <p>
            Already a user?{" "}
            <span onClick={changePage} className={s.login_link}>
              login
            </span>
          </p>
        </div>
      </div>
    ) : (
      // login
      <div className={s.register_main}>
        <div className={s.register_container}>
          <div className={s.brand_symbol}>D</div>
          <p className={s.register_head}>Welcome</p>
          <p className={s.register_desc}>Login to DecorShop E-commerce store</p>

          <form className={s.resgiter_form} onSubmit={handleLoginSubmit}>
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
              {isLoading ? <span className="loader"></span> : "LOGIN"}
            </button>

            <button onClick={handleGuestLogin}>GUEST LOGIN</button>
            <button onClick={handleAdminLogin}>ADMIN LOGIN</button>
          </form>

          <p>
            New user?{" "}
            <span onClick={changePage} className={s.login_link}>
              register
            </span>
          </p>
        </div>
      </div>
    )
  );
};

export default Register;
