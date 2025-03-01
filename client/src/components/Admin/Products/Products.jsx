import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../../api/product.js";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import s from "./product.module.css";

const Products = () => {
  const [products, setProducts] = useState();
  const [currPage, setCurrPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  // fetching products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${getAllProducts}/default/all/all/0/false/${currPage}`
        );

        setProducts(response?.data?.products);
        setTotalPages(response.data.pages);
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currPage]);

  const handleNavigateToProductPage = (product) => {
    return navigate(`/product/${product._id}`);
  };

  const prevPage = () => {
    if (currPage <= 1) {
      setCurrPage(1);
    } else {
      setCurrPage(currPage - 1);
    }
  };

  const nextPage = () => {
    if (currPage >= totalPages) {
      setCurrPage(totalPages);
    } else {
      setCurrPage(currPage + 1);
    }
  };

  const pageNumClassName = (pageNum) =>
    pageNum === currPage ? `${s.active_page_btn}` : `${s.inactive_page_btn}`;

  const handleDeleteProduct = (e) => {
    e.stopPropagation();
  };

  return isLoading ? (
    <div className="loader-container">
      <span class="loader-green" />
    </div>
  ) : (
    <div>
      {products && (
        <table>
          <thead>
            <tr>
              <th className={s.make_display_inactive}>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                onClick={() => handleNavigateToProductPage(product)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleNavigateToProductPage(product);
                    event.preventDefault();
                  }
                }}
                tabIndex={0}
                style={{ cursor: "pointer" }}
              >
                <td className={s.make_display_inactive}>{product._id}</td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    className={s.delete_btn}
                    type="button"
                    onClick={(e) => handleDeleteProduct(e)}
                  >
                    <AiOutlineDelete style={{ color: "red" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className={s.shop_pagination_container}>
        <button onClick={() => setCurrPage(1)} type="button">
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <button onClick={prevPage} type="button">
          <MdOutlineKeyboardArrowLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNum) => {
            return (
              pageNum >= currPage - 1 &&
              pageNum <= currPage + 1 && (
                <button
                  key={pageNum}
                  className={pageNumClassName(pageNum)}
                  onClick={() => setCurrPage(pageNum)}
                  type="button"
                >
                  {pageNum}
                </button>
              )
            );
          }
        )}
        <button onClick={nextPage} type="button">
          <MdOutlineKeyboardArrowRight />
        </button>
        <button onClick={() => setCurrPage(totalPages)} type="button">
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>

      <button
        className={s.summary_buy_btn}
        onClick={() => navigate("/create")}
        type="button"
      >
        CREATE PRODUCT
      </button>
    </div>
  );
};

export default Products;
