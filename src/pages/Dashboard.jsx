// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAbouts, addAbout, deleteAbout, updateAbout } from "../services/about";
import {
    getAllWorkExperiences,
    addWorkExperience,
    deleteWorkExperience,
    updateWorkExperience,
} from "../services/workExperience";
import {
    getAllTestimonials,
    addTestimonial,
    deleteTestimonial,
    updateTestimonial,
} from "../services/testimonial";
import { getAllProjects, addProject, deleteProject, updateProject } from "../services/project";
import {
    getAllEducations,
    addEducation,
    deleteEducation,
    updateEducation,
} from "../services/education";
import { removeToken } from "../utils/helper";
import { Calendar } from "../components/ui/calendar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { PenIcon, TrashIcon, PlusIcon, SaveIcon } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../components/ui/dialog";

const Dashboard = () => {
    const navigate = useNavigate();

    // State for expandable sections
    const [expandedSection, setExpandedSection] = useState(null);
    const [editingItem, setEditingItem] = useState(null); // Track which item is being edited
    const [deleteItemId, setDeleteItemId] = useState(null); // Track which item is being deleted
    const [deleteSection, setDeleteSection] = useState(null); // Track which section the item belongs to

    // About Section
    const [abouts, setAbouts] = useState([]);
    const [newAbout, setNewAbout] = useState({
        introductionContent: "",
        currentPosition: "",
        currentCompany: "",
        currentLocation: "",
        tagline: "",
        yearsOfExperience: "",
        dateOfBirth: "",
        languagesKnown: [],
        skills: [],
        resumeUrl: "",
    });

    // Work Experience Section
    const [workExperiences, setWorkExperiences] = useState([]);
    const [newWorkExperience, setNewWorkExperience] = useState({
        companyName: "",
        companyWebsiteURL: "",
        jobDesignation: "",
        employmentType: "",
        location: "",
        description: "",
        techUsed: [],
        durationOfWork: {
            startYear: "",
            startMonth: "",
            startDay: "",
            endYear: "",
            endMonth: "",
            endDay: "",
        },
    });

    // Testimonials Section
    const [testimonials, setTestimonials] = useState([]);
    const [newTestimonial, setNewTestimonial] = useState({
        clientName: "",
        clientMessage: "",
        ratings: 0,
        clientAvatarURL: "",
    });

    // Projects Section
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        projectName: "",
        projectThumbnailURLs: [],
        projectDescription: "",
        projectCategory: [],
        dateOfProject: {
            startYear: "",
            startMonth: "",
            startDay: "",
            endYear: "",
            endMonth: "",
            endDay: "",
        },
        contributers: [],
        techUsed: [],
    });

    // Education Section
    const [educations, setEducations] = useState([]);
    const [newEducation, setNewEducation] = useState({
        nameOfInstitution: "",
        locationOfInstitution: "",
        degree: "",
        grade: "",
        description: "",
        typeOfInstitution: "",
        durationOfEducation: {
            startYear: "",
            startMonth: "",
            startDay: "",
            endYear: "",
            endMonth: "",
            endDay: "",
        },
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

    // Reset Form
    const resetForm = (section) => {
        switch (section) {
            case "about":
                setNewAbout({
                    introductionContent: "",
                    currentPosition: "",
                    currentCompany: "",
                    currentLocation: "",
                    tagline: "",
                    yearsOfExperience: "",
                    dateOfBirth: "",
                    languagesKnown: [],
                    skills: [],
                    resumeUrl: "",
                });
                break;
            case "workExperience":
                setNewWorkExperience({
                    companyName: "",
                    companyWebsiteURL: "",
                    jobDesignation: "",
                    employmentType: "",
                    location: "",
                    description: "",
                    techUsed: [],
                    durationOfWork: {
                        startYear: "",
                        startMonth: "",
                        startDay: "",
                        endYear: "",
                        endMonth: "",
                        endDay: "",
                    },
                });
                break;
            case "testimonial":
                setNewTestimonial({
                    clientName: "",
                    clientMessage: "",
                    ratings: 0,
                    clientAvatarURL: "",
                });
                break;
            case "project":
                setNewProject({
                    projectName: "",
                    projectThumbnailURLs: [],
                    projectDescription: "",
                    projectCategory: [],
                    dateOfProject: {
                        startYear: "",
                        startMonth: "",
                        startDay: "",
                        endYear: "",
                        endMonth: "",
                        endDay: "",
                    },
                    contributers: [],
                    techUsed: [],
                });
                break;
            case "education":
                setNewEducation({
                    nameOfInstitution: "",
                    locationOfInstitution: "",
                    degree: "",
                    grade: "",
                    description: "",
                    typeOfInstitution: "",
                    durationOfEducation: {
                        startYear: "",
                        startMonth: "",
                        startDay: "",
                        endYear: "",
                        endMonth: "",
                        endDay: "",
                    },
                });
                break;
            default:
                break;
        }
    };

    // Add About
    const handleAddAbout = async () => {
        try {
            await addAbout(newAbout);
            fetchAbouts();
            resetForm("about");
            setExpandedSection(null);
        } catch (error) {
            console.error("Failed to add about:", error);
        }
    };

    // Edit About
    const handleEditAbout = (aboutId) => {
        const aboutToEdit = abouts.find((about) => about._id === aboutId);
        setNewAbout(aboutToEdit);
        setEditingItem(aboutId);
        setExpandedSection("about");
    };

    // Update About
    const handleUpdateAbout = async () => {
        try {
            await updateAbout(editingItem, newAbout);
            fetchAbouts();
            resetForm("about");
            setEditingItem(null);
            setExpandedSection(null);
        } catch (error) {
            console.error("Failed to update about:", error);
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

    // Add Work Experience
    const handleAddWorkExperience = async () => {
        try {
            await addWorkExperience(newWorkExperience);
            fetchWorkExperiences();
            resetForm("workExperience");
            setExpandedSection(null);
        } catch (error) {
            console.error("Failed to add work experience:", error);
        }
    };

    // Edit Work Experience
    const handleEditWorkExperience = (workExperienceId) => {
        const workExperienceToEdit = workExperiences.find(
            (workExperience) => workExperience._id === workExperienceId
        );
        setNewWorkExperience(workExperienceToEdit);
        setEditingItem(workExperienceId);
        setExpandedSection("workExperience");
    };

    // Update Work Experience
    const handleUpdateWorkExperience = async () => {
        try {
            await updateWorkExperience(editingItem, newWorkExperience);
            fetchWorkExperiences();
            resetForm("workExperience");
            setEditingItem(null);
            setExpandedSection(null);
        } catch (error) {
            console.error("Failed to update work experience:", error);
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

    // Add Testimonial
    const handleAddTestimonial = async () => {
        try {
            await addTestimonial(newTestimonial);
            fetchTestimonials();
            resetForm("testimonial");
            setExpandedSection(null);
        } catch (error) {
            console.error("Failed to add testimonial:", error);
        }
    };

    // Edit Testimonial
    const handleEditTestimonial = (testimonialId) => {
        const testimonialToEdit = testimonials.find(
            (testimonial) => testimonial._id === testimonialId
        );
        setNewTestimonial(testimonialToEdit);
        setEditingItem(testimonialId);
        setExpandedSection("testimonial");
    };

    // Update Testimonial
    const handleUpdateTestimonial = async () => {
        try {
            await updateTestimonial(editingItem, newTestimonial);
            fetchTestimonials();
            resetForm("testimonial");
            setEditingItem(null);
            setExpandedSection(null);
        } catch (error) {
            console.error("Failed to update testimonial:", error);
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

    // Add Project
    const handleAddProject = async () => {
        try {
            await addProject(newProject);
            fetchProjects();
            resetForm("project");
            setExpandedSection(null);
        } catch (error) {
            console.error("Failed to add project:", error);
        }
    };

    // Edit Project
    const handleEditProject = (projectId) => {
        const projectToEdit = projects.find((project) => project._id === projectId);
        setNewProject(projectToEdit);
        setEditingItem(projectId);
        setExpandedSection("project");
    };

    // Update Project
    const handleUpdateProject = async () => {
        try {
            await updateProject(editingItem, newProject);
            fetchProjects();
            resetForm("project");
            setEditingItem(null);
            setExpandedSection(null);
        } catch (error) {
            console.error("Failed to update project:", error);
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

    // Add Education
    const handleAddEducation = async () => {
        try {
            await addEducation(newEducation);
            fetchEducations();
            resetForm("education");
            setExpandedSection(null);
        } catch (error) {
            console.error("Failed to add education:", error);
        }
    };

    // Edit Education
    const handleEditEducation = (educationId) => {
        const educationToEdit = educations.find((education) => education._id === educationId);
        setNewEducation(educationToEdit);
        setEditingItem(educationId);
        setExpandedSection("education");
    };

    // Update Education
    const handleUpdateEducation = async () => {
        try {
            await updateEducation(editingItem, newEducation);
            fetchEducations();
            resetForm("education");
            setEditingItem(null);
            setExpandedSection(null);
        } catch (error) {
            console.error("Failed to update education:", error);
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

    // Handle Delete Confirmation
    const handleDeleteConfirmation = async () => {
        if (deleteItemId && deleteSection) {
            switch (deleteSection) {
                case "about":
                    await handleDeleteAbout(deleteItemId);
                    break;
                case "workExperience":
                    await handleDeleteWorkExperience(deleteItemId);
                    break;
                case "testimonial":
                    await handleDeleteTestimonial(deleteItemId);
                    break;
                case "project":
                    await handleDeleteProject(deleteItemId);
                    break;
                case "education":
                    await handleDeleteEducation(deleteItemId);
                    break;
                default:
                    break;
            }
            setDeleteItemId(null);
            setDeleteSection(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Button onClick={handleLogout} variant="destructive">
                    Logout
                </Button>
            </div>

            {/* Grid Layout for Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* About Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {expandedSection === "about" ? (
                            <div className="space-y-4">
                                <Input
                                    placeholder="Introduction Content"
                                    value={newAbout.introductionContent}
                                    onChange={(e) =>
                                        setNewAbout({
                                            ...newAbout,
                                            introductionContent: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Current Position"
                                    value={newAbout.currentPosition}
                                    onChange={(e) =>
                                        setNewAbout({
                                            ...newAbout,
                                            currentPosition: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Current Company"
                                    value={newAbout.currentCompany}
                                    onChange={(e) =>
                                        setNewAbout({ ...newAbout, currentCompany: e.target.value })
                                    }
                                />
                                <Input
                                    placeholder="Current Location"
                                    value={newAbout.currentLocation}
                                    onChange={(e) =>
                                        setNewAbout({
                                            ...newAbout,
                                            currentLocation: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Tagline"
                                    value={newAbout.tagline}
                                    onChange={(e) =>
                                        setNewAbout({ ...newAbout, tagline: e.target.value })
                                    }
                                />
                                <Input
                                    type="number"
                                    placeholder="Years of Experience"
                                    value={newAbout.yearsOfExperience}
                                    onChange={(e) =>
                                        setNewAbout({
                                            ...newAbout,
                                            yearsOfExperience: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    type="date"
                                    placeholder="Date of Birth"
                                    value={newAbout.dateOfBirth}
                                    onChange={(e) =>
                                        setNewAbout({ ...newAbout, dateOfBirth: e.target.value })
                                    }
                                />
                                <Input
                                    placeholder="Languages Known (comma separated)"
                                    value={newAbout.languagesKnown.join(",")}
                                    onChange={(e) =>
                                        setNewAbout({
                                            ...newAbout,
                                            languagesKnown: e.target.value.split(","),
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Resume URL"
                                    value={newAbout.resumeUrl}
                                    onChange={(e) =>
                                        setNewAbout({ ...newAbout, resumeUrl: e.target.value })
                                    }
                                />
                                <Button
                                    onClick={editingItem ? handleUpdateAbout : handleAddAbout}
                                    className="w-full"
                                >
                                    {editingItem ? (
                                        <SaveIcon className="mr-2 h-4 w-4" />
                                    ) : (
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                    )}
                                    {editingItem ? "Update About" : "Add About"}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setExpandedSection(null);
                                        setEditingItem(null);
                                        resetForm("about");
                                    }}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => setExpandedSection("about")}
                                className="w-full"
                                variant="outline"
                            >
                                <PlusIcon className="mr-2 h-4 w-4" /> Add New About
                            </Button>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        {abouts.map((about) => (
                            <Card key={about._id} className="w-full">
                                <CardHeader>
                                    <CardTitle>{about.currentPosition}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{about.introductionContent}</p>
                                    <p>{about.currentCompany}</p>
                                    <p>{about.currentLocation}</p>
                                    <p>{about.tagline}</p>
                                    <p>{about.yearsOfExperience} years of experience</p>
                                    <p>{new Date(about.dateOfBirth).toLocaleDateString()}</p>
                                    <p>{about.languagesKnown.join(", ")}</p>
                                    <a
                                        href={about.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Resume
                                    </a>
                                </CardContent>
                                <CardFooter className="flex justify-end space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleEditAbout(about._id)}
                                    >
                                        <PenIcon className="h-4 w-4" />
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => {
                                                    setDeleteItemId(about._id);
                                                    setDeleteSection("about");
                                                }}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will
                                                    permanently delete the about section.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setDeleteItemId(null);
                                                        setDeleteSection(null);
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={handleDeleteConfirmation}
                                                >
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardFooter>
                </Card>

                {/* Work Experience Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Work Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {expandedSection === "workExperience" ? (
                            <div className="space-y-4">
                                <Input
                                    placeholder="Company Name"
                                    value={newWorkExperience.companyName}
                                    onChange={(e) =>
                                        setNewWorkExperience({
                                            ...newWorkExperience,
                                            companyName: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Job Designation"
                                    value={newWorkExperience.jobDesignation}
                                    onChange={(e) =>
                                        setNewWorkExperience({
                                            ...newWorkExperience,
                                            jobDesignation: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Employment Type"
                                    value={newWorkExperience.employmentType}
                                    onChange={(e) =>
                                        setNewWorkExperience({
                                            ...newWorkExperience,
                                            employmentType: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Location"
                                    value={newWorkExperience.location}
                                    onChange={(e) =>
                                        setNewWorkExperience({
                                            ...newWorkExperience,
                                            location: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Description"
                                    value={newWorkExperience.description}
                                    onChange={(e) =>
                                        setNewWorkExperience({
                                            ...newWorkExperience,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Tech Used (comma separated)"
                                    value={newWorkExperience.techUsed.join(",")}
                                    onChange={(e) =>
                                        setNewWorkExperience({
                                            ...newWorkExperience,
                                            techUsed: e.target.value.split(","),
                                        })
                                    }
                                />
                                <Input
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
                                />
                                <Input
                                    placeholder="Start Month"
                                    value={newWorkExperience.durationOfWork.startMonth}
                                    onChange={(e) =>
                                        setNewWorkExperience({
                                            ...newWorkExperience,
                                            durationOfWork: {
                                                ...newWorkExperience.durationOfWork,
                                                startMonth: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Start Day"
                                    value={newWorkExperience.durationOfWork.startDay}
                                    onChange={(e) =>
                                        setNewWorkExperience({
                                            ...newWorkExperience,
                                            durationOfWork: {
                                                ...newWorkExperience.durationOfWork,
                                                startDay: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
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
                                />
                                <Input
                                    placeholder="End Month"
                                    value={newWorkExperience.durationOfWork.endMonth}
                                    onChange={(e) =>
                                        setNewWorkExperience({
                                            ...newWorkExperience,
                                            durationOfWork: {
                                                ...newWorkExperience.durationOfWork,
                                                endMonth: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    placeholder="End Day"
                                    value={newWorkExperience.durationOfWork.endDay}
                                    onChange={(e) =>
                                        setNewWorkExperience({
                                            ...newWorkExperience,
                                            durationOfWork: {
                                                ...newWorkExperience.durationOfWork,
                                                endDay: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Button
                                    onClick={
                                        editingItem
                                            ? handleUpdateWorkExperience
                                            : handleAddWorkExperience
                                    }
                                    className="w-full"
                                >
                                    {editingItem ? (
                                        <SaveIcon className="mr-2 h-4 w-4" />
                                    ) : (
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                    )}
                                    {editingItem ? "Update Work Experience" : "Add Work Experience"}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setExpandedSection(null);
                                        setEditingItem(null);
                                        resetForm("workExperience");
                                    }}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => setExpandedSection("workExperience")}
                                className="w-full"
                                variant="outline"
                            >
                                <PlusIcon className="mr-2 h-4 w-4" /> Add New Work Experience
                            </Button>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        {workExperiences.map((workExperience) => (
                            <Card key={workExperience._id} className="w-full">
                                <CardHeader>
                                    <CardTitle>{workExperience.companyName}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{workExperience.jobDesignation}</p>
                                    <p>{workExperience.employmentType}</p>
                                    <p>{workExperience.location}</p>
                                    <p>{workExperience.description}</p>
                                    <p>{workExperience.techUsed.join(", ")}</p>
                                    <p>
                                        {workExperience.durationOfWork.startYear}-
                                        {workExperience.durationOfWork.startMonth}-
                                        {workExperience.durationOfWork.startDay} to{" "}
                                        {workExperience.durationOfWork.endYear}-
                                        {workExperience.durationOfWork.endMonth}-
                                        {workExperience.durationOfWork.endDay}
                                    </p>
                                </CardContent>
                                <CardFooter className="flex justify-end space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleEditWorkExperience(workExperience._id)}
                                    >
                                        <PenIcon className="h-4 w-4" />
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => {
                                                    setDeleteItemId(workExperience._id);
                                                    setDeleteSection("workExperience");
                                                }}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will
                                                    permanently delete the work experience.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setDeleteItemId(null);
                                                        setDeleteSection(null);
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={handleDeleteConfirmation}
                                                >
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardFooter>
                </Card>

                {/* Testimonials Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Testimonials</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {expandedSection === "testimonial" ? (
                            <div className="space-y-4">
                                <Input
                                    placeholder="Client Name"
                                    value={newTestimonial.clientName}
                                    onChange={(e) =>
                                        setNewTestimonial({
                                            ...newTestimonial,
                                            clientName: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Client Message"
                                    value={newTestimonial.clientMessage}
                                    onChange={(e) =>
                                        setNewTestimonial({
                                            ...newTestimonial,
                                            clientMessage: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    type="number"
                                    placeholder="Ratings"
                                    value={newTestimonial.ratings}
                                    onChange={(e) =>
                                        setNewTestimonial({
                                            ...newTestimonial,
                                            ratings: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Client Avatar URL"
                                    value={newTestimonial.clientAvatarURL}
                                    onChange={(e) =>
                                        setNewTestimonial({
                                            ...newTestimonial,
                                            clientAvatarURL: e.target.value,
                                        })
                                    }
                                />
                                <Button
                                    onClick={
                                        editingItem ? handleUpdateTestimonial : handleAddTestimonial
                                    }
                                    className="w-full"
                                >
                                    {editingItem ? (
                                        <SaveIcon className="mr-2 h-4 w-4" />
                                    ) : (
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                    )}
                                    {editingItem ? "Update Testimonial" : "Add Testimonial"}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setExpandedSection(null);
                                        setEditingItem(null);
                                        resetForm("testimonial");
                                    }}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => setExpandedSection("testimonial")}
                                className="w-full"
                                variant="outline"
                            >
                                <PlusIcon className="mr-2 h-4 w-4" /> Add New Testimonial
                            </Button>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        {testimonials.map((testimonial) => (
                            <Card key={testimonial._id} className="w-full">
                                <CardHeader>
                                    <CardTitle>{testimonial.clientName}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{testimonial.clientMessage}</p>
                                    <p>{testimonial.ratings}</p>
                                    <img
                                        src={testimonial.clientAvatarURL}
                                        alt="Client Avatar"
                                        className="w-16 h-16 rounded-full"
                                    />
                                </CardContent>
                                <CardFooter className="flex justify-end space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleEditTestimonial(testimonial._id)}
                                    >
                                        <PenIcon className="h-4 w-4" />
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => {
                                                    setDeleteItemId(testimonial._id);
                                                    setDeleteSection("testimonial");
                                                }}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will
                                                    permanently delete the testimonial.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setDeleteItemId(null);
                                                        setDeleteSection(null);
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={handleDeleteConfirmation}
                                                >
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardFooter>
                </Card>

                {/* Projects Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {expandedSection === "project" ? (
                            <div className="space-y-4">
                                <Input
                                    placeholder="Project Name"
                                    value={newProject.projectName}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            projectName: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Project Thumbnail URLs (comma separated)"
                                    value={newProject.projectThumbnailURLs.join(",")}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            projectThumbnailURLs: e.target.value.split(","),
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Project Description"
                                    value={newProject.projectDescription}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            projectDescription: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Project Category (comma separated)"
                                    value={newProject.projectCategory.join(",")}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            projectCategory: e.target.value.split(","),
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Start Year"
                                    value={newProject.dateOfProject.startYear}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            dateOfProject: {
                                                ...newProject.dateOfProject,
                                                startYear: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Start Month"
                                    value={newProject.dateOfProject.startMonth}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            dateOfProject: {
                                                ...newProject.dateOfProject,
                                                startMonth: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Start Day"
                                    value={newProject.dateOfProject.startDay}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            dateOfProject: {
                                                ...newProject.dateOfProject,
                                                startDay: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    placeholder="End Year"
                                    value={newProject.dateOfProject.endYear}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            dateOfProject: {
                                                ...newProject.dateOfProject,
                                                endYear: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    placeholder="End Month"
                                    value={newProject.dateOfProject.endMonth}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            dateOfProject: {
                                                ...newProject.dateOfProject,
                                                endMonth: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    placeholder="End Day"
                                    value={newProject.dateOfProject.endDay}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            dateOfProject: {
                                                ...newProject.dateOfProject,
                                                endDay: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Contributers (comma separated)"
                                    value={newProject.contributers.join(",")}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            contributers: e.target.value.split(","),
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Tech Used (comma separated)"
                                    value={newProject.techUsed.join(",")}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            techUsed: e.target.value.split(","),
                                        })
                                    }
                                />
                                <Button
                                    onClick={editingItem ? handleUpdateProject : handleAddProject}
                                    className="w-full"
                                >
                                    {editingItem ? (
                                        <SaveIcon className="mr-2 h-4 w-4" />
                                    ) : (
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                    )}
                                    {editingItem ? "Update Project" : "Add Project"}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setExpandedSection(null);
                                        setEditingItem(null);
                                        resetForm("project");
                                    }}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => setExpandedSection("project")}
                                className="w-full"
                                variant="outline"
                            >
                                <PlusIcon className="mr-2 h-4 w-4" /> Add New Project
                            </Button>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        {projects.map((project) => (
                            <Card key={project._id} className="w-full">
                                <CardHeader>
                                    <CardTitle>{project.projectName}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{project.projectDescription}</p>
                                    <p>{project.projectCategory.join(", ")}</p>
                                    <p>
                                        {project.dateOfProject.startYear}-
                                        {project.dateOfProject.startMonth}-
                                        {project.dateOfProject.startDay} to{" "}
                                        {project.dateOfProject.endYear}-
                                        {project.dateOfProject.endMonth}-
                                        {project.dateOfProject.endDay}
                                    </p>
                                    <p>{project.contributers.join(", ")}</p>
                                    <p>{project.techUsed.join(", ")}</p>
                                </CardContent>
                                <CardFooter className="flex justify-end space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleEditProject(project._id)}
                                    >
                                        <PenIcon className="h-4 w-4" />
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => {
                                                    setDeleteItemId(project._id);
                                                    setDeleteSection("project");
                                                }}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will
                                                    permanently delete the project.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setDeleteItemId(null);
                                                        setDeleteSection(null);
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={handleDeleteConfirmation}
                                                >
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardFooter>
                </Card>

                {/* Education Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {expandedSection === "education" ? (
                            <div className="space-y-4">
                                <Input
                                    placeholder="Name of Institution"
                                    value={newEducation.nameOfInstitution}
                                    onChange={(e) =>
                                        setNewEducation({
                                            ...newEducation,
                                            nameOfInstitution: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Location of Institution"
                                    value={newEducation.locationOfInstitution}
                                    onChange={(e) =>
                                        setNewEducation({
                                            ...newEducation,
                                            locationOfInstitution: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Degree"
                                    value={newEducation.degree}
                                    onChange={(e) =>
                                        setNewEducation({ ...newEducation, degree: e.target.value })
                                    }
                                />
                                <Input
                                    placeholder="Grade"
                                    value={newEducation.grade}
                                    onChange={(e) =>
                                        setNewEducation({ ...newEducation, grade: e.target.value })
                                    }
                                />
                                <Input
                                    placeholder="Description"
                                    value={newEducation.description}
                                    onChange={(e) =>
                                        setNewEducation({
                                            ...newEducation,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Type of Institution"
                                    value={newEducation.typeOfInstitution}
                                    onChange={(e) =>
                                        setNewEducation({
                                            ...newEducation,
                                            typeOfInstitution: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Start Year"
                                    value={newEducation.durationOfEducation.startYear}
                                    onChange={(e) =>
                                        setNewEducation({
                                            ...newEducation,
                                            durationOfEducation: {
                                                ...newEducation.durationOfEducation,
                                                startYear: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Start Month"
                                    value={newEducation.durationOfEducation.startMonth}
                                    onChange={(e) =>
                                        setNewEducation({
                                            ...newEducation,
                                            durationOfEducation: {
                                                ...newEducation.durationOfEducation,
                                                startMonth: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Start Day"
                                    value={newEducation.durationOfEducation.startDay}
                                    onChange={(e) =>
                                        setNewEducation({
                                            ...newEducation,
                                            durationOfEducation: {
                                                ...newEducation.durationOfEducation,
                                                startDay: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    placeholder="End Year"
                                    value={newEducation.durationOfEducation.endYear}
                                    onChange={(e) =>
                                        setNewEducation({
                                            ...newEducation,
                                            durationOfEducation: {
                                                ...newEducation.durationOfEducation,
                                                endYear: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    placeholder="End Month"
                                    value={newEducation.durationOfEducation.endMonth}
                                    onChange={(e) =>
                                        setNewEducation({
                                            ...newEducation,
                                            durationOfEducation: {
                                                ...newEducation.durationOfEducation,
                                                endMonth: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    placeholder="End Day"
                                    value={newEducation.durationOfEducation.endDay}
                                    onChange={(e) =>
                                        setNewEducation({
                                            ...newEducation,
                                            durationOfEducation: {
                                                ...newEducation.durationOfEducation,
                                                endDay: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Button
                                    onClick={
                                        editingItem ? handleUpdateEducation : handleAddEducation
                                    }
                                    className="w-full"
                                >
                                    {editingItem ? (
                                        <SaveIcon className="mr-2 h-4 w-4" />
                                    ) : (
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                    )}
                                    {editingItem ? "Update Education" : "Add Education"}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setExpandedSection(null);
                                        setEditingItem(null);
                                        resetForm("education");
                                    }}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => setExpandedSection("education")}
                                className="w-full"
                                variant="outline"
                            >
                                <PlusIcon className="mr-2 h-4 w-4" /> Add New Education
                            </Button>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        {educations.map((education) => (
                            <Card key={education._id} className="w-full">
                                <CardHeader>
                                    <CardTitle>{education.nameOfInstitution}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{education.locationOfInstitution}</p>
                                    <p>{education.degree}</p>
                                    <p>{education.grade}</p>
                                    <p>{education.description}</p>
                                    <p>{education.typeOfInstitution}</p>
                                    <p>
                                        {education.durationOfEducation.startYear}-
                                        {education.durationOfEducation.startMonth}-
                                        {education.durationOfEducation.startDay} to{" "}
                                        {education.durationOfEducation.endYear}-
                                        {education.durationOfEducation.endMonth}-
                                        {education.durationOfEducation.endDay}
                                    </p>
                                </CardContent>
                                <CardFooter className="flex justify-end space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleEditEducation(education._id)}
                                    >
                                        <PenIcon className="h-4 w-4" />
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => {
                                                    setDeleteItemId(education._id);
                                                    setDeleteSection("education");
                                                }}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will
                                                    permanently delete the education.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setDeleteItemId(null);
                                                        setDeleteSection(null);
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={handleDeleteConfirmation}
                                                >
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
