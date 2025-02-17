import axios from "axios";
import React, { useState } from "react";
import { useAuth } from './AuthGuard'
import { Link, useNavigate } from "react-router-dom";
import '../../App.css';
import { useNotification } from "./../NotificationContext";


export default function Signup() {

  const { signup } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    emailId: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
    address: "",
    promotionalEmails: "OFF"
  });

  const [mobileNumberError, setMobileNumberError] = useState("");
  const [emailIdError, setEmailIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    setFormData({
      ...formData,
      mobileNumber: value
    });

    // Check if the mobile number is valid
    const mobileNumberPattern = /^[6-9]\d{9}$/;
    if (mobileNumberPattern.test(value)) {
      setMobileNumberError("");
    } else {
      setMobileNumberError("Invalid mobile number");
    }
  };


  const handleEmailChange = (e) => {
    const email = e.target.value.trim();

    // Email validation regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setFormData({
      ...formData,
      emailId: email
    });
    // Check if the entered email matches the pattern
    if (emailPattern.test(email)) {
      setEmailIdError("");
    } else {
      setEmailIdError("Invalid email address")
    }
  }


  const handlePasswordChange = (e) => {
    const password = e.target.value;

    const minLength = 8; // Minimum length of the password
    const containsUpperCase = /[A-Z]/.test(password); // At least one uppercase letter
    const containsLowerCase = /[a-z]/.test(password); // At least one lowercase letter
    const containsNumber = /\d/.test(password); // At least one digit
    const containsSpecial = /[@#$%]/.test(password); // Only @, #, $, and % as special characters

    setFormData({
      ...formData,
      password: password
    });


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


  const handleCheckbox = (e) => {
    setFormData({
      ...formData,
      promotionalEmails: e.target.checked === true ? "ON" : "OFF"
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (mobileNumberError === "" && emailIdError === "" && passwordError === "") {
      axios.post("http://localhost:8101/user/signup", JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          signup(response.data);
          navigate("/dashboard")
          showNotification("Signup successful", "success");
        })
        .catch(function (error) {
          showNotification("Signup failed", "error");
        });
    }
    else {
      showNotification("Resolve erorrs to Signup", "error");
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-center bg-gray-900 lg:col-span-5 lg:h-screen xl:col-span-6">
          <img
            alt=""
            src={require("../../Media/login.jpg")}
            className="absolute inset-0 h-screen w-full object-cover opacity-30"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/homepage">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to <span className=" text-blue-500">asaap</span>
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Unlock Endless Connectivity. Join Us and Experience Superior Communication.Sign Up Today!
            </p>
          </div>
        </section>

        <main
          className="flex  items-start justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 "
        >
          <div className="max-w-xl lg:max-w-3xl">

            <form onSubmit={handleSignup} className="grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <p class="text-xs text-gray-400 italic tracking-wide">
                  Note: All the fields are mandatory
                </p>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="fullName" className="block text-xs font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  required
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm font-normal"
                  onChange={(e) => setFormData({
                    ...formData,
                    fullName: e.target.value
                  })}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
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
                    value={formData.mobileNumber}
                    onChange={handleMobileNumberChange}
                    className="w-full rounded-r-md border-gray-200 bg-white text-sm text-gray-700  font-normal"
                  />
                </div>
                {mobileNumberError && <p className="mt-1 text-xs text-red-600">{mobileNumberError}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Email" className="block text-xs font-medium text-gray-700"> Email </label>

                <input
                  required
                  type="email"
                  id="emailId"
                  name="emailId"
                  value={formData.emailId}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm font-normal"
                  onChange={handleEmailChange}
                />
                {emailIdError && <p className="mt-1 text-xs text-red-600">{emailIdError}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="password" className="block text-xs font-medium text-gray-700"> Password </label>

                <input
                  required
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm font-normal"
                  onChange={handlePasswordChange}
                />
                {passwordError && <p className="mt-1 text-xs text-yellow-600">{passwordError}</p>}
              </div>

              <div className="col-span-6 ">
                <label htmlFor="password" className="block text-xs font-medium text-gray-700 textarea-restricted"> Address </label>

                <textarea
                  required
                  id="address"
                  name="address"
                  value={formData.address}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray"
                  onChange={(e) => setFormData({
                    ...formData,
                    address: e.target.value
                  })}
                  rows="2"
                  maxLength="200"
                  style={{ resize: 'none', maxHeight: '6em' }} // Adjust maxHeight to fit 4 rows based on line height
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="securityQuestion" className="block text-xs font-medium text-gray-700"> Security Question </label>
                <select required id="securityQuestion" name="securityQuestion" className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm font-normal"
                  value={formData.securityQuestion}
                  onChange={(e) => setFormData({
                    ...formData,
                    securityQuestion: e.target.value
                  })}
                >
                  <option value="" disabled selected>Select a security question</option>
                  {Object.keys(SecurityQuestions).map(key => (
                    <option key={key} value={key}>{SecurityQuestions[key]}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6">
                <input
                  required
                  type="text"
                  placeholder="Your answer"
                  id="securityAnswer"
                  name="securityAnswer"
                  value={formData.securityAnswer}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={(e) => setFormData({
                    ...formData,
                    securityAnswer: e.target.value
                  })}
                />
              </div>

              <div class="mt-4 col-span-6">
                <label for="promotionalEmails" class="flex gap-2">
                  <input
                    type="checkbox"
                    id="promotionalEmails"
                    name="promotionalEmails"
                    class="size-4 rounded-md border-gray-200 bg-white shadow-sm"
                    checked={formData.promotionalEmails === "OFF" ? false : true}
                    onChange={handleCheckbox}
                  />

                  <p class="text-xs text-gray-500 tracking-wide">
                    I want to receive emails about events, product updates and company announcements.
                  </p>
                </label>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-2">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Create an account
                </button>

                <p className="mt-2 text-xs text-gray-500 sm:mt-0">
                  Already have an account?
                  <Link to="/login" className="text-blue-900 font-semibold"> Login</Link>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
