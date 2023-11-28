import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Highlights from "../../components/ProductHighlights/Highlights";
import axios from "axios";
import { getAllProducts } from "../../api/product";
import Featured from "../../components/Featured/Featured";
import { useDispatch } from "react-redux";

const Home = () => {
  const [products, setProducts] = useState();

  const dispatch = useDispatch();

  // fetching products
  useEffect(() => {
    try {
      const fecthProducts = async () => {
        const response = await axios.get(getAllProducts);

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
      <Highlights products={products} />
      <Featured products={products} />
    </div>
  );
};

export default Home;
