import React, { useState, useEffect } from "react";
import AddServiceChargeModal from "@/components/AddServiceChargeModal";

const ServiceCharges = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setServices(data.services);
      } catch (error) {
        console.error("Error fetching service charges:", error);
      }
    };

    fetchServiceCharges();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
      {/* <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        Service Charges
      </h1>
      <button
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full mb-8 font-medium shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105"
        onClick={handleOpenModal}
      >
        Add Service
      </button>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {service.serviceType}
            </h2>
            <p className="text-lg font-medium text-indigo-600">
              Charge Type: {service.chargeType}
            </p>
            <p className="text-gray-700">
              Charge Amount:{" "}
              <span className="font-bold">{service.chargeAmount}</span>
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && <AddServiceChargeModal onClose={handleCloseModal} />} */}
      <p>Available soon !!</p>
    </div>
  );
};

export default ServiceCharges;
