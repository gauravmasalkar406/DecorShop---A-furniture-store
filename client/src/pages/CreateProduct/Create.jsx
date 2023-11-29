import React, { useState, useEffect } from "react";
import { uploadImageRoute, createProductRoute } from "../../api/product.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import "./create.css";

const Create = () => {
  const [image, setImage] = useState();
  const [imageArr, setImageArr] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState();
  const [isShipping, setIsShipping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = useSelector((state) => state.user.userInfo);

  // image upload handler
  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(uploadImageRoute, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // image name
        setImage(response.data.image);

        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (image) {
      setImageArr([image, ...imageArr]);
    }
  }, [image]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    if (
      name.length <= 0 ||
      price == undefined ||
      description.length <= 0 ||
      brand.length <= 0 ||
      category.length <= 0 ||
      quantity == undefined ||
      imageArr.length < 4
    ) {
      toast.error("Fill all details", {
        position: toast.POSITION.TOP_RIGHT,
      });

      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        createProductRoute,
        {
          name,
          price,
          description,
          image: imageArr,
          brand,
          category,
          user: userInfo._id,
          countInStock: quantity,
          shipping: isShipping,
        },
        { withCredentials: true }
      );

      isLoading(false);
      
      if (response.status == 200) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="create-main">
      <form onSubmit={handleCreateProduct} className="resgiter-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity available"
          value={quantity}
          onChange={(e) => setQuantity(parseFloat(e.target.value))}
        />
        <section className="check-container">
          <input
            type="checkbox"
            checked={isShipping}
            onChange={() => setIsShipping(!isShipping)}
          />
          <span>Available for shipping </span>
        </section>
        <input
          type="file"
          placeholder="Choose image 1"
          onChange={uploadHandler}
        />
        <input
          type="file"
          placeholder="Choose image 2"
          onChange={uploadHandler}
        />
        <input
          type="file"
          placeholder="Choose image 3"
          onChange={uploadHandler}
        />
        <input
          type="file"
          placeholder="Choose image 4"
          onChange={uploadHandler}
        />
        <button type="submit">
          {isLoading ? <span class="loader"></span> : "CREATE PRODUCT"}
        </button>
      </form>
    </div>
  );
};

export default Create;
