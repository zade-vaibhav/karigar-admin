import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function EditProduct() {
  const { id, productId } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    productName: "",
    brandName: "",
    productCategory: "",
    productDescription: "",
    price: "",
    discountdPrice: "",
    barCode: "",
    quantity: "",
    model: "",
    variant: "",
  });
  console.log([productData]);

  // Fetch existing product data
  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch(
          `https://karigar-server-new.onrender.com/api/v1/merchent/getAllProduct`
        );
        const result = await response.json();
        if (result.success) {
          const myProduct = result.products.filter((ele) => {
            return ele.merchentId == id && ele._id == productId;
          })[0];

          // Remove unwanted fields from product data
          const {
            images,
            _id,
            rating,
            review,
            merchentId,
            varients,
            __v,
            ...filteredProductData
          } = myProduct;

          setProductData(filteredProductData);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchProductData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    };
    try {
      const response = await fetch(
        `https://karigar-server-new.onrender.com/api/v1/merchent/updateProduct/${productId}`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);

      if (result.success) {
        alert("Product updated successfully");
        navigate(`/dashboard/Merchents/product/${id}/${productId}`);
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fields to exclude dynamically
  const excludedFields = ["image", "id", "rating", "review"];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Edit Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Render each input field with pre-filled data, excluding certain fields */}
        {Object.keys(productData)
          .filter((key) => !excludedFields.includes(key))
          .map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                name={key}
                value={productData[key]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate(`/product-detail/${id}`)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
