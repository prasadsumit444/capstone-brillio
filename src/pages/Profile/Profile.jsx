import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Auth/AuthGuard";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    mobileNumber: "",
    altMobileNumber: "",
    address: "",
    userStatus: "",
  });
  const { userId } = useAuth();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8104/account/profile/${userId}/userProfile`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "altMobileNumber") {
      if (value.length > 10 || !/^\d*$/.test(value)) {
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: value }));

      if (value && (!/^[6-9]/.test(value) || value === formData.mobileNumber)) {
        setErrors((prev) => ({
          ...prev,
          altMobileNumber:
            "Alternate number must be 10 digits, start with 6, 7, 8, or 9, and cannot be the same as the primary mobile number",
        }));
      } else {
        setErrors((prev) => {
          const { altMobileNumber, ...rest } = prev;
          return rest;
        });
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleEditMode = () => {
    if (editMode) {
      if (
        formData.altMobileNumber.length !== 10 ||
        !/^[6-9]/.test(formData.altMobileNumber) ||
        formData.altMobileNumber === formData.mobileNumber
      ) {
        setErrors((prev) => ({
          ...prev,
          altMobileNumber:
            "Alternate number must be 10 digits, start with 6, 7, 8, or 9, and cannot be the same as the primary mobile number",
        }));
        return;
      }

      axios
        .patch(
          `http://localhost:8104/account/profile/${userId}/updateProfile?address=${encodeURIComponent(
            formData.address
          )}&altMobileNumber=${encodeURIComponent(formData.altMobileNumber)}`
        )
        .then((response) => {
          console.log("Profile updated successfully");
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    }
    setEditMode((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-black">
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 bg-gray-800">
        <img
          src={require("../../Media/profile.jpg")}
          alt="Profile Background"
          className="object-cover h-full w-full"
        />
        <div className="absolute left-0 p-4 text-white w-full text-left rounded-b-lg">
          <h3 className="text-2xl font-bold mb-2">PROFILE</h3>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/2 lg:w-3/5 overflow-auto justify-center items-center">
        <div className="w-full max-w-lg mx-6 p-5 bg-gray-200 shadow-lg rounded-2xl shadow-gray-100">
          <div className="bg-gray-200 rounded-lg">
            <div className="px-4 sm:px-0">
              <h3 className="text-2xl font-bold leading-7 text-blue-900">
                My Profile
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Please review and update your personal details.
              </p>
            </div>
            <div className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-blue-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-1 py-2 px-3 bg-gray-50 rounded-md shadow-sm">
                    {formData.fullName}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-blue-900"
                  >
                    Email ID
                  </label>
                  <div className="mt-1 py-2 px-3 bg-gray-50 rounded-md shadow-sm">
                    {formData.emailId}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="mobileNumber"
                    className="block text-sm font-medium text-blue-900"
                  >
                    Mobile Number
                  </label>
                  <div className="mt-1 py-2 px-3 bg-gray-50 rounded-md shadow-sm">
                    <span className="text-blue-900 font-mono">+91</span>{" "}
                    {formData.mobileNumber}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="userStatus"
                    className="block text-sm font-medium text-blue-900"
                  >
                    User Status
                  </label>
                  <div className="mt-1 py-2 px-3 bg-gray-50 rounded-md shadow-sm">
                    {formData.userStatus}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="altMobileNumber"
                    className="block text-sm font-medium text-blue-900"
                  >
                    Alternate Mobile Number
                  </label>
                  <div className="mt-1">
                    {editMode ? (
                      <input
                        type="text"
                        name="altMobileNumber"
                        value={formData.altMobileNumber}
                        onChange={handleChange}
                        className="border border-gray-300 px-3 py-2 w-full rounded-md shadow-sm"
                        maxLength="10"
                      />
                    ) : (
                      <div className="py-2 px-3 bg-gray-50 rounded-md shadow-sm">
                        <span className="text-blue-900 font-mono">+91</span>{" "}
                        {formData.altMobileNumber}
                      </div>
                    )}
                  </div>
                  {errors.altMobileNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.altMobileNumber}
                    </p>
                  )}
                </div>
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-blue-900"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    {editMode ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="border border-gray-300 px-3 py-2 w-full h-24 rounded-md resize-none shadow-sm"
                      />
                    ) : (
                      <div className="py-2 px-3 bg-gray-50 rounded-md shadow-sm">
                        {formData.address}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={toggleEditMode}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-lg"
              >
                {editMode ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
