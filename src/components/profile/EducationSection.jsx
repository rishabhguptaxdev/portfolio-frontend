import React from "react";

const EducationSection = ({ education }) => {
    if (!education || education.length === 0) return null;
    return (
        <section id="education" className="py-12 container mx-auto">
            <h2 className="text-3xl font-bold mb-4">Education</h2>
            <div className="space-y-6">
                {education.map((edu) => (
                    <div key={edu._id} className="border-b pb-4">
                        <h3 className="text-xl font-semibold">
                            {edu.degree} in {edu.field || ""} from {edu.nameOfInstitution}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {edu.durationOfEducation.startYear}/{edu.durationOfEducation.startMonth}
                            /{edu.durationOfEducation.startDay} - {edu.durationOfEducation.endYear}/
                            {edu.durationOfEducation.endMonth}/{edu.durationOfEducation.endDay}
                        </p>
                        <p className="mt-2">{edu.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EducationSection;
