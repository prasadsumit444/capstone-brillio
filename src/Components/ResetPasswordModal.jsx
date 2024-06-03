import axios from "axios";
import React, { useState } from "react";

export function ResetPasswordModal({ onClose }) {
    const [isValidationComplete, setIsValidationComplete] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [mobileNumber, setMobileNumber] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verifiedUserId, setVerifiedUserId] = useState(null);

    const SecurityQuestions = {
        "MOTHERS_MAIDEN_NAME": "What is your mother's maiden name?",
        "FIRST_PET_NAME": "What is the name of your first pet?",
        "CITY_OF_BIRTH": "Which city were you born in?"
    };

    const handleValidationComplete = () => {
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
        }).catch((error) => {
            alert("Invalid User")
        })
    };

    const handleResetPassword = () => {
        if (confirmPassword !== newPassword) {
            alert("Passwords do not match");
        } else {
            axios.patch(`http://localhost:8101/user/${verifiedUserId}/changePassword`, null, {
                params: {
                    newPassword: newPassword
                }
            })
                .then(response => {
                    alert("Password reset successfully. Please Login.");
                    onClose();
                })
                .catch(error => {
                    console.error("Error changing password:", error);
                });
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
                <form>
                    <div className={`mb-4 ${isVisible ? '' : 'hidden'}`}>
                        <label htmlFor="resetMobileNumber" className="block text-xs font-medium text-gray-700">
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            id="resetMobileNumber"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        />
                    </div>
                    <div className={`mb-4 ${isVisible ? '' : 'hidden'}`}>
                        <label htmlFor="securityQuestion" className="block text-xs font-medium text-gray-700">
                            Security Question
                        </label>
                        <select id="securityQuestion"
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
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                            </div>
                        </>
                    )}
                    <div className="flex justify-end">
                        {
                            isValidationComplete ? (
                                <button
                                    type="button"
                                    className="inline-block rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring"
                                    onClick={handleResetPassword}
                                >
                                    Submit
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="inline-block rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring"
                                    onClick={handleValidationComplete}
                                >
                                    Verify Details
                                </button>
                            )
                        }

                    </div>
                </form>
            </div>
        </div>
    );
}
