import React from "react";
import { Avatar } from "../ui/avatar"; // Optional: Use Avatar for testimonial images

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TestimonialsSection = ({ testimonials }) => {
    if (!testimonials || testimonials.length === 0) return null;
    return (
        <section id="testimonials" className="py-20 bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">Testimonials</h2>
                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    interval={3000}
                >
                    {testimonials.map((t) => (
                        <div key={t._id} className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="flex items-center space-x-4 mb-4">
                                <Avatar
                                    src={t.clientAvatarURL}
                                    alt={t.clientName}
                                    className="w-12 h-12"
                                />
                                <div>
                                    <p className="font-semibold">{t.clientName}</p>
                                    <p className="text-sm text-gray-500">Rating: {t.ratings}</p>
                                </div>
                            </div>
                            <p className="italic">"{t.clientMessage}"</p>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default TestimonialsSection;
