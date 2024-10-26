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
import { Link, useParams } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { useEffect, useState } from "react";

export function UsertDetail() {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  //getAllProduct
  async function getUser() {
    const requestOptions = {
      method: "GET",
    };
    if (id) {
      try {
        const response = await fetch(
          `https://karigar-server-new.onrender.com/api/v1/user/getUser/${id}`,
          requestOptions
        );
        const result = await response.json();

        if (result.success == true) {
          setUser(result.user);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    async function callFunction() {
      await getUser();
    }
    callFunction();
  }, []);

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
                  {user?.name}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {user?.email}
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <ProfileInfoCard
              title="Profile Information"
              details={{
                name: `${user?.name}`,
                mobile: `${user?.mobile_number}`,
                // location: `${user?.address[0]?.addressLine?user?.address[0]?.addressLine: null} ${user?.address[0]?.city?user?.address[0]?.city: null}, ${user?.address[0]?.state?user?.address[0]?.state: null} ,${user?.address[0]?.pincode?user?.address[0]?.pincode: null}`,
              }}
            />
            <ProfileInfoCard
              title="Bank Details"
              details={{
                "Account holder name": `${user?.bankDetails?.accountHolderName}`,
                "Bank Name": `${user?.bankDetails?.bankName}`,
                "Account number": `${user?.bankDetails?.accountNumber}`,
                "IFSC code": `${user?.bankDetails?.ifscCode}`,
              }}
            />
          </div>
          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              My Karigar Orders
            </Typography>

            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <div className="overflow-y-auto max-h-[60vh]">
                <table className="w-full min-w-[640px] table-auto border">
                  <thead>
                    <tr>
                      {[
                        "Karigar Name",
                        "Date",
                        "Slots",
                        "Booking Type",
                        "Price",
                        "Status",
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
                    {user?.orders?.map(
                      (
                        { _id, labourId, dateAndTime, payment, status },
                        key
                      ) => {
                        const className = `py-3 px-5 ${
                          key === (user?.orders?.length ?? 0) - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={_id}>
                            {/* Worker ID */}

                            {/* Customer Name and Date */}
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {labourId.name || "No Name"}
                              </Typography>
                            </td>

                            {/* Status Placeholder */}
                            <td className={className}>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {dateAndTime.date.slice(0, 10)}
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
                            <td className={className}>
                              <Typography
                                className={`text-xs font-semibold ${
                                  status === "pending"
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
                              <Link
                                to={`/dashboard/User/Karigar/${id}/${_id}`}
                                className="text-xs font-semibold text-blue-gray-600"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      }
                    ) || (
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

          {/* ProductOrder details */}
          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              My Product Orders
            </Typography>

            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <div className="overflow-y-auto max-h-[60vh]">
                <table className="w-full min-w-[640px] table-auto border">
                  <thead>
                    <tr>
                      {[
                        "Product Id",
                        "Quantity & Price",
                        "total",
                        "Status",
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
                    {user?.productOrders?.map(
                      (
                        {
                          _id,
                          orderStatus,
                          payment,
                          bookingQuantity,
                          price,
                          productId,
                          deleveryAddress,
                        },
                        key
                      ) => {
                        const className = `py-3 px-5 ${
                          key === (user?.productOrders?.length ?? 0) - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={_id}>
                            {/* Worker ID */}
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <div>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold"
                                  >
                                    {productId || "No ID"}
                                  </Typography>
                                </div>
                              </div>
                            </td>

                            {/* Status Placeholder */}
                            <td className={className}>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {bookingQuantity} Qnt / {price} Rs
                              </Typography>
                            </td>

                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {payment?.paymentDetails?.finalPrice} Rs
                              </Typography>
                            </td>

                            <td className={className}>
                              <Typography
                                className={`text-xs font-semibold ${
                                  orderStatus === "pending"
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

                            {/* View Link */}
                            <td className={className}>
                              <Link
                                to={`/dashboard/User/Product/${id}/${_id}`}
                                className="text-xs font-semibold text-blue-gray-600"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      }
                    ) || (
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

          {/* Architect Order details */}

          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              My Architect Orders
            </Typography>

            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <div className="overflow-y-auto max-h-[60vh]">
                <table className="w-full min-w-[640px] table-auto border">
                  <thead>
                    <tr>
                      {["Architect Id", "Date", "Price", "Status", ""].map(
                        (el) => (
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
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {user?.architectOrders?.map(
                      ({ _id, status, createdAt, architectId, price }, key) => {
                        const className = `py-3 px-5 ${
                          key === (user?.architectOrders?.length ?? 0) - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={_id}>
                            {/* Worker ID */}
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <div>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold"
                                  >
                                    {architectId || "No ID"}
                                  </Typography>
                                </div>
                              </div>
                            </td>

                            {/* Status Placeholder */}
                            <td className={className}>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {createdAt.slice(0, 10)}
                              </Typography>
                            </td>

                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {price} Rs
                              </Typography>
                            </td>

                            <td className={className}>
                              <Typography
                                className={`text-xs font-semibold ${
                                  status === "pending"
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
                              <Link
                                to={`/dashboard/User/Architect/${id}/${_id}`}
                                className="text-xs font-semibold text-blue-gray-600"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      }
                    ) || (
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

export default UsertDetail;
