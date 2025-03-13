const ProjectsSection = ({ projects }) => {
    if (!projects || projects.length === 0) return null;
    return (
        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((proj) => (
                        <div
                            key={proj._id}
                            className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            {proj.projectThumbnailURLs && proj.projectThumbnailURLs.length > 0 && (
                                <img
                                    src={proj.projectThumbnailURLs[0]}
                                    alt={proj.projectName}
                                    className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{proj.projectName}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {proj.projectDescription}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>Tech Used:</strong> {proj.techUsed.join(", ")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
