import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-blue-300">
      {/* Carousel */}
      <div className="w-full mb-12">
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={5000}
        >
          <div className="relative">
            <img
              src="https://via.placeholder.com/1200x400"
              alt="Slide 1"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 p-4 text-white w-full text-center">
              <h2 className="text-3xl font-bold mb-2">Welcome to ASAAP</h2>
              <p className="mb-4 dark:text-white">
                Experience the best connectivity and services.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://via.placeholder.com/1200x400"
              alt="Slide 2"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 p-4 text-white w-full text-center">
              <h2 className="text-3xl font-bold mb-2">Join ASSAP Today</h2>
              <p className="mb-4">Unlimited plans and offers await you.</p>
            </div>
          </div>
        </Carousel>
      </div>

      <div className="p-6">
        {/* Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 ">
              Go for unlimited entertainment
            </h2>
            <p className="text-gray-700 mb-4 dark:text-white">
              Watch 900+ TV channels, stream content in more than 18 languages,
              and much more on the Entertainment app.
            </p>
          </div>
          <div>
            <img
             src={require("../../Media/OTT.png")}
              alt="Unlimited entertainment"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div>
            <img
              src={require("../../Media/High-speed.png")}
              alt="Reliable connectivity"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">
              High-speed, reliable connectivity
            </h2>
            <p className="text-gray-700 mb-4 dark:text-white">
              Besides mobile internet at 4G speed, enjoy unlimited data, FREE
              calls & SMS and more anywhere in India.
            </p>
          </div>
        </div>

        {/* New Layout Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Explore the digital world with ASAAP
          </h2>
          <p className="text-center text-gray-700 mb-8 dark:text-white">
            Exciting deals, a variety of entertainment and seamless digital
            experience.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="relative">
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="MyJio"
                  className="w-full rounded-lg shadow-md"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white w-full text-center  rounded-b-lg">
                  <h3 className="text-2xl font-bold mb-2">ASAAP</h3>
                  <p className="mb-2">One app for all your needs</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="relative">
                <img
                  src={require("../../Media/Music.png")}
                  alt="JioSaavn"
                  className="w-full rounded-lg shadow-md"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white w-full text-center  rounded-b-lg">
                  <h3 className="text-xl font-bold mb-2">Tune Into ASSAP</h3>
                  <p className="mb-2">
                    Create your own playlist for long drives
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src={require("../../Media/Entertetment.png")}
                  alt="JioCinema"
                  className="w-full rounded-lg shadow-md"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white w-full text-center  rounded-b-lg">
                  <h3 className="text-xl font-bold mb-2">
                    ASSAP Entertainment
                  </h3>
                  <p className="mb-2">Brings world class OTT shows</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <h2 className="text-3xl font-bold mt-4 mb-8">Digital benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center p-6 bg-blue-100 rounded-lg shadow-md">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12H9v4H6v2h3v4h2v-4h3v-2h-3V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-blue-900">
                Launching International roaming packs
              </h3>
              <p className="text-gray-700 mb-4 text-center">
                Enjoy international Wi-Fi calling, in-flight connectivity,
                lowest PayGo rates and more on your foreign trips.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-blue-100 rounded-lg shadow-md">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12H9v4H6v2h3v4h2v-4h3v-2h-3V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2  dark:text-blue-900">
                Exclusive plans{" "}
              </h3>
              <p className="text-gray-700 mb-4 text-center">
                All-in-one plans with high-speed internet, unlimited calls and
                SMS, FREE OTT subscriptions and more.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-blue-100 rounded-lg shadow-md">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12H9v4H6v2h3v4h2v-4h3v-2h-3V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2  dark:text-blue-900">
                FREE calls and SMS
              </h3>
              <p className="text-gray-700 mb-4 text-center">
                Stay connected 24*7 with high-speed internet, FREE calls and
                SMS, unlimited data, and superfast connectivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
