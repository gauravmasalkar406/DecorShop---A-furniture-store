import React, { useEffect } from "react";
import light1 from "../../assets/light1.webp";
import light2 from "../../assets/light2.webp";
import s from "./header.module.css";

const Header = () => {
  // preloading images
  useEffect(() => {
    const preloadImages = [light1, light2];
    preloadImages.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

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
        <img src={light1} className={s.light_img_1} alt="light1" />
        <img src={light2} className={s.light_img_2} alt="light2" />
      </div>
    </div>
  );
};

export default Header;
