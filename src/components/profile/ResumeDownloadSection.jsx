import React from "react";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const ResumeDownloadSection = ({ resumeUrl }) => {
    if (!resumeUrl) return null;
    return (
        <section id="resume" className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-8">Download Resume</h2>
                <Button asChild className="px-8 py-4 text-lg">
                    <a
                        href={resumeUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                    >
                        <FontAwesomeIcon icon={faDownload} />
                        <span>Download My Resume</span>
                    </a>
                </Button>
            </div>
        </section>
    );
};

export default ResumeDownloadSection;
