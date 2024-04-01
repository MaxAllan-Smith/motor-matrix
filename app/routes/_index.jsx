import { useState } from "react";
import { Layout } from "../components/layout.jsx";

export const meta = () => {
  return [
    { title: "Motor Matrix" },
    { name: "description", content: "Welcome to Motor Matrix!" },
  ];
};

export default function Index() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup forms

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center pt-16">
        <div className="mb-20">
          <img
            src="indexLogo.png"
            alt="Motor Matrix Logo"
            className="w-48 md:w-64" // Smaller logo size, adjust as needed
          />
        </div>
        <div className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 w-3/12">
          {isLogin ? (
            <div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Email Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="••••••••••••••"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Log In
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="new-company-name"
                >
                  Company Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="new-username"
                  type="text"
                  placeholder="Company Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="new-password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="new-password"
                  type="password"
                  placeholder="••••••••••••••"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                  type="button"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
          <br />
          <button
            className="text-blue-500 hover:text-blue-800"
            onClick={toggleForm}
          >
            {isLogin ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
