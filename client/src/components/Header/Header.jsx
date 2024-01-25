import React from "react";
import light1 from "../../assets/light1.webp";
import light2 from "../../assets/light2.webp";
import s from "./header.module.css";

const Header = () => {
  return (
    <div className={s.header_main}>
      <div className={s.header_sub_container}>
        <div className={s.header_content_main_container}>
          <div className={s.header_content_container}>
            <div className={s.header_title_container}>
              <span className={s.header_title}>DecorShop</span>
              <span className={s.header_title_description}>
                {" "}
                Number #1 Trusted Furniture Website
              </span>
            </div>
            <div className={s.header_desc_container}>
              <p>Coming soon in your door with a huge discount</p>
            </div>
            <button>View Now</button>
          </div>
        </div>
        <img
          loading="eager"
          src={light1}
          className={s.light_img_1}
          alt="light1"
        />
        <img
          loading="eager"
          src={light2}
          className={s.light_img_2}
          alt="light2"
        />
      </div>
    </div>
  );
};

export default Header;
