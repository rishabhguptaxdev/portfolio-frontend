// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Welcome to My Portfolio App</h1>
            <div className="flex space-x-4">
                <Link
                    to="/login"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 text-lg"
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 text-lg"
                >
                    Signup
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
