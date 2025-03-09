import React, { useEffect, useState } from "react";
import { getAllAbouts, addAbout, updateAbout, deleteAbout } from "../../services/about";
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

const initialAboutState = {
    introductionContent: "",
    currentPosition: "",
    currentCompany: "",
    currentLocation: "",
    tagline: "",
    yearsOfExperience: "",
    dateOfBirth: "",
    languagesKnown: [],
    resumeUrl: "",
};

const AboutSection = () => {
    const [abouts, setAbouts] = useState([]);
    const [newAbout, setNewAbout] = useState(initialAboutState);
    const [expanded, setExpanded] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await getAllAbouts();
            if (Array.isArray(data)) {
                setAbouts(data);
            } else {
                console.error(data.message || "Unexpected response format");
                setAbouts([]);
            }
        } catch (error) {
            console.error("Failed to fetch abouts:", error);
            setAbouts([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setNewAbout(initialAboutState);
        setEditingItem(null);
    };

    const handleSave = async () => {
        setActionLoading(true);
        try {
            if (editingItem) {
                await updateAbout(editingItem, newAbout);
            } else {
                await addAbout(newAbout);
            }
            await fetchData();
            resetForm();
            setExpanded(false);
        } catch (error) {
            console.error("Failed to save about:", error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        setActionLoading(true);
        try {
            await deleteAbout(deleteItemId);
            await fetchData();
        } catch (error) {
            console.error("Failed to delete about:", error);
        } finally {
            setActionLoading(false);
            setDeleteItemId(null);
        }
    };

    const handleEdit = (about) => {
        setNewAbout(about);
        setEditingItem(about._id);
        setExpanded(true);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Loader />
                ) : expanded ? (
                    <div className="space-y-4">
                        <Input
                            placeholder="Introduction Content"
                            value={newAbout.introductionContent}
                            onChange={(e) =>
                                setNewAbout({ ...newAbout, introductionContent: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Current Position"
                            value={newAbout.currentPosition}
                            onChange={(e) =>
                                setNewAbout({ ...newAbout, currentPosition: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Current Company"
                            value={newAbout.currentCompany}
                            onChange={(e) =>
                                setNewAbout({ ...newAbout, currentCompany: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Current Location"
                            value={newAbout.currentLocation}
                            onChange={(e) =>
                                setNewAbout({ ...newAbout, currentLocation: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Tagline"
                            value={newAbout.tagline}
                            onChange={(e) => setNewAbout({ ...newAbout, tagline: e.target.value })}
                        />
                        <Input
                            type="number"
                            placeholder="Years of Experience"
                            value={newAbout.yearsOfExperience}
                            onChange={(e) =>
                                setNewAbout({ ...newAbout, yearsOfExperience: e.target.value })
                            }
                        />
                        <Input
                            type="date"
                            placeholder="Date of Birth"
                            value={newAbout.dateOfBirth}
                            onChange={(e) =>
                                setNewAbout({ ...newAbout, dateOfBirth: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Languages Known (comma separated)"
                            value={newAbout.languagesKnown.join(",")}
                            onChange={(e) =>
                                setNewAbout({
                                    ...newAbout,
                                    languagesKnown: e.target.value.split(","),
                                })
                            }
                        />
                        <Input
                            placeholder="Resume URL"
                            value={newAbout.resumeUrl}
                            onChange={(e) =>
                                setNewAbout({ ...newAbout, resumeUrl: e.target.value })
                            }
                        />
                        <Button onClick={handleSave} className="w-full">
                            {actionLoading ? (
                                <Loader />
                            ) : editingItem ? (
                                <>
                                    <SaveIcon className="mr-2 h-4 w-4" /> Update About
                                </>
                            ) : (
                                <>
                                    <PlusIcon className="mr-2 h-4 w-4" /> Add About
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
                        <PlusIcon className="mr-2 h-4 w-4" /> Add New About
                    </Button>
                )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                {abouts.map((about) => (
                    <Card key={about._id} className="w-full">
                        <CardHeader>
                            <CardTitle>{about.currentPosition}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{about.introductionContent}</p>
                            <p>{about.currentCompany}</p>
                            <p>{about.currentLocation}</p>
                            <p>{about.tagline}</p>
                            <p>{about.yearsOfExperience} years of experience</p>
                            <p>{new Date(about.dateOfBirth).toLocaleDateString()}</p>
                            <p>{about.languagesKnown.join(", ")}</p>
                            <a href={about.resumeUrl} target="_blank" rel="noopener noreferrer">
                                Resume
                            </a>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(about)}>
                                <PenIcon className="h-4 w-4" />
                            </Button>
                            <Dialog
                                open={deleteItemId === about._id}
                                onOpenChange={(open) => {
                                    if (!open) setDeleteItemId(null);
                                }}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => setDeleteItemId(about._id)}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently
                                            delete the about section.
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

export default AboutSection;
