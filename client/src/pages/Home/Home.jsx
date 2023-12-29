import React from "react";
import Header from "../../components/Header/Header";
import Highlights from "../../components/ProductHighlights/Highlights";
import Featured from "../../components/Featured/Featured";
import "./home.css";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      {/* SEO CONFIGURATIONS */}
      <Helmet>
        <title>DecorShop - Quality Home Decor Products</title>
        <meta
          name="description"
          content="Explore a wide range of high-quality home decor products at DecorShop. Find unique items to enhance your living space."
        />
        <meta
          property="og:title"
          content="DecorShop - Quality Home Decor Products"
        />
        <meta
          property="og:description"
          content="Explore a wide range of high-quality home decor products at DecorShop. Find unique items to enhance your living space."
        />
      </Helmet>
      <Header />
      <Highlights />
      <Featured />
    </div>
  );
};

export default Home;
