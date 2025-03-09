import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { removeToken } from "../utils/helper";
import AboutSection from "../components/dashbard/AboutSection";
import WorkExperienceSection from "../components/dashbard/WorkExperienceSection";
import TestimonialSection from "../components/dashbard/TestimonialSection";
import ProjectSection from "../components/dashbard/ProjectSection";
import EducationSection from "../components/dashbard/EducationSection";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AboutSection />
                <WorkExperienceSection />
                <TestimonialSection />
                <ProjectSection />
                <EducationSection />
            </div>
        </div>
    );
};

export default Dashboard;
