import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";

// Sample images for carousel
const sampleImages = [
  "/img/sample1.jpg",
  "/img/sample2.jpg",
  "/img/sample3.jpg",
];

export function UserProductOrder() {
  const { id, orderId } = useParams();
  const [userOrder, setUserOrder] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log(id, orderId);
  // Fetch labor details
  async function getUser() {
    const requestOptions = {
      method: "GET",
    };
    try {
      const response = await fetch(
        `https://karigar-server-new.onrender.com/api/v1/user/getUser/${id}`,
        requestOptions
      );
      const result = await response.json();
      if (result.success === true) {
        const Order = result.user.productOrders.filter((ele) => {
          return ele._id === orderId;
        });
        setUserOrder(Order[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  console.log("000", userOrder);
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

  return (
    <>
      <CardHeader variant="gradient" color="gray" className="mt-8 p-6">
        <Typography variant="h6" color="white">
          User Material Order Details Page
        </Typography>
      </CardHeader>
      {/* Carousel Section */}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl">
        {/* Images */}
        {/* <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${userOrder?.productId?.images[currentImageIndex]})`,
                    }}
                ></div> */}
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
              title="Order Detail"
              details={{
                "Order ID": `${userOrder?._id}`,
                // "Product name": `${userOrder?.productId?.productName}`,
                // "Brand Name": `${userOrder?.productId?.brandName}`,
                "Booked Quantity": `${userOrder?.bookingQuantity}`,
                Price: `${userOrder?.payment?.paymentDetails.price}`,
                "Total Price": `${userOrder?.payment?.paymentDetails?.finalPrice} Rs`,
                "Shipping Address": `${
                  userOrder?.deleveryAddress?.addressLine || null
                }, ${userOrder?.deleveryAddress?.city || null}, ${
                  userOrder?.deleveryAddress?.state || null
                }, ${userOrder?.deleveryAddress?.pincode || null}`,
                "Order Status": `${userOrder?.orderStatus}`,
              }}
            />

            {/* Customer Details */}
            {/* <ProfileInfoCard
              title="Merchant Detail"
              details={
                {
                  // Name: `${userOrder?.userId?.name}`,
                  // Email: `${userOrder?.userId?.email}`,
                  // "Mobile Number": `${userOrder?.userId?.mobile_number}`,
                }
              }
            /> */}

            {/* Payment Details */}
            <ProfileInfoCard
              title="Payment Detail"
              details={{
                "Payment ID": `${userOrder?.payment?.paymentId}`,
                "Payment To": `${userOrder?.payment?.paymentDetails?.payee}`,
                "Payment Price": `${userOrder?.payment?.paymentDetails?.finalPrice} Rs`,
                "Payment Type": `${userOrder?.payment?.paymentType}`,
                "Payment Mode": `${userOrder?.payment?.paymentMode}`,
                "Payment Status": `${userOrder?.payment?.paymentStatus}`,
                "Payment Date": `${userOrder?.payment?.createdAt.slice(
                  0,
                  10
                )}, ${userOrder?.payment?.createdAt.slice(11, 19)}`,
              }}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default UserProductOrder;
