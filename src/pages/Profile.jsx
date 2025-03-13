import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/ui/Loader";
import HeroSection from "../components/profile/HeroSection";
import AboutSection from "../components/profile/AboutSection";
import WorkExperienceSection from "../components/profile/WorkExperienceSection";
import ProjectsSection from "../components/profile/ProjectsSection";
import EducationSection from "../components/profile/EducationSection";
import TestimonialsSection from "../components/profile/TestimonialsSection";
import ContactSection from "../components/profile/ContactSection";
import ResumeDownloadSection from "../components/profile/ResumeDownloadSection";
import { getProfileByUsername } from "@/services/profile";
import { motion } from "framer-motion";

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
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <p className="text-red-500 text-xl">{error}</p>
            </div>
        );
    }

    // Use the first about object if available
    const aboutData =
        Array.isArray(profile.about) && profile.about.length > 0 ? profile.about[0] : null;

    return (
        <div className="bg-gray-900 text-gray-100">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
            >
                <HeroSection profile={profile.user} about={aboutData} />
            </motion.div>
            <motion.section
                id="about"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-800"
            >
                <AboutSection about={aboutData} />
            </motion.section>
            <motion.section
                id="work"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-700"
            >
                <WorkExperienceSection experiences={profile.workExperience} />
            </motion.section>
            <motion.section
                id="projects"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800"
            >
                <ProjectsSection projects={profile.projects} />
            </motion.section>
            <motion.section
                id="education"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gray-700"
            >
                <EducationSection education={profile.education} />
            </motion.section>
            <motion.section
                id="testimonials"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gray-800"
            >
                <TestimonialsSection testimonials={profile.testimonials} />
            </motion.section>
            <motion.section
                id="contact"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-700"
            >
                <ContactSection />
            </motion.section>
            <motion.section
                id="resume"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-800"
            >
                <ResumeDownloadSection resumeUrl={aboutData?.resumeUrl} />
            </motion.section>
        </div>
    );
};

export default Profile;
