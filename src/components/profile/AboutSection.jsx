const AboutSection = ({ about }) => {
    if (!about) return null;
    return (
        <section
            id="about"
            className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
        >
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <p className="mb-4">
                            <strong>Current Position:</strong> {about.currentPosition}
                        </p>
                        <p className="mb-4">
                            <strong>Company:</strong> {about.currentCompany}
                        </p>
                        <p>
                            <strong>Location:</strong> {about.currentLocation}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <p className="mb-4">
                            <strong>Experience:</strong> {about.yearsOfExperience} years
                        </p>
                        <p className="mb-4">
                            <strong>Date of Birth:</strong>{" "}
                            {new Date(about.dateOfBirth).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Languages:</strong> {about.languagesKnown.join(", ")}
                        </p>
                    </div>
                </div>
                <div className="mt-16">
                    <h3 className="text-3xl font-bold text-center mb-8">Skills</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {about.skills &&
                            about.skills.map((skill) => (
                                <li
                                    key={skill._id}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <span className="font-medium">{skill.skillName}</span> -{" "}
                                    {skill.subTechName.join(", ")} (Rating: {skill.ratings})
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
