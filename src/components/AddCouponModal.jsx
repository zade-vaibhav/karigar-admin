import React, { useState } from "react";

const AddCouponModal = ({ onClose }) => {
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [applicableFor, setApplicableFor] = useState([]);
  const [expirationDate, setExpirationDate] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Submit the form data to your API
    const newCoupon = {
      couponCode,
      discountAmount,
      applicableFor,
      expirationDate,
    };
    console.log(newCoupon);

    try {
      const response = await fetch(
        "https://karigar-server-new.onrender.com/api/v1/admin/createOrUpdateCoupon",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCoupon),
        }
      );
      const result = await response.json();

      if (result.success) {
        onClose(); // Close modal after submission
      }
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-96">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Coupon</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Coupon Code */}
          <label className="block text-gray-700">Coupon Code</label>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />

          {/* Discount Amount */}
          <label className="block text-gray-700">Discount Amount</label>
          <input
            type="number"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />

          {/* Applicable For Dropdown */}
          <label className="block text-gray-700">Applicable For</label>
          <select
            multiple
            value={applicableFor}
            onChange={(e) =>
              setApplicableFor(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="labor">Labor</option>
            <option value="architect">Architect</option>
            <option value="materialSupplier">Material Supplier</option>
          </select>

          {/* Expiration Date */}
          <label className="block text-gray-700">Expiration Date</label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded-md mt-4"
          >
            Add Coupon
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-red-500 w-full py-2 rounded-md mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCouponModal;
