import { Alert } from "@material-tailwind/react";
import React, { useState } from "react";

const AddServiceChargeModal = ({ onClose }) => {
  const [serviceType, setServiceType] = useState("labor");
  const [chargeType, setChargeType] = useState("flat");
  const [chargeAmount, setChargeAmount] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newServiceCharge = { serviceType, chargeType, chargeAmount };
    console.log(newServiceCharge);

    try {
      const rsponse = await fetch(
        "https://karigar-server-new.onrender.com/api/v1/admin/createOrUpdateService-charge",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ serviceType, chargeType, chargeAmount }),
        }
      );
      const result = await rsponse.json();
      console.log(result);

      if (result.success) {
        alert(result.message);
        onClose();
      }
      alert(result.message);
      onClose();
      // Close modal after submission
    } catch (error) {
      console.error("Error adding service charge:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Add Service Charge
        </h2>
        <form onSubmit={handleFormSubmit}>
          {/* Service Type */}
          <label className="block text-gray-700">Service Type</label>
          {/* <input
            type="text"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          /> */}
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="labor">Labor</option>
            <option value="architect">Architect</option>
            <option value="materialSupplier">Material Supplier</option>
          </select>

          {/* Charge Type */}
          <label className="block text-gray-700">Charge Type</label>
          <select
            value={chargeType}
            onChange={(e) => setChargeType(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            {/* <option value="percentage">Percentage</option> */}
            <option value="flat">Flat</option>
          </select>

          {/* Charge Amount */}
          <label className="block text-gray-700">Charge Amount</label>
          <input
            type="number"
            value={chargeAmount}
            onChange={(e) => setChargeAmount(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-md mt-4 font-medium"
          >
            Add Service Charge
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-red-500 w-full py-2 rounded-md mt-2 font-medium"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddServiceChargeModal;
