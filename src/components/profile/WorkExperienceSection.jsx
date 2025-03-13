import React from "react";

const WorkExperienceSection = ({ experiences }) => {
    if (!experiences || experiences.length === 0) return null;
    return (
        <section id="work" className="py-20 bg-gray-700">
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">Work Experience</h2>
                <div className="space-y-8">
                    {experiences.map((exp) => (
                        <div
                            key={exp._id}
                            className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-gray-300"
                        >
                            <h3 className="text-2xl font-semibold">
                                {exp.jobDesignation} at {exp.companyName}
                            </h3>
                            <p className="text-sm text-gray-400 mt-2">
                                {exp.durationOfWork.startYear}/{exp.durationOfWork.startMonth}/
                                {exp.durationOfWork.startDay} - {exp.durationOfWork.endYear}/
                                {exp.durationOfWork.endMonth}/{exp.durationOfWork.endDay}
                            </p>
                            <p className="mt-4">{exp.description}</p>
                            <p className="mt-2">
                                <strong>Tech Used:</strong> {exp.techUsed.join(", ")}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkExperienceSection;
