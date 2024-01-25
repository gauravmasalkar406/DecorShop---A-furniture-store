import React, { useEffect, useState } from "react";
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
  const [isGuestLogin, setIsGuestLogin] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // changing page
  const changePage = () => {
    setName("");
    setEmail("");
    setPassword("");
    setIsRegisterPage(!isRegisterPage);
  };

  // register handler
  const handleRegisterSubmit = async (e) => {
    e?.preventDefault();

    if (name.length < 3 || email.length < 3 || password.length < 3) {
      return toast.error(
        "Name, email, and password should have at least 3 characters!"
      );
    }

    if (!name || !email || !password) {
      return toast.error("Fill all details");
    }

    try {
      // loader
      setIsLoading(true);

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

        // navigate to previous page
        navigate(-1);
      }
    } catch (error) {
      toast(error?.message || error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // login handler
  const handleLoginSubmit = async (e) => {
    e?.preventDefault();

    if (email && password) {
      try {
        // loader
        setIsLoading(true);

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
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Fill all the details");
    }
  };

  // guest login
  const handleGuestLogin = () => {
    setEmail("john@gmail.com");
    setPassword("123456");
    setIsGuestLogin(true);
  };

  useEffect(() => {
    if (isGuestLogin) {
      handleLoginSubmit();
    }
  }, [isGuestLogin]);

  // admin login
  const handleAdminLogin = () => {
    setEmail("admin@gmail.com");
    setPassword("123456");
    setIsAdminLogin(true);
  };

  useEffect(() => {
    if (isAdminLogin) {
      handleLoginSubmit();
    }
  }, [isAdminLogin]);

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
