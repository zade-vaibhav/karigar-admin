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

export function MerchentPaymentOrderDetail() {
    const { id, orderId } = useParams();
    const [merchentOrder, setmerchentOrder] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    console.log(id)
    // Fetch labor details
    async function getMerchant() {
        const requestOptions = {
            method: "GET",
        };
        try {
            const response = await fetch(
                `https://karigar-server-new.onrender.com/api/v1/merchent/getMerchentById/${id}`,
                requestOptions
            );
            const result = await response.json();
            if (result.success === true) {
                const merchentOrder = result.merchent.orders.filter((ele) => {
                    return ele._id === orderId;
                });
                setmerchentOrder(merchentOrder[0]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMerchant();
    }, []);
    console.log(merchentOrder)
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
    console.log(merchentOrder)
    return (
        <>
            <CardHeader variant="gradient" color="gray" className="mt-8 p-6">
          <Typography variant="h6" color="white">
            Merchent Payment Order Details
          </Typography>
        </CardHeader>
            {/* Carousel Section */}
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl">

                {/* Images */}
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${merchentOrder?.productId?.images[currentImageIndex]})`,
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
                                "Order ID": `${merchentOrder?._id}`,
                                "Product name": `${merchentOrder?.productId?.productName}`,
                                "Brand Name": `${merchentOrder?.productId?.brandName}`,
                                "Booked Quantity": `${merchentOrder?.bookingQuantity}`,
                                "Price": `${ merchentOrder?.payment?.paymentDetails?.price} Rs`,
                                "Total Price": `${merchentOrder?.bookingQuantity * merchentOrder?.payment?.paymentDetails?.price} Rs`,
                                "Shipping Address": `${merchentOrder?.deleveryAddress?.addressLine || null}, ${merchentOrder?.deleveryAddress?.city || null}, ${merchentOrder?.deleveryAddress?.state || null}, ${merchentOrder?.deleveryAddress?.pincode || null}`,
                                "Order Status": `${merchentOrder?.orderStatus}`,
                            }}
                        />

                        {/* Customer Details */}
                        <ProfileInfoCard
                            title="Customer Detail"
                            details={{
                                Name: `${merchentOrder?.userId?.name}`,
                                Email: `${merchentOrder?.userId?.email}`,
                                "Mobile Number": `${merchentOrder?.userId?.mobile_number}`,
                            }}
                        />

                        {/* Payment Details */}
                        <ProfileInfoCard
                            title="Payment Detail"
                            details={{
                                "Payment ID": `${merchentOrder?.payment?.paymentId}`,
                                "Payment By": `${merchentOrder?.userId?.name}`,
                                "Payment Price": `${merchentOrder?.bookingQuantity * merchentOrder?.payment?.paymentDetails?.price} Rs`,
                                "Payment Type": `${merchentOrder?.payment?.paymentType}`,
                                "Payment Mode": `${merchentOrder?.payment?.paymentMode}`,
                                "Payment Status": `${merchentOrder?.payment?.paymentStatus}`,
                            }}
                        />
                        <ProfileInfoCard
                            title="Merchant Detail"
                            details={{
                                "name": `${merchentOrder?.payment?.paymentDetails?.payee?.name}`,
                                "Business name": `${merchentOrder?.payment?.paymentDetails?.payee?.buisnessName}`,
                                "Mobile Number": `${merchentOrder?.payment?.paymentDetails?.payee?.mobile_number}`,
                            }}
                        />
                           <ProfileInfoCard
                            title="Merchant bank Detail"
                            details={{
                                "Account holder name": `${merchentOrder?.payment?.paymentDetails?.payee?.bankDetails?.accountHolderName}`,
                                "Bank Name": `${merchentOrder?.payment?.paymentDetails?.payee?.bankDetails?.bankName}`,
                                "Account Number": `${merchentOrder?.payment?.paymentDetails?.payee?.bankDetails?.accountNumber}`,
                                "IFSC code": `${merchentOrder?.payment?.paymentDetails?.payee?.bankDetails?.ifscCode}`,
                            }}
                        />
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default MerchentPaymentOrderDetail;
