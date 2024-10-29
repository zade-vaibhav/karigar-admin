import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddAdmin() {
  const [adminData, setAdminData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
    };

    try {
      const response = await fetch(
        `https://karigar-server-new.onrender.com/api/v1/admin/register`,
        requestOptions
      );
      const result = await response.json();
      if (result.success) {
        alert("Admin added successfully");
        navigate("/dashboard/home");
        setAdminData({ username: "", email: "", password: "" });
      } else {
        navigate("/dashboard/home");
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Admin
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={adminData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={adminData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Admin
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAdmin;
