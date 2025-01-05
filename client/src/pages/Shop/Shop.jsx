import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../api/product";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { host } from "../../api/host";
import { toast } from "react-toastify";
import {
  getUniqueCategoriesRoute,
  getUniqueBrandsRoute,
} from "../../api/product";
import s from "./shop.module.css";

const Shop = () => {
  const [products, setProducts] = useState();
  const [filteredProducts, setFilteredProduct] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(["all"]);
  const [brands, setBrands] = useState(["all"]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [isShipping, setIsShipping] = useState(false);
  const [sortByValue, setSortByValue] = useState("Price (Lowest)");
  const [currPage, setCurrPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const navigate = useNavigate();

  // sorting filters
  const sortByFilters = [
    "Price (Lowest)",
    "Price (Highest)",
    "Name (A-Z)",
    "Name (Z-A)",
  ];

  // fetching products
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, isShipping, currPage]);

  // fetching products
  useEffect(() => {
    const debounce = setTimeout(() => fetchProducts(), 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery, selectedPrice]);

  // fetch products function
  const fetchProducts = async () => {
    setIsLoading(true);

    // seacrh keyword
    const keyword = searchQuery.length <= 0 ? "default" : searchQuery;

    try {
      const response = await axios.get(
        `${getAllProducts}/${keyword}/${selectedCategory}/${selectedBrand}/${selectedPrice}/${isShipping}/${currPage}`
      );

      setProducts(response?.data?.products);
      setTotalPages(response.data.pages);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // fetching unique categories
  useEffect(() => {
    const fetchUniqueCategories = async () => {
      try {
        const response = await axios.get(getUniqueCategoriesRoute);

        setCategories(["all", ...response.data.unique]);
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    };

    fetchUniqueCategories();
  }, []);

  // fetching unique brands
  useEffect(() => {
    const fetchUniqueBrands = async () => {
      try {
        const response = await axios.get(getUniqueBrandsRoute);

        setBrands(["all", ...response.data.unique]);
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    };

    fetchUniqueBrands();
  }, []);

  // sorting filters
  useEffect(() => {
    if (!products) {
      return;
    }

    const tempProducts = [...products];

    // sort by filter
    if (sortByValue === "Price (Lowest)") {
      tempProducts.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sortByValue === "Price (Highest)") {
      tempProducts.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (sortByValue === "Name (A-Z)") {
      tempProducts.sort((a, b) => {
        const nameX = a.name.toLowerCase();
        const nameY = b.name.toLowerCase();
        return nameX.localeCompare(nameY);
      });
    } else if (sortByValue === "Name (Z-A)") {
      tempProducts.sort((a, b) => {
        const nameX = a.name.toLowerCase();
        const nameY = b.name.toLowerCase();
        return nameY.localeCompare(nameX);
      });
    }

    setFilteredProduct([...tempProducts]);
  }, [products, sortByValue]);

  // all clear handler
  const handleAllClear = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSelectedPrice(0);
    setIsShipping(false);
    setSortByValue("Price (Lowest)");
  };

  const handleChangeCategory = (cat) => {
    setSelectedCategory(cat);
    setCurrPage(1);
  };

  const handleChangeBrand = (e) => {
    setSelectedBrand(e.target.value);
    setCurrPage(1);
  };

  const handleChangeIsShipping = () => {
    setIsShipping((prev) => !prev);
    setCurrPage(1);
  };

  const prevPage = () => {
    setCurrPage((prev) => (prev <= 1 ? prev : prev - 1));
  };

  const nextPage = () => {
    setCurrPage((prev) => (prev >= totalPages ? prev : prev + 1));
  };

  return (
    <div className={s.shop_main}>
      <section
        className={
          showFilters
            ? s.shop_filters_container
            : s.shop_filters_container_inactive
        }
      >
        <div className={s.shop_filters_head}>
          <h2>FILTER BY</h2>
          <button onClick={handleAllClear} type="button">
            Clear All
          </button>
        </div>

        <div className={s.shop_filters_searchbar}>
          <input
            type="text"
            placeholder="...Search product"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrPage(1);
            }}
          />
          <IoSearchOutline size={22} />
        </div>

        <h4 className={s.shop_category_head}>Categories</h4>
        {categories?.map((cat, index) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <p
            key={cat}
            className={
              selectedCategory === cat
                ? `${s.active_category} ${s.shop_category_option}`
                : s.shop_category_option
            }
            onClick={() => handleChangeCategory(cat)}
          >
            {cat}
          </p>
        ))}

        <div className={s.shop_select_container}>
          <h4 className={s.shop_brand_head}>Brand</h4>
          <select value={selectedBrand} onChange={(e) => handleChangeBrand(e)}>
            {brands?.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className={s.shop_price_container}>
          <h4 className={s.shop_brand_head}>Price</h4>
          <input
            type="range"
            min={0}
            max={100_000}
            onChange={(e) => {
              setSelectedPrice(e.target.value);
              setCurrPage(1);
            }}
            value={selectedPrice}
          />
          <p>₹{selectedPrice}</p>
        </div>

        <div className={s.shop_checkbox_container}>
          <input
            type="checkbox"
            onChange={handleChangeIsShipping}
            checked={isShipping}
          />{" "}
          <span>Shipping</span>
        </div>
      </section>

      <section className={s.shop_product_container}>
        <div className={s.shop_show_filter_container}>
          <button onClick={() => setShowFilters(!showFilters)} type="button">
            Filters
          </button>
        </div>
        <div className={s.sort_filter_container}>
          <div className={s.shop_p_length_head}>
            <p>{totalProducts} products found</p>
          </div>

          <div className={s.shop_horizontal}>
            <hr />
          </div>

          <div className={s.shop_sort_filter}>
            <p>sort by</p>
            <select
              value={sortByValue}
              onChange={(e) => setSortByValue(e.target.value)}
            >
              {sortByFilters?.map((ele, index) => (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!isLoading && products ? (
          <>
            <div className={s.shop_products_container}>
              {filteredProducts?.map((product, index) => {
                return (
                  // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                  <div
                    className={s.product_card}
                    onClick={() => navigate(`/product/${product._id}`)}
                    key={product?._id}
                  >
                    <div className={s.product_image_container}>
                      <img
                        src={`${host}/${product?.image[0]}`}
                        key={product?._id}
                        className={s.product_image}
                        alt={product?.name}
                        loading="lazy"
                      />
                    </div>
                    <p className={s.product_name}>{product.name}</p>
                    <p className={s.product_price}>₹{product.price}</p>
                  </div>
                );
              })}
            </div>
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
                        className={
                          pageNum === currPage
                            ? s.active_page_btn
                            : "inactive-page-btn"
                        }
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
          </>
        ) : (
          <div className="loader-container">
            <span className="loader-green" />
          </div>
        )}
      </section>
    </div>
  );
};

export default Shop;
