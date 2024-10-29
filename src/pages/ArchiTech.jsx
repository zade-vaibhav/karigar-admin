import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Chip,
    Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ArchiTech() {
    const [workers, setWorkers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredWorkers, setFilteredWorkers] = useState([]);

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
                setWorkers(result.architects);
                setFilteredWorkers(result.architects); // Set initial filtered workers to all workers
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

    // Function to filter workers based on search query
    useEffect(() => {
        const filtered = workers.filter((worker) => {
            const searchText = searchQuery.toLowerCase();
            return (
                worker._id.toLowerCase().includes(searchText) ||
                worker.name.toLowerCase().includes(searchText) ||
                worker.mobile_number.toLowerCase().includes(searchText)
            );
        });
        setFilteredWorkers(filtered);
    }, [searchQuery, workers]);
     console.log(workers)
    return (
        <div className="h-full mt-12 mb-8 flex flex-col gap-12">
            <div className="mr-auto md:mr-4 md:w-56">
                <Input
                    label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query state on input change
                />
            </div>
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                    Karigar-Architech
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
                    {/* Set max height and make table scrollable vertically */}
                    <div className="overflow-y-auto max-h-[60vh]"> {/* 60vh sets the max height to 60% of the viewport height */}
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {["Architech ID", "NAME", "Availability","email","Address", ""].map((el) => (
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
                                {filteredWorkers.map(
                                    ({ name, mobile_number, _id, avalablity_status,workplaceAddress, email }, key) => {
                                        const className = `py-3 px-5 ${key === workers.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                            }`;

                                        return (
                                            <tr key={_id}>
                                                <td className={className}>
                                                    <div className="flex items-center gap-4">
                                                        <div>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-semibold"
                                                            >
                                                                {_id}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {name}
                                                    </Typography>
                                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                                        {mobile_number}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Chip
                                                        variant="gradient"
                                                        color={avalablity_status ? "green" : "blue-gray"}
                                                        value={avalablity_status ? "Available" : "Non-Available"}
                                                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                                    />
                                                </td>
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {email}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {workplaceAddress?.addressLine}  {workplaceAddress?.city}  {workplaceAddress?.state}  {workplaceAddress?.pincode}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Link
                                                        to={`/dashboard/Architech/${_id}`}
                                                        className="text-xs font-semibold text-blue-gray-600"
                                                    >
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default ArchiTech;
