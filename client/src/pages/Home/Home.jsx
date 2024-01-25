import { Header, Highlights, Featured } from "../../components/index.js";
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
        {/* Open Graph meta tags for better social media sharing */}
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

        {/* Twitter Card meta tags for Twitter sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Quality Home Decor Products | DecorShop"
        />
        <meta
          name="twitter:description"
          content="Explore a diverse selection of high-quality home decor items at DecorShop. Elevate your living space with unique products and accessories."
        />
        <meta
          name="twitter:image"
          content="https://decorshop-jrzm.onrender.com/uploads/BlackSofaSet-WoodCraf01.webp"
        />

        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://starlit-boba-8d5fb7.netlify.app" />
      </Helmet>

      <Header />
      <Highlights />
      <Featured />
    </div>
  );
};

export default Home;
