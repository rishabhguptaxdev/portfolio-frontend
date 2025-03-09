import React, { useEffect, useState } from "react";
import {
    getAllTestimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
} from "../../services/testimonial";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { PenIcon, TrashIcon, PlusIcon, SaveIcon } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../../components/ui/dialog";
import Loader from "../../components/ui/Loader";

const initialTestimonialState = {
    clientName: "",
    clientMessage: "",
    ratings: 0,
    clientAvatarURL: "",
};

const TestimonialSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [newTestimonial, setNewTestimonial] = useState(initialTestimonialState);
    const [expanded, setExpanded] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await getAllTestimonials();
            if (Array.isArray(data)) {
                setTestimonials(data);
            } else {
                console.error(data.message || "Unexpected response format");
                setTestimonials([]);
            }
        } catch (error) {
            console.error("Failed to fetch testimonials:", error);
            setTestimonials([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setNewTestimonial(initialTestimonialState);
        setEditingItem(null);
    };

    const handleSave = async () => {
        setActionLoading(true);
        try {
            if (editingItem) {
                await updateTestimonial(editingItem, newTestimonial);
            } else {
                await addTestimonial(newTestimonial);
            }
            await fetchData();
            resetForm();
            setExpanded(false);
        } catch (error) {
            console.error("Failed to save testimonial:", error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        setActionLoading(true);
        try {
            await deleteTestimonial(deleteItemId);
            await fetchData();
        } catch (error) {
            console.error("Failed to delete testimonial:", error);
        } finally {
            setActionLoading(false);
            setDeleteItemId(null);
        }
    };

    const handleEdit = (testimonial) => {
        setNewTestimonial(testimonial);
        setEditingItem(testimonial._id);
        setExpanded(true);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Loader />
                ) : expanded ? (
                    <div className="space-y-4">
                        <Input
                            placeholder="Client Name"
                            value={newTestimonial.clientName}
                            onChange={(e) =>
                                setNewTestimonial({ ...newTestimonial, clientName: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Client Message"
                            value={newTestimonial.clientMessage}
                            onChange={(e) =>
                                setNewTestimonial({
                                    ...newTestimonial,
                                    clientMessage: e.target.value,
                                })
                            }
                        />
                        <Input
                            type="number"
                            placeholder="Ratings"
                            value={newTestimonial.ratings}
                            onChange={(e) =>
                                setNewTestimonial({ ...newTestimonial, ratings: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Client Avatar URL"
                            value={newTestimonial.clientAvatarURL}
                            onChange={(e) =>
                                setNewTestimonial({
                                    ...newTestimonial,
                                    clientAvatarURL: e.target.value,
                                })
                            }
                        />
                        <Button onClick={handleSave} className="w-full">
                            {actionLoading ? (
                                <Loader />
                            ) : editingItem ? (
                                <>
                                    <SaveIcon className="mr-2 h-4 w-4" /> Update Testimonial
                                </>
                            ) : (
                                <>
                                    <PlusIcon className="mr-2 h-4 w-4" /> Add Testimonial
                                </>
                            )}
                        </Button>
                        <Button
                            onClick={() => {
                                resetForm();
                                setExpanded(false);
                            }}
                            variant="outline"
                            className="w-full"
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <Button onClick={() => setExpanded(true)} className="w-full" variant="outline">
                        <PlusIcon className="mr-2 h-4 w-4" /> Add New Testimonial
                    </Button>
                )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial._id} className="w-full">
                        <CardHeader>
                            <CardTitle>{testimonial.clientName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{testimonial.clientMessage}</p>
                            <p>{testimonial.ratings}</p>
                            <img
                                src={testimonial.clientAvatarURL}
                                alt="Client Avatar"
                                className="w-16 h-16 rounded-full"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    // e.target.src = "/path/to/fallback-avatar.png"; // Ensure you have a valid fallback image
                                }}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(testimonial)}
                            >
                                <PenIcon className="h-4 w-4" />
                            </Button>
                            <Dialog
                                open={deleteItemId === testimonial._id}
                                onOpenChange={(open) => {
                                    if (!open) setDeleteItemId(null);
                                }}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => setDeleteItemId(testimonial._id)}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently
                                            delete the testimonial.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => setDeleteItemId(null)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button variant="destructive" onClick={handleDelete}>
                                            {actionLoading ? <Loader /> : "Delete"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ))}
            </CardFooter>
        </Card>
    );
};

export default TestimonialSection;
