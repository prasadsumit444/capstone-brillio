import axios from "axios";
import React, { useState } from "react";
import { useNotification } from "../../src/pages/NotificationContext";


export function ResetPasswordModal({ onClose }) {
    const [isValidationComplete, setIsValidationComplete] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [mobileNumber, setMobileNumber] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verifiedUserId, setVerifiedUserId] = useState(null);

    const [mobileNumberError, setMobileNumberError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const { showNotification } = useNotification();

    const SecurityQuestions = {
        "MOTHERS_MAIDEN_NAME": "What is your mother's maiden name?",
        "FIRST_PET_NAME": "What is the name of your first pet?",
        "CITY_OF_BIRTH": "Which city were you born in?"
    };

    const handleMobileNumberChange = (e) => {
        let value = e.target.value;

        // Remove non-numeric characters
        value = value.replace(/\D/g, '');

        // Validate the first digit
        if (value.length > 0 && !/^[6-9]/.test(value)) {
            return;
        }

        // Truncate to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        // Update the form data
        setMobileNumber(value);

        // Check if the mobile number is valid
        const mobileNumberPattern = /^[6-9]\d{9}$/;
        if (mobileNumberPattern.test(value)) {
            setMobileNumberError("");
        } else {
            setMobileNumberError("Invalid mobile number");
        }
    };

    const handleValidationComplete = () => {
        if (mobileNumberError === "") {
            axios.get("http://localhost:8101/user/verifyUser", {
                params: {
                    mobileNumber: mobileNumber,
                    securityQuestion: securityQuestion,
                    securityAnswer: securityAnswer
                }
            }).then((response) => {
                setVerifiedUserId(response.data);
                setIsValidationComplete(true);
                setIsVisible(false);
                showNotification("User Validated", "success");
            }).catch((error) => {
                showNotification("Invalid User", "error");
            })
        }
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;

        const minLength = 8; // Minimum length of the password
        const containsUpperCase = /[A-Z]/.test(password); // At least one uppercase letter
        const containsLowerCase = /[a-z]/.test(password); // At least one lowercase letter
        const containsNumber = /\d/.test(password); // At least one digit
        const containsSpecial = /[@#$%]/.test(password); // Only @, #, $, and % as special characters

        setNewPassword(password);


        if (password.length >= minLength &&
            containsUpperCase &&
            containsLowerCase &&
            containsNumber &&
            containsSpecial) {
            setPasswordError("");
        } else {
            setPasswordError("Weak password")
        }
    }

    const handleResetPassword = () => {
        if (passwordError !== "") {
            showNotification("Please resolve errors", "error");
        } else if (confirmPassword !== newPassword) {
            showNotification("Passwords do not match", "error");
        } else {
            axios.patch(`http://localhost:8101/user/${verifiedUserId}/changePassword`, null, {
                params: {
                    newPassword: newPassword
                }
            })
                .then(response => {
                    showNotification("Password reset successfully. Please Login.", "success");
                    onClose();
                })
                .catch(error => {
                    showNotification("Error changing password", "error");
                });
        }


    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValidationComplete) {
            handleResetPassword();
        } else {
            handleValidationComplete();
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-md font-semibold text-gray-900">Reset Password</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={`mb-4 ${isVisible ? '' : 'hidden'}`}>
                        <div className="col-span-6">
                            <label htmlFor="mobileNumber" className="block text-xs font-medium text-gray-700">
                                Mobile Number
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                                    +91
                                </span>
                                <input
                                    required
                                    type="number"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    value={mobileNumber}
                                    onChange={handleMobileNumberChange}
                                    className="w-full rounded-r-md border-gray-200 bg-white text-sm text-gray-700  font-normal"
                                />
                            </div>
                            {mobileNumberError && <p className="mt-1 text-xs text-red-600">{mobileNumberError}</p>}
                        </div>
                    </div>
                    <div className={`mb-4 ${isVisible ? '' : 'hidden'}`}>
                        <label htmlFor="securityQuestion" className="block text-xs font-medium text-gray-700">
                            Security Question
                        </label>
                        <select id="securityQuestion"
                            required
                            name="securityQuestion"
                            value={securityQuestion}
                            onChange={(e) => setSecurityQuestion(e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm font-normal">
                            <option value="" disabled selected>Select a security question</option>
                            {Object.keys(SecurityQuestions).map(key => (
                                <option key={key} value={key}>{SecurityQuestions[key]}</option>
                            ))}
                        </select>
                    </div>
                    <div className={`mb-4 ${isVisible ? '' : 'hidden'}`}>
                        <label htmlFor="securityAnswer" className="block text-xs font-medium text-gray-700">
                            Answer
                        </label>
                        <input
                            type="text"
                            id="securityAnswer"
                            required
                            value={securityAnswer}
                            onChange={(e) => setSecurityAnswer(e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        />
                    </div>
                    {isValidationComplete && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="newPassword" className="block text-xs font-medium text-gray-700">
                                    New Password
                                </label>
                                <input
                                    required
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={newPassword}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm font-normal"
                                    onChange={handlePasswordChange}
                                />
                                {passwordError && <p className="mt-1 text-xs text-yellow-600">{passwordError}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                            </div>
                        </>
                    )}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-block rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring"
                        >
                            {isValidationComplete ? "Submit" : "Verify Details"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
