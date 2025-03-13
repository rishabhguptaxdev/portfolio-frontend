import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ContactSection = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setFeedback("Your message has been sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            console.error(err);
            setFeedback("Failed to send your message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-gray-700">
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">Contact Me</h2>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-xl"
                >
                    <div className="space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder=" "
                                className="w-full p-2 border-b-2 border-gray-600 focus:border-blue-400 outline-none peer bg-transparent text-white"
                                required
                            />
                            <label className="absolute left-2 top-2 text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-400">
                                Name
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder=" "
                                className="w-full p-2 border-b-2 border-gray-600 focus:border-blue-400 outline-none peer bg-transparent text-white"
                                required
                            />
                            <label className="absolute left-2 top-2 text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-400">
                                Email
                            </label>
                        </div>
                        <div className="relative">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder=" "
                                className="w-full p-2 border-b-2 border-gray-600 focus:border-blue-400 outline-none peer bg-transparent text-white"
                                rows="4"
                                required
                            />
                            <label className="absolute left-2 top-2 text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-400">
                                Message
                            </label>
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 hover:bg-blue-600"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                        {feedback && (
                            <p className="mt-2 text-sm text-green-400 text-center">{feedback}</p>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactSection;
