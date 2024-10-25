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

export function Tables() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);


  async function getAllUsers() {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        "https://karigar-server-new.onrender.com/api/v1/user/getAllUsers",
        requestOptions
      );
      const result = await response.json();
      if (result.success === true) {
        setUsers(result.users);
      
        setFilteredUsers(result.users); // Set initial filtered workers to all workers
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function callFunction() {
      await getAllUsers();
    }
    callFunction();
  }, []);

  // Function to filter workers based on search query
  useEffect(() => {
    const filtered = users.filter((user) => {
      const searchText = searchQuery.toLowerCase();
      return (
        user._id.toLowerCase().includes(searchText) ||
        user.name.toLowerCase().includes(searchText) ||
        user.mobile_number.toLowerCase().includes(searchText)
      );
    });
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

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
            Karigar-Users
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
          {/* Set max height and make table scrollable vertically */}
          <div className="overflow-y-auto max-h-[60vh]"> {/* 60vh sets the max height to 60% of the viewport height */}
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["ID", "NAME", "Email" , ""].map((el) => (
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
                {filteredUsers.map(
                  ({ name, mobile_number, email, _id }, key) => {
                    const className = `py-3 px-5 ${key === users.length - 1
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
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {email}
                          </Typography>
                        </td>
                        {/* <td className={className}>
                          <Chip
                            variant="gradient"
                            color={email ? "green" : "blue-gray"}
                            value={email ? "Available" : "Non-Available"}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td> */}
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {email}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Link
                            to={`/dashboard/User/${_id}`}
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

export default Tables;
