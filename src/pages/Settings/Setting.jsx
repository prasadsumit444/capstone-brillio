import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthGuard.jsx";
import axios from "axios";
import { FaEdit, FaSave } from 'react-icons/fa';
import { ConfirmationModal } from "../../Components/ConfirmationModal.jsx";

const Setting = () => {
  const [promotionalEmailNotification, setPromotionalEmailNotification] = useState("ON");
  const [theme, setTheme] = useState("Light");
  const [userStatus, setUserStatus] = useState("ACTIVE");
  const [isEditing, setIsEditing] = useState(false);
  const [showSuspendServiceModal, setShowSuspendServiceModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const { userId } = useAuth();

  const suspendServiceMessage = "Are you sure you want to suspend your service?";
  const accountDeleteMessage = "Are you sure you want to delete your account?";

  useEffect(() => {
    axios.get(`http://localhost:8101/user/${userId}/getUser`)
      .then(response => {
        setPromotionalEmailNotification(response.data.promotionalEmailNotification);
        setTheme(response.data.theme);
        setUserStatus(response.data.userStatus);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const handleShowSuspendServiceModal = (value) => {
    setShowSuspendServiceModal(value);
  };

  const handleShowDeleteAccountModal = (value) => {
    setShowDeleteAccountModal(value);
  };


  const handleSettingUpdate = () => {
    axios.patch(`http://localhost:8101/user/${userId}/saveSetting`, null, {
      params: {
        status: promotionalEmailNotification,
        theme: theme
      }
    })
      .then(response => {
        console.log("Settings saved successfully:", response.data);
      })
      .catch(error => {
        console.error("Error saving settings:", error);
      });
  };

  const toggleEditMode = () => {
    if (isEditing) {
      handleSettingUpdate();
    }
    setIsEditing(!isEditing);
  };

  const handleSuspendService = () => {
    alert("Your Jio service has been temporarily suspended.");
  };

  const handleDeleteAccount = () => {
    alert("Your Jio account has been permanently deleted.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-4/5 lg:w-3/5 bg-white p-8 shadow-lg rounded-lg mt-4 relative">
        <h2 className="text-3xl font-bold mb-6 text-blue-500">Account Settings</h2>
        <button
          onClick={toggleEditMode}
          className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
        >
          {isEditing ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />}
          {isEditing ? 'Save' : 'Edit'}
        </button>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-500 mb-2">Email Preferences</h3>
          <p className="text-sm text-gray-700 mb-4">
            Update your email preferences to receive tailored offers and updates
            from Asaap, the leading telecommunications company. Stay informed
            with relevant information tailored to your needs.
          </p>
          <div className="flex items-center justify-between px-4">
            <span className="text-md font-normal text-gray-700 mr-4">
              Receive promotional emails
            </span>
            <div className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
              <button
                onClick={() => isEditing && setPromotionalEmailNotification("ON")}
                className={`border-1 px-3 py-2 ${promotionalEmailNotification === "ON"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-50 focus:relative"
                  }`}
                disabled={!isEditing}
              >
                ON
              </button>
              <button
                onClick={() => isEditing && setPromotionalEmailNotification("OFF")}
                className={`border-l px-3 py-2 ${promotionalEmailNotification === "OFF"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-50 focus:relative"
                  }`}
                disabled={!isEditing}
              >
                OFF
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-500 mb-2">App Theme</h3>
          <p className="text-sm text-gray-700 mb-4">
            Customize your Asaap app experience with your preferred theme.
            Choose between a light or dark theme for optimal comfort.
          </p>
          <div className="flex items-center justify-between px-4">
            <span className="text-md font-normal text-gray-700 mr-4">Set App Theme</span>
            <div className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
              <button
                onClick={() => isEditing && setTheme("Light")}
                className={`border-1 px-3 py-2 ${theme === "Light"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-50 focus:relative"
                  }`}
                disabled={!isEditing}
              >
                Light
              </button>
              <button
                onClick={() => isEditing && setTheme("Dark")}
                className={`border-l px-3 py-2 ${theme === "Dark"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-50 focus:relative"
                  }`}
                disabled={!isEditing}
              >
                Dark
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-500 mb-2">Temporarily Suspend Service</h3>
          <p className="text-sm text-gray-700 mb-4">
            If you need to temporarily pause your Asaap service, you can do so
            here. This feature is particularly useful if you are traveling or
            need to temporarily halt your service for any reason.
          </p>
          <button
            onClick={() => handleShowSuspendServiceModal(true)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            {userStatus === "ACTIVE" ? 'Suspend Service' : 'Activate Service'}
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-blue-500 mb-2">Delete Account</h3>
          <p className="text-sm text-gray-700 mb-4">
            If you wish to permanently delete your Asaap account, please proceed
            carefully. This action{" "}
            <span className="text-red-500">cannot be undone</span>. Deleting
            your account will result in the loss of all your data and services
            associated with your Jio account.
          </p>
          <button
            onClick={() => handleShowDeleteAccountModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
        {showSuspendServiceModal ? (
          <ConfirmationModal
            onClose={() => handleShowSuspendServiceModal(false)}
            heading={"Suspend Service"}
            message={suspendServiceMessage}
            action={handleSuspendService}
          />
        ) : (
          <></>
        )
        }
        {showDeleteAccountModal ? (
          <ConfirmationModal
            onClose={() => handleShowDeleteAccountModal(false)}
            heading={"Delete Account"}
            message={accountDeleteMessage}
            action={handleDeleteAccount}
          />
        ) : (
          <></>
        )
        }
      </div>
    </div>
  );
};

export default Setting;
