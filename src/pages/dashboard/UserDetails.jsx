import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Switch,
    Tooltip,
    Button,
} from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
} from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useEffect, useState } from "react";

export function MerchentDetail() {
    const { id } = useParams();
    const [user, setUser] = useState([])
//getAllProduct
    async function getMerchent() {

        const requestOptions = {
            method: "GET",
        };

        try {
            const response = await fetch(`https://karigar-server-new.onrender.com/api/v1/user/getUser/${id}`, requestOptions);
            const result = await response.json();
            console.log(result)
            if (result.success == true) {
                setUser(result.user)
            }
        } catch (error) {
            console.error(error);
        }
    }
    // async function getMerchentProduct() {
    //     const requestOptions = {
    //         method: "GET",
    //     };
    //     try {
    //         const response = await fetch(`https://karigar-server-new.onrender.com/api/v1/merchent/getAllProduct`, requestOptions);
    //         const result = await response.json();
    //         console.log(result,"  product")
    //         if (result.success == true) {
    //             const myProduct = result.products.filter((ele)=>{
    //                 return ele.merchentId == id
    //             })
    //             setProducts(myProduct)
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    useEffect(() => {
        async function callFunction() {
            await getMerchent()
            // await getMerchentProduct()
        }
        callFunction()
    }, [])
    console.log(user)
    return (
        <>
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
                <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
            </div>
            <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
                <CardBody className="p-4">
                    <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                        <div className="flex items-center gap-6">
                            <Avatar
                                src="/img/bruce-mars.jpeg"
                                alt="bruce-mars"
                                size="xl"
                                variant="rounded"
                                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                            />
                            <div>
                                <Typography variant="h5" color="blue-gray" className="mb-1">
                                    {user.name}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-blue-gray-600"
                                >
                                    {user.email}
                                </Typography>
                            </div>
                        </div>
                        {/* <div className="w-96">
                            <Tabs value="app">
                                <TabsHeader>
                                    <Tab value="app">
                                        <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                                        App
                                    </Tab>
                                    <Tab value="message">
                                        <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                                        Message
                                    </Tab>
                                    <Tab value="settings">
                                        <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                                        Settings
                                    </Tab>
                                </TabsHeader>
                            </Tabs>
                        </div> */}
                    </div>
                    <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                        {/* <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Platform Settings
                            </Typography>
                            <div className="flex flex-col gap-12">
                                {platformSettingsData.map(({ title, options }) => (
                                    <div key={title}>
                                        <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                                            {title}
                                        </Typography>
                                        <div className="flex flex-col gap-6">
                                            {options.map(({ checked, label }) => (
                                                <Switch
                                                    key={label}
                                                    id={label}
                                                    label={label}
                                                    defaultChecked={checked}
                                                    labelProps={{
                                                        className: "text-sm font-normal text-blue-gray-500",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                        <ProfileInfoCard
                            title="Profile Information"
                            // description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                            details={{
                                "first name": `${user?.name}`,
                                mobile: `${user?.mobile_number}`,
                                location: `${user?.address?.addressLine || null} ${user?.address?.city || null}, ${user?.address?.state || null} ,${user?.address?.pincode || null}`,
                                // social: (
                                //     <div className="flex items-center gap-4">
                                //         <i className="fa-brands fa-facebook text-blue-700" />
                                //         <i className="fa-brands fa-twitter text-blue-400" />
                                //         <i className="fa-brands fa-instagram text-purple-500" />
                                //     </div>
                                // ),
                            }}
                        // action={
                        //     <Tooltip content="Edit Profile">
                        //         <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                        //     </Tooltip>
                        // }
                        />
                        <ProfileInfoCard
                            title="Bank Details"
                            // description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                            details={{
                                "Account holder name": `${user?.bankDetails?.accountHolderName}`,
                                "Bank Name": `${user?.bankDetails?.bankName}`,
                                "Account number": `${user?.bankDetails?.accountNumber}`,
                                "IFSC code": `${user?.bankDetails?.ifscCode}`,
                                // social: (
                                //     <div className="flex items-center gap-4">
                                //         <i className="fa-brands fa-facebook text-blue-700" />
                                //         <i className="fa-brands fa-twitter text-blue-400" />
                                //         <i className="fa-brands fa-instagram text-purple-500" />
                                //     </div>
                                // ),
                            }}
                        // action={
                        //     <Tooltip content="Edit Profile">
                        //         <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                        //     </Tooltip>
                        // }
                        />
                    </div>
                    <div className="px-4 pb-4">
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            My Karigar Orders
                        </Typography>
                        {/* <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                        >
                            Merchant all products
                        </Typography> */}
                        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <div className="overflow-y-auto max-h-[60vh]">
                        <table className="w-full min-w-[640px] table-auto border">
                                <thead>
                                    <tr>
                                        {["Id", "Karigar Name","Date",  "Slots", "Booking Type","Price",""].map((el) => (
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
                                    {user?orde?.map(({ _id, labourId,dateAndTime,payment }, key) => {
                                        const className = `py-3 px-5 ${key === (products?.length ?? 0) - 1 ? "" : "border-b border-blue-gray-50"}`;

                                        return (
                                            <tr key={_id}>
                                                {/* Worker ID */}
                                                <td className={className}>
                                                    <div className="flex items-center gap-4">
                                                        <div>
                                                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                {_id || "No ID"}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Customer Name and Date */}
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {labourId.name || "No Name"}
                                                    </Typography>

                                                </td>

                                                {/* Status Placeholder */}
                                                <td className={className}>
                                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                                        {dateAndTime.date}
                                                    </Typography>
                                                </td>

                                                {/* Address */}
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {dateAndTime.slots}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {dateAndTime.bookingType} 
                                                    </Typography>
                                                </td>

                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {payment.paymentDetails.price} Rs
                                                    </Typography>
                                                </td>
                                                {/* View Link */}
                                                <td className={className}>
                                                    <Link to={`/dashboard/Karigar/${id}/${_id}`} className="text-xs font-semibold text-blue-gray-600">
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    }) || (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">
                                                    No orders available
                                                </td>
                                            </tr>
                                        )}
                                        
                                </tbody>


                            </table>
                             </div>
                           
                        </CardBody>
                    </div>
                    // <div className="px-4 pb-4">
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                           My Orders
                        </Typography>
                        <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                        >
                            Merchant all orders
                        </Typography>
                        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <div className="overflow-y-auto max-h-[60vh]">
                        <table className="w-full min-w-[640px] table-auto border">
                                <thead>
                                    <tr>
                                        {["Product", "Ordered by","Quantity & Price",  "Address", "Status", "total",""].map((el) => (
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
                                    {user?.orders?.map(({ _id, userId, orderStatus,bookingQuantity,price, productId, deleveryAddress }, key) => {
                                        const className = `py-3 px-5 ${key === (user?.orders?.length ?? 0) - 1 ? "" : "border-b border-blue-gray-50"}`;

                                        return (
                                            <tr key={_id}>
                                                {/* Worker ID */}
                                                <td className={className}>
                                                    <div className="flex items-center gap-4">
                                                        <div>
                                                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                {productId?.productName || "No ID"}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Customer Name and Date */}
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {userId?.name || "No Name"}
                                                    </Typography>

                                                </td>

                                                {/* Status Placeholder */}
                                                <td className={className}>
                                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                                        {bookingQuantity} Qnt / {price} Rs
                                                    </Typography>
                                                </td>

                                                {/* Address */}
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {deleveryAddress?.addressLine+"..." || "No Address"}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Typography
                                                        className={`text-xs font-semibold ${orderStatus === "pending"
                                                            ? "text-yellow-600"
                                                            : orderStatus === "accepted"
                                                                ? "text-blue-600"
                                                                : orderStatus === "completed"
                                                                    ? "text-green-600"
                                                                    : orderStatus === "rejected"
                                                                        ? "text-red-600"
                                                                        : "text-gray-600"
                                                            }`}
                                                    >
                                                        {orderStatus}
                                                    </Typography>
                                                </td>

                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {bookingQuantity*price} Rs
                                                    </Typography>
                                                </td>
                                                {/* View Link */}
                                                <td className={className}>
                                                    <Link to={`/dashboard/Karigar/${id}/${_id}`} className="text-xs font-semibold text-blue-gray-600">
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    }) || (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">
                                                    No orders available
                                                </td>
                                            </tr>
                                        )}
                                        
                                </tbody>


                            </table>
                             </div>
                           
                        </CardBody>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default MerchentDetail;
