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

export function UserKarigarOrder() {
  const { id, orderId } = useParams();
  const [userOrder, setUserOrder] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  //   console.log(id, orderId);
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
        const Order = result.user.orders.filter((ele) => {
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
  }, [id, orderId]);
  //   console.log("000", userOrder);
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
          User Karigar Order Details Page
        </Typography>
      </CardHeader>
      {/* Carousel Section */}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl">
        {/* Images */}
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${userOrder?.workDetails?.images[currentImageIndex]})`,
          }}
        ></div>
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
                "Work Title": `${userOrder?.workDetails?.workTitle}`,
                "Work Description": `${userOrder?.workDetails?.workDescription}`,
                // "Booked Quantity": `${userOrder?.bookingQuantity}`,
                Price: `${userOrder?.payment?.paymentDetails.price}`,
                // "Total Price": `${userOrder?.payment?.paymentDetails?.finalPrice} Rs`,
                "Site Address": `${userOrder?.address || null}`,
                "Order Status": `${userOrder?.status}`,
              }}
            />

            {/* Customer Details */}
            <ProfileInfoCard
              title="Karigar Detail"
              details={{
                Name: `${userOrder?.labourId?.name}`,
                Phone: `${userOrder?.labourId?.mobile_number.slice(2, 12)}`,
                Designation: `${userOrder?.labourId?.designation}`,
                "Account No": `${userOrder?.labourId?.bankDetails.accountNumber}`,
                "IFSC Code": `${userOrder?.labourId?.bankDetails.ifscCode}`,
                "Bank Name": `${userOrder?.labourId?.bankDetails.bankName}`,
                "A/c Holder Name": `${userOrder?.labourId?.bankDetails.accountHolderName}`,
              }}
            />

            {/* Payment Details */}
            <ProfileInfoCard
              title="Payment Detail"
              details={{
                "Payment ID": `${userOrder?.payment?.paymentId}`,
                "Payment To": `${userOrder?.payment?.paymentDetails?.payee}`,
                "Payment Price": `${userOrder?.payment?.paymentDetails?.price} Rs`,
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

export default UserKarigarOrder;
