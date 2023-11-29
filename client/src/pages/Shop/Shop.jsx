import React, { useState, useEffect } from "react";
import "./shop.css";
import { getAllProducts } from "../../api/product";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { host } from "../../api/host";

const Shop = () => {
  const [products, setProducts] = useState();
  const [filteredProducts, setFilteredProduct] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(["all"]);
  const [brands, setBrands] = useState(["all"]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [higestPrice, setHighestPrice] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [isShipping, setIsShipping] = useState(false);
  const [sortByValue, setSortByValue] = useState("Price (Lowest)");
  const [currPage, setCurrPage] = useState(1);
  const [showFilters, setShowfilters] = useState(false);

  const navigate = useNavigate();

  const sortByFilters = [
    "Price (Lowest)",
    "Price (Highest)",
    "Name (A-Z)",
    "Name (Z-A)",
  ];

  // get price of max pricy product
  useEffect(() => {
    let price = 0;
    products?.forEach((product) => {
      if (product.price >= price) {
        price = product.price;
      }
    });

    setHighestPrice(price);
  }, [products]);

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

  // find unique categories
  useEffect(() => {
    if (products) {
      const uniqueCategories = Array.from(
        new Set([...categories, ...products.map((product) => product.category)])
      );

      setCategories([...uniqueCategories]);
    }
  }, [products]);

  // find unique categories
  useEffect(() => {
    if (products) {
      const uniqueBrands = Array.from(
        new Set([...brands, ...products.map((product) => product.brand)])
      );

      setBrands([...uniqueBrands]);
    }
  }, [products]);

  // filter products
  useEffect(() => {
    if (products) {
      // search query
      let tempProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // filter by category
      if (selectedCategory !== "all") {
        tempProducts = tempProducts.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      // filter by brand
      if (selectedBrand !== "all") {
        tempProducts = tempProducts.filter(
          (product) =>
            product.brand.toLowerCase() === selectedBrand.toLowerCase()
        );
      }

      // filter by price
      tempProducts = tempProducts?.filter((product) => {
        return product.price >= selectedPrice;
      });

      // shipping filter
      if (isShipping) {
        tempProducts = tempProducts?.filter((product) => {
          return product.shipping;
        });
      }

      // sort by filter
      if (sortByValue == "Price (Lowest)") {
        tempProducts.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (sortByValue == "Price (Highest)") {
        tempProducts.sort((a, b) => {
          return b.price - a.price;
        });
      } else if (sortByValue == "Name (A-Z)") {
        tempProducts.sort((a, b) => {
          if (b.name > a.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (sortByValue == "Name (Z-A)") {
        tempProducts.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          } else if (b.name > a.name) {
            return 1;
          } else {
            return 0;
          }
        });
      }

      setFilteredProduct([...tempProducts]);
    }
  }, [
    searchQuery,
    products,
    selectedCategory,
    selectedBrand,
    selectedPrice,
    isShipping,
    sortByValue,
  ]);

  const handleAllClear = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSelectedPrice(0);
    setIsShipping(false);
    setSortByValue("Price (Lowest)");
  };

  let itemsPerPage = 6;
  let totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  let lastIndex = currPage * itemsPerPage;
  let firstIndex = lastIndex - itemsPerPage;

  return (
    <div className="shop-main">
      <section
        className={
          showFilters
            ? "shop-filters-container"
            : "shop-filters-container-inactive"
        }
      >
        <div className="shop-filters-head">
          <h2>FILTER BY</h2>
          <button onClick={handleAllClear}>Clear All</button>
        </div>

        <div className="shop-filters-searchbar">
          <input
            type="text"
            placeholder="...Search product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IoSearchOutline size={22} />
        </div>

        <h4 className="shop-category-head">Categories</h4>
        {categories?.map((cat, index) => (
          <p
            key={index}
            className={
              selectedCategory === cat
                ? "active-category shop-category-option"
                : "shop-category-option"
            }
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </p>
        ))}

        <div className="shop-select-container">
          <h4 className="shop-brand-head">Brand</h4>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {brands?.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="shop-price-container">
          <h4 className="shop-brand-head">Price</h4>
          <input
            type="range"
            min={0}
            max={higestPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            value={selectedPrice}
          />
          <p>₹{selectedPrice}</p>
        </div>

        <div className="shop-checkbox-container">
          <input
            type="checkbox"
            onChange={() => setIsShipping(!isShipping)}
            checked={isShipping == true}
          />{" "}
          <span>Shipping</span>
        </div>
      </section>

      <section className="shop-product-conatainer">
        <div className="shop-show-filter-container">
          <button onClick={() => setShowfilters(!showFilters)}>Filters</button>
        </div>
        <div className="sort-filter-container">
          <div className="shop-p-length-head">
            <p>{filteredProducts?.length} products found</p>
          </div>

          <div className="shop-horizontal">
            <hr />
          </div>

          <div className="shop-sort-filter">
            <p>sort by</p>
            <select
              value={sortByValue}
              onChange={(e) => setSortByValue(e.target.value)}
            >
              {sortByFilters?.map((ele, index) => (
                <option key={index} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="shop-products-container">
          {filteredProducts?.map((product, index) => {
            return (
              index >= firstIndex &&
              index < lastIndex && (
                <div
                  className="product-card"
                  onClick={() => navigate(`/product/${product._id}`)}
                  key={index}
                >
                  <div className="product-image-container">
                    <img
                      src={`${host}/${product?.image[0]}`}
                      key={index}
                      className="product-image"
                    />
                  </div>
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">₹{product.price}</p>
                </div>
              )
            );
          })}
        </div>

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
      </section>
    </div>
  );
};

export default Shop;
