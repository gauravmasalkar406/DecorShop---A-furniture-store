import React from "react";
import Header from "../../components/Header/Header";
import Highlights from "../../components/ProductHighlights/Highlights";
import Featured from "../../components/Featured/Featured";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      {/* SEO CONFIGURATIONS */}
      <Helmet>
        <title>Quality Home Decor Products | DecorShop</title>
        <meta
          name="description"
          content="Discover a diverse selection of high-quality home decor items at DecorShop. Elevate your living space with unique products and accessories."
        />
        <meta
          property="og:title"
          content="Quality Home Decor Products | DecorShop"
        />
        <meta
          property="og:description"
          content="Explore a diverse selection of high-quality home decor items at DecorShop. Elevate your living space with unique products and accessories."
        />
        <meta
          property="og:image"
          content="https://decorshop-jrzm.onrender.com/uploads/BlackSofaSet-WoodCraf01.webp"
        />
        <meta
          property="og:url"
          content="https://starlit-boba-8d5fb7.netlify.app"
        />
      </Helmet>
      <Header />
      <Highlights />
      <Featured />
    </div>
  );
};

export default Home;
