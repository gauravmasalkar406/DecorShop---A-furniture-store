import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instagram2 from "../../assets/instagram2.webp";
import instagram1 from "../../assets/instagram1.webp";
import instagram3 from "../../assets/instagram3.webp";
import instagram4 from "../../assets/instagram4.webp";
import instagram5 from "../../assets/instagram5.webp";
import { getAllProducts } from "../../api/product";
import { toast } from "react-toastify";
import axios from "axios";
import F1 from "./F1";
import F2 from "./F2";
import s from "./feature.module.css";

const Featured = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fecthProducts();
  }, []);

  // fetch products function
  const fecthProducts = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${getAllProducts}/default/all/all/0/false/1`
      );

      setProducts(response.data.products);
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    products && (
      <>
        <div className={s.featured_main}>
          <F1 category={"sofas"} heading={"BEST SELLER"} />
          <F1 category={"architect"} heading={"NEW ARRIVAL"} />
          <F1 category={"lighting"} heading={"FEATURED"} />
        </div>

        <hr className={`${s.hr_line} ${s.hr_length}`} />

        <F2 category={"sofas"} heading={"Decoration"} />
        <F2 category={"architect"} heading={"Architect"} />

        <hr className={`${s.hr_line} ${s.hr_length}`} />

        <section className={s.intagram_banner}>
          <img src={instagram2} alt="instagram2" loading="lazy" />
          <img src={instagram1} alt="instagram1" loading="lazy" />
          <img src={instagram3} alt="instagram3" loading="lazy" />
          <img src={instagram4} alt="instagram4" loading="lazy" />
          <img src={instagram5} alt="instagram5" loading="lazy" />

          <div className={s.insta_head_container}>
            <div className={s.insta_head}>
              <h4>INSTAGRAM</h4>
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default Featured;
