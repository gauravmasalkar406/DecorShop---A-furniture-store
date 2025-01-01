import React from "react";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import s from "./footer.module.css";

const Footer = () => {
  return (
    <div className={s.footer_main}>
      <section>
        <p className={s.brand_name}>DecorShop.</p>
        <p className={s.brand_desc}>
          Explore the various kind of products for your Home, office and Room.
        </p>
      </section>
      <section>
        <p className={s.column_head}>CONTACT US</p>
        <p className={s.brand_desc}>
          <span>
            <FiPhone />
          </span>{" "}
          (+88) 1234 567898
        </p>
        <p className={s.brand_desc}>
          <span>
            <MdOutlineMessage />
          </span>{" "}
          decorshop@gmail.com
        </p>
        <p className={s.brand_desc}>
          <span>
            <MdOutlineConnectWithoutContact />
          </span>{" "}
          469, Hog Camp Road, California
        </p>
      </section>
      <section>
        <p className={s.column_head}>USEFUL LINKS</p>
        <p className={s.brand_desc}>About DecorShop</p>
        <p className={s.brand_desc}>Contact us</p>
        <p className={s.brand_desc}>FAQ</p>
        <p className={s.brand_desc}>Supports</p>
        <p className={s.brand_desc}>Blog</p>
        <p className={s.brand_desc}>Privacy Policy</p>
      </section>
      <section>
        <p className={s.column_head}>LATEST NEWS</p>
        <div className={s.news_col_container}>
          <div className={s.news_card}>
            <div className={s.head_date_container}>
              <p className={s.heading}>Furniture Decoration Idea</p>
              <p className={s.date}>October 20, 2022</p>
            </div>
          </div>
          <div className={s.news_card}>
            <div className={s.head_date_container}>
              <p className={s.heading}>Decorate Your Idea In House</p>
              <p className={s.date}>October 20, 2022</p>
            </div>
          </div>
          <div className={s.news_card}>
            <div className={s.head_date_container}>
              <p className={s.heading}>Dining Table Decorate</p>
              <p className={s.date}>October 20, 2022</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
