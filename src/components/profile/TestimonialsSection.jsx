import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TestimonialsSection = ({ testimonials }) => {
    if (!testimonials || testimonials.length === 0) return null;
    return (
        <section id="testimonials" className="py-20 bg-gray-800">
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">Testimonials</h2>
                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    interval={4000}
                >
                    {testimonials.map((t) => (
                        <div key={t._id} className="bg-gray-900 p-8 rounded-xl shadow-xl mx-4">
                            <div className="flex items-center space-x-4 mb-4">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={t.clientAvatarURL} alt={t.clientName} />
                                    <AvatarFallback>{t.clientName[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-white">{t.clientName}</p>
                                    <p className="text-sm text-gray-400">Rating: {t.ratings}</p>
                                </div>
                            </div>
                            <p className="italic text-center text-gray-300">"{t.clientMessage}"</p>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default TestimonialsSection;
