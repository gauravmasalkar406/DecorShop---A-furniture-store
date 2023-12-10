import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Highlights from "../../components/ProductHighlights/Highlights";
import axios from "axios";
import { getAllProducts } from "../../api/product";
import Featured from "../../components/Featured/Featured";
import "./home.css";

const Home = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // fetching products
  useEffect(() => {
    setIsLoading(true);

    try {
      const fecthProducts = async () => {
        const response = await axios.get(getAllProducts);

        setIsLoading(false);
        setProducts(response?.data?.products);
      };

      fecthProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Header />

      {isLoading ? (
        <div className="loader-container">
          <span class="loader-green"></span>
        </div>
      ) : (
        <>
          <Highlights products={products} />
          <Featured products={products} />
        </>
      )}
    </div>
  );
};

export default Home;
