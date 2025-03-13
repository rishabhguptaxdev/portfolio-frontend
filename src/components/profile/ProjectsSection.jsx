import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Helper to chunk an array into groups of given size
const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

const ProjectsSection = ({ projects }) => {
    if (!projects || projects.length === 0) return null;
    const projectChunks = projects.length === 1 ? [projects] : chunkArray(projects, 2);
    return (
        <section id="projects" className="py-20 bg-gray-800">
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">Projects</h2>
                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    interval={4000}
                >
                    {projectChunks.map((chunk, index) => (
                        <div key={index} className="flex justify-center gap-8">
                            {chunk.map((proj) => (
                                <div
                                    key={proj._id}
                                    className="w-full md:w-1/2 bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                                >
                                    {proj.projectThumbnailURLs &&
                                        proj.projectThumbnailURLs.length > 0 && (
                                            <img
                                                src={proj.projectThumbnailURLs[0]}
                                                alt={proj.projectName}
                                                className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300"
                                            />
                                        )}
                                    <div className="p-6 text-gray-300">
                                        <h3 className="text-2xl font-bold mb-2">
                                            {proj.projectName}
                                        </h3>
                                        <p className="mb-4">{proj.projectDescription}</p>
                                        <p className="text-sm">
                                            <strong>Tech Used:</strong> {proj.techUsed.join(", ")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default ProjectsSection;
