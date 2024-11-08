import React, { useState, useEffect } from "react";
import AddServiceChargeModal from "@/components/AddServiceChargeModal";

const ServiceCharges = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(services);

  // Fetch service charges from API on component mount
  useEffect(() => {
    const fetchServiceCharges = async () => {
      try {
        const response = await fetch(
          "https://karigar-server-new.onrender.com/api/v1/admin/getServiceCharges",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setServices(data.serviceCharges);
      } catch (error) {
        console.error("Error fetching service charges:", error);
      }
    };

    fetchServiceCharges();
  }, []);

  const deleteCoupon = async (serviceType) => {
    try {
      const response = await fetch(
        `https://karigar-server-new.onrender.com/api/v1/admin/deleteServiceCharge/${serviceType}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (result.success) {
        setServices(
          services.filter((service) => service.serviceType !== serviceType)
        );
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        Service Charges
      </h1>
      <button
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full mb-8 font-medium shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105"
        onClick={handleOpenModal}
      >
        Add Service Charge
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="relative bg-gradient-to-r from-indigo-200 to-pink-300 p-6 rounded-2xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute top-4 right-4">
              {/* Delete Icon */}
              <button
                onClick={() => deleteCoupon(service.serviceType)}
                className="text-white hover:text-gray-700 transition"
                aria-label="Delete Coupon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 6h18M9 6v12m6-12v12M10 4h4a1 1 0 011 1v1H9V5a1 1 0 011-1z"
                  />
                </svg>
              </button>
            </div>

            <h2 className="text-3xl font-semibold text-gray-800 mb-1">
              {service.serviceType}
            </h2>
            <p className="text-xl font-medium text-gray-600">
              Charge Type: {service.chargeType}
            </p>
            <p className="text-green-700 text-xl">
              Charge Amount:{" "}
              <span className="font-bold text-3xl">{service.chargeAmount}</span>
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && <AddServiceChargeModal onClose={handleCloseModal} />}
      {/* <p>Available soon !!</p> */}
    </div>
  );
};

export default ServiceCharges;
