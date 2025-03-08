// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAbouts, addAbout, deleteAbout } from "../services/about";
import {
    getAllWorkExperiences,
    addWorkExperience,
    deleteWorkExperience,
} from "../services/workExperience";
import { getAllTestimonials, addTestimonial, deleteTestimonial } from "../services/testimonial";
import { getAllProjects, addProject, deleteProject } from "../services/project";
import { getAllEducations, addEducation, deleteEducation } from "../services/education";
import { removeToken } from "../utils/helper";

const Dashboard = () => {
    const navigate = useNavigate();

    // About Section
    const [abouts, setAbouts] = useState([]);
    const [newAbout, setNewAbout] = useState({
        introductionContent: "",
        currentPosition: "",
    });

    // Work Experience Section
    const [workExperiences, setWorkExperiences] = useState([]);
    const [newWorkExperience, setNewWorkExperience] = useState({
        companyName: "",
        jobDesignation: "",
        durationOfWork: { startYear: "", endYear: "" },
    });

    // Testimonials Section
    const [testimonials, setTestimonials] = useState([]);
    const [newTestimonial, setNewTestimonial] = useState({
        clientName: "",
        clientMessage: "",
        ratings: 0,
    });

    // Projects Section
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        projectName: "",
        projectDescription: "",
        projectCategory: "",
    });

    // Education Section
    const [educations, setEducations] = useState([]);
    const [newEducation, setNewEducation] = useState({
        nameOfInstitution: "",
        degree: "",
        grade: "",
    });

    // Fetch all data on component mount
    useEffect(() => {
        fetchAbouts();
        fetchWorkExperiences();
        fetchTestimonials();
        fetchProjects();
        fetchEducations();
    }, []);

    // Fetch Abouts
    const fetchAbouts = async () => {
        try {
            const response = await getAllAbouts();
            setAbouts(response);
        } catch (error) {
            console.error("Failed to fetch abouts:", error);
        }
    };

    // Fetch Work Experiences
    const fetchWorkExperiences = async () => {
        try {
            const response = await getAllWorkExperiences();
            setWorkExperiences(response);
        } catch (error) {
            console.error("Failed to fetch work experiences:", error);
        }
    };

    // Fetch Testimonials
    const fetchTestimonials = async () => {
        try {
            const response = await getAllTestimonials();
            setTestimonials(response);
        } catch (error) {
            console.error("Failed to fetch testimonials:", error);
        }
    };

    // Fetch Projects
    const fetchProjects = async () => {
        try {
            const response = await getAllProjects();
            setProjects(response);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }
    };

    // Fetch Educations
    const fetchEducations = async () => {
        try {
            const response = await getAllEducations();
            setEducations(response);
        } catch (error) {
            console.error("Failed to fetch educations:", error);
        }
    };

    // Add About
    const handleAddAbout = async () => {
        try {
            await addAbout(newAbout);
            fetchAbouts();
            setNewAbout({ introductionContent: "", currentPosition: "" });
        } catch (error) {
            console.error("Failed to add about:", error);
        }
    };

    // Add Work Experience
    const handleAddWorkExperience = async () => {
        try {
            await addWorkExperience(newWorkExperience);
            fetchWorkExperiences();
            setNewWorkExperience({
                companyName: "",
                jobDesignation: "",
                durationOfWork: { startYear: "", endYear: "" },
            });
        } catch (error) {
            console.error("Failed to add work experience:", error);
        }
    };

    // Add Testimonial
    const handleAddTestimonial = async () => {
        try {
            await addTestimonial(newTestimonial);
            fetchTestimonials();
            setNewTestimonial({ clientName: "", clientMessage: "", ratings: 0 });
        } catch (error) {
            console.error("Failed to add testimonial:", error);
        }
    };

    // Add Project
    const handleAddProject = async () => {
        try {
            await addProject(newProject);
            fetchProjects();
            setNewProject({ projectName: "", projectDescription: "", projectCategory: "" });
        } catch (error) {
            console.error("Failed to add project:", error);
        }
    };

    // Add Education
    const handleAddEducation = async () => {
        try {
            await addEducation(newEducation);
            fetchEducations();
            setNewEducation({ nameOfInstitution: "", degree: "", grade: "" });
        } catch (error) {
            console.error("Failed to add education:", error);
        }
    };

    // Delete About
    const handleDeleteAbout = async (aboutId) => {
        try {
            await deleteAbout(aboutId);
            fetchAbouts();
        } catch (error) {
            console.error("Failed to delete about:", error);
        }
    };

    // Delete Work Experience
    const handleDeleteWorkExperience = async (workExperienceId) => {
        try {
            await deleteWorkExperience(workExperienceId);
            fetchWorkExperiences();
        } catch (error) {
            console.error("Failed to delete work experience:", error);
        }
    };

    // Delete Testimonial
    const handleDeleteTestimonial = async (testimonialId) => {
        try {
            await deleteTestimonial(testimonialId);
            fetchTestimonials();
        } catch (error) {
            console.error("Failed to delete testimonial:", error);
        }
    };

    // Delete Project
    const handleDeleteProject = async (projectId) => {
        try {
            await deleteProject(projectId);
            fetchProjects();
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    // Delete Education
    const handleDeleteEducation = async (educationId) => {
        try {
            await deleteEducation(educationId);
            fetchEducations();
        } catch (error) {
            console.error("Failed to delete education:", error);
        }
    };

    // Logout Function
    const handleLogout = () => {
        removeToken(); // Remove the token from localStorage
        navigate("/login"); // Redirect to the login page
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black transition duration-300"
                >
                    Logout
                </button>
            </div>

            {/* Grid Layout for Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* About Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">About</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Introduction Content"
                            value={newAbout.introductionContent}
                            onChange={(e) =>
                                setNewAbout({ ...newAbout, introductionContent: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Current Position"
                            value={newAbout.currentPosition}
                            onChange={(e) =>
                                setNewAbout({ ...newAbout, currentPosition: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <button
                            onClick={handleAddAbout}
                            className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-black transition duration-300"
                        >
                            Add About
                        </button>
                    </div>
                    <div className="mt-4">
                        {abouts.map((about) => (
                            <div
                                key={about._id}
                                className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4"
                            >
                                <p>{about.introductionContent}</p>
                                <p>{about.currentPosition}</p>
                                <button
                                    onClick={() => handleDeleteAbout(about._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Work Experience Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={newWorkExperience.companyName}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    companyName: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Job Designation"
                            value={newWorkExperience.jobDesignation}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    jobDesignation: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Start Year"
                            value={newWorkExperience.durationOfWork.startYear}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    durationOfWork: {
                                        ...newWorkExperience.durationOfWork,
                                        startYear: e.target.value,
                                    },
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="End Year"
                            value={newWorkExperience.durationOfWork.endYear}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    durationOfWork: {
                                        ...newWorkExperience.durationOfWork,
                                        endYear: e.target.value,
                                    },
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <button
                            onClick={handleAddWorkExperience}
                            className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-black transition duration-300"
                        >
                            Add Work Experience
                        </button>
                    </div>
                    <div className="mt-4">
                        {workExperiences.map((workExperience) => (
                            <div
                                key={workExperience._id}
                                className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4"
                            >
                                <p>{workExperience.companyName}</p>
                                <p>{workExperience.jobDesignation}</p>
                                <button
                                    onClick={() => handleDeleteWorkExperience(workExperience._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Client Name"
                            value={newTestimonial.clientName}
                            onChange={(e) =>
                                setNewTestimonial({ ...newTestimonial, clientName: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Client Message"
                            value={newTestimonial.clientMessage}
                            onChange={(e) =>
                                setNewTestimonial({
                                    ...newTestimonial,
                                    clientMessage: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Ratings"
                            value={newTestimonial.ratings}
                            onChange={(e) =>
                                setNewTestimonial({ ...newTestimonial, ratings: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <button
                            onClick={handleAddTestimonial}
                            className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-black transition duration-300"
                        >
                            Add Testimonial
                        </button>
                    </div>
                    <div className="mt-4">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial._id}
                                className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4"
                            >
                                <p>{testimonial.clientName}</p>
                                <p>{testimonial.clientMessage}</p>
                                <button
                                    onClick={() => handleDeleteTestimonial(testimonial._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Projects Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Projects</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Project Name"
                            value={newProject.projectName}
                            onChange={(e) =>
                                setNewProject({ ...newProject, projectName: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Project Description"
                            value={newProject.projectDescription}
                            onChange={(e) =>
                                setNewProject({ ...newProject, projectDescription: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Project Category"
                            value={newProject.projectCategory}
                            onChange={(e) =>
                                setNewProject({ ...newProject, projectCategory: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <button
                            onClick={handleAddProject}
                            className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-black transition duration-300"
                        >
                            Add Project
                        </button>
                    </div>
                    <div className="mt-4">
                        {projects.map((project) => (
                            <div
                                key={project._id}
                                className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4"
                            >
                                <p>{project.projectName}</p>
                                <p>{project.projectDescription}</p>
                                <button
                                    onClick={() => handleDeleteProject(project._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Education</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name of Institution"
                            value={newEducation.nameOfInstitution}
                            onChange={(e) =>
                                setNewEducation({
                                    ...newEducation,
                                    nameOfInstitution: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Degree"
                            value={newEducation.degree}
                            onChange={(e) =>
                                setNewEducation({ ...newEducation, degree: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Grade"
                            value={newEducation.grade}
                            onChange={(e) =>
                                setNewEducation({ ...newEducation, grade: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <button
                            onClick={handleAddEducation}
                            className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-black transition duration-300"
                        >
                            Add Education
                        </button>
                    </div>
                    <div className="mt-4">
                        {educations.map((education) => (
                            <div
                                key={education._id}
                                className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4"
                            >
                                <p>{education.nameOfInstitution}</p>
                                <p>{education.degree}</p>
                                <button
                                    onClick={() => handleDeleteEducation(education._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
