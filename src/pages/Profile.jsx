import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/ui/Loader";
import HeroSection from "../components/profile/HeroSection";
import AboutSection from "../components/profile/AboutSection";
import WorkExperienceSection from "../components/profile/WorkExperienceSection";
import TestimonialsSection from "../components/profile/TestimonialsSection";
import ProjectsSection from "../components/profile/ProjectsSection";
import EducationSection from "../components/profile/EducationSection";
import ContactSection from "../components/profile/ContactSection";
import ResumeDownloadSection from "../components/profile/ResumeDownloadSection";
import { getProfileByUsername } from "@/services/profile";
import { motion } from "framer-motion"; // For animations

const Profile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await getProfileByUsername(username);
                if (!data.success) {
                    throw new Error(data.message || "Profile not found");
                }
                setProfile(data.profile);
            } catch (err) {
                console.error(err);
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    const aboutData =
        Array.isArray(profile.about) && profile.about.length > 0 ? profile.about[0] : null;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            {/* Hero Section */}
            <motion.section
                id="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <HeroSection profile={profile.user} about={aboutData} />
            </motion.section>

            {/* About Section */}
            <motion.section
                id="about"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <AboutSection about={aboutData} />
            </motion.section>

            {/* Work Experience Section */}
            <motion.section
                id="work"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <WorkExperienceSection experiences={profile.workExperience} />
            </motion.section>

            {/* Projects Section */}
            <motion.section
                id="projects"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <ProjectsSection projects={profile.projects} />
            </motion.section>

            {/* Education Section */}
            <motion.section
                id="education"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <EducationSection education={profile.education} />
            </motion.section>

            {/* Testimonials Section */}
            <motion.section
                id="testimonials"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <TestimonialsSection testimonials={profile.testimonials} />
            </motion.section>

            {/* Contact Section */}
            <motion.section
                id="contact"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <ContactSection />
            </motion.section>

            {/* Resume Download Section */}
            <motion.section
                id="resume"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <ResumeDownloadSection resumeUrl={aboutData?.resumeUrl} />
            </motion.section>
        </div>
    );
};

export default Profile;
