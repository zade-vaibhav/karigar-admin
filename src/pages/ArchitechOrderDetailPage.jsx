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

export function ArchitechorderDetail() {
  const { id, orderId } = useParams();
  const [Architechorder, setArchitechOrder] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log(id)
  // Fetch labor details
  async function getArchitech() {
    const requestOptions = {
      method: "GET",
    };
    try {
      const response = await fetch(
        `https://karigar-server-new.onrender.com/api/v1/architect/getArchitect/${id}`,
        requestOptions
      );
      const result = await response.json();
      console.log(result)
      if (result.success === true) {
        const ArchitechOrder = result.architect.orders.filter((ele) => {
          return ele._id === orderId;
        });
        setArchitechOrder(ArchitechOrder[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getArchitech();
  }, []);

  // Handle next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === Architechorder?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? Architechorder?.images?.length - 1 : prevIndex - 1
    );
  };
   console.log(Architechorder)
  return (

    <>
     <CardHeader variant="gradient" color="gray" className="mt-8 p-6">
          <Typography variant="h6" color="white">
            Architech Order Details Page
          </Typography>
        </CardHeader>
      {/* Carousel Section */}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl">
     
     {Architechorder?.images && Architechorder?.images.length > 0 && (
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${Architechorder?.images[currentImageIndex] || ''})`,
                        }}
                    ></div>
                )}
        
        <div className="absolute inset-0 h-full w-full bg-gray-900/50" />

        <button
          className="absolute top-1/2 left-5 text-white bg-gray-700 px-2 py-1 rounded-full"
          onClick={prevImage}
        >
          {"<"}
        </button>

     
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
                "order id": `${Architechorder?._id}`,
                "Concern": `${Architechorder?.concern}`,
                "Concern Descreption": `${Architechorder?.description}`,
                "Location": ` ${Architechorder?.userId?.address[0]?.addressLine} ${Architechorder?.userId?.address[0]?.city} ${Architechorder?.userId?.address[0]?.state} ${Architechorder?.userId?.address[0]?.pincode}`,
                "Order Status": `${Architechorder?.status}`,
              }}
            />

            {/* Customer Details */}
            <ProfileInfoCard
              title="Customer Detail"
              details={{
                Name: `${Architechorder?.userId?.name}`,
                Email: `${Architechorder?.userId?.email}`,
                "Mobile Number": `${Architechorder?.userId?.mobile_number}`,
              }}
            />

            {/* Payment Details */}
            <ProfileInfoCard
              title="Payment Detail"
              details={{
                "Payment ID": `${Architechorder?.payment?.paymentId}`,
                "Payment By": `${Architechorder?.payment?.paymentDetails?.payee?.name}`,
                "Payment Price": `${Architechorder?.payment?.paymentDetails?.price} Rs`,
                "Payment Type": `${Architechorder?.payment?.paymentType}`,
                "Payment Mode": `${Architechorder?.payment?.paymentMode}`,
                "Payment Status": `${Architechorder?.payment?.paymentStatus}`,
                "Payment Created": `${Architechorder?.payment?.createdAt.slice(0, 10)}`,
              }}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default ArchitechorderDetail;
