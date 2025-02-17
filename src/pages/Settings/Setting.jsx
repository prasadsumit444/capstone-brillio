import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthGuard.jsx";
import axios from "axios";
import { FaEdit, FaSave } from 'react-icons/fa';
import { ConfirmationModal } from "../../Components/ConfirmationModal.jsx";
import { ThemeContext } from "../../Components/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./../NotificationContext";

const Setting = () => {
  const [promotionalEmailNotification, setPromotionalEmailNotification] = useState("ON");

  const [userStatus, setUserStatus] = useState("ACTIVE");
  const [isEditing, setIsEditing] = useState(false);
  const [showSuspendServiceModal, setShowSuspendServiceModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  const { userId, logout } = useAuth();
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const suspendServiceMessage = "Are you sure you want to suspend your service?";
  const resumeServiceMessage = "Do you  want to resume your service?";
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

  useEffect(() => {
    axios.patch(`http://localhost:8101/user/${userId}/suspendService`, null, {
      params: {
        userStatus: userStatus,
      }
    })
      .then(response => {
        setShowSuspendServiceModal(false);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  }, [userStatus])


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
        showNotification("Settings saved successfully", "success");
      })
      .catch(error => {
        showNotification("Error saving settings", "error");
      });
  };

  const toggleEditMode = () => {
    if (isEditing) {
      handleSettingUpdate();
    }
    setIsEditing(!isEditing);
  };

  const handleSuspendService = () => {
    if (userStatus === "ACTIVE") {
      setUserStatus("INACTIVE");
    }
    else {
      setUserStatus("ACTIVE");
    }
  };

  const handleDeleteAccount = () => {
    axios.delete(`http://localhost:8101/user/${userId}/deleteUser`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log("Error: ", error);
      })
      .finally(() => {
        setShowDeleteAccountModal(false);
        logout();
        navigate("/");
        showNotification("Account Deleted", "success");
      })

  };

  const handlePasswordVerify = () => {
    axios.get(`http://localhost:8101/user/${userId}/checkPassword`, {
      params: {
        password: oldPassword
      }
    })
      .then(response => {
        showNotification("Password Verified", "success");
        setIsPasswordVerified(true);
      })
      .catch(error => {
        showNotification("Password is incorrect", "error");
      });
  };

  const handleChangePassword = () => {
    axios.patch(`http://localhost:8101/user/${userId}/changePassword`, null, {
      params: {
        newPassword: newPassword
      }
    })
      .then(response => {
        showNotification("Password changed successfully", "success");
        setIsPasswordVerified(false);
        setOldPassword("");
        setNewPassword("");
      })
      .catch(error => {
        showNotification("Error changing password", "error");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-4/5 lg:w-3/5 bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg mt-4 relative">
        <h2 className="text-3xl font-bold mb-6 text-blue-500 dark:text-blue-400">Account Settings</h2>
        <button
          onClick={toggleEditMode}
          className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center"
        >
          {isEditing ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />}
          {isEditing ? 'Save' : 'Edit'}
        </button>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-500 dark:text-blue-400 mb-2">Email Preferences</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Update your email preferences to receive tailored offers and updates
            from Asaap, the leading telecommunications company. Stay informed
            with relevant information tailored to your needs.
          </p>
          <div className="flex items-center justify-between px-4">
            <span className="text-md font-normal text-gray-700 dark:text-gray-300 mr-4">
              Receive promotional emails
            </span>
            <div className="inline-flex overflow-hidden rounded-md border bg-white dark:bg-gray-700 shadow-sm">
              <button
                onClick={() => isEditing && setPromotionalEmailNotification("ON")}
                className={`border-1 px-3 py-2 ${promotionalEmailNotification === "ON"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:relative"
                  }`}
                disabled={!isEditing}
              >
                ON
              </button>
              <button
                onClick={() => isEditing && setPromotionalEmailNotification("OFF")}
                className={`border-l px-3 py-2 ${promotionalEmailNotification === "OFF"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:relative"
                  }`}
                disabled={!isEditing}
              >
                OFF
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-500 dark:text-blue-400 mb-2">App Theme</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Customize your Asaap app experience with your preferred theme.
            Choose between a light or dark theme for optimal comfort.
          </p>
          <div className="flex items-center justify-between px-4">
            <span className="text-md font-normal text-gray-700 dark:text-gray-300 mr-4">Set App Theme</span>
            <div className="inline-flex overflow-hidden rounded-md border bg-white dark:bg-gray-700 shadow-sm">
              <button
                onClick={() => isEditing && setTheme("LIGHT")}
                className={`border-1 px-3 py-2 ${theme === "LIGHT"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:relative"
                  }`}
                disabled={!isEditing}
              >
                Light
              </button>
              <button
                onClick={() => isEditing && setTheme("DARK")}
                className={`border-l px-3 py-2 ${theme === "DARK"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:relative"
                  }`}
                disabled={!isEditing}
              >
                Dark
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-500 dark:text-blue-400 mb-2">Temporarily Suspend Service</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            If you need to temporarily pause your Asaap service, you can do so
            here. This feature is particularly useful if you are traveling or
            need to temporarily halt your service for any reason.
          </p>
          <button
            onClick={() => handleShowSuspendServiceModal(true)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
          >
            {userStatus === "ACTIVE" ? 'Suspend Service' : 'Activate Service'}
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-blue-500 dark:text-blue-400 mb-2">Delete Account</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            If you wish to permanently delete your Asaap account, please proceed
            carefully. This action{" "}
            <span className="text-red-500 dark:text-red-400">cannot be undone</span>. Deleting
            your account will result in the loss of all your data and services
            associated with your Jio account.
          </p>
          <button
            onClick={() => handleShowDeleteAccountModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-blue-500 dark:text-blue-400 mb-2">Change Password</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Update your account password for enhanced security. Please verify
            your old password before setting a new one.
          </p>
          {!isPasswordVerified ? (
            <div className="flex gap-4 items-end">
              <div className="">
                <label className="block text-xs font-medium text-blue-500 dark:text-blue-400" htmlFor="oldPassword">
                  Old Password
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="mt-1 w-64 rounded-md border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 shadow-sm font-normal"
                />
              </div>
              <button
                onClick={handlePasswordVerify}
                className="px-4 py-2 h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Verify
              </button>
            </div>
          ) : (
            <div className="flex gap-4 items-end">
              <div className="">
                  <label className="block text-xs font-medium text-blue-500 dark:text-blue-400" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 w-64 rounded-md border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 shadow-sm font-normal"
                  />
                </div>
                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          )}
        </div>

        {showSuspendServiceModal && (
          <ConfirmationModal
            onClose={() => handleShowSuspendServiceModal(false)}
            heading={userStatus === "ACTIVE" ? "Suspend Service" : "Resume Service"}
            message={userStatus === "ACTIVE" ? suspendServiceMessage : resumeServiceMessage}
            action={handleSuspendService}
          />
        )}
        {showDeleteAccountModal && (
          <ConfirmationModal
            onClose={() => handleShowDeleteAccountModal(false)}
            heading={"Delete Account"}
            message={accountDeleteMessage}
            action={handleDeleteAccount}
          />
        )}
      </div>
    </div>

  );
};

export default Setting;
