import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  CardHeader
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";

// Sample images for carousel
const sampleImages = [
  "/img/sample1.jpg",
  "/img/sample2.jpg",
  "/img/sample3.jpg",
];

export function KarigarorderDetail() {
  const { id, orderId } = useParams();
  const [workerOrder, setWorkerOrder] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch labor details
  async function getLabor() {
    const requestOptions = {
      method: "GET",
    };
    try {
      const response = await fetch(
        `https://karigar-server-new.onrender.com/api/v1/labor/getLaborById/${id}`,
        requestOptions
      );
      const result = await response.json();
      if (result.success === true) {
        const workerOrder = result.labor.order.filter((ele) => {
          return ele._id === orderId;
        });
        setWorkerOrder(workerOrder[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLabor();
  }, []);

  // Handle next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === workerOrder?.workDetails?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? workerOrder?.workDetails?.images?.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
     <CardHeader variant="gradient" color="gray" className="mt-8 p-6">
          <Typography variant="h6" color="white">
            Karigar Order Details Page
          </Typography>
        </CardHeader>
      {/* Carousel Section */}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl">
        {/* Images */}
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${workerOrder?.workDetails?.images[currentImageIndex]})`,
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
                "Work Title": `${workerOrder?.workDetails?.workTitle}`,
                "Work Description": `${workerOrder?.workDetails?.workDescription}`,
                "Date & Slot": `${workerOrder?.dateAndTime?.bookingType} / ${workerOrder?.dateAndTime?.date.slice(0,10)} / ${workerOrder?.dateAndTime?.slots}`,
                "Order ID": `${workerOrder?._id}`,
                Location: `${workerOrder?.address || null}`,
                "Order Status": `${workerOrder?.status}`,
              }}
            />

            {/* Customer Details */}
            <ProfileInfoCard
              title="Customer Detail"
              details={{
                Name: `${workerOrder?.customerId?.name}`,
                Email: `${workerOrder?.customerId?.email}`,
                "Mobile Number": `${workerOrder?.customerId?.mobile_number}`,
              }}
            />

            {/* Payment Details */}
            <ProfileInfoCard
              title="Payment Detail"
              details={{
                "Payment ID": `${workerOrder?.payment?.paymentId}`,
                "Payment By": `${workerOrder?.customerId?.name}`,
                "Payment Price": `${workerOrder?.payment?.paymentDetails?.price} Rs`,
                "Payment Type": `${workerOrder?.payment?.paymentType}`,
                "Payment Mode": `${workerOrder?.payment?.paymentMode}`,
                "Payment Status": `${workerOrder?.payment?.paymentStatus}`,
                "Payment Created": `${workerOrder?.payment?.createdAt.slice(0, 10)}`,
              }}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default KarigarorderDetail;
