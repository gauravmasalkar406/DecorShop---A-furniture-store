import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../../api/product.js";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./product.css";

const Products = () => {
  const [products, setProducts] = useState();
  const [currPage, setCurrPage] = useState(1);

  const navigate = useNavigate();

  // fetching products
  useEffect(() => {
    try {
      const fecthProducts = async () => {
        const response = await axios.get(getAllProducts);

        setProducts(response?.data?.products);
      };

      fecthProducts();
    } catch (error) {
      toast.error(error.response.data.message || error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, []);

  let itemsPerPage = 6;
  let totalPages = Math.ceil(products?.length / itemsPerPage);
  let lastIndex = currPage * itemsPerPage;
  let firstIndex = lastIndex - itemsPerPage;

  // product delete
  const handleProductDelete = () => {};

  return (
    <div>
      {products && (
        <table>
          <thead>
            <tr>
              <th className="make-display-inactive">ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map(
              (product, index) =>
                index >= firstIndex &&
                index < lastIndex && (
                  <tr key={index}>
                    <td className="make-display-inactive">{product._id}</td>
                    <td>{product.name}</td>
                    <td>₹{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <button
                        style={{
                          border: "0px",
                          background: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => handleProductDelete(product._id)}
                      >
                        <AiOutlineDelete style={{ color: "red" }} />
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      )}

      <div className="shop-pagination-container">
        <button onClick={() => setCurrPage(1)}>
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <button
          onClick={() => {
            if (currPage <= 1) {
              setCurrPage(1);
            } else {
              setCurrPage(currPage - 1);
            }
          }}
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNum) => {
            return (
              pageNum >= currPage - 1 &&
              pageNum <= currPage + 1 && (
                <button
                  key={pageNum}
                  className={
                    pageNum === currPage
                      ? "active-page-btn"
                      : "inactive-page-btn"
                  }
                  onClick={() => setCurrPage(pageNum)}
                >
                  {pageNum}
                </button>
              )
            );
          }
        )}
        <button
          onClick={() => {
            if (currPage >= totalPages) {
              setCurrPage(totalPages);
            } else {
              setCurrPage(currPage + 1);
            }
          }}
        >
          <MdOutlineKeyboardArrowRight />
        </button>
        <button onClick={() => setCurrPage(totalPages)}>
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>

      <button className="summary-buy-btn" onClick={() => navigate("/create")}>
        CREATE PRODUCT
      </button>
    </div>
  );
};

export default Products;
