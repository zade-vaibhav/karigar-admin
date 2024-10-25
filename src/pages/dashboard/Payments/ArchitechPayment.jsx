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

export function ArchitechPayments() {
    const [filteredArchitechOrders, setArchitechOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]); // Store all orders
    const [dateFilter, setDateFilter] = useState(""); // State for date filter
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    // Fetch all labors and their orders
    async function getLabor() {
        const requestOptions = {
            method: "GET",
        };

        try {
            const response = await fetch(
                "https://karigar-server-new.onrender.com/api/v1/architect/getAllArchitects",
                requestOptions
            );
            const result = await response.json();
            if (result.success === true) {
                // Combine all orders from the labors into a single array
                const allOrders = result.architects.reduce((acc, architects) => {
                    return acc.concat(architects.orders);
                }, []);
                setAllOrders(allOrders); // Store all orders
                setArchitechOrders(allOrders); // Set filtered orders to all initially
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function callFunction() {
            await getLabor();
        }
        callFunction();
    }, []);

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

        setArchitechOrders(filtered);
    };

    console.log(filteredArchitechOrders)

    // Update the filtered orders when date or search query changes
    useEffect(() => {
        filterOrders();
    }, [dateFilter, searchQuery]);
    return (
        <div className="h-full mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Architech Payments
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
                                        "consern",
                                        "booking Date",
                                        "Price",
                                        "Payment Type",
                                        "Payment Status",
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
                                {filteredArchitechOrders.map(({ _id,payment,concern,createdAt }, key) => {
                                    const className = `py-3 px-5 ${key === filteredArchitechOrders.length - 1
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
                                                <Typography className="text-xs font-normal text-blue-gray-500">
                                                    {concern} 
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-normal text-blue-gray-500">
                                                    {createdAt.slice(0,10)}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {payment.paymentDetails.price} Rs
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
                                                <Link
                                                    to={`/dashboard/Payments/Architech/${payment?.paymentDetails?.payee._id}/${_id}/`}
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

export default ArchitechPayments
