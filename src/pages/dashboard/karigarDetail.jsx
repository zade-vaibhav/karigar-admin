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
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input
} from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
} from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { useEffect, useState } from "react";


export function KarigarDetail() {
    const { id } = useParams();
    const [workers, setWorkers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wages, setWages] = useState(workers.ratePerHour || "");
    const [relode,setRelode]= useState(false)


    // Update Wages Function
    async function updateWages(id, ratePerHour) {
        if(!ratePerHour){
            alert("field should not be empty")
            return 
        }
        console.log(id,"  ",ratePerHour)
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ratePerHour }), // Send ratePerHour in request body
            };
        
            try {
                const response = await fetch(`https://karigar-server-new.onrender.com/api/v1/labor/labor/${id}/rate`, requestOptions);
                const result = await response.json();
                if (result.success === true) {
                    setIsModalOpen(false);
                    setRelode(!relode)
                } else {
                    console.error("Failed to update rate per hour:", result.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
    }


    async function getlabor() {

        const requestOptions = {
            method: "GET",
        };

        try {
            const response = await fetch(`https://karigar-server-new.onrender.com/api/v1/labor/getLaborById/${id}`, requestOptions);
            const result = await response.json();
            if (result.success == true) {
                setWorkers(result.labor)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function callFunction() {
            await getlabor()
        }
        callFunction()
    }, [relode])

    return (
        <>
            <CardHeader variant="gradient" color="gray" className="mt-8 p-6">
                <Typography variant="h6" color="white">
                    Karigar Details Page
                </Typography>
            </CardHeader>
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
                                    {workers.name}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-blue-gray-600"
                                >
                                    {workers._id}
                                </Typography>
                            </div>
                        </div>
                        {/* Edit Wages Button */}
                        <Button size="sm" color="blue" onClick={() => setIsModalOpen(true)}>
                            Edit Wages
                        </Button>
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
                                "first name": `${workers?.name}`,
                                mobile: `${workers?.mobile_number}`,
                                Designation: `${workers?.designation}`,
                                Wages: `${workers?.ratePerHour} Rs`,
                                location: `${workers?.address?.addressLine || null} ${workers?.address?.city || null}, ${workers?.address?.state || null} ,${workers?.address?.pincode || null}`,
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
                                "Account holder name": `${workers?.bankDetails?.accountHolderName}`,
                                "Bank Name": `${workers?.bankDetails?.bankName}`,
                                "Account number": `${workers?.bankDetails?.accountNumber}`,
                                "IFSC code": `${workers?.bankDetails?.ifscCode}`,
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
                            Orders
                        </Typography>
                        <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                        >
                            Karigar all orders
                        </Typography>
                        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                            <table className="w-full min-w-[640px] table-auto">
                                <thead>
                                    <tr>
                                        {["ID", "Ordered by", "Date & Slot", "Address", "Status", ""].map((el) => (
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
                                    {workers?.order?.map(({ _id, customerId, status, dateAndTime, address }, key) => {
                                        const className = `py-3 px-5 ${key === (workers?.order?.length ?? 0) - 1 ? "" : "border-b border-blue-gray-50"}`;

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
                                                        {customerId?.name || "No Name"}
                                                    </Typography>

                                                </td>

                                                {/* Status Placeholder */}
                                                <td className={className}>
                                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                                        {(dateAndTime?.date && dateAndTime?.date.slice(0, 10)) || "No Date"}{" "}
                                                        \ {dateAndTime?.slots || "No Slots"}
                                                    </Typography>
                                                </td>

                                                {/* Address */}
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {address || "No Address"}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Typography
                                                        className={`text-xs font-semibold ${status === "pending"
                                                            ? "text-yellow-600"
                                                            : status === "accepted"
                                                                ? "text-blue-600"
                                                                : status === "completed"
                                                                    ? "text-green-600"
                                                                    : status === "rejected"
                                                                        ? "text-red-600"
                                                                        : "text-gray-600"
                                                            }`}
                                                    >
                                                        {status}
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
                        </CardBody>
                    </div>
                </CardBody>
            </Card>
            {/* Modal for Editing Wages */}
            <Dialog open={isModalOpen} handler={setIsModalOpen}>
                <DialogHeader>Edit Wages</DialogHeader>
                <DialogBody divider>
                    <Input
                        label="Wages (in Rs)"
                        type="number"
                        value={wages}
                        onChange={(e) => setWages(e.target.value)}
                    />
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="gradient" color="blue" onClick={()=>updateWages(id,wages)}>
                        Update
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default KarigarDetail;
