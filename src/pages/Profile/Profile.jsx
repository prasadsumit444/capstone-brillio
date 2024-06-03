import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [editMode, setEditMode] = useState(false); //The initial state is set to false in order to render edit on screen which is a button
  const [formData, setFormData] = useState({
    //formData is a state,setFormData(setter function) is to set its value,useState is a react hook that returns a state and its setter function (to change the state on rerendering )
    fullName: "",
    emailId: "",
    mobileNumber: "",
    altMobileNumber: "",
    address: "",
    userStatus: "",
  });
  const [errors, setErrors] = useState({}); //taken as a state in order to render error messages

  useEffect(() => {
    //When the component mounts request for the data is sent to the backend
    // Fetch profile data from backend
    axios // axios is used for making a http req
      .get("http://localhost:8104/account/profile/1/userProfile") //axios.get returns a promise
      .then((response) => {
        // we use it for resolved promise
        setFormData(response.data);
      })
      .catch((error) => {
        // we use it for rejections of promise to get the error message
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e);

    // Restrict alternate mobile number to 10 digits
    if (name === "altMobileNumber" && value.length > 10) {
      return;
    }
    if (name === "altMobileNumber" && value && !/^\d+$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validation for alternate mobile number
    if (name === "altMobileNumber") {
      if (value && value.length !== 10) {
        setErrors((prev) => ({
          ...prev,
          altMobileNumber: "Number must be of 10 digits*",
        }));
      } else {
        setErrors((prev) => {
          const { altMobileNumber, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const toggleEditMode = () => {
    if (editMode) {
      // Check if the alternate mobile number is valid before saving
      if (formData.altMobileNumber && formData.altMobileNumber.length !== 10) {
        setErrors((prev) => ({
          ...prev,
          altMobileNumber: "Kindly enter a 10 digit number*",
        }));
        return;
      }

      // Save the edited data to backend
      axios
        .patch(
          `http://localhost:8104/account/profile/1/updateProfile?address=${encodeURIComponent(
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
      {/* Left Section with Image */}
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 bg-gray-800">
        <img
          src={require("../../Media/profile.jpg")} // Replace with your image URL
          alt="Profile Background"
          className="object-cover h-full w-full"
        />
        <div className="absolute  left-0 p-4 text-white w-full text-left  rounded-b-lg">
          <h3 className="text-2xl font-bold mb-2">PROFILE</h3>
        </div>
      </div>

      {/* Right Section with Profile Content */}
      <div className="flex flex-col w-full md:w-1/2 lg:w-3/5 overflow-auto justify-center items-center ">
        <div className="w-full max-w-lg mx-6 p-5 bg-gray-200 shadow-lg  rounded-2xl shadow-gray-100">
          <div className=" bg-gray-200 rounded-lg">
            <div className="px-4 sm:px-0">
              <h3 className="text-2xl font-bold leading-7 text-blue-900">
                My Profile
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Please review and update your personal details.
              </p>
            </div>
            <div className="mt-6">
              {/* Non-editable fields in a 2x2 grid */}
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
                    <span className=" text-blue-900  font-mono">+91</span>{" "}
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
              {/* Editable fields in a single column */}
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
                        <span className=" text-blue-900 font-mono">+91</span>{" "}
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
