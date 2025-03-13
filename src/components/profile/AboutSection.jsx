import React from "react";

const AboutSection = ({ about }) => {
    if (!about) return null;
    return (
        <section id="about" className="py-20 bg-gray-800">
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="text-4xl font-bold text-center text-white mb-12">About Me</h2>
                <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
                    <p className="text-lg mb-6 text-gray-300">{about.introductionContent}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-gray-300">
                            <p>
                                <strong>Current Position:</strong> {about.currentPosition}
                            </p>
                            <p>
                                <strong>Company:</strong> {about.currentCompany}
                            </p>
                            <p>
                                <strong>Location:</strong> {about.currentLocation}
                            </p>
                        </div>
                        <div className="text-gray-300">
                            <p>
                                <strong>Experience:</strong> {about.yearsOfExperience} years
                            </p>
                            <p>
                                <strong>Date of Birth:</strong>{" "}
                                {new Date(about.dateOfBirth).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Languages:</strong> {about.languagesKnown.join(", ")}
                            </p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-4 text-white">Skills</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {about.skills &&
                                about.skills.map((skill) => (
                                    <li
                                        key={skill._id}
                                        className="bg-gray-800 p-4 rounded-md border border-gray-700 text-gray-300"
                                    >
                                        <span className="font-semibold">{skill.skillName}:</span>{" "}
                                        {skill.subTechName.join(", ")} (Rating: {skill.ratings})
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
