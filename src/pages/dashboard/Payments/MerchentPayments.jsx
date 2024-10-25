import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function MerchentPayments() {
    const [filterMerchentOrders, setFilterMerchentOrder] = useState([]);
    const [allOrders, setAllOrders] = useState([]); // Store all orders
    const [dateFilter, setDateFilter] = useState(""); // State for date filter
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [relode,setRelode] =useState(false)

    // Fetch all labors and their orders
    async function getMerchent() {
        const requestOptions = {
            method: "GET",
        };

        try {
            const response = await fetch("https://karigar-server-new.onrender.com/api/v1/merchent/getAllMerchents",requestOptions
            );
            const result = await response.json();
            if (result.success === true) {
                // Combine all orders from the labors into a single array
                const allOrders = result.merchants.reduce((acc, merchent) => {
                    return acc.concat(merchent.orders);
                }, []);
                setAllOrders(allOrders); // Store all orders
                setFilterMerchentOrder(allOrders); // Set filtered orders to all initially
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function callFunction() {
            await getMerchent();
        }
        callFunction();
    }, [relode]);

    // Function to filter orders based on selected date and search query
    const filterOrders = () => {
        let filtered = allOrders;

        // Filter by date if dateFilter is set
        if (dateFilter) {
            filtered = filtered.filter((order) => {
                const orderDate = new Date(order.payment.createdAt)
                    .toISOString()
                    .split("T")[0];
                return orderDate === dateFilter;
            });
        }

        // Filter by search query if searchQuery is set
        if (searchQuery) {
            filtered = filtered.filter((order) => {
                const paymentId = order.payment.paymentId.toLowerCase();
                const payee = order.payment.paymentDetails.payee.name?.toLowerCase() || "";
                const payerr = order.payment.paymentDetails.payerr.name?.toLowerCase() || "";
                const searchLower = searchQuery.toLowerCase();

                return (
                    paymentId.includes(searchLower) ||
                    payee.includes(searchLower) ||
                    payerr.includes(searchLower)
                );
            });
        }

        setFilterMerchentOrder(filtered);
    };

    // Update the filtered orders when date or search query changes
    useEffect(() => {
        filterOrders();
    }, [dateFilter, searchQuery]);
//   console.log(allOrders)
async function handelSettel(merchentId, orderId) {
        // Confirmation alert
        const isConfirmed = window.confirm("Are you sure you want to settle this payment?");
        
        if (isConfirmed) {
          console.log(merchentId, " ", orderId);
          const requestOptions = {
            method: "PUT",
          };
      
          try {
            const response = await fetch(
              `https://karigar-server-new.onrender.com/api/v1/merchent/setteledPayment/${merchentId}/${orderId}`,
              requestOptions
            );
            const result = await response.json();
            console.log(result);
            if (result.success === true) {
              console.log(result);
              setRelode(!relode)
              // You can add additional actions here if needed, like updating the UI
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log("Payment settlement canceled.");
        }
      }
      

    return (
        <div className="h-full mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Merchent Payments
                    </Typography>
                </CardHeader>
                {/* Date Filter & Search Input */}
                <div className="flex items-center mb-4 gap-4 px-6">
                    <Input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        label="Filter by Date"
                        className=""
                    />
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        label="Search by Payment ID or Payee/Payerr"
                        className=""
                    />
                </div>
                <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
                    {/* Set max height and make table scrollable vertically */}
                    <div className="overflow-y-auto max-h-[60vh]">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {[
                                        "payment ID",
                                        "Payee",
                                        "Payerr",
                                        "Product",
                                        "Total Price",
                                        "Payment Type",
                                        "Payment Status",
                                        "Settelment",
                                        "",
                                    ].map((el) => (
                                        <th
                                            key={el}
                                            className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                        >
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                {el}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filterMerchentOrders.map(({ _id,productId,bookingQuantity,payment }, key) => {
                                    const className = `py-3 px-5 ${key === filterMerchentOrders.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr key={key}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-semibold"
                                                        >
                                                            {payment.paymentId}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {payment?.paymentDetails?.payee.name}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-normal text-blue-gray-500">
                                                    {payment?.paymentDetails?.payerr.name}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {productId.productName}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {payment.paymentDetails.price* bookingQuantity} Rs
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {payment?.paymentType}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {payment?.paymentStatus}
                                                </Typography>
                                            </td>
                                             <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {payment?.Setteled ? (
                                                        // If `setteled` is true, show a green button
                                                        <button className="bg-green-500 text-white px-2 py-1 rounded">
                                                            Setteled
                                                        </button>
                                                    ) : (
                                                        // If `setteled` is false, show a yellow button
                                                        <button onClick={() => handelSettel(payment?.paymentDetails?.payee._id, _id)} className="bg-orange-500 text-white px-2 py-1 rounded">
                                                            Settle
                                                        </button>
                                                    )}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Link
                                                       to={`/dashboard/Payments/Merchant/${payment?.paymentDetails?.payee._id}/${_id}`}
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default MerchentPayments
