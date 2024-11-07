import React, { useState } from "react";

const AddBanner = ({ onClose }) => {
  const [applicableFor, setApplicableFor] = useState([]);
  const [bannerFiles, setBannerFiles] = useState(null); // Holds the selected files

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check that files and applicableFor have been selected
    if (!bannerFiles || applicableFor.length === 0) {
      alert("Please select images and applicable categories.");
      return;
    }

    // Create form data for file upload
    const formData = new FormData();
    for (let i = 0; i < bannerFiles.length; i++) {
      formData.append("banner", bannerFiles[i]);
    }

    // Append applicableFor as a JSON string
    formData.append("applicableFor", JSON.stringify(applicableFor));

    try {
      const response = await fetch("http://localhost:4040/api/v1/admin/add-banners", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message)
        onClose(); // Close modal after successful upload
      } else {
        console.error("Error uploading banner:", result.message);
      }
    } catch (error) {
      console.error("Error uploading banner:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-96">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload Banner</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Banner Images */}
          <label className="block text-gray-700">Select Banner Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setBannerFiles(e.target.files)}
            className="w-full p-2 mb-4 border rounded-md"
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
            <option value="labor">Karigar</option>
            <option value="architect">Architect</option>
            <option value="materialSupplier">Material Supplier</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded-md mt-4"
          >
            Upload Banner
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

export default AddBanner;
