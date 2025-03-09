import React, { useEffect, useState } from "react";
import {
    getAllEducations,
    addEducation,
    updateEducation,
    deleteEducation,
} from "../../services/education";
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

const initialEducationState = {
    nameOfInstitution: "",
    locationOfInstitution: "",
    degree: "",
    grade: "",
    description: "",
    typeOfInstitution: "",
    durationOfEducation: {
        startYear: "",
        startMonth: "",
        startDay: "",
        endYear: "",
        endMonth: "",
        endDay: "",
    },
};

const EducationSection = () => {
    const [educations, setEducations] = useState([]);
    const [newEducation, setNewEducation] = useState(initialEducationState);
    const [expanded, setExpanded] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await getAllEducations();
            setEducations(data);
        } catch (error) {
            console.error("Failed to fetch educations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setNewEducation(initialEducationState);
        setEditingItem(null);
    };

    const handleSave = async () => {
        setActionLoading(true);
        try {
            if (editingItem) {
                await updateEducation(editingItem, newEducation);
            } else {
                await addEducation(newEducation);
            }
            await fetchData();
            resetForm();
            setExpanded(false);
        } catch (error) {
            console.error("Failed to save education:", error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        setActionLoading(true);
        try {
            await deleteEducation(deleteItemId);
            await fetchData();
        } catch (error) {
            console.error("Failed to delete education:", error);
        } finally {
            setActionLoading(false);
            setDeleteItemId(null);
        }
    };

    const handleEdit = (education) => {
        setNewEducation(education);
        setEditingItem(education._id);
        setExpanded(true);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Loader />
                ) : expanded ? (
                    <div className="space-y-4">
                        <Input
                            placeholder="Name of Institution"
                            value={newEducation.nameOfInstitution}
                            onChange={(e) =>
                                setNewEducation({
                                    ...newEducation,
                                    nameOfInstitution: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder="Location of Institution"
                            value={newEducation.locationOfInstitution}
                            onChange={(e) =>
                                setNewEducation({
                                    ...newEducation,
                                    locationOfInstitution: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder="Degree"
                            value={newEducation.degree}
                            onChange={(e) =>
                                setNewEducation({ ...newEducation, degree: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Grade"
                            value={newEducation.grade}
                            onChange={(e) =>
                                setNewEducation({ ...newEducation, grade: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Description"
                            value={newEducation.description}
                            onChange={(e) =>
                                setNewEducation({ ...newEducation, description: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Type of Institution"
                            value={newEducation.typeOfInstitution}
                            onChange={(e) =>
                                setNewEducation({
                                    ...newEducation,
                                    typeOfInstitution: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder="Start Year"
                            value={newEducation.durationOfEducation.startYear}
                            onChange={(e) =>
                                setNewEducation({
                                    ...newEducation,
                                    durationOfEducation: {
                                        ...newEducation.durationOfEducation,
                                        startYear: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="Start Month"
                            value={newEducation.durationOfEducation.startMonth}
                            onChange={(e) =>
                                setNewEducation({
                                    ...newEducation,
                                    durationOfEducation: {
                                        ...newEducation.durationOfEducation,
                                        startMonth: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="Start Day"
                            value={newEducation.durationOfEducation.startDay}
                            onChange={(e) =>
                                setNewEducation({
                                    ...newEducation,
                                    durationOfEducation: {
                                        ...newEducation.durationOfEducation,
                                        startDay: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="End Year"
                            value={newEducation.durationOfEducation.endYear}
                            onChange={(e) =>
                                setNewEducation({
                                    ...newEducation,
                                    durationOfEducation: {
                                        ...newEducation.durationOfEducation,
                                        endYear: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="End Month"
                            value={newEducation.durationOfEducation.endMonth}
                            onChange={(e) =>
                                setNewEducation({
                                    ...newEducation,
                                    durationOfEducation: {
                                        ...newEducation.durationOfEducation,
                                        endMonth: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="End Day"
                            value={newEducation.durationOfEducation.endDay}
                            onChange={(e) =>
                                setNewEducation({
                                    ...newEducation,
                                    durationOfEducation: {
                                        ...newEducation.durationOfEducation,
                                        endDay: e.target.value,
                                    },
                                })
                            }
                        />
                        <Button onClick={handleSave} className="w-full">
                            {actionLoading ? (
                                <Loader />
                            ) : editingItem ? (
                                <>
                                    <SaveIcon className="mr-2 h-4 w-4" /> Update Education
                                </>
                            ) : (
                                <>
                                    <PlusIcon className="mr-2 h-4 w-4" /> Add Education
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
                        <PlusIcon className="mr-2 h-4 w-4" /> Add New Education
                    </Button>
                )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                {educations.map((education) => (
                    <Card key={education._id} className="w-full">
                        <CardHeader>
                            <CardTitle>{education.nameOfInstitution}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{education.locationOfInstitution}</p>
                            <p>{education.degree}</p>
                            <p>{education.grade}</p>
                            <p>{education.description}</p>
                            <p>{education.typeOfInstitution}</p>
                            <p>
                                {education.durationOfEducation.startYear}-
                                {education.durationOfEducation.startMonth}-
                                {education.durationOfEducation.startDay} to{" "}
                                {education.durationOfEducation.endYear}-
                                {education.durationOfEducation.endMonth}-
                                {education.durationOfEducation.endDay}
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(education)}
                            >
                                <PenIcon className="h-4 w-4" />
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => setDeleteItemId(education._id)}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently
                                            delete the education.
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

export default EducationSection;
