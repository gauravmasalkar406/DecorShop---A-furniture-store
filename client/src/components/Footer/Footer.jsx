import React from "react";
import "./footer.css";
import blog1 from "../../assets/Blog1.webp";
import blog2 from "../../assets/Blog2.webp";
import blog3 from "../../assets/Blog3.webp";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";

const Footer = () => {
  return (
    <div className="footer-main">
      <section>
        <p className="brand-name">DecorShop.</p>
        <p className="brand-desc">
          Explore the various kind of products for your Home, office and Room.
        </p>
      </section>
      <section>
        <p className="column-head">CONTACT US</p>
        <p className="brand-desc">
          <span>
            <FiPhone />
          </span>{" "}
          (+88) 1234 567898
        </p>
        <p className="brand-desc">
          <span>
            <MdOutlineMessage />
          </span>{" "}
          decorshop@gmail.com
        </p>
        <p className="brand-desc">
          <span>
            <MdOutlineConnectWithoutContact />
          </span>{" "}
          469, Hog Camp Road, California
        </p>
      </section>
      <section>
        <p className="column-head">USERFUL LINKS</p>
        <p className="brand-desc">About DecorShop</p>
        <p className="brand-desc">Contact us</p>
        <p className="brand-desc">FAQ</p>
        <p className="brand-desc">Supports</p>
        <p className="brand-desc">Blog</p>
        <p className="brand-desc">Privacy Policy</p>
      </section>
      <section>
        <p className="column-head">LATEST NEWS</p>
        <div className="news-col-container">
          <div className="news-card">
            <div className="head-date-container">
              <p className="heading">Furniture Decoration Idea</p>
              <p className="date">October 20, 2022</p>
            </div>
          </div>
          <div className="news-card">
            <div className="head-date-container">
              <p className="heading">Decorate Your Idea In House</p>
              <p className="date">October 20, 2022</p>
            </div>
          </div>
          <div className="news-card">
            <div className="head-date-container">
              <p className="heading">Dining Table Decorate</p>
              <p className="date">October 20, 2022</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
