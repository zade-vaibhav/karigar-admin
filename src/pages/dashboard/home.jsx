import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  CardFooter,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Architech from "/architech.png"
import Merchent from "/merchent.png"
import Worker from "/worker.png"
import user from "/user.png"

export function Home() {
  const [workers, setWorkers] = useState([]);
  const [users, setUsers] = useState([]);
  const [merchents, setmerchents] = useState([]);
  const [architech, setArchitech] = useState([]);
  const [allKarigar,setAllKarigar] = useState({})



  async function getLabor() {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        "https://karigar-server-new.onrender.com/api/v1/labor/getAllLabors",
        requestOptions
      );
      const result = await response.json();
      if (result.success === true) {
        const designationObject = {};

        // Loop through each worker and categorize them by designation
        result.labors.forEach((labor) => {
          const { designation } = labor;
          
          // If designation category doesn't exist, create it and initialize with an array
          if (!designationObject[designation]) {
            designationObject[designation] = [];
          }

          // Push the laborer to the corresponding designation category
          designationObject[designation].push(labor);
        });

        console.log("Workers organized by designation:", designationObject);
        setAllKarigar(designationObject)
        setWorkers(result.labors);
      }
    } catch (error) {
      console.error(error);
    }
  }

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
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getmerchents() {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        "https://karigar-server-new.onrender.com/api/v1/merchent/getAllMerchents",
        requestOptions
      );
      const result = await response.json();
      if (result.success === true) {
        setmerchents(result.merchants);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getArchitech() {
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
        setArchitech(result.architects);

      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function callFunction() {
      await getLabor();
      await getAllUsers()
      await getmerchents()
      await getArchitech()
    }
    callFunction();
  }, []);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border border-blue-gray-100 shadow-sm relative overflow-hidden">
          {/* Background Image with Minimum Opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url("https://www.kaiostech.com/wp-content/uploads/Blog-200700-05-Key-Visual.png")` }}
          ></div>

          {/* Title on Top */}
          <CardBody className="p-4 relative z-10">
            <Typography variant="h5" className="font-semibold text-blue-gray-700 mb-2">
              Users
            </Typography>

            {/* Icon and Total Users Row */}
            <div className="flex items-center justify-between">
              <img
                src={user}
                alt="User Icon"
                className="h-10 w-10 relative left-3"
              />
              <div>
                <Typography variant="h6" color="blue-gray">
                  Total Users
                </Typography>
                <Typography variant="h4" color="blue-gray-300" className="text-right">
                  {users.length}
                </Typography>
              </div>

            </div>

            {/* User Count */}

          </CardBody>

          <CardFooter className="border-t border-blue-gray-50 p-4 relative z-10">
            <Link to="/dashboard/User">Show All</Link>
          </CardFooter>
        </Card>

        {/* karigar */}
        <Card className="border border-blue-gray-100 shadow-sm relative overflow-hidden">
          {/* Background Image with Minimum Opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url("https://www.bwint.org/web/image/1053435")` }}
          ></div>

          {/* Title on Top */}
          <CardBody className="p-4 relative z-10">
            <Typography variant="h5" className="font-semibold text-blue-gray-700 mb-2">
              Karigar
            </Typography>

            {/* Icon and Total Users Row */}
            <div className="flex items-center justify-between">
              <img
                src={Worker}
                alt="worker Icon"
                className="h-10 w-10 relative left-3"
              />
              <div>
                <Typography variant="h6" color="blue-gray">
                  Total Karigar
                </Typography>
                <Typography variant="h4" color="blue-gray-300" className="text-right">
                  {workers.length}
                </Typography>
              </div>

            </div>

            {/* User Count */}

          </CardBody>

          <CardFooter className="border-t border-blue-gray-50 p-4 relative z-10">
            <Link to="/dashboard/Karigar">Show All</Link>
          </CardFooter>
        </Card>

        {/* Merchents */}
        <Card className="border border-blue-gray-100 shadow-sm relative overflow-hidden">
          {/* Background Image with Minimum Opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url("https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F1566dad5-9afb-46da-8827-4265e3551a69_1200x750.jpeg")` }}
          ></div>

          {/* Title on Top */}
          <CardBody className="p-4 relative z-10">
            <Typography variant="h5" className="font-semibold text-blue-gray-700 mb-2">
              Merchants
            </Typography>

            {/* Icon and Total Users Row */}
            <div className="flex items-center justify-between">
              <img
                src={Merchent}
                alt="merchent Icon"
                className="h-10 w-10 relative left-3"
              />
              <div>
                <Typography variant="h6" color="blue-gray">
                  Total Merchants
                </Typography>
                <Typography variant="h4" color="blue-gray-300" className="text-right">
                  {merchents.length}
                </Typography>
              </div>

            </div>

            {/* User Count */}

          </CardBody>

          <CardFooter className="border-t border-blue-gray-50 p-4 relative z-10">
            <Link to="/dashboard/Merchents">Show All</Link>
          </CardFooter>
        </Card>

        {/* architech */}
        <Card className="border border-blue-gray-100 shadow-sm relative overflow-hidden">
          {/* Background Image with Minimum Opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url("https://www.shutterstock.com/image-photo/group-engineers-architects-discuss-construction-260nw-596897009.jpg")` }}
          ></div>

          {/* Title on Top */}
          <CardBody className="p-4 relative z-10">
            <Typography variant="h5" className="font-semibold text-blue-gray-700 mb-2">
              Architech
            </Typography>

            {/* Icon and Total Users Row */}
            <div className="flex items-center justify-between">
              <img
                src={Architech}
                alt="architech Icon"
                className="h-10 w-10 relative left-3"
              />
              <div>
                <Typography variant="h6" color="blue-gray">
                  Total Architech
                </Typography>
                <Typography variant="h4" color="blue-gray-300" className="text-right">
                  {architech.length}
                </Typography>
              </div>

            </div>

            {/* User Count */}

          </CardBody>

          <CardFooter className="border-t border-blue-gray-50 p-4 relative z-10">
            <Link to="/dashboard/Architech">Show All</Link>
          </CardFooter>
        </Card>
      </div>

      <div className="p-6 border border-blue-gray-100 rounded-lg">
      <Typography variant="h4" className="mb-6">
        Karigars by Designation
      </Typography>
      {Object.keys(allKarigar).length === 0 ? (
        <Typography variant="h6" className="text-gray-500">
          Loading karigars...
        </Typography>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(allKarigar).map(([designation, workersArray]) => (
            <Card key={designation} className="relative p-4 w-50 border border-blue-gray-100 shadow-sm rounded-lg overflow-hidden">
            {/* Background Image with Opacity */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{
                backgroundImage: `url("https://static.vecteezy.com/system/resources/thumbnails/049/461/667/small/smiling-team-of-construction-workers-on-a-building-site-wearing-yellow-helmets-photo.jpeg")`, // Replace with your image URL
              }}
            ></div>
          
            {/* Card Content Centered */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <Typography variant="h6" className="mb-2 font-semibold text-blue-gray-700">
                {designation ? designation == "undefined"?"Not Specified":designation : "No Designation"} - {workersArray.length} Karigar
              </Typography>
            </div>
          </Card>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default Home;
