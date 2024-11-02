import AddCouponModal from "@/components/AddCouponModal";
import React, { useState, useEffect } from "react";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch coupons from API on component mount
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(
          "https://karigar-server-new.onrender.com/api/v1/admin/getCoupons",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setCoupons(data.coupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  // Delete coupon by ID
  const deleteCoupon = async (couponCode) => {
    try {
      const response = await fetch(
        `https://karigar-server-new.onrender.com/api/v1/admin/deleteCoupon/${couponCode}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (result.success) {
        setCoupons(
          coupons.filter((coupon) => coupon.couponCode !== couponCode)
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
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Coupons</h1>
      <button
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full mb-8 font-medium shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105"
        onClick={handleOpenModal}
      >
        Add Coupon
      </button>

      {/* Coupons Displayed as Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="relative bg-gradient-to-r from-indigo-200 to-pink-300 p-6 rounded-2xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute top-4 right-4">
              {/* Delete Icon */}
              <button
                onClick={() => deleteCoupon(coupon.couponCode)}
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

            {/* Coupon Details */}
            <h2 className="text-3xl font-extrabold text-gray-100 tracking-wide mb-1 font-sans">
              {coupon.couponCode}
            </h2>
            <p className="text-lg font-semibold text-green-700 mb-2">
              Discount: {coupon.discountAmount}
            </p>
            <p className="text-gray-800 font-medium text-sm mb-4">
              Applicable For:{" "}
              <span className="font-semibold text-purple-700 font-serif text-lg">
                {coupon.applicableFor.join(", ")}
              </span>
            </p>
            <div className="flex items-center text-gray-600 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 10h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-300">
                Expiration:{" "}
                {coupon.expirationDate
                  ? new Date(coupon.expirationDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <AddCouponModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Coupons;
