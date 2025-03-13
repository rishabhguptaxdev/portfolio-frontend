import React from "react";
import { Avatar } from "../ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";

const HeroSection = ({ profile, about }) => {
    return (
        <section
            id="hero"
            className="relative py-32 bg-gradient-to-r from-gray-700 bg- to-gray-900 text-white"
        >
            <div className="container mx-auto px-4 flex flex-col items-center text-center">
                <Avatar
                    src={profile?.avatarUrl}
                    alt={profile?.name || "Profile Image"}
                    className="w-40 h-40 mb-6 border-4 border-white rounded-full shadow-2xl"
                />
                <h1 className="text-6xl font-extrabold mb-4">{profile?.name || "Anonymous"}</h1>
                <p className="text-2xl mb-8">{about?.tagline || "Your tagline goes here"}</p>
                <div className="flex space-x-6">
                    {profile?.email && (
                        <a
                            href={`mailto:${profile.email}`}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <FontAwesomeIcon icon={faEnvelope} size="lg" />
                        </a>
                    )}
                    {about?.resumeUrl && (
                        <a
                            href={about.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <FontAwesomeIcon icon={faLink} size="lg" />
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
