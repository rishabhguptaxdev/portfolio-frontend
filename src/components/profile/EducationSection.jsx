import React from "react";

const EducationSection = ({ education }) => {
    if (!education || education.length === 0) return null;
    return (
        <section id="education" className="py-20 bg-gray-700">
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">Education</h2>
                <div className="space-y-8">
                    {education.map((edu) => (
                        <div
                            key={edu._id}
                            className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-300"
                        >
                            <h3 className="text-2xl font-semibold">
                                {edu.degree} {edu.field && `in ${edu.field}`} from{" "}
                                {edu.nameOfInstitution}
                            </h3>
                            <p className="text-sm text-gray-400 mt-2">
                                {edu.durationOfEducation.startYear}/
                                {edu.durationOfEducation.startMonth}/
                                {edu.durationOfEducation.startDay} -{" "}
                                {edu.durationOfEducation.endYear}/{edu.durationOfEducation.endMonth}
                                /{edu.durationOfEducation.endDay}
                            </p>
                            {edu.description && <p className="mt-4">{edu.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
