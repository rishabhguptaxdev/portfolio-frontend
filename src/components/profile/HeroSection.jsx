import React from "react";
import { Avatar } from "../ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";
import Particles from "react-tsparticles"; // For particle animation

const HeroSection = ({ profile, about }) => {
    return (
        <section
            id="hero"
            className="relative py-32 bg-gradient-to-r from-purple-600 to-blue-500 text-white overflow-hidden"
        >
            {/* Particle Animation */}
            <Particles
                id="tsparticles"
                options={{
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    fpsLimit: 60,
                    interactivity: {
                        detectsOn: "canvas",
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 2,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            random: true,
                            value: 5,
                        },
                    },
                    detectRetina: true,
                }}
            />
            <div className="container mx-auto flex flex-col items-center text-center relative z-10">
                <Avatar
                    src={profile?.avatarUrl}
                    alt={profile?.name}
                    className="w-40 h-40 mb-6 border-4 border-white rounded-full animate-float"
                />
                <h1 className="text-6xl font-bold mb-4">{profile?.name}</h1>
                <p className="text-2xl mb-8">{about?.tagline}</p>
                <div className="flex space-x-6">
                    {profile?.email && (
                        <a
                            href={`mailto:${profile.email}`}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <FontAwesomeIcon icon={faEnvelope} size="lg" />
                        </a>
                    )}
                    {about?.resumeUrl && (
                        <a
                            href={about.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-200 transition-colors"
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
