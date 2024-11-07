import React, { useEffect, useState } from "react";
import AddBanner from "./AddBanner"; // Ensure this path matches where your AddBanner component is located

const BannerManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banners, setBanners] = useState([]); // Holds banner data

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("http://localhost:4040/api/v1/admin/get-banners");
        const result = await response.json();
        
        if (result.success) {
          setBanners(result.data); // Set banner data
        } else {
          console.error("Error fetching banners:", result.message);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, [isModalOpen]);

  // Toggle modal visibility
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Add Banner Button */}
      <button
        onClick={handleOpenModal}
        className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-200"
      >
        Add Banner
      </button>

      {/* Display banners */}
      <div className="mt-8 w-full">
        {banners.map((banner) => (
          <div key={banner._id} className="mb-8 p-4 border rounded-md shadow-md bg-white">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
             {banner.applicableFor.join(", ") == 'labor'?"Karigar":banner.applicableFor.join(", ") == 'materialSupplier'?"Merchent":banner.applicableFor.join(", ") == 'architect'?"Architect":""}
            </h3>
            <div className="flex flex-wrap gap-4">
              {banner.bannerImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Banner for ${banner.applicableFor}`}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* AddBanner Modal */}
      {isModalOpen && <AddBanner onClose={handleCloseModal} />}
    </div>
  );
};

export default BannerManager;
