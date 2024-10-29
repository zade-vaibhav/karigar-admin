import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";

// Sample images for carousel
const sampleImages = [
  "/img/sample1.jpg",
  "/img/sample2.jpg",
  "/img/sample3.jpg",
];

export function MerchentProductDetail() {
  const { id, orderId } = useParams();
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigation = useNavigate();
  console.log(id);
  async function getMerchentProduct() {
    const requestOptions = {
      method: "GET",
    };
    try {
      const response = await fetch(
        `https://karigar-server-new.onrender.com/api/v1/merchent/getAllProduct`,
        requestOptions
      );
      const result = await response.json();
      console.log(result, "  product");
      if (result.success == true) {
        const myProduct = result.products.filter((ele) => {
          return ele.merchentId == id;
        });
        setProducts(myProduct[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    async function callFunction() {
      await getMerchentProduct();
    }
    callFunction();
  }, []);
  console.log(products);
  // Handle next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === sampleImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? sampleImages.length - 1 : prevIndex - 1
    );
  };

  const handleEditClick = () => {
    navigation(`/dashboard/Merchants/Editproduct/${id}/${products._id}`);
  };

  return (
    <>
      <CardHeader variant="gradient" color="gray" className="mt-8 p-6">
        <Typography variant="h6" color="white">
          Merchent Product Details Page
        </Typography>
      </CardHeader>
      {/* Carousel Section */}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl">
        {/* Images */}
        {products?.images && products.images.length > 0 && (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                products.images[currentImageIndex] || ""
              })`,
            }}
          ></div>
        )}
        <div className="absolute inset-0 h-full w-full bg-gray-900/50" />

        {/* Previous Button */}
        <button
          className="absolute top-1/2 left-5 text-white bg-gray-700 px-2 py-1 rounded-full"
          onClick={prevImage}
        >
          {"<"}
        </button>

        {/* Next Button */}
        <button
          className="absolute top-1/2 right-5 text-white bg-gray-700 px-2 py-1 rounded-full"
          onClick={nextImage}
        >
          {">"}
        </button>
      </div>

      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            {/* Order Details */}
            <ProfileInfoCard
              title="Product Detail"
              details={{
                "Product name": `${products?.productName}`,
                "Brand Name": `${products?.brandName}`,
                "Product Category": `${products?.productCategory}`,
                "Product descreption": `${products?.productDescription}`,
                "Product Price": `${products?.price} Rs`,
                "Product descounted Price": `${products?.discountdPrice} Rs`,
              }}
            />

            {/* Product Inventrey*/}
            <ProfileInfoCard
              title="Product Inventrey"
              details={{
                "Product ID": `${products?._id}`,
                "Product Barcode": `${products?.barCode}`,
                "Product GSTI no": `${products?.gstNumber}`,
                "Product GST rate": `${products?.gstRate}`,
              }}
            />

            {/* Product Specification */}
            <ProfileInfoCard
              title="Product Specification"
              details={{
                "Product Type": `${products?._id}`,
                "Product Model": `${products?.model}`,
                "Product variant": `${products?.variant}`,
                "Product Id": `${products?.productId}`,
              }}
            />
          </div>
          <Link
            to={`/dashboard/Merchents/Editproduct/${id}/${products._id}`}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Edit Product
          </Link>
        </CardBody>
      </Card>
    </>
  );
}

export default MerchentProductDetail;
