import React from "react";

const WorkExperienceSection = ({ experiences }) => {
    if (!experiences || experiences.length === 0) return null;
    return (
        <section id="work" className="py-12 container mx-auto">
            <h2 className="text-3xl font-bold mb-4">Work Experience</h2>
            <div className="space-y-6">
                {experiences.map((exp) => (
                    <div key={exp._id} className="border-b pb-4">
                        <h3 className="text-xl font-semibold">
                            {exp.jobDesignation} at {exp.companyName}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {exp.durationOfWork.startYear}/{exp.durationOfWork.startMonth}/
                            {exp.durationOfWork.startDay} - {exp.durationOfWork.endYear}/
                            {exp.durationOfWork.endMonth}/{exp.durationOfWork.endDay}
                        </p>
                        <p className="mt-2">{exp.description}</p>
                        <p className="mt-1">
                            <strong>Tech Used:</strong> {exp.techUsed.join(", ")}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkExperienceSection;
